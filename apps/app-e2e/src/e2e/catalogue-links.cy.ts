describe('Capsule navigation and local search', () => {
	beforeEach(() => {
		cy.viewport(1280, 900);
		cy.visit('/components/field');
		cy.get('caps-field').should('exist');
	});

	it('searches Capsule pages without contacting Algolia and stays on the same origin', () => {
		const requests: string[] = [];
		cy.intercept('https://**.algolia.net/**', (req) => {
			requests.push(req.url);
		});
		cy.intercept('https://**.algolianet.com/**', (req) => {
			requests.push(req.url);
		});
		cy.get('spartan-header spartan-docs-dialog button').first().click();
		cy.get('input[placeholder="Type a command or search..."]').type('Breadcrumb');
		cy.get('[capsCommandItem]:visible').should('have.length', 1).and('contain.text', 'Breadcrumb').click();
		cy.location('pathname').should('equal', '/components/breadcrumb');
		cy.location('origin').should('equal', new URL(Cypress.config('baseUrl')!).origin);
		cy.then(() => expect(requests).to.deep.equal([]));
	});

	it('points product links and metadata at Capsule', () => {
		cy.get('spartan-header a[href="https://github.com/valentinprs/capsule-ng"]').should('exist');
		cy.get('a[href*="spartan.ng"], a[href*="github.com/spartan-ng"], a[href*="discord.gg/EqHnxQ4uQr"]').should(
			'not.exist',
		);
		cy.get('meta[property="og:site_name"]').should('have.attr', 'content', 'Capsule');
		cy.get('meta[property="og:image"]').should('have.attr', 'content').and('include', '/assets/capsule-social.png');
	});
});
