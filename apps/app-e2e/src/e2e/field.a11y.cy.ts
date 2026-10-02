import type { Result } from 'axe-core';

const EXAMPLES = [
	'spartan-field-preview',
	'spartan-field-input-preview',
	'spartan-field-textarea-preview',
	'spartan-field-select-preview',
	'spartan-field-native-select-preview',
	'spartan-field-date-picker-preview',
	'spartan-field-slider-preview',
	'spartan-field-set-preview',
	'spartan-field-checkbox-preview',
	'spartan-field-radio-preview',
	'spartan-field-switch-preview',
	'spartan-field-choice-card-preview',
	'spartan-field-group-preview',
	'spartan-field-separator-preview',
	'spartan-field-responsive-layout-preview',
	'spartan-field-rtl',
	'spartan-field-validation-preview',
];

function logViolations(violations: Result[]): void {
	cy.task(
		'table',
		violations.map(({ id, impact, nodes }) => ({
			id,
			impact,
			nodes: nodes.map((node) => node.target.join(' ')).join(', '),
		})),
	);
}

const VALIDATION = 'spartan-field-validation-preview';

describe('Capsule Field composition, validation and accessibility', { testIsolation: false }, () => {
	before(() => {
		cy.visit('/components/field');
		for (const example of EXAMPLES) {
			cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
		}
		cy.injectAxe();
	});

	for (const theme of ['light', 'dark']) {
		it(`has accessible component examples in the ${theme} theme`, () => {
			cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
			cy.checkA11y({ include: EXAMPLES.map((example) => [example]) }, undefined, logViolations);
		});
	}

	it('infers native label activation and descriptions through FieldContent', () => {
		cy.get(`${VALIDATION} label`).click();
		cy.get(`${VALIDATION} input`).should('be.focused').and('have.attr', 'aria-describedby');
		cy.get(`${VALIDATION} input`).should(($input) => {
			const ids = $input.attr('aria-describedby')?.split(' ') ?? [];
			expect(ids).to.have.length.greaterThan(0);
			for (const id of ids) expect($input[0].ownerDocument.getElementById(id)).not.to.equal(null);
		});
	});

	it('shows matching errors, registers visible messages and clears references on reset', () => {
		cy.contains(`${VALIDATION} button`, 'Reset').click();
		cy.get(`${VALIDATION} caps-field-error`).should('not.be.visible');
		cy.contains(`${VALIDATION} button`, 'Validate').click();
		cy.contains(`${VALIDATION} caps-field-error`, 'Email is required.').should('be.visible');
		cy.get(`${VALIDATION} caps-field-error[validator="email"]`).should('not.be.visible');
		cy.get(`${VALIDATION} input`).type('invalid');
		cy.get(`${VALIDATION} caps-field-error[validator="required"]`).should('not.be.visible');
		cy.contains(`${VALIDATION} caps-field-error`, 'Enter a valid email address.').should('be.visible');
		cy.get(`${VALIDATION} input`).clear();
		cy.get(`${VALIDATION} input`).type('valid@example.com');
		cy.get(`${VALIDATION} input`).should('not.have.attr', 'aria-invalid');
		cy.get(`${VALIDATION} caps-field-error`).should('not.be.visible');
		cy.contains(`${VALIDATION} button`, 'Toggle manual message').click();
		cy.contains(`${VALIDATION} caps-field-error`, 'This is a manually displayed message.')
			.should('be.visible')
			.invoke('attr', 'id')
			.then((id) => {
				cy.get(`${VALIDATION} input`).should('have.attr', 'aria-describedby').and('include', id);
			});
		cy.get(`${VALIDATION} input`).should('not.have.attr', 'aria-invalid');
		cy.contains(`${VALIDATION} button`, 'Reset').click();
		cy.get(`${VALIDATION} caps-field-error`).should('not.be.visible');
		cy.checkA11y({ include: [[VALIDATION]] }, undefined, logViolations);
	});

	it('switches responsive orientation according to its group container width', () => {
		const group = 'spartan-field-responsive-layout-preview caps-field-group';
		cy.get(group).invoke('css', 'width', '350px');
		cy.get(`${group} > caps-field`).first().should('have.css', 'flex-direction', 'column');
		cy.get(group).invoke('css', 'width', '600px');
		cy.get(`${group} > caps-field`).first().should('have.css', 'flex-direction', 'row');
		cy.get(group).invoke('css', 'width', '');
	});

	it('preserves native legends and RTL layout, and documents the Capsule family', () => {
		cy.get('spartan-field-set-preview fieldset > legend').should('have.attr', 'data-slot', 'field-legend');
		cy.get('spartan-field-rtl').invoke('attr', 'dir', 'rtl');
		cy.get('spartan-field-rtl caps-field').first().should('have.css', 'direction', 'rtl');
		cy.get('spartan-ui-api-docs').should('contain.text', 'CapsField').and('contain.text', 'CapsFieldError');
	});
	it('keeps choice cards natively selectable and native fieldsets disable their controls', () => {
		cy.get('spartan-field-choice-card-preview label[for="virtual-machine"]').click();
		cy.get('spartan-field-choice-card-preview input#virtual-machine').should('be.checked');
		cy.get('spartan-field-set-preview fieldset').invoke('attr', 'disabled', '');
		cy.get('spartan-field-set-preview input').should('be.disabled');
		cy.get('spartan-field-set-preview fieldset').invoke('removeAttr', 'disabled');
		cy.get('spartan-field-set-preview input').should('not.be.disabled');
	});
});
