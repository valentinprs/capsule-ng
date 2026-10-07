import 'cypress-real-events';

function focusAndPress(selector: string, key: string): void {
	cy.get(selector).first().focus();
	cy.get(selector).first().should('be.focused');
	cy.realPress(key);
}

describe('Capsule conversation primitives', () => {
	it('hydrates all three catalogue pages with projected content and Capsule API/snippets', () => {
		for (const family of ['bubble', 'message', 'attachment']) {
			cy.visit('/components/' + family);
			cy.get('caps-' + family).should('exist');
			cy.contains('Capsule API').should('exist');
			cy.contains('Helm API').should('not.exist');
			cy.request('/data/primitives-snippets/' + family + '.json')
				.its('body')
				.then((data) => {
					expect(JSON.stringify(data)).to.contain('caps-' + family);
					expect(JSON.stringify(data)).not.to.contain('@spartan-ng/helm/' + family);
				});
			cy.get('button button,button a,a button,a a').should('not.exist');
		}
	});
	it('keeps whole-content actions native and the expansion button keyboard actionable', () => {
		cy.visit('/components/bubble');
		focusAndPress('spartan-bubble-link-button-preview button[capsBubbleContent]', 'Enter');
		cy.contains('You clicked forgot password').should('exist');
		cy.get('spartan-bubble-collapsible-preview').scrollIntoView();
		cy.get('spartan-bubble-collapsible-preview').should(($root) => {
			expect($root.closest('[ngh]')).to.have.length(0);
		});
		cy.window().then((win) => win.focus());
		focusAndPress('spartan-bubble-collapsible-preview button', 'Space');
		cy.get('spartan-bubble-collapsible-preview button').should('have.attr', 'aria-expanded', 'true');
		cy.get('spartan-bubble-collapsible-preview button').realPress('Space');
		cy.get('spartan-bubble-collapsible-preview button').should('have.attr', 'aria-expanded', 'false');
		cy.injectAxe();
		cy.checkA11y('spartan-bubble-collapsible-preview');
	});
	it('opens the attachment preview with keyboard and restores focus; removal never opens it', () => {
		cy.visit('/components/attachment');
		const root = 'spartan-attachment-trigger-preview';
		const trigger = root + ' button[capsAttachmentTrigger]';
		cy.get(root).scrollIntoView();
		cy.get(root).should(($root) => {
			expect($root.closest('[ngh]')).to.have.length(0);
		});
		cy.window().then((win) => win.focus());
		focusAndPress(trigger, 'Enter');
		cy.get('[role=dialog]').should('be.visible').and('contain', 'research-summary.pdf');
		cy.realPress('Escape');
		cy.get('[role=dialog]').should('not.exist');
		cy.get(trigger).should('be.focused');
		focusAndPress(root + ' button[capsAttachmentAction][aria-label="Remove research-summary.pdf"]', 'Space');
		cy.get(root + ' caps-attachment').should('not.exist');
		cy.get('[role=dialog]').should('not.exist');
		cy.contains(root + ' button', 'Restore attachment').click();
		cy.get(root + ' caps-attachment').should('exist');
		cy.get('spartan-attachment-image-preview a[capsAttachmentTrigger]')
			.first()
			.should('have.attr', 'target', '_blank')
			.and('have.attr', 'rel', 'noreferrer');
		cy.injectAxe();
		cy.checkA11y(root);
	});
	it('preserves author, statuses and the native download link without nested interactions', () => {
		cy.visit('/components/message');
		cy.get('spartan-message-header-footer-preview time').should('exist');
		cy.get('spartan-message-attachment-preview a[download]').should('have.attr', 'href', '/assets/capsule.svg');
		cy.get('caps-message[role=article]').should('exist');
		cy.get('caps-message[aria-live]').should('not.exist');
		cy.injectAxe();
		cy.checkA11y('spartan-message-attachment-preview');
	});
});
