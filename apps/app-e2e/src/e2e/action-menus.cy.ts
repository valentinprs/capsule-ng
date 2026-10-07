import 'cypress-real-events';

describe('Capsule native action menus', () => {
	for (const family of ['dropdown-menu', 'context-menu', 'menubar']) {
		it(`server-renders and hydrates ${family} examples`, () => {
			cy.request(`/components/${family}`).then(({ body }) => {
				const html = Cypress.$(body);
				expect(
					html.find(
						family === 'menubar'
							? 'caps-menubar'
							: family === 'dropdown-menu'
								? 'spartan-dropdown-preview button[aria-haspopup="menu"]'
								: '[data-slot="context-menu-trigger"]',
					).length,
				).to.be.greaterThan(0);
			});
			cy.visit(`/components/${family}`);
			cy.get(family === 'dropdown-menu' ? 'spartan-dropdown-preview' : `spartan-${family}-preview`).should(
				'not.have.attr',
				'ngh',
			);
			cy.get(`spartan-${family}`)
				.find('hlm-menu,hlm-dropdown-menu,hlm-context-menu,hlm-menubar,[hlmMenuItem]')
				.should('not.exist');
			cy.get(`spartan-${family}`).find('button button,button a,a button,a a').should('not.exist');
		});
	}
	it('opens the hydrated dropdown with native keyboard commands and restores focus', () => {
		cy.visit('/components/dropdown-menu');
		cy.get('spartan-dropdown-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-dropdown-preview button').first().focus();
		cy.realPress('ArrowDown');
		cy.get('caps-menu').should('be.visible');
		cy.focused().should('have.attr', 'role', 'menuitem');
		cy.get('caps-menu button').each((button) => cy.wrap(button).should('have.attr', 'type', 'button'));
		cy.get('caps-menu').find('input,button button,button a,a button').should('not.exist');
		cy.injectAxe();
		cy.checkA11y('caps-menu');
		cy.realPress('Escape');
		cy.get('caps-menu').should('not.exist');
		cy.get('spartan-dropdown-preview button').first().should('be.focused');
	});
	it('opens the context surface through Shift+F10 and returns focus', () => {
		cy.visit('/components/context-menu');
		cy.get('spartan-context-menu-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-context-menu-preview [data-slot="context-menu-trigger"]').focus();
		cy.realPress(['Shift', 'F10']);
		cy.get('caps-menu').should('be.visible');
		cy.focused().should('have.attr', 'role', 'menuitem');
		cy.realPress('Escape');
		cy.get('spartan-context-menu-preview [data-slot="context-menu-trigger"]').should('be.focused');
	});
	it('closes a mobile Sidebar menu with Escape while preserving its parent Sheet and focus', () => {
		cy.viewport(390, 900);
		cy.visit('/sidebar-preview/sidebar-dropdown-menu');
		cy.get('hlm-sidebar').should('not.have.attr', 'ngh');
		cy.realPress(['Control', 'b']);
		cy.get('button[aria-haspopup="menu"]').first().click();
		cy.get('caps-menu').should('be.visible');
		cy.realPress('Escape');
		cy.get('caps-menu').should('not.exist');
		cy.get('hlm-sheet-content').should('be.visible');
		cy.get('button[aria-haspopup="menu"]').first().should('be.focused');
	});
});
