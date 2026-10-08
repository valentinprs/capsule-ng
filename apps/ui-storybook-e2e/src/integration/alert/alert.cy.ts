import 'cypress-real-events';

describe('Capsule Alert stories', () => {
	for (const story of ['default', 'destructive']) {
		it(`keeps ${story} an accessible callout with the documented alert role`, () => {
			cy.visit(`/iframe.html?id=alert--${story}`);
			cy.get('caps-alert').should('be.visible').and('have.attr', 'role', 'alert').and('not.have.attr', 'aria-live');
			cy.get('caps-alert').should('have.attr', 'data-variant', story);
			cy.get('caps-alert-title').should('not.be.empty');
			cy.get('caps-alert-description').should('not.be.empty');
			cy.get('caps-alert-media ng-icon').should('have.attr', 'aria-hidden', 'true');
			cy.injectAxe();
			cy.checkA11y('caps-alert');
			cy.get('caps-alert').find('button button,a a,a button,button a').should('not.exist');
		});
	}
	it('supports a newly inserted urgent message and preserves native keyboard actions', () => {
		cy.visit('/iframe.html?id=alert--urgent');
		cy.contains('button', 'Simulate payment failure').focus();
		cy.realPress('Enter');
		cy.get('[role=alert]').should('contain.text', 'Payment failed');
		cy.contains('button', 'Simulate payment failure').should('be.focused');
		cy.realPress('Tab');
		cy.contains('button', 'Try again').should('be.focused');
		cy.realPress('Space');
		cy.get('[role=alert]').should('not.exist');
	});
});
