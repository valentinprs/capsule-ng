describe('Capsule command dialog', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=command--dialog');
		cy.get('command-dialog-component').should('exist');
		cy.document().then((doc) => doc.defaultView?.focus());
		cy.injectAxe();
	});
	it('retains the application shortcut, dialog naming, focus, disabled items and selection closure', () => {
		cy.get('body').click(5, 5);
		cy.realPress(['Control', 'K']);
		cy.get('[role=dialog]').should('exist');
		cy.focused().should('have.attr', 'role', 'combobox');
		cy.get('[role=dialog] button[disabled]').should('contain.text', 'Search Emoji');
		cy.get('[role=dialog]').then(async ($panel) => {
			const panel = $panel[0];
			const ancestors: HTMLElement[] = [];
			for (let node: HTMLElement | null = panel; node; node = node.parentElement) ancestors.push(node);
			await Promise.all(
				ancestors
					.flatMap((node) => node.getAnimations({ subtree: true }))
					.filter(
						(animation) =>
							animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity,
					)
					.map((animation) => animation.finished),
			);
			for (const node of ancestors) expect(getComputedStyle(node).opacity).to.equal('1');
			expect(getComputedStyle(panel.querySelector('caps-dialog-panel')!).opacity).to.equal('1');
		});
		cy.checkA11y('[role=dialog]');
		cy.get('[role=dialog] input').type('Calendar');
		cy.realPress('Enter');
		cy.get('[role=dialog]').should('not.exist');
		cy.get('[data-testid=lastCommand]').should('have.text', 'Calendar');
		cy.realPress(['Control', 'K']);
		cy.get('[role=dialog]').should('exist');
		cy.realPress('Escape');
		cy.get('[role=dialog]').should('not.exist');
	});
});
