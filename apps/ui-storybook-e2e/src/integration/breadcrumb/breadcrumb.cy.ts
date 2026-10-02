describe('Breadcrumb Directive', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=breadcrumb--default');
	});

	it('should render the breadcrumb directive', () => {
		cy.get('caps-breadcrumb').should('exist');
	});

	it('should contain the correct breadcrumb items', () => {
		cy.get('caps-breadcrumb [role="listitem"]').should('have.length', 4);
		cy.get('caps-breadcrumb [role="listitem"]').eq(0).contains('Home');
		cy.get('caps-breadcrumb [role="listitem"]').eq(2).contains('Components');
		cy.get('caps-breadcrumb [role="listitem"]').eq(3).contains('Breadcrumb');
	});

	it('should contain breadcrumb separators', () => {
		cy.get('[data-slot="breadcrumb-separator"]').should('have.length', 3);
	});

	it('should contain breadcrumb ellipsis', () => {
		cy.get('caps-breadcrumb-ellipsis').should('exist');
	});
});
