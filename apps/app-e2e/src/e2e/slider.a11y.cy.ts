import 'cypress-real-events';

const examples = [
	'spartan-slider-preview',
	'spartan-slider-range',
	'spartan-slider-multiple-thumbs',
	'spartan-slider-vertical',
	'spartan-slider-disabled',
	'spartan-slider-ticks',
	'spartan-slider-ticks-with-label',
	'spartan-slider-prevent-thumb-overlap',
	'spartan-slider-draggable-range',
	'spartan-slider-draggable-range-only',
	'spartan-slider-form',
	'spartan-slider-rtl-preview',
];
function centerNative(selector: string): void {
	cy.get(selector).then((targets) =>
		targets[0].scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' }),
	);
	cy.window().then(
		(win) =>
			new Promise<void>((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()))),
	);
	cy.get(selector).should((targets) => {
		const target = targets[0];
		const rect = target.getBoundingClientRect();
		const hit = target.ownerDocument.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
		expect(rect.width).to.be.greaterThan(0);
		expect(rect.height).to.be.greaterThan(0);
		expect(hit === target || target.contains(hit)).to.equal(true);
	});
}
function clickNative(selector: string): void {
	centerNative(selector);
	cy.get(selector).realClick({ scrollBehavior: false });
}
function moveHeldMouse(selector: string, x: number, y: number): void {
	cy.get(selector).then((targets) => {
		const target = targets[0];
		const rect = target.getBoundingClientRect();
		const win = target.ownerDocument.defaultView!;
		const frame = (win.frameElement ??
			[...win.parent.document.querySelectorAll('iframe')].find(
				(iframe) => iframe.contentWindow === win,
			)) as HTMLIFrameElement;
		expect(frame).to.exist;
		const frameRect = frame.getBoundingClientRect();
		const scale = frameRect.width / frame.offsetWidth;
		// realMouseMove omits buttons, so Chrome releases capture. Keep the native held-button state.
		return Cypress.automation('remote:debugger:protocol', {
			command: 'Input.dispatchMouseEvent',
			params: {
				type: 'mouseMoved',
				x: frameRect.x + (rect.x + x) * scale,
				y: frameRect.y + (rect.y + y) * scale,
				buttons: 1,
				button: 'left',
				pointerType: 'mouse',
			},
		});
	});
}
describe('Capsule Slider catalogue', () => {
	const lightPalettes = new Map<number, string>();
	for (const theme of ['light', 'dark'])
		for (const width of [1280, 390]) {
			it(`hydrates and names all examples in ${theme} at ${width}px`, () => {
				cy.viewport(width, 900);
				cy.visit('/components/slider');
				for (const example of examples)
					cy.get(example, { timeout: 120000 })
						.should((hosts) => {
							for (const host of hosts) {
								expect(host.querySelector('[ngh]')).to.equal(null);
								for (let node: Element | null = host; node; node = node.parentElement)
									expect(node.hasAttribute('ngh')).to.equal(false);
							}
						})
						.find('caps-slider')
						.should('exist');
				cy.window().then(
					(win) =>
						new Promise<void>((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()))),
				);
				cy.get('html').invoke('removeClass', 'light dark').invoke('addClass', theme);
				cy.document().then(async (doc) => {
					await doc.fonts.load('400 14px "Inter"', 'Volume');
					await doc.fonts.ready;
					let interLoaded = false;
					doc.fonts.forEach((face) => {
						if (face.family.includes('Inter') && face.status === 'loaded') interLoaded = true;
					});
					expect(interLoaded).to.equal(true);
					expect(doc.fonts.check('400 14px "Inter"', 'Volume')).to.equal(true);
					const style = doc.defaultView!.getComputedStyle(doc.body);
					expect(style.fontFamily).to.include('Inter');
					const palette = `${style.backgroundColor}/${style.color}`;
					if (theme === 'light') lightPalettes.set(width, palette);
					else expect(palette).not.to.equal(lightPalettes.get(width));
				});
				cy.injectAxe();
				cy.checkA11y({ include: examples.map((example) => [example]) });
				clickNative('spartan-slider-preview button[role=slider]');
				cy.realPress('ArrowRight');
				cy.get('spartan-slider-preview button[role=slider]').should('have.attr', 'aria-valuenow', '76');
				clickNative('spartan-slider-form caps-field-label label');
				cy.get('spartan-slider-form button[role=slider]').should('be.focused');
				cy.realPress('ArrowRight');
				cy.get('spartan-slider-form button[role=slider]').should('have.attr', 'aria-valuenow', '26');
				cy.get('spartan-slider-disabled button[role=slider]').should('be.disabled').and('have.attr', 'tabindex', '-1');
				cy.get('caps-slider').find('button button,a button,button a,label label').should('not.exist');
			});
		}
	it('moves a selected range with native pointer capture and preserves its gap and bounds', () => {
		cy.visit('/components/slider');
		const root = 'spartan-slider-draggable-range caps-slider';
		cy.get(root, { timeout: 120000 }).should((hosts) => {
			for (const host of hosts) {
				expect(host.querySelector('[ngh]')).to.equal(null);
				for (let node: Element | null = host; node; node = node.parentElement)
					expect(node.hasAttribute('ngh')).to.equal(false);
			}
		});
		cy.window().then(
			(win) =>
				new Promise<void>((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()))),
		);
		let initial: number[];
		cy.get(`${root} [role=slider]`).then((es) => {
			initial = Array.from(es).map((e) => Number(e.getAttribute('aria-valuenow')));
		});

		centerNative(`${root} [data-slot=slider-range]`);
		cy.get(`${root} [data-slot=slider-range]`).then((es) => {
			const rect = es[0].getBoundingClientRect();
			cy.get(root).then((roots) => {
				const outer = roots[0].getBoundingClientRect();
				const x = rect.x + rect.width / 2 + 40 - outer.x;
				const y = rect.y + rect.height / 2 - outer.y;
				cy.get(`${root} [data-slot=slider-range]`).realMouseDown({ scrollBehavior: false });
				moveHeldMouse(root, x, y);
				cy.get(root).realMouseUp({ x, y, position: 'topLeft', scrollBehavior: false });
			});
		});
		cy.window().then(
			(win) =>
				new Promise<void>((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()))),
		);
		cy.get(`${root} [role=slider]`).then((es) => {
			const after = Array.from(es).map((e) => Number(e.getAttribute('aria-valuenow')));
			expect(after).not.to.deep.equal(initial);
			expect(after[1] - after[0]).to.equal(initial[1] - initial[0]);
			expect(after[0]).to.be.at.least(0);
			expect(after[1]).to.be.at.most(100);
		});
	});
});
