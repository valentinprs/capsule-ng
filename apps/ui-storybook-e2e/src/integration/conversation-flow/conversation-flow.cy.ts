describe('Capsule conversation flow stories', { retries: 0 }, () => {
	it('renders readable Marker variants and one explicit status', () => {
		cy.visit('/iframe.html?id=marker--default');
		cy.get('#storybook-root caps-marker').should('have.length', 4);
		cy.get('#storybook-root caps-marker[role="status"]').should('have.length', 1);
		cy.get('#storybook-root caps-marker[variant="separator"] caps-marker-content').should(
			'contain',
			'Conversation compacted',
		);
		cy.get('#storybook-root caps-marker-icon').should('have.attr', 'aria-hidden', 'true');
		cy.get('#storybook-root caps-spinner').should('have.attr', 'aria-hidden', 'true');
		cy.get(
			'#storybook-root button button,#storybook-root button a,#storybook-root a button,#storybook-root a a',
		).should('not.exist');
		cy.injectAxe();
		cy.checkA11y('#storybook-root');
	});
	for (const story of ['default', 'auto-scroll', 'scroll-anchors', 'opening-start']) {
		it('owns the named viewport/log and registered direct rows in ' + story, () => {
			cy.visit('/iframe.html?id=message-scroller--' + story);
			cy.get('#storybook-root caps-message-scroller').should('have.length', 1);
			cy.get('#storybook-root [data-slot="message-scroller-viewport"]')
				.should('have.attr', 'role', 'region')
				.and('have.attr', 'aria-label', 'Messages')
				.and('have.attr', 'tabindex', '0');
			cy.get('#storybook-root [role="log"]')
				.should('have.attr', 'aria-live', 'off')
				.and('have.attr', 'aria-relevant', 'additions');
			cy.get('#storybook-root [role="log"] > caps-message-scroller-item').should('have.length.greaterThan', 0);
			cy.get('#storybook-root [data-message-scroller-spacer]').should('have.length', 1);
			cy.get('#storybook-root [role="log"] button[caps-message-scroller-button]').should('not.exist');
			cy.get('#storybook-root caps-message-scroller').should(($root) =>
				expect($root.find('[data-message-id][id]')).to.have.length(0),
			);
			cy.injectAxe();
			cy.checkA11y('#storybook-root');
		});
	}
});
