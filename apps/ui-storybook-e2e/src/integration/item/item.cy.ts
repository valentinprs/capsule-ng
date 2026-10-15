describe('item', () => {
	describe('Default', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--default');
			cy.injectAxe();
		});

		it('should render basic item correctly', () => {
			cy.get('caps-item').first().should('exist');
			cy.get('caps-item-title').first().should('contain.text', 'Basic Item');
			cy.get('caps-item-description').first().should('contain.text', 'A simple item with title and description');
			cy.get('caps-item-actions').first().find('button').should('contain.text', 'Action');
		});

		it('should render link item correctly', () => {
			cy.get('a[capsItem]').should('exist');
			cy.get('a[capsItem]').find('ng-icon[name="lucideBadgeCheck"]').should('exist');
			cy.get('a[capsItem]').find('caps-item-title').should('contain.text', 'Your profile has been verified');
		});

		it('should pass accessibility checks', () => {
			cy.get('caps-item').should('exist');
			cy.checkA11y('caps-item');
		});
	});

	describe('Avatar', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--avatar');
			cy.injectAxe();
		});

		it('should render items with avatars', () => {
			cy.get('caps-item').should('have.length.at.least', 2);
			cy.get('caps-item').first().find('caps-avatar').should('exist');
			cy.get('caps-item').first().find('caps-item-title').should('contain.text', 'Evil Rabbit');
		});

		it('should pass accessibility checks', () => {
			cy.get('caps-item').should('exist');
			cy.checkA11y('caps-item', {
				rules: {
					'color-contrast': { enabled: false },
				},
			});
		});
	});

	describe('Dropdown', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--dropdown');
			cy.injectAxe();
		});

		it('should open dropdown and show items', () => {
			cy.get('button[capsButton]').click();
			cy.get('caps-menu').should('exist');
			cy.get('[capsMenuItem]').should('have.length', 3);
			cy.get('[capsMenuItem]').first().find('caps-item').should('exist');
		});

		it('should pass accessibility checks', () => {
			cy.get('button[capsButton]').should('exist');
			cy.checkA11y('button[capsButton]', {
				rules: {
					'color-contrast': { enabled: false },
				},
			});
			cy.get('button[capsButton]').click();
			cy.get('caps-menu').should('exist');
			cy.checkA11y('caps-menu', {
				rules: {
					'color-contrast': { enabled: false },
				},
			});
		});
	});

	describe('Group', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--group');
			cy.injectAxe();
		});

		it('should render item group', () => {
			cy.get('caps-item-group').should('exist');
			cy.get('caps-item').should('have.length', 3);
		});

		it('should pass accessibility checks', () => {
			cy.get('caps-item-group').should('exist');
			cy.checkA11y('caps-item-group', undefined, (violations) => {
				cy.log(JSON.stringify(violations, null, 2));
			});
		});
	});

	describe('Header', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--header');
			cy.injectAxe();
		});

		it('should render items with headers', () => {
			cy.get('caps-item').should('have.length', 3);
			cy.get('caps-item-header').should('exist');
			cy.get('caps-item-header img').should('exist');
		});

		it('should pass accessibility checks', () => {
			cy.get('caps-item-group').should('exist');
			cy.checkA11y('caps-item-group');
		});
	});

	describe('Icon', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--icon');
			cy.injectAxe();
		});

		it('should render item with icon media', () => {
			cy.get('[data-slot="item"]').should('exist');
			cy.get('caps-item-media ng-icon').should('exist');
		});

		it('should pass accessibility checks', () => {
			cy.get('[data-slot="item"]').should('exist');
			cy.checkA11y('[data-slot="item"]');
		});
	});

	describe('Image', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--image');
			cy.injectAxe();
		});

		it('should render items with image media', () => {
			cy.get('a[capsItem]').should('have.length', 3);
			cy.get('caps-item-media img').should('exist');
		});
	});

	describe('Link', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--link');
			cy.injectAxe();
		});

		it('should render link items', () => {
			cy.get('a[capsItem]').should('have.length', 2);
		});

		it('should pass accessibility checks', () => {
			cy.get('a[capsItem]').should('exist');
			cy.checkA11y('a[capsItem]');
		});
	});

	describe('Size', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--size');
			cy.injectAxe();
		});

		it('should render items', () => {
			cy.get('caps-item-group').should('have.length', 4);
		});

		it('should pass accessibility checks', () => {
			cy.get('[data-slot="item"]').should('exist');
			cy.checkA11y('[data-slot="item"]');
		});
	});

	describe('Variants', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=item--variants');
			cy.injectAxe();
		});

		it('should render different variants', () => {
			cy.get('caps-item').should('have.length', 2);
			cy.get('caps-item-group[data-kind="on-page"]').should('exist');
			cy.get('caps-item-group[data-kind="disclosed"]').should('exist');
		});

		it('should pass accessibility checks', () => {
			cy.get('[data-slot="item"]').should('exist');
			cy.checkA11y('[data-slot="item"]');
		});
	});
});
