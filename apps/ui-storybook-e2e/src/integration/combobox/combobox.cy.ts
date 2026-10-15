describe('combobox--default', () => {
	describe('default', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=combobox--default');
			cy.injectAxe();
		});

		it('click on combobox should open, click on Angular option should closed', () => {
			// Wait for the story to render before auditing; running axe immediately after
			// cy.visit scans an empty root and falsely passes.
			cy.get('input[placeholder="Select framework..."]').should('be.visible');
			cy.checkA11y('#storybook-root', {
				rules: {
					'page-has-heading-one': { enabled: false },
					'landmark-one-main': { enabled: false },
				},
			});

			cy.findByText(/Angular/i).should('not.exist');
			cy.get('input[placeholder="Select framework..."]').should('be.visible').realClick();
			cy.findByText('Angular').should('be.visible');
			cy.findByText('Angular').realClick();
			cy.findByText('Angular').should('not.exist');
		});

		it('should open the framework dropdown, type "Vue", and ensure "Angular" is hidden', () => {
			cy.findByText(/Angular/i).should('not.exist');
			cy.get('input[placeholder="Select framework..."]').should('be.visible');
			cy.findByRole('combobox').type('Vue');
			cy.findByText('Angular').should('not.be.visible');
		});

		it('should open the framework dropdown, and the list should be scrollable', () => {
			cy.findByText(/Angular/i).should('not.exist');
			cy.get('input[placeholder="Select framework..."]').should('be.visible').realClick();
			cy.get('[role="listbox"]').should(($el) => {
				expect($el[0].scrollHeight).to.be.greaterThan($el[0].clientHeight);
			});
		});

		it('clicking outside should close the content', () => {
			cy.get('input[placeholder="Select framework..."]').should('be.visible').realClick();
			cy.findByText('Angular').should('be.visible');
			cy.get('body').realClick({ position: 'topLeft' });
			cy.findByText('Angular').should('not.exist');
		});

		it('clicking the input while open keeps it open (closeOnTriggerClick is false)', () => {
			cy.get('input[placeholder="Select framework..."]').should('be.visible').realClick();
			cy.findByText('Angular').should('be.visible');
			cy.get('input[placeholder="Select framework..."]').realClick();
			cy.findByText('Angular').should('be.visible');
		});

		it('should pass accessibility checks when opened', () => {
			// Wait for the story to render before opening and auditing.
			cy.get('input[placeholder="Select framework..."]').should('be.visible');
			cy.get('input[placeholder="Select framework..."]').realClick();
			cy.findByText('Angular').should('be.visible');
			cy.get('caps-combobox-content').then(async ($content) => {
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
			cy.get('caps-combobox-content').should('have.css', 'opacity', '1');
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
});

describe('combobox--popup', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=combobox--popup');
	});

	it('clicking the button trigger again should close the content (closeOnTriggerClick is true)', () => {
		cy.findByText(/Angular/i).should('not.exist');
		cy.get('caps-combobox-trigger button').realClick();
		cy.findByText('Angular').should('be.visible');
		cy.get('caps-combobox-trigger button').realClick();
		cy.findByText('Angular').should('not.exist');
	});

	it('clicking outside should close the content', () => {
		cy.get('caps-combobox-trigger button').realClick();
		cy.findByText('Angular').should('be.visible');
		cy.get('body').realClick({ position: 'topLeft' });
		cy.findByText('Angular').should('not.exist');
	});
});

describe('Capsule combobox public keyboard and popup focus', () => {
	it('filters and selects with keyboard while retaining native focus', () => {
		cy.visit('/iframe.html?id=combobox--default');
		cy.get('input[role=combobox]').type('Ang');
		cy.get('input[role=combobox]').realPress('ArrowDown');
		cy.get('input[role=combobox]').should('have.attr', 'aria-activedescendant');
		cy.realPress('Enter');
		cy.get('input[role=combobox]')
			.should('have.value', 'Angular')
			.and('be.focused')
			.and('have.attr', 'aria-expanded', 'false');
	});
	it('names the native popup button via Field and restores focus on Escape', () => {
		cy.visit('/iframe.html?id=combobox--popup');
		cy.get('button[role=combobox]').should('be.visible');
		cy.document().then((doc) => {
			const targets: boolean[] = [];
			const trigger = doc.querySelector('button[role=combobox]');
			doc.addEventListener('focusin', (event) => targets.push(event.target === trigger && doc.hasFocus()));
			cy.wrap(targets).as('labelFocusTargets');
		});
		cy.contains('label', 'Countries').click();
		cy.get('@labelFocusTargets').should('include', true);
		cy.get('button[role=combobox]').should('have.attr', 'aria-expanded', 'true');
		cy.get('[role=dialog] input[role=combobox]').should('be.focused');
		cy.get('button[role=combobox]').click();
		cy.get('button[role=combobox]').should('be.focused').and('have.attr', 'aria-expanded', 'false');
		cy.get('button[role=combobox]').click();
		cy.get('button[role=combobox]').should('have.attr', 'aria-expanded', 'true');
		cy.get('[role=dialog] input[role=combobox]').type('Ang');
		cy.contains('[role=option]', 'Angular').should('be.visible');
		cy.realPress('Escape');
		cy.get('button[role=combobox]').should('be.focused');
	});
});
