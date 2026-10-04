describe('Capsule identity and item compositions', () => {
	for (const family of ['avatar', 'badge', 'item']) {
		it(`hydrates every ${family} example with public Capsule anatomy`, () => {
			cy.visit(`/components/${family}`);
			cy.get(`spartan-${family}-preview [data-slot="${family}"]`).should('be.visible');
			cy.get(`spartan-${family}-preview`).should('not.have.attr', 'ngh');
			cy.get('main').find('button button,a a,a button,button a,label label').should('not.exist');
			cy.get('main')
				.find('hlm-avatar,[hlmAvatarImage],[hlmAvatarFallback],[hlmBadge],hlm-item,[hlmItem]')
				.should('not.exist');
			if (family === 'item') {
				cy.get('main')
					.find('caps-item-group .caps-item-list')
					.each(($list) => {
						const labelId = $list.attr('aria-labelledby');
						if (labelId) cy.get(`[id="${labelId}"]`).should('be.visible');
					});
			}

			cy.injectAxe();
			cy.get('main .preview').each(($preview) => cy.checkA11y($preview[0]));
		});
	}
	it('composes list actions and preserves whole-item native links', () => {
		cy.visit('/components/item');
		cy.get('spartan-item-link-preview a[capsItem]').first().focus();
		cy.get('spartan-item-link-preview a[capsItem]').first().should('have.focus');
		cy.get('spartan-item-group-preview [role="list"]').find('[role="listitem"]').should('have.length', 3);
		cy.get('spartan-item-group-preview caps-item-actions button')
			.first()
			.should('have.attr', 'aria-label', 'Add person');
		cy.get('spartan-item-size-preview caps-item-group').should('have.length', 4);
		cy.get('spartan-item-variants-preview caps-item-group[data-kind="disclosed"]').should('exist');
	});
	it('keeps badge links focusable native anchors', () => {
		cy.visit('/components/badge');
		cy.get('spartan-badge-link a[capsBadge]').first().focus();
		cy.get('spartan-badge-link a[capsBadge]').first().should('have.focus').and('have.attr', 'href');
		cy.get('spartan-badge-variants-preview caps-badge').should('have.length', 12);
	});
});
