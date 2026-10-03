describe('alert-dialog', () => {
	describe('default', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=alert-dialog--default');
			cy.injectAxe();
		});

		it('keeps mobile gutters at 320px', () => {
			cy.viewport(320, 844);
			cy.findByRole('button', { name: 'Delete Account' }).click();
			cy.get('caps-dialog-panel').then(($panel) =>
				cy.wrap(Promise.all($panel[0].getAnimations().map((animation) => animation.finished))),
			);
			cy.get('caps-dialog-panel').then(($panel) => {
				const rect = $panel[0].getBoundingClientRect();
				expect(rect.left).to.be.at.least(15);
				expect(rect.right).to.be.at.most(305);
			});
		});

		it('click on trigger should open, click on close should close, click outside should keep it open', () => {
			cy.checkA11y('#storybook-root', {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
				},
			});

			cy.findByText(/delete account/i).should('have.attr', 'aria-haspopup', 'dialog');
			cy.findByText(/delete account/i).click();

			cy.findAllByText(/are you absolutely sure/i).should('have.length', 1);
			cy.findByRole('alertdialog');
			cy.get('caps-dialog-panel').then(($panel) =>
				cy.wrap(Promise.all($panel[0].getAnimations({ subtree: true }).map((animation) => animation.finished))),
			);
			cy.checkA11y('.cdk-overlay-container', { rules: { region: { enabled: false } } });
			cy.findByRole('alertdialog').should('have.attr', 'aria-labelledby', 'brn-dialog-title-1');
			cy.findByRole('alertdialog').should('have.attr', 'aria-labelledby', 'brn-dialog-title-1');
			cy.findByRole('alertdialog').should('have.attr', 'aria-modal', 'true');
			cy.findByRole('alertdialog').should('have.attr', 'tabindex', '-1');

			cy.findByRole('alertdialog')
				.findByText(/cancel/i)
				.click();
			cy.findAllByText(/delete account/i).should('have.length', 1);
			cy.findAllByText(/delete account/i).should('have.focus');
			cy.findByText(/delete account/i).click();

			// click outside of dialog
			cy.get('.cdk-overlay-backdrop').click({ force: true });
			cy.findAllByText(/delete account/i).should('have.length', 2);
			cy.findAllByText(/delete account/i).should('not.have.focus');

			// click cancel button
			cy.findByText(/cancel/i).click();
			cy.findAllByText(/delete account/i).should('have.length', 1);
			cy.findAllByText(/delete account/i).should('have.focus');
		});

		it('tab and enter on trigger should open, enter on cancel should close, escape should close', () => {
			cy.checkA11y('#storybook-root', {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
				},
			});

			cy.findByText(/delete account/i).should('have.attr', 'aria-haspopup', 'dialog');
			cy.realPress('Tab');
			cy.realPress('Enter');

			cy.findAllByText(/are you absolutely sure/i).should('have.length', 1);
			cy.findByRole('alertdialog');
			cy.get('caps-dialog-panel').then(($panel) =>
				cy.wrap(Promise.all($panel[0].getAnimations({ subtree: true }).map((animation) => animation.finished))),
			);
			cy.checkA11y('.cdk-overlay-container', { rules: { region: { enabled: false } } });
			cy.findByRole('alertdialog').should('have.attr', 'aria-labelledby', 'brn-dialog-title-1');
			cy.findByRole('alertdialog').should('have.attr', 'aria-labelledby', 'brn-dialog-title-1');
			cy.findByRole('alertdialog').should('have.attr', 'aria-modal', 'true');
			cy.findByRole('alertdialog').should('have.attr', 'tabindex', '-1');

			cy.realPress('Enter');
			cy.findAllByText(/delete account/i).should('have.length', 1);
			cy.findAllByText(/delete account/i).should('have.focus');
			cy.realPress('Enter');

			// Escape dismisses the alert and restores the trigger; outside clicks remain blocked.
			cy.realPress('Escape');
			cy.findAllByText(/delete account/i).should('have.length', 1);
			cy.findAllByText(/delete account/i).should('have.focus');
		});

		it('tab and space on trigger should open, tabs should wrap, space on cancel should close', () => {
			cy.checkA11y('#storybook-root', {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
				},
			});

			cy.findByText(/delete account/i).should('have.attr', 'aria-haspopup', 'dialog');
			cy.realPress('Tab');
			cy.realPress('Space');

			cy.findAllByText(/are you absolutely sure/i).should('have.length', 1);
			cy.findByRole('alertdialog');
			cy.get('caps-dialog-panel').then(($panel) =>
				cy.wrap(Promise.all($panel[0].getAnimations({ subtree: true }).map((animation) => animation.finished))),
			);
			cy.checkA11y('.cdk-overlay-container', { rules: { region: { enabled: false } } });
			cy.findByRole('alertdialog').should('have.attr', 'aria-labelledby', 'brn-dialog-title-1');
			cy.findByRole('alertdialog').should('have.attr', 'aria-labelledby', 'brn-dialog-title-1');
			cy.findByRole('alertdialog').should('have.attr', 'aria-modal', 'true');
			cy.findByRole('alertdialog').should('have.attr', 'tabindex', '-1');

			cy.realPress('Space');
			cy.findAllByText(/delete account/i).should('have.length', 1);
			cy.findAllByText(/delete account/i).should('have.focus');
			cy.realPress('Space');

			// Escape dismisses the alert and restores the trigger; outside clicks remain blocked.
			cy.realPress('Escape');
			cy.findAllByText(/delete account/i).should('have.length', 1);
			cy.findAllByText(/delete account/i).should('have.focus');
		});
	});
});
