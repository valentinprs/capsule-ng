import '@testing-library/cypress/add-commands';
import 'cypress-real-events';

describe('Capsule loading composition', () => {
	it('keeps spinner icons decorative inside named disabled buttons', () => {
		cy.visit('/components/spinner');
		cy.get('spartan-spinner-button-preview').within(() => {
			cy.get('button')
				.should('have.length', 3)
				.each((button) => {
					cy.wrap(button)
						.should('be.disabled')
						.find('caps-spinner')
						.should('have.attr', 'aria-hidden', 'true')
						.and('not.have.attr', 'role');
				});
			cy.get('hlm-spinner,[hlmBtn]').should('not.exist');
		});
		cy.injectAxe();
		cy.checkA11y('spartan-spinner-button-preview');
	});
	it('replaces decorative skeletons with real content and preserves keyboard focus', () => {
		cy.visit('/components/skeleton');
		cy.get('spartan-skeleton-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-skeleton-preview').within(() => {
			cy.get('section').should('have.attr', 'aria-busy', 'true');
			cy.get('caps-skeleton').should('have.length', 3).and('have.attr', 'aria-hidden', 'true');
			cy.findByRole('button', { name: 'Toggle profile preview' }).focus();
			cy.focused().should('have.prop', 'tagName', 'BUTTON');
			cy.realPress('Enter');
			cy.get('section').should('have.attr', 'aria-busy', 'false').and('contain.text', 'Alice Martin');
			cy.get('caps-skeleton').should('not.exist');
			cy.findByRole('button', { name: 'Toggle profile preview' }).should('be.focused');
			cy.realPress('Space');
			cy.get('section').should('have.attr', 'aria-busy', 'true');
		});
		cy.injectAxe();
		cy.checkA11y('spartan-skeleton-preview');
	});
	it('updates a single named progressbar by native keyboard activation and completes', () => {
		cy.visit('/components/progress');
		cy.get('spartan-progress-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-progress-preview').within(() => {
			cy.findByRole('progressbar', { name: 'Uploading document' })
				.should('have.attr', 'aria-valuenow', '30')
				.and('have.attr', 'aria-valuetext', '30%');
			cy.findByRole('button', { name: 'Advance by 10 MB' }).focus();
			cy.focused().should('have.prop', 'tagName', 'BUTTON');
			cy.realPress('Enter');
			cy.findByRole('progressbar').should('have.attr', 'aria-valuenow', '40');
			cy.findByRole('button', { name: 'Advance by 10 MB' }).should('be.focused');
			for (let step = 0; step < 6; step++) cy.findByRole('button', { name: 'Advance by 10 MB' }).click();
			cy.findByRole('progressbar').should('have.attr', 'data-state', 'complete').and('have.attr', 'aria-busy', 'false');
			cy.findByRole('button', { name: 'Advance by 10 MB' }).should('be.disabled');
			cy.get('[aria-live],caps-progress-indicator,hlm-progress').should('not.exist');
		});
		cy.get('spartan-progress-indeterminate [role="progressbar"]').should('not.have.attr', 'aria-valuenow');
		cy.get('spartan-progress-indeterminate [role="progressbar"]').should('not.have.attr', 'aria-valuetext');
		cy.injectAxe();
		cy.checkA11y('spartan-progress-preview');
	});
	it('serves Capsule API and all family snippets from public exports', () => {
		for (const family of ['spinner', 'skeleton', 'progress']) {
			cy.request(`/data/primitives-snippets/${family}.json`).then((response) => {
				const serialized = JSON.stringify(response.body);
				expect(serialized).to.contain(`@capsule-ng/caps/${family}`);
				expect(serialized).not.to.match(/Hlm(?:Spinner|Skeleton|Progress)|hlm-(?:spinner|skeleton|progress)/);
			});
			cy.request(`/data/ui-api/${family}.json`).then((response) => {
				expect(response.body[family].caps[`Caps${family[0].toUpperCase() + family.slice(1)}`].selector).to.equal(
					`caps-${family}`,
				);
			});
		}
	});
});
