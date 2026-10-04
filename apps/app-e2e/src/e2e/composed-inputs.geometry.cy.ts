describe('Capsule InputGroup composition geometry', () => {
	it('joins a native icon button and an inline InputGroup on the same top and bottom borders', () => {
		cy.visit('/components/button-group');
		cy.get('spartan-button-group-input-group').should('not.have.attr', 'ngh');
		cy.document().then((document) => cy.wrap(document.fonts.ready));
		for (const width of [390, 1280]) {
			for (const theme of ['light', 'dark']) {
				for (const direction of ['ltr', 'rtl']) {
					cy.viewport(width, 900);
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					cy.get('spartan-button-group-input-group').invoke('attr', 'dir', direction);
					cy.get('spartan-button-group-input-group').then(($root) => {
						const button = $root[0].querySelector('button[aria-label="Add attachment"]')!;
						const group = $root[0].querySelector('caps-input-group')!;
						const buttonRect = button.getBoundingClientRect();
						const groupRect = group.getBoundingClientRect();
						const context = `${width}px ${theme} ${direction}`;
						expect(Math.abs(buttonRect.top - groupRect.top), `${context} top seam`).to.be.at.most(1);
						expect(Math.abs(buttonRect.bottom - groupRect.bottom), `${context} bottom seam`).to.be.at.most(1);
						for (const child of group.querySelectorAll('input,caps-input-group-addon,button')) {
							const rect = child.getBoundingClientRect();
							expect(rect.top, `${context} ${child.tagName} top containment`).to.be.at.least(groupRect.top - 1);
							expect(rect.bottom, `${context} ${child.tagName} bottom containment`).to.be.at.most(groupRect.bottom + 1);
						}
					});
				}
			}
		}
	});
});
