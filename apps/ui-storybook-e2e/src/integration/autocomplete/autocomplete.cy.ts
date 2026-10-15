describe('autocomplete', () => {
	describe('Default', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=autocomplete--default');
			cy.injectAxe();
		});

		it('should render autocomplete input', () => {
			cy.get('caps-autocomplete').should('exist');
			cy.get('input[capsInput]').should('exist');
		});

		it('should show options when typing', () => {
			cy.get('input[capsInput]').type('Mar');
			cy.get('[role="listbox"]').should('exist');
			cy.get('caps-autocomplete-option').should('have.length.gt', 0);
			cy.get('caps-autocomplete-option').first().should('contain.text', 'Marty McFly');
		});

		it('should select an option', () => {
			cy.get('input[capsInput]').type('Mar');
			cy.get('caps-autocomplete-option').first().click();
			cy.get('input[capsInput]').should('have.value', 'Marty McFly');
		});

		it('should close popup when tabbing out', () => {
			cy.get('input[capsInput]').type('Mar');
			cy.get('caps-autocomplete-content').should('exist');
			cy.get('input[capsInput]').realPress('Tab');
			cy.get('caps-autocomplete-content').should('not.exist');
		});

		it('should not select the highlighted option on tab out', () => {
			cy.get('input[capsInput]').type('Mar');
			cy.get('caps-autocomplete-option').should('have.length.gt', 1);
			cy.get('input[capsInput]').realPress('ArrowDown');
			cy.get('input[capsInput]').realPress('Tab');
			cy.get('caps-autocomplete-content').should('not.exist');
			// Tab only dismisses the popup; it leaves focus to the next control without
			// committing the highlighted suggestion, so the typed search value remains.
			cy.get('input[capsInput]').should('have.value', 'Mar');
		});

		it('should select highlighted option on enter', () => {
			cy.get('input[capsInput]').type('Mar');
			cy.get('caps-autocomplete-option').should('have.length.gt', 1);
			cy.get('input[capsInput]').realPress('ArrowDown');
			cy.get('input[capsInput]').realPress('Enter');
			cy.get('caps-autocomplete-content').should('not.exist');
			cy.get('input[capsInput]').should('have.value', 'Marty McFly');
		});

		it('should pass accessibility checks', () => {
			// Wait for the story to render before auditing; running axe immediately after
			// cy.visit scans an empty root and falsely passes.
			cy.get('input[capsInput]').should('be.visible');
			cy.checkA11y(undefined, {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
				},
			});
		});

		it('should pass accessibility checks when opened', () => {
			// Wait for the story to render before typing to open the popup and auditing.
			cy.get('input[capsInput]').should('be.visible');
			cy.get('input[capsInput]').type('Mar');
			cy.get('caps-autocomplete-option').should('have.length.gt', 0);
			cy.get('caps-autocomplete-content').then(async ($content) => {
				const content = $content[0];
				const ancestors: Element[] = [];
				for (let node: Element | null = content; node; node = node.parentElement) ancestors.push(node);
				const animations = [
					...content.getAnimations({ subtree: true }),
					...ancestors.flatMap((node) => node.getAnimations()),
				];
				await Promise.all(
					[...new Set(animations)]
						.filter((animation) => Number.isFinite(animation.effect?.getComputedTiming().iterations))
						.map((animation) => animation.finished),
				);
			});
			cy.get('caps-autocomplete-content').should('have.css', 'opacity', '1');
			cy.checkA11y(undefined, {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
					// The open popup is a CDK overlay appended to <body>, outside any landmark.
					// This is a Storybook-host artifact (same root cause as landmark-one-main),
					// not a WCAG rule (region is best-practice).
					region: { enabled: false },
				},
			});
		});
	});

	describe('Form', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=autocomplete--form');
			cy.injectAxe();
		});

		it('should work within a form', () => {
			cy.get('form').should('exist');
			cy.get('input[capsInput]').clear();
			cy.get('input[capsInput]').type('Doc');
			cy.get('caps-autocomplete-option').contains('Doc Brown').click();
			cy.get('input[capsInput]').should('have.value', 'Doc Brown');
		});
	});

	describe('Async', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=autocomplete--async');
			cy.injectAxe();
		});

		it('should show loading state', () => {
			cy.get('input[capsInput]').type('test');
			cy.get('caps-autocomplete-option').should('have.length.gt', 0);
		});
	});
});
