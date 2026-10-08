import 'cypress-real-events';

function settled(selector: string) {
	cy.get(selector).then(async (elements) => {
		const element = elements[0],
			doc = element.ownerDocument,
			view = doc.defaultView!;
		await doc.fonts.ready;
		let previous = '',
			stable = 0;
		const start = view.performance.now();
		while (view.performance.now() - start < 15000) {
			await new Promise<void>((resolve) => view.requestAnimationFrame(() => resolve()));
			const ancestors: Element[] = [];
			for (let node: Element | null = element; node; node = node.parentElement) ancestors.push(node);
			const finite = [
				...new Set([...element.getAnimations({ subtree: true }), ...ancestors.flatMap((node) => node.getAnimations())]),
			].filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().iterations));
			const rect = element.getBoundingClientRect();
			const sample = JSON.stringify({
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height,
				opacity: ancestors.map((node) => view.getComputedStyle(node).opacity),
				running: finite.some((animation) => animation.playState === 'running' || animation.playState === 'pending'),
			});
			stable =
				sample === previous &&
				!finite.some((animation) => animation.playState === 'running' || animation.playState === 'pending')
					? stable + 1
					: 0;
			previous = sample;
			if (stable >= 4) return;
		}
		throw Error('Data Table control/ancestor geometry did not settle: ' + previous);
	});
}
function themeAndFonts(theme: 'light' | 'dark', proof: string) {
	cy.document().should((doc) => {
		expect(doc.documentElement.classList.contains(theme)).to.equal(true);
		expect(doc.documentElement.classList.contains(theme === 'light' ? 'dark' : 'light')).to.equal(false);
	});
	settled('caps-data-table-recipe');
	cy.document()
		.then(async (doc) => {
			await Promise.all([doc.fonts.load('400 14px Inter'), doc.fonts.load('600 14px Inter')]);
			await doc.fonts.ready;
			expect(doc.fonts.check('400 14px Inter')).to.equal(true);
			const faces: { family: string; weight: string; status: string }[] = [];
			doc.fonts.forEach((face) => {
				if (face.family.replaceAll('"', '').includes('Inter') && face.status === 'loaded')
					faces.push({ family: face.family, weight: face.weight, status: face.status });
			});
			expect(faces.length).to.be.greaterThan(0);
			const style = doc.defaultView!.getComputedStyle(doc.body);
			return {
				theme,
				html: doc.documentElement.className,
				color: style.color,
				background: style.backgroundColor,
				backgroundToken: doc.defaultView!.getComputedStyle(doc.documentElement).getPropertyValue('--background'),
				fontFamily: style.fontFamily,
				loadedFaces: faces,
			};
		})
		.then((result) => cy.writeFile(`work/qa/${proof}.json`, result));
}
function rtlMenuKeyboard() {
	settled('caps-menu[role=menu]');
	cy.get('caps-menu[role=menu]').should('have.attr', 'dir', 'rtl');
	cy.get('caps-menu[role=menu]').should('have.css', 'direction', 'rtl');
	cy.get('caps-menu[role=menu]').closest('.cdk-overlay-pane').parent().should('have.attr', 'dir', 'rtl');
	cy.realPress('Home');
	cy.get('caps-menu[role=menu] button').eq(0).should('be.focused');
	cy.realPress('ArrowDown');
	cy.get('caps-menu[role=menu] button').eq(1).should('be.focused');
	cy.realPress('ArrowUp');
	cy.get('caps-menu[role=menu] button').eq(0).should('be.focused');
	cy.realPress('Escape');
}
describe('Capsule Data Table standalone stories', () => {
	const recipe = 'caps-data-table-recipe';
	const test = (name: string, body: () => void) => {
		if (!Cypress.env('casePattern') || new RegExp(Cypress.env('casePattern')).test(name)) it(name, body);
	};
	test('maps numbered pages and preserves selection across page, sort and filter changes', () => {
		cy.visit('/iframe.html?id=data-table--default');
		cy.get(`${recipe} tbody tr`).should('have.length', 2);
		cy.get('button[capsPaginationPrevious]').should('be.disabled');
		cy.get(`${recipe} [data-row-id="m5gr84i9"] [role="checkbox"]`).realClick({ scrollBehavior: 'center' });
		cy.get(`${recipe} thead [role="checkbox"]`)
			.should('have.attr', 'aria-checked', 'mixed')
			.realClick({ scrollBehavior: 'center' });
		cy.get(`${recipe} thead [role="checkbox"]`).should('have.attr', 'aria-checked', 'true');
		cy.get('button[capsPaginationNext]').focus();
		cy.realPress('Enter');
		cy.get('[aria-current="page"]').should('contain.text', '2');
		cy.get(`${recipe} thead [role="checkbox"]`)
			.should('have.attr', 'aria-checked', 'false')
			.realClick({ scrollBehavior: 'center' });
		cy.get(`${recipe} [role="status"]`).should('contain.text', '4 of 5');
		cy.get('button[capsPaginationNext]').realClick({ scrollBehavior: 'center' });
		cy.get('[aria-current="page"]').should('contain.text', '3');
		cy.get('button[capsPaginationNext]').should('be.disabled');
		cy.get(`${recipe} thead button[capsButton]`).realClick({ scrollBehavior: 'center' });
		cy.get(`${recipe} input`).type('ken99');
		cy.get('[aria-current="page"]').should('contain.text', '1');
		cy.get(`${recipe} [data-row-id="m5gr84i9"] [role="checkbox"]`).should('have.attr', 'aria-checked', 'true');
		cy.get(`${recipe} [role="status"]`).should('contain.text', '4 of 5 row(s) selected; 1 results');
		cy.get(`${recipe} input`).clear();
		cy.get('caps-numbered-pagination caps-select button').realClick({ scrollBehavior: 'center' });
		cy.get('caps-select-option').contains(/^5/).realClick({ scrollBehavior: 'center' });
		cy.get(`${recipe} tbody tr`).should('have.length', 5);
		cy.get('[aria-current="page"]').should('contain.text', '1');
		cy.get('button[capsPaginationNext]').should('be.disabled');
		cy.get(`${recipe} tr[data-state="selected"]`).should('have.length', 4);
	});
	test('exposes only hideable menu columns and keeps action focus and the copied row ID', () => {
		cy.visit('/iframe.html?id=data-table--default');
		cy.get(`${recipe} tbody tr`).should('have.length', 2);
		cy.window().then((win) => cy.stub(win.navigator.clipboard, 'writeText').resolves().as('copy'));
		cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).focus();
		cy.realPress('Enter');
		cy.get('caps-menu button').contains('Copy payment ID').realClick({ scrollBehavior: 'center' });
		cy.get('@copy').should('have.been.calledOnceWithExactly', 'm5gr84i9');
		cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).focus();
		cy.realPress('Enter');
		cy.realPress('Escape');
		cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).should('be.focused');
		cy.get(`${recipe} button`).contains('Columns').realClick({ scrollBehavior: 'center' });
		cy.get('caps-menu [role="menuitemcheckbox"]').should('have.length', 3);
		cy.get('caps-menu').find('input,[role="checkbox"],button button').should('not.exist');
		settled('caps-menu[role=menu]');
		cy.get('caps-menu [role=menuitemcheckbox]').contains('status').should('have.attr', 'aria-checked', 'true');
		cy.get('caps-menu [role=menuitemcheckbox]').contains('status').realClick({ scrollBehavior: 'center' });
		cy.get('caps-menu [role=menuitemcheckbox]').contains('status').should('have.attr', 'aria-checked', 'false');
		cy.realPress('Escape');
		cy.get(`${recipe} input`).type('no-match-xyz');
		cy.get(`${recipe} tbody td`).should('have.attr', 'colspan', '4');
		cy.get(`${recipe} thead [role="checkbox"]`).should('be.disabled');
	});
	for (const direction of ['default', 'rtl'])
		for (const width of [390, 1280])
			for (const theme of ['light', 'dark'] as const) {
				test(`audits ${direction} at ${width}px in ${theme}`, () => {
					cy.viewport(width, 900);
					cy.visit(`/iframe.html?id=data-table--${direction}&globals=theme:${theme}`);
					cy.get(`${recipe} tbody tr`).should('have.length', 2);
					cy.get(recipe).should('have.attr', 'dir', direction === 'rtl' ? 'rtl' : 'ltr');
					themeAndFonts(theme, `storybook-${direction}-${width}-${theme}`);
					if (direction === 'rtl') {
						cy.get(`${recipe} button`).contains('Columns').realClick({ scrollBehavior: 'center' });
						rtlMenuKeyboard();
						cy.get(`${recipe} button`).contains('Columns').should('be.focused');
						cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).realClick({
							scrollBehavior: 'center',
						});
						rtlMenuKeyboard();
						cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).should('be.focused');
					}
					cy.injectAxe({ axeCorePath: Cypress.env('axeCorePath') });
					cy.checkA11y('#storybook-root');
					cy.get('#storybook-root').find('button button,button a,a button,a a').should('not.exist');
					cy.get(recipe).screenshot(`data-table-${direction}-${width}-${theme}`);
					cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.be.at.most(width));
				});
			}
});
