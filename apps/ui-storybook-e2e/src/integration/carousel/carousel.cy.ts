describe('Carousel', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=carousel--default');
		cy.injectAxe();
	});
	it('names its region/slides, navigates with native buttons and preserves focus', () => {
		cy.get('caps-carousel').should('have.attr', 'role', 'region').and('have.attr', 'aria-label', 'Example slides');
		cy.get('caps-carousel-item')
			.first()
			.should('have.attr', 'role', 'group')
			.and('have.attr', 'aria-roledescription', 'slide')
			.and('have.attr', 'aria-label', '1 of 5');
		cy.get('[capsCarouselPrevious]').should('be.disabled');
		cy.get('[capsCarouselNext]').click();
		cy.get('[capsCarouselNext]').should('be.focused');
		cy.get('[capsCarouselPrevious]').should('not.be.disabled');
		cy.checkA11y('caps-carousel');
	});
	it('uses vertical arrows', () => {
		cy.visit('/iframe.html?id=carousel--orientation');
		cy.get('[capsCarouselNext]').should('not.be.disabled').focus();
		cy.get('[capsCarouselNext]').trigger('keydown', { key: 'ArrowDown' });
		cy.get('[capsCarouselPrevious]').should('not.be.disabled');
	});
	it('offers an explicit first-in-order rotation control', () => {
		cy.visit('/iframe.html?id=carousel--plugins');
		cy.get('[capsCarouselAutoplay]').focus();
		cy.get('[capsCarouselAutoplay]').should('contain.text', 'Start rotation');
		cy.get('[capsCarouselAutoplay]').click();
		cy.get('[capsCarouselAutoplay]').should('contain.text', 'Pause rotation');
		cy.get('[capsCarouselNext]').click();
		cy.get('[capsCarouselAutoplay]').should('contain.text', 'Start rotation');
	});
});
