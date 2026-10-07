describe('Capsule Table and Pagination stories', () => {
	it('keeps compact striped native table sections and caption', () => {
		cy.visit('/iframe.html?id=table--striped');
		cy.get('table[capsTable]').should('have.attr', 'data-striped', 'true').and('have.attr', 'data-size', 'sm');
		cy.get('table caption').should('contain.text', 'Compact');
		cy.get('table tfoot th[scope="row"]').should('have.text', 'Total');
		cy.injectAxe();
		cy.checkA11y('#storybook-root');
	});
	it('uses generated native keyboard actions and maintains the focused Next button', () => {
		cy.visit('/iframe.html?id=pagination--numbered');
		cy.get('button[capsPaginationPrevious]').should('be.disabled');
		cy.get('button[capsPaginationNext]').focus();
		cy.realPress('Enter');
		cy.get('[aria-current="page"]').should('contain.text', '2');
		cy.focused().should('have.attr', 'capsPaginationNext');
		cy.realPress('Space');
		cy.get('[aria-current="page"]').should('contain.text', '3');
		cy.injectAxe();
		cy.checkA11y('#storybook-root');
	});
	it('marks a native current page and removes disabled URL actions from keyboard navigation', () => {
		cy.visit('/iframe.html?id=pagination--disabled');
		cy.get('#storybook-root a[capsPaginationPrevious]')
			.should('have.length', 1)
			.and('have.attr', 'href', '?page=1')
			.and('have.attr', 'aria-disabled', 'true')
			.and('have.attr', 'tabindex', '-1')
			.click({ force: true });
		cy.location('search').should('not.contain', 'page=1');
		cy.get('button[capsPaginationNext]').should('be.disabled');
		cy.get('[aria-current="page"]').should('have.text', '1');
		cy.injectAxe();
		cy.checkA11y('#storybook-root');
	});
});
