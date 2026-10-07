describe('Capsule Collapsible public stories', () => {
	it('owns a native trigger and consistent content ID with real Enter/Space activation', () => {
		cy.visit('/iframe.html?id=collapsible--default');
		cy.get('button[capsCollapsibleTrigger]').as('trigger').should('have.attr', 'type', 'button');
		cy.get('@trigger').then((button) => {
			const id = button.attr('aria-controls');
			expect(id).to.be.a('string').and.not.be.empty;
			cy.get(`#${id}`).should('have.attr', 'inert');
		});
		cy.get('@trigger').focus();
		cy.realPress('Enter');
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
		cy.realPress('Enter');
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
		cy.realPress('Space');
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
		cy.realPress('Space');
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
		cy.injectAxe();
		cy.checkA11y('#storybook-root', {
			rules: { 'page-has-heading-one': { enabled: false }, 'landmark-one-main': { enabled: false } },
		});
	});
	it('accepts disabled from Storybook controls and does not activate', () => {
		cy.visit('/iframe.html?id=collapsible--default&args=disabled:true');
		cy.get('button[capsCollapsibleTrigger]').should('be.disabled').should('have.attr', 'aria-expanded', 'false');
	});
	it('synchronizes the external control with its public expanded model', () => {
		cy.visit('/iframe.html?id=collapsible--controlled');
		cy.get('button[capsCollapsibleTrigger]').as('trigger').should('have.attr', 'aria-expanded', 'false');
		cy.findByRole('button', { name: 'Toggle externally' }).click();
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
		cy.get('@trigger').click();
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
	});
});
