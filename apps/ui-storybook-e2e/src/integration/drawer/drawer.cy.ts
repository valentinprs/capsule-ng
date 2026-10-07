describe('drawer--default', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=drawer--default');
		cy.injectAxe();
	});
	it('keeps native trigger, dialog labels, focus trap and keyboard dismissal', () => {
		cy.findByRole('button', { name: 'Open Drawer' }).focus();
		cy.realPress('Enter');
		cy.findByRole('dialog', { name: 'Edit profile' }).should('have.attr', 'aria-modal', 'true');
		cy.findByRole('dialog').should('have.attr', 'aria-describedby');
		cy.findByRole('dialog').within(() => {
			cy.findByRole('textbox', { name: 'Name' }).should('exist');
		});
		cy.checkA11y('[role="dialog"]');
		cy.realPress(['Shift', 'Tab']);
		cy.focused().closest('[role="dialog"]').should('exist');
		cy.realPress('Escape');
		cy.findByRole('dialog').should('not.exist');
		cy.findByRole('button', { name: 'Open Drawer' }).should('have.focus');
	});
	it('closes with its native close action and outside backdrop', () => {
		cy.findByRole('button', { name: 'Open Drawer' }).click();
		cy.findByRole('button', { name: 'Cancel' }).click();
		cy.findByRole('dialog').should('not.exist');
		cy.findByRole('button', { name: 'Open Drawer' }).should('have.focus').click();
		cy.get('.cdk-overlay-backdrop').click({ force: true });
		cy.findByRole('dialog').should('not.exist');
		cy.findByRole('button', { name: 'Open Drawer' }).should('have.focus');
	});
});
