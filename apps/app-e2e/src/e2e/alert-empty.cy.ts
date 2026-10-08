import 'cypress-real-events';

// Exercise ThemeService through the existing native control; preserve system→light→dark.
function nativeTheme(theme: string) {
	cy.window().then((win) => {
		if (win.document.documentElement.classList.contains('dark') === (theme === 'dark')) return;
		const before = win.localStorage.getItem('darkMode');
		cy.contains('spartan-dark-mode button', 'Toggle theme').click();
		cy.window()
			.should((next) => expect(next.localStorage.getItem('darkMode')).not.to.equal(before))
			.then((next) => {
				const first = next.localStorage.getItem('darkMode');
				if (theme === 'dark' && (before === null || before === 'system') && first === 'light')
					cy.contains('spartan-dark-mode button', 'Toggle theme').click();
			});
	});
	cy.get('html').should(theme === 'dark' ? 'have.class' : 'not.have.class', 'dark');
}

const examples = {
	alert: [
		'spartan-alert-preview',
		'spartan-alert-action',
		'spartan-alert-destructive',
		'spartan-alert-custom-colors',
		'spartan-alert-rtl-preview',
	],
	empty: [
		'spartan-empty-preview',
		'spartan-empty-outline',
		'spartan-empty-background',
		'spartan-empty-avatar',
		'spartan-empty-avatar-group',
		'spartan-empty-input-group',
		'spartan-empty-rtl',
	],
};

const familyScope = Cypress.env('lot14Family') as string | undefined;

describe('Capsule Alert and Empty', () => {
	for (const family of ['alert', 'empty'] as const) {
		if (familyScope && familyScope !== family) continue;
		it(`server-renders and hydrates ${family} with direct public anatomy`, () => {
			cy.request(`/components/${family}`).then(({ body }) => {
				expect(Cypress.$(body).find(`caps-${family}`).length).to.be.greaterThan(0);
				expect(body).to.contain('ngh=');
			});
			cy.visit(`/components/${family}`);
			for (const example of examples[family]) cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.get('main').find('hlm-alert,hlm-empty,[hlmAlert],[hlmEmpty]').should('not.exist');
			cy.get('main').find('button button,button a,a button,a a,label label').should('not.exist');
			if (family === 'alert') {
				cy.get('spartan-alert-preview caps-alert').should('have.attr', 'role', 'alert');
			} else {
				cy.get('spartan-empty-preview caps-empty').should('not.have.attr', 'role');
			}
			cy.get(`spartan-${family}-preview caps-${family}`).should('not.have.attr', 'aria-live');
		});
		for (const theme of ['light', 'dark'])
			for (const width of [390, 1280]) {
				it(`keeps all ${family} examples accessible at ${width}px in ${theme}`, () => {
					cy.viewport(width, 900);
					cy.visit(`/components/${family}`);
					for (const example of examples[family]) cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
					nativeTheme(theme);
					cy.document().then(async (document) => {
						await document.fonts.ready;
						await Promise.all(
							document
								.getAnimations()
								.filter(
									(a) => a.timeline instanceof DocumentTimeline && Number.isFinite(a.effect?.getTiming().iterations),
								)
								.map((a) => a.finished.catch(() => undefined)),
						);
					});
					cy.injectAxe();
					cy.checkA11y({ include: examples[family].map((example) => [example]) });
					cy.get(`caps-${family}`)
						.filter(':visible')
						.each((el) => {
							const root = el[0];
							expect(root.scrollWidth).to.be.at.most(root.clientWidth + 1);
						});
				});
			}
	}
	if (!familyScope || familyScope === 'alert')
		it('inserts an urgent error after native keyboard activation and retries without moving focus', () => {
			cy.visit('/components/alert');
			cy.get('spartan-alert-destructive').should('not.have.attr', 'ngh');
			cy.get('spartan-alert-destructive [role=alert]').should('not.exist');
			cy.contains('spartan-alert-destructive button', 'Simulate payment failure').focus();
			cy.realPress('Enter');
			cy.get('spartan-alert-destructive [role=alert]').should('contain.text', 'Payment failed');
			cy.contains('spartan-alert-destructive button', 'Simulate payment failure').should('be.focused');
			cy.realPress('Tab');
			cy.contains('spartan-alert-destructive button', 'Try again').should('be.focused');
			cy.realPress('Space');
			cy.get('spartan-alert-destructive [role=alert]').should('not.exist');
		});
	if (!familyScope || familyScope === 'empty')
		it('activates native Empty actions and retains the names and value of rich input content', () => {
			cy.visit('/components/empty');
			cy.get('spartan-empty-preview').should('not.have.attr', 'ngh');
			cy.contains('spartan-empty-preview button', 'Create Project').focus();
			cy.realPress('Enter');
			cy.get('spartan-empty-preview [role=status]').should('have.text', 'Project created in this demo');
			cy.realPress('Tab');
			cy.contains('spartan-empty-preview button', 'Import Project').should('be.focused');
			cy.realPress('Space');
			cy.get('spartan-empty-preview [role=status]').should('have.text', 'Import selected in this demo');
			cy.get('spartan-empty-input-group input[aria-label="Try searching for pages"]').type('Capsule');
			cy.get('spartan-empty-input-group input').should('have.value', 'Capsule');
		});
	if (!familyScope || familyScope === 'spinner')
		it('retains decorative Spinner semantics in its Empty composition', () => {
			cy.visit('/components/spinner');
			cy.get('spartan-spinner-empty-preview').should('not.have.attr', 'ngh');
			cy.get('spartan-spinner-empty-preview caps-empty').should('not.have.attr', 'role');
			cy.get('spartan-spinner-empty-preview caps-spinner').should('have.attr', 'aria-hidden', 'true');
			cy.get('spartan-spinner-empty-preview caps-spinner').should('not.have.attr', 'role');
			cy.get('spartan-spinner-empty-preview caps-spinner').should('not.have.attr', 'aria-label');
			cy.get('spartan-spinner-empty-preview caps-spinner svg').should('be.visible');
			cy.contains('spartan-spinner-empty-preview button', 'Cancel').focus();
			cy.contains('spartan-spinner-empty-preview button', 'Cancel')
				.should('be.focused')
				.and('have.attr', 'type', 'button');
		});
});
