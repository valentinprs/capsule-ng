import 'cypress-real-events';

describe('Capsule native Table and Pagination', () => {
	it('server-renders and hydrates a native caption, head, body and foot without parser repairs', () => {
		cy.request('/components/table').then((response) => {
			const html = Cypress.$(response.body);
			const table = html.find('spartan-table-preview table')[0] as HTMLTableElement;
			expect(table.caption?.textContent).to.contain('recent invoices');
			expect(table.tHead?.rows[0].cells.length).to.equal(4);
			expect(table.tBodies[0].rows.length).to.equal(7);
			expect(table.tFoot?.rows[0].cells[0].colSpan).to.equal(3);
		});
		cy.visit('/components/table');
		cy.get('spartan-table-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-table-preview table')
			.children()
			.then((children) =>
				expect([...children].map((el) => el.tagName)).to.deep.equal(['CAPTION', 'THEAD', 'TBODY', 'TFOOT']),
			);
		cy.get('spartan-table-preview tbody th[scope="row"]').should('have.length', 7);
	});
	it('reveals overflowing native cells through keyboard scrolling', () => {
		cy.viewport(390, 900);
		cy.visit('/components/table');
		cy.get('spartan-table-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-table-preview caps-table-container').focus();
		cy.focused().should('have.prop', 'tagName', 'CAPS-TABLE-CONTAINER');
		cy.realPress('ArrowRight');
		cy.get('spartan-table-preview caps-table-container').should(($container) => {
			expect($container[0].scrollLeft).to.be.greaterThan(0);
		});
	});
	it('uses real Enter navigation with URL query parameters and current-page semantics', () => {
		cy.visit('/components/pagination?page=1');
		cy.get('spartan-pagination-query-params').should('not.have.attr', 'ngh');
		cy.get('spartan-pagination-query-params a[capsPaginationLink][href*="page=2"]')
			.should('have.attr', 'href')
			.and('contain', 'page=2');
		cy.get('spartan-pagination-query-params a[capsPaginationLink][href*="page=2"]')
			.invoke('text')
			.then((text) => expect(text.trim()).to.equal('2'));
		cy.get('spartan-pagination-query-params a[capsPaginationLink][href*="page=2"]').focus();
		cy.realPress('Enter');
		cy.location('search').should('contain', 'page=2');
		cy.get('spartan-pagination-query-params [aria-current="page"]')
			.invoke('text')
			.then((text) => expect(text.trim()).to.equal('2'));
	});
	it('activates generated native buttons with Enter and Space, then changes the page size', () => {
		cy.visit('/components/pagination');
		cy.get('spartan-pagination-advanced').should('not.have.attr', 'ngh');
		cy.get('spartan-pagination-advanced button[capsPaginationPrevious]').should('be.disabled');
		cy.get('spartan-pagination-advanced button[capsPaginationNext]').focus();
		cy.realPress('Enter');
		cy.get('spartan-pagination-advanced [aria-current="page"]').should('contain.text', '2');
		cy.focused().should('have.attr', 'capsPaginationNext');
		cy.realPress('Space');
		cy.get('spartan-pagination-advanced [aria-current="page"]').should('contain.text', '3');
		cy.get('spartan-pagination-advanced caps-select button').click();
		cy.get('caps-select-option').contains(/^20/).click();
		cy.get('spartan-pagination-advanced [aria-current="page"]').should('contain.text', '1');
		cy.get('spartan-pagination-advanced').should('contain.text', '5 pages');
	});
	for (const width of [390, 1280])
		for (const theme of ['light', 'dark'])
			for (const family of ['table', 'pagination']) {
				it(`audits every ${family} preview at ${width}px in ${theme}`, () => {
					cy.viewport(width, 900);
					cy.visit(`/components/${family}`);
					cy.get(`spartan-${family}-preview`).should('not.have.attr', 'ngh');
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					cy.injectAxe();
					cy.get('main .preview').each((preview) => cy.checkA11y(preview[0]));
					cy.get('main').find('button button,button a,a button,a a').should('not.exist');
					cy.document().then((doc) => expect(doc.documentElement.scrollWidth).to.be.at.most(width));
				});
			}
});
