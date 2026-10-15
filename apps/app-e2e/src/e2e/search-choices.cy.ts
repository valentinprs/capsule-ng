import 'cypress-real-events';

// Angular reports these statistics after ApplicationRef.whenStable() and hydration cleanup.
function visitHydrated(url: string) {
	cy.visit(url, {
		onBeforeLoad(win) {
			const log = win.console.log;
			win.console.log = function (...args: unknown[]) {
				if (/^Angular hydrated [1-9]\d* component\(s\)/.test(args.map(String).join(' ')))
					win.document.documentElement.setAttribute('data-choices-hydrated', 'true');
				return log.apply(win.console, args);
			};
		},
	});
	cy.get('html', { timeout: 120000 }).should('have.attr', 'data-choices-hydrated', 'true');
	cy.document().should((doc) => expect(doc.hasFocus(), 'real document focus').to.equal(true));
}
function centerControl(selector: string) {
	cy.get(selector).then((elements) => elements[0].scrollIntoView({ block: 'center', inline: 'nearest' }));
}
function settleExamples(selectors: readonly string[]) {
	cy.document().then(async (doc) => {
		await doc.fonts.ready;
		const roots = selectors.flatMap((selector) => Array.from(doc.querySelectorAll(selector)));
		const start = performance.now();
		let stable = 0,
			previous = '';
		while (performance.now() - start < 15000) {
			await new Promise<void>((resolve) => doc.defaultView!.requestAnimationFrame(() => resolve()));
			const nodes = [
				...new Set(
					roots.flatMap((root) => {
						const ancestors: Element[] = [];
						for (let el: Element | null = root; el; el = el.parentElement) ancestors.push(el);
						return ancestors;
					}),
				),
			];
			const animations = [
				...new Set([
					...roots.flatMap((el) => el.getAnimations({ subtree: true })),
					...nodes.flatMap((el) => el.getAnimations()),
				]),
			].filter((a) => Number.isFinite(a.effect?.getComputedTiming().iterations));
			const running = animations.filter((a) => a.playState === 'running' || a.pending);
			const sample = JSON.stringify(
				roots.map((el) => {
					const r = el.getBoundingClientRect();
					return [r.x, r.y, r.width, r.height];
				}),
			);
			const ready =
				running.length === 0 && nodes.every((el) => Number(doc.defaultView!.getComputedStyle(el).opacity) === 1);
			stable = ready && sample === previous ? stable + 1 : 0;
			previous = sample;
			if (stable >= 4) return;
			await Promise.all(running.map((a) => a.finished.catch(() => undefined)));
		}
		throw Error('Catalogue finite animations/ancestors/opacity did not settle');
	});
}

const examples = {
	autocomplete: [
		'spartan-autocomplete-async-preview',
		'spartan-autocomplete-autohighlight-preview',
		'spartan-autocomplete-clear-preview',
		'spartan-autocomplete-countries',
		'spartan-autocomplete-disabled-preview',
		'spartan-autocomplete-form-preview',
		'spartan-autocomplete-group-separator-preview',
		'spartan-autocomplete-group-preview',
		'spartan-autocomplete-invalid-preview',
		'spartan-autocomplete-resolve-value-id',
		'spartan-autocomplete-rtl-preview',
		'spartan-autocomplete-search-autohighlight-preview',
		'spartan-autocomplete-search-form-preview',
		'spartan-autocomplete-search-preview',
		'spartan-autocomplete-preview',
	],
	combobox: [
		'spartan-combobox-async-multiple-preview',
		'spartan-combobox-async-preview',
		'spartan-combobox-autohighlight-preview',
		'spartan-combobox-clear-preview',
		'spartan-combobox-disabled-preview',
		'spartan-combobox-form-multiple-preview',
		'spartan-combobox-form-popover-preview',
		'spartan-combobox-form-preview',
		'spartan-combobox-group-separator-preview',
		'spartan-combobox-group-preview',
		'spartan-combobox-icon-addon-preview',
		'spartan-combobox-invalid-preview',
		'spartan-combobox-item-to-string-preview',
		'spartan-combobox-multiple-autohighlight-preview',
		'spartan-combobox-multiple-disabled-preview',
		'spartan-combobox-multiple-preview',
		'spartan-combobox-popup-custom-preview',
		'spartan-combobox-popup-preview',
		'spartan-combobox-rtl',
		'spartan-combobox-preview',
	],
} as const;

describe('Capsule search and selection catalogue', () => {
	for (const slug of ['autocomplete', 'combobox'] as const) {
		for (const theme of ['light', 'dark'])
			for (const width of [1280, 390]) {
				it(`${slug} hydrates all examples and is accessible in ${theme} at ${width}px`, () => {
					cy.viewport(width, 900);
					visitHydrated(`/components/${slug}`);
					for (const example of examples[slug]) cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
					cy.get('html').then((html) => {
						if (html.hasClass('dark') !== (theme === 'dark'))
							cy.window().then((win) => {
								const before = win.localStorage.getItem('darkMode');
								cy.contains('button', 'Toggle theme').click();
								cy.window().should((win) =>
									expect(win.localStorage.getItem('darkMode'), 'native theme mode transition').not.to.equal(before),
								);
								if (theme === 'dark' && (before === null || before === 'system')) {
									cy.get('html').should('not.have.class', 'dark');
									cy.contains('button', 'Toggle theme').click();
								}
							});
					});
					cy.get('html').should(theme === 'dark' ? 'have.class' : 'not.have.class', 'dark');
					settleExamples(examples[slug]);
					cy.injectAxe();
					// Audit every genuine preview after centering it and completing its native rendering.
					for (const example of examples[slug]) {
						centerControl(example);
						settleExamples([example]);
						cy.checkA11y({ include: [[example]] }, undefined, (violations) =>
							cy.task(
								'log',
								JSON.stringify(
									violations.map((v) => ({
										id: v.id,
										nodes: v.nodes.map((n) => ({ html: n.html, target: n.target, failureSummary: n.failureSummary })),
									})),
								),
							),
						);
					}
					cy.get(`${examples[slug][examples[slug].length - 1]} input[role=combobox]`).should('exist');
					const nominal = `${slug === 'autocomplete' ? 'spartan-autocomplete-preview' : 'spartan-combobox-preview'} input[role=combobox]`;
					centerControl(nominal);
					cy.get(nominal).type(slug === 'autocomplete' ? 'acc' : 'ang');
					cy.get('[role=listbox]').should('be.visible');
					cy.get('[role=option]:visible').first().find('button,input,a,select').should('not.exist');
					cy.get('[role=option]:visible').first().click();
					cy.get(
						`${slug === 'autocomplete' ? 'spartan-autocomplete-preview' : 'spartan-combobox-preview'} input[role=combobox]`,
					)
						.should('be.focused')
						.and('have.attr', 'aria-expanded', 'false');
				});
			}
	}
	it('retains typed search on Tab and selects with Enter in the autocomplete keyboard flow', () => {
		visitHydrated('/components/autocomplete');
		const input = 'spartan-autocomplete-preview input[role=combobox]';
		cy.get(input).type('Acc');
		cy.get(input).realPress('ArrowDown');
		cy.get(input).should('have.attr', 'aria-activedescendant');
		cy.get(input).realPress('Tab');
		cy.get(input).should('have.value', 'Acc').and('have.attr', 'aria-expanded', 'false');
		cy.get(input).focus();
		cy.get(input).realPress('ArrowDown');
		cy.get(input).realPress('Enter');
		cy.get(input).should('have.value', 'Accordion').and('be.focused');
	});
	it('labels popup form trigger, searches inside its dialog and returns focus after Escape', () => {
		visitHydrated('/components/combobox');
		const trigger = 'spartan-combobox-form-popover-preview button[role=combobox]';
		cy.get(trigger).should('be.visible');
		cy.document().then((doc) => {
			const targets: boolean[] = [];
			const nativeTrigger = doc.querySelector(trigger);
			doc.addEventListener('focusin', (event) => targets.push(event.target === nativeTrigger && doc.hasFocus()));
			cy.wrap(targets).as('labelFocusTargets');
		});
		centerControl(trigger);
		cy.get('spartan-combobox-form-popover-preview label').click();
		cy.get('@labelFocusTargets').should('include', true);
		cy.get(trigger).should('have.attr', 'aria-expanded', 'true');
		cy.get('[role=dialog] input[role=combobox]').should('be.focused');
		cy.get(trigger).click();
		cy.get(trigger).should('be.focused').and('have.attr', 'aria-expanded', 'false');
		cy.get(trigger).click();
		cy.get(trigger).should('have.attr', 'aria-expanded', 'true');
		cy.get('[role=dialog]').should('be.visible');
		cy.get('[role=dialog] input[role=combobox]').type('Ang');
		cy.contains('[role=option]', 'Angular').should('be.visible');
		cy.realPress('Escape');
		cy.get(trigger).should('be.focused').and('have.attr', 'aria-expanded', 'false');
	});
	it('selects/removes multiple values with native chips and keeps controls outside options', () => {
		visitHydrated('/components/combobox');
		const root = 'spartan-combobox-multiple-preview';
		centerControl(`${root} input[role=combobox]`);
		cy.get(`${root} input[role=combobox]`).type('Ast');
		cy.contains('[role=option]', 'Astro').click();
		cy.get(root).should('contain.text', 'Astro');
		cy.get(`${root} button[aria-label="Remove Astro"]`).click();
		cy.get(root).should('not.contain.text', 'Astro');
		cy.get(`${root} input[role=combobox]`).focus();
		cy.get(`${root} input[role=combobox]`).realPress('Backspace');
		cy.get(`${root} caps-combobox-chip`).should('not.exist');
	});
	it('stores a country code while displaying its label in the Signal Forms custom control and resets', () => {
		visitHydrated('/forms/signal-forms');
		const root = 'spartan-signal-form-country-picker-demo';
		cy.get(root, { timeout: 120000 }).should('not.have.attr', 'ngh');
		cy.window().then((win) => cy.spy(win.console, 'log').as('submittedCountry'));
		centerControl(`${root} input[role=combobox]`);
		cy.get(`${root} label`).contains('Country').click();
		cy.get(`${root} input[role=combobox]`).should('be.focused').type('Alban');
		cy.contains('[role=option]', 'Albania').click();
		cy.get(`${root} input[role=combobox]`).should('have.value', '🇦🇱 Albania');
		cy.contains(`${root} button`, 'Submit').click();
		cy.get('@submittedCountry').should((spy) => {
			const submitted = (spy as unknown as { lastCall: { args: unknown[] } }).lastCall.args;
			expect(submitted[0]).to.equal('You submitted the following values:');
			expect(JSON.parse(String(submitted[1]))).to.deep.equal({ country: 'al' });
		});
		cy.get(`${root} input[role=combobox]`).focus();
		cy.get(`${root} input[role=combobox]`).realPress('ArrowDown');
		cy.contains('[role=option]', 'Albania').should('have.attr', 'aria-selected', 'true');
		cy.realPress('Escape');
		cy.contains(`${root} button`, 'Reset').click();
		cy.get(`${root} input[role=combobox]`).should('have.value', '');
	});
});
