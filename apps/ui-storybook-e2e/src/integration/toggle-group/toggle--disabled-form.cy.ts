describe('ToggleGroup reactive disabled state', () => {
	beforeEach(() => cy.visit('/iframe.html?id=toggle-group--disabled-form'));
	it('blocks disabled native buttons and preserves individually disabled choices after enable', () => {
		cy.contains('button', 'Disable group').click();
		cy.get('caps-toggle-group button').each((button) => cy.wrap(button).should('be.disabled'));
		cy.get('[data-testid=choice]').should('have.text', 'bold');
		cy.contains('button', 'Enable group').click();
		cy.get('caps-toggle-group button').eq(1).should('be.disabled');
		cy.get('caps-toggle-group button').eq(2).should('not.be.disabled').focus();
		cy.realPress('Enter');
		cy.get('[data-testid=choice]').should('have.text', 'underline');
		cy.get('caps-toggle-group button').eq(2).should('have.attr', 'aria-pressed', 'true');
		cy.contains('button', 'Disable group').click();
		cy.get('caps-toggle-group button').eq(2).should('be.disabled');
		cy.get('[data-testid=choice]').should('have.text', 'underline');
	});
});
