describe('context-menu', () => {
	// we are using the angular cdk so we are just doing some sanity testing that all directives
	// were ported over correctly
	describe('default', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=context-menu--default');
			cy.injectAxe();
			cy.viewport(1000, 1000);
		});

		it('right click on area should open, hover over sub menu should open submenu, and click on open button again should close', () => {
			cy.checkA11y('#storybook-root', {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
				},
			});

			// A synthetic contextmenu event rather than realClick: with a real right-click, the submenu
			// opens under the pointer and the button release lands on its overlay, which CDK treats as an
			// outside click and closes both menus. The data-slot selector waits for the trigger directive.
			cy.get('[data-slot="context-menu-trigger"]').should('contain.text', 'Right click here');
			cy.get('[data-slot="context-menu-trigger"]').trigger('contextmenu', { button: 2 });
			cy.findAllByRole('menu').should('have.length', 1);
			// Hover only once the open animation is done, or realHover aims at a still-scaling item.
			cy.findByRole('menu').should(($menu) => expect($menu[0].getAnimations()).to.have.length(0));
			cy.findByText(/more tools/i).realHover();
			cy.findAllByRole('menu').should('have.length', 2);
			cy.findByText(/more/i).realHover();
			cy.findByText(/save page as/i).realClick();
		});
	});
});
