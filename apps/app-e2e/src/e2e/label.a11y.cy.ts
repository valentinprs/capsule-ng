import type { Result } from 'axe-core';

const EXAMPLES = ['spartan-label-preview', 'spartan-label-rtl'];

function logViolations(violations: Result[]): void {
	cy.task(
		'table',
		violations.map(({ id, impact, description, nodes }) => ({
			id,
			impact,
			description,
			nodes: nodes.map((node) => node.target.join(' ')).join(', '),
		})),
	);
}

// Audit the component demos, keeping unrelated site navigation and code tabs outside the contract.
describe('Capsule Label docs accessibility and native activation', { testIsolation: false }, () => {
	before(() => {
		cy.visit('/components/label');
		for (const example of EXAMPLES) {
			cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.get(`${example} label[capsLabel]`).should('exist');
		}
		cy.injectAxe();
	});

	it('uses native labels with Capsule styling in the normal and RTL examples', () => {
		for (const example of EXAMPLES) {
			cy.get(`${example} label[capsLabel]`).each(($label) => {
				expect($label).to.have.class('caps-label');
				expect($label).to.have.attr('data-slot', 'label');
			});
		}
		cy.get('spartan-label-rtl > div').should('have.attr', 'dir', 'rtl');
	});

	it('focuses an associated native input and textarea when their labels are activated', () => {
		cy.get('spartan-label-preview label[for="label-email"]').click();
		cy.get('#label-email').should('be.focused');
		cy.get('spartan-label-preview label[for="label-message"]').click();
		cy.get('#label-message').should('be.focused');
	});

	it('activates the native checkbox and respects its native disabled state', () => {
		cy.get('#label-native-terms').should('not.be.checked');
		cy.get('label[for="label-native-terms"]').click();
		cy.get('#label-native-terms').should('be.checked');
		cy.get('label[for="label-native-terms"]').click();
		cy.get('#label-native-terms').should('not.be.checked');
		cy.get('label[for="label-disabled-terms"]').click();
		cy.get('#label-disabled-terms').should('be.disabled').and('not.be.checked');
		cy.get('label[for="label-disabled-terms"]').should('have.css', 'opacity', '0.5');
	});

	it('preserves the existing Helm checkbox association', () => {
		cy.get('spartan-label-preview label[for="terms"]').click();
		cy.get('spartan-label-preview hlm-checkbox [role="checkbox"]').should('have.attr', 'aria-checked', 'true');
		cy.get('spartan-label-preview label[for="terms"]').click();
		cy.get('spartan-label-preview hlm-checkbox [role="checkbox"]').should('have.attr', 'aria-checked', 'false');
	});

	it('infers the associated input from Brain Field', () => {
		cy.get('spartan-label-preview [brnField] input').then(($input) => {
			cy.get('spartan-label-preview [brnField] label').should('have.attr', 'for', $input.attr('id')).click();
		});
		cy.get('spartan-label-preview [brnField] input').should('be.focused');
	});

	it('has no axe violations in the normal and RTL examples', () => {
		cy.checkA11y({ include: EXAMPLES.map((example) => [example]) }, undefined, logViolations);
	});

	it('documents the generated Capsule API', () => {
		cy.get('spartan-ui-api-docs').should('contain.text', 'CapsLabel');
	});
});
