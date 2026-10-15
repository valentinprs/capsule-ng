describe('Capsule conversation stories', () => {
	it('toggles a projected native reaction by keyboard', () => {
		cy.visit('/iframe.html?id=bubble--interactive&viewMode=story');
		cy.get('button').contains('Useful 0').focus();
		cy.get('button').contains('Useful 0').should('be.focused');
		cy.realPress('Space');
		cy.get('button').contains('Useful 1').should('have.attr', 'aria-pressed', 'true');
		cy.get('button').realPress('Enter');
		cy.get('button').contains('Useful 0').should('have.attr', 'aria-pressed', 'false');
		cy.injectAxe();
		cy.checkA11y('#storybook-root');
	});
	for (const family of ['message', 'attachment']) {
		it('renders the ' + family + ' public anatomy and accessible content', () => {
			cy.visit(
				'/iframe.html?id=' + family + '--' + (family === 'message' ? 'conversation' : 'default') + '&viewMode=story',
			);
			cy.get('caps-' + family).should('exist');
			cy.get('button button,button a,a button,a a').should('not.exist');
			cy.injectAxe();
			cy.checkA11y('#storybook-root');
		});
	}
});
