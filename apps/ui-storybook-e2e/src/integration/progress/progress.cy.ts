describe('progress', () => {
	describe('LoadingNotStarted', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=progress--loading-not-started');
			cy.injectAxe();
		});

		it('should give the correct roles and data values to indicators with values and indeterminate if null', () => {
			cy.checkA11y('#storybook-root');

			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'aria-labelledby', 'loading-label');
			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'aria-valuemax', 100);
			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'aria-valuemin', 0);
			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'data-max', 100);
			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'data-value', 0);
			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'aria-valuenow', 0);
			cy.findByLabelText(/loading \(not started\)/i).should('have.attr', 'data-state', 'loading');
			cy.findByLabelText(/loading \(not started\)/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-max', 100);
			cy.findByLabelText(/loading \(not started\)/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-value', 0);
			cy.findByLabelText(/loading \(not started\)/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-state', 'loading');
		});
	});

	describe('LoadingStarted', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=progress--loading-started');
			cy.injectAxe();
		});

		it('should give the correct roles and data values to indicators with values and indeterminate if null', () => {
			cy.checkA11y('#storybook-root');

			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'aria-labelledby', 'loading-label');
			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'aria-valuemax', 100);
			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'aria-valuemin', 0);
			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'data-max', 100);
			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'data-value', 30);
			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'aria-valuenow', 30);
			cy.findByLabelText(/loading \(started\)/i).should('have.attr', 'data-state', 'loading');
			cy.findByLabelText(/loading \(started\)/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-max', 100);
			cy.findByLabelText(/loading \(started\)/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-value', 30);
			cy.findByLabelText(/loading \(started\)/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-state', 'loading');
		});
	});

	describe('Indeterminate', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=progress--indeterminate');
			cy.injectAxe();
		});

		it('should give the correct roles and data values to indicators with values and indeterminate if null', () => {
			cy.checkA11y('#storybook-root');

			cy.findByLabelText(/indeterminate/i).should('have.attr', 'aria-labelledby', 'indeterminate-label');
			cy.findByLabelText(/indeterminate/i).should('have.attr', 'aria-valuemax', 100);
			cy.findByLabelText(/indeterminate/i).should('have.attr', 'aria-valuemin', 0);
			cy.findByLabelText(/indeterminate/i).should('have.attr', 'data-max', 100);
			cy.findByLabelText(/indeterminate/i).should('not.have.attr', 'data-value');
			cy.findByLabelText(/indeterminate/i).should('not.have.attr', 'aria-valuenow');
			cy.findByLabelText(/indeterminate/i).should('have.attr', 'data-state', 'indeterminate');
			cy.findByLabelText(/indeterminate/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-max', 100);
			cy.findByLabelText(/indeterminate/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('not.have.attr', 'data-value');
			cy.findByLabelText(/indeterminate/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-state', 'indeterminate');
		});
	});

	describe('Complete', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=progress--complete');
			cy.injectAxe();
		});

		it('should give the correct roles and data values to indicators with values and indeterminate if null', () => {
			cy.checkA11y('#storybook-root');

			cy.findByLabelText(/complete/i).should('have.attr', 'aria-labelledby', 'complete-label');
			cy.findByLabelText(/complete/i).should('have.attr', 'aria-valuemax', 100);
			cy.findByLabelText(/complete/i).should('have.attr', 'aria-valuemin', 0);
			cy.findByLabelText(/complete/i).should('have.attr', 'data-max', 100);
			cy.findByLabelText(/complete/i).should('have.attr', 'data-value', 100);
			cy.findByLabelText(/complete/i).should('have.attr', 'aria-valuenow', 100);
			cy.findByLabelText(/complete/i).should('have.attr', 'data-state', 'complete');
			cy.findByLabelText(/complete/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-max', 100);
			cy.findByLabelText(/complete/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-value', 100);
			cy.findByLabelText(/complete/i)
				.find('[data-state][class*="caps-progress-indicator"]')
				.should('have.attr', 'data-state', 'complete');
		});
	});
});
