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
	nativeTheme(theme);
	settled('spartan-data-table-preview');
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
function visitRecipe() {
	cy.visit('/components/data-table', {
		onBeforeLoad(win) {
			const original = win.console.log;
			win.console.log = function (...args: unknown[]) {
				const message = args.map(String).join(' ');
				if (/^Angular hydrated [1-9]\d* component\(s\)/.test(message))
					Object.assign(win, { __dataTableHydrationReceipt: message });
				return original.apply(win.console, args);
			};
		},
	});
	cy.window()
		.its('__dataTableHydrationReceipt')
		.should('match', /^Angular hydrated [1-9]\d* component/);
	cy.window().its('ngDevMode.hydratedComponents').should('be.greaterThan', 0);
	settled('spartan-data-table-preview');
}
function nativeTheme(theme: 'light' | 'dark', remaining = 3) {
	cy.document().then((doc) => {
		if (
			doc.defaultView!.localStorage.getItem('darkMode') === theme &&
			doc.documentElement.classList.contains('dark') === (theme === 'dark')
		)
			return;
		expect(remaining, 'native theme cycle bound').to.be.greaterThan(0);
		cy.contains('button', 'Toggle theme').realClick({ scrollBehavior: 'center' });
		nativeTheme(theme, remaining - 1);
	});
}
describe('Capsule Data Table recipes', () => {
	const recipe = 'spartan-data-table-preview';
	const test = (name: string, body: Mocha.Func) => {
		if (!Cypress.env('casePattern') || new RegExp(Cypress.env('casePattern')).test(name)) it(name, body);
	};
	const state = (stage: string) => {
		cy.get(recipe)
			.then((elements) => {
				const root = elements[0],
					doc = root.ownerDocument;
				return {
					stage,
					checkbox: root.querySelector('[data-row-id="m5gr84i9"] [role=checkbox]')?.getAttribute('aria-checked'),
					summary: root.querySelector('[role=status]')?.textContent,
					focus: doc.activeElement?.outerHTML,
					events: [],
				};
			})
			.then((proof) => cy.writeFile(`work/qa/data-table-selection-${stage}.json`, proof));
	};
	test('server-renders native headers and hydrates the stable payment rows', () => {
		cy.request('/components/data-table').then(({ body }) => {
			const html = Cypress.$(body);
			expect(html.find(`${recipe} table[aria-label="Recent payments"] thead th[scope="col"]`).length).to.equal(5);
			expect(html.find(`${recipe} tbody tr[data-row-id="m5gr84i9"]`).length).to.equal(1);
			expect(html.find(`${recipe} tbody tr`).length).to.equal(5);
		});
		visitRecipe();
		cy.get(recipe).should('not.have.attr', 'ngh');
		cy.get(`${recipe} button`).contains('Previous').should('be.disabled');
		cy.get(`${recipe} button`).contains('Next').should('be.disabled');
		cy.get(`${recipe} table`)
			.children()
			.then((children) =>
				expect([...children].map((node) => node.tagName)).to.deep.equal(['CAPTION', 'THEAD', 'TBODY']),
			);
	});
	test('keeps selection after keyboard sorting and filtering, and spans visible columns in an empty state', () => {
		visitRecipe();
		cy.get(recipe).should('not.have.attr', 'ngh');
		cy.get(`${recipe} tr[data-row-id="m5gr84i9"] [role="checkbox"]`).then((elements) => {
			const element = elements[0];
			element.scrollIntoView({ block: 'center', behavior: 'instant' });
			const r = element.getBoundingClientRect(),
				hit = element.ownerDocument.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
			cy.writeFile('work/qa/data-table-selection-click-target.json', {
				target: hit?.outerHTML,
				control: element.outerHTML,
				focus: element.ownerDocument.activeElement?.outerHTML,
			});
		});
		cy.get(`${recipe} tr[data-row-id="m5gr84i9"] [role="checkbox"]`).realClick({ scrollBehavior: 'center' });
		state('after-click');
		cy.get(`${recipe} tr[data-row-id="m5gr84i9"] [role="checkbox"]`).should('have.attr', 'aria-checked', 'true');
		cy.get(`${recipe} thead button[capsButton]`).focus();
		cy.realPress('Enter');
		cy.get(`${recipe} th[aria-sort="ascending"]`).should('have.attr', 'scope', 'col');
		state('before-space');
		cy.get(`${recipe} thead button[capsButton]`).focus();
		cy.realPress('Space');
		state('after-space');
		cy.get(`${recipe} th[aria-sort="descending"]`).should('have.attr', 'scope', 'col');
		cy.get(`${recipe} input[aria-label="Filter emails"]`).type('Abe');
		state('after-filter');
		cy.get(`${recipe} [role="status"]`).should('contain.text', '1 of 5 row(s) selected; 1 results');
		cy.get(`${recipe} tbody tr`).should('have.length', 1).and('have.attr', 'data-row-id', '3u1reuv4');
		cy.get(`${recipe} button`).contains('Columns').realClick({ scrollBehavior: 'center' });
		cy.get('caps-menu [role="menuitemcheckbox"]').should('have.length', 3);
		cy.get('caps-menu').find('input,button button,[role="checkbox"]').should('not.exist');
		cy.get('caps-menu button').contains('status').realClick({ scrollBehavior: 'center' });
		cy.realPress('Escape');
		cy.get(`${recipe} input`).clear();
		cy.get(`${recipe} input`).type('no-match-xyz');
		cy.get(`${recipe} tbody td`).should('have.attr', 'colspan', '4').and('contain.text', 'No results.');
		cy.get(`${recipe} thead [role="checkbox"]`).should('be.disabled');
		cy.get(`${recipe} input`).clear();
		cy.get(`${recipe} [data-row-id="m5gr84i9"]`)
			.should('have.attr', 'data-state', 'selected')
			.and('contain.text', '$316.00');
	});
	test('copies the named row ID and restores action-menu focus on Escape', () => {
		visitRecipe();
		cy.get(recipe).should('not.have.attr', 'ngh');
		cy.window().then((win) => cy.stub(win.navigator.clipboard, 'writeText').resolves().as('copy'));
		cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).focus();
		cy.realPress('Enter');
		cy.get('caps-menu button').contains('Copy payment ID').realClick({ scrollBehavior: 'center' });
		cy.get('@copy').should('have.been.calledOnceWithExactly', 'm5gr84i9');
		cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`).focus();
		cy.realPress('Enter');
		cy.realPress('Escape');
		cy.get(`${recipe} [data-row-id="m5gr84i9"] button[aria-haspopup="menu"]`)
			.should('be.focused')
			.and('contain.text', 'm5gr84i9');
	});
	for (const width of [390, 1280])
		for (const theme of ['light', 'dark'] as const) {
			test(`audits LTR and translated RTL at ${width}px in ${theme}`, () => {
				cy.viewport(width, 900);
				visitRecipe();
				cy.get(recipe).should('not.have.attr', 'ngh');
				cy.get('spartan-data-table-rtl').should('not.have.attr', 'ngh');
				cy.get('spartan-data-table-rtl').should('have.attr', 'dir', 'rtl');
				themeAndFonts(theme, `catalogue-${width}-${theme}`);
				cy.injectAxe({ axeCorePath: Cypress.env('axeCorePath') });
				for (const host of [recipe, 'spartan-data-table-rtl']) {
					cy.checkA11y(host);
					cy.get(host).find('button button,button a,a button,a a,input[hlmInput]').should('not.exist');
					cy.get(host).scrollIntoView();
					settled(host);
					cy.screenshot(`data-table-${host}-${width}-${theme}`, { capture: 'viewport' });
				}
				cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.be.at.most(width));
			});
		}
});
