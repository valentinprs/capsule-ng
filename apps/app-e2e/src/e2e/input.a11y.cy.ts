import type { Result } from 'axe-core';

const EXAMPLES = [
	'spartan-input-preview',
	'spartan-input-basic',
	'spartan-input-field',
	'spartan-input-field-group',
	'spartan-input-disabled',
	'spartan-input-invalid',
	'spartan-input-file',
	'spartan-input-inline',
	'spartan-input-grid',
	'spartan-input-required',
	'spartan-input-badge',
	'spartan-input-button-group',
	'spartan-input-form',
	'spartan-input-rtl',
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

// Scope the audit to the Capsule examples. Input Group and the site's chrome retain their
// existing Helm implementation and are outside the native Input primitive's contract.
describe('Capsule input docs accessibility and native behavior', { testIsolation: false }, () => {
	before(() => {
		cy.visit('/components/input');
		for (const example of EXAMPLES) {
			cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.get(`${example} input[capsInput]`).should('have.class', 'caps-input');
		}
		cy.injectAxe();
	});

	for (const theme of ['light', 'dark']) {
		it(`has accessible names and no axe violations in ${theme} theme`, () => {
			cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
			cy.checkA11y({ include: EXAMPLES.map((example) => [example]) }, undefined, logViolations);
		});

		it(`renders normal, focus, disabled and forced-invalid states in ${theme} theme`, () => {
			cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
			cy.get('spartan-input-basic input[capsInput]').should('have.css', 'border-top-width', '1px');
			cy.get('spartan-input-basic input[capsInput]').focus();
			cy.get('spartan-input-basic input[capsInput]')
				.should('be.focused')
				.should(($input) => {
					expect(getComputedStyle($input[0]).boxShadow).not.to.equal('none');
				});
			cy.get('spartan-input-disabled input[capsInput]').should('be.disabled').and('have.css', 'opacity', '0.5');
			cy.get('spartan-input-invalid input[capsInput]')
				.should('have.attr', 'data-matches-spartan-invalid', 'true')
				.and('not.have.attr', 'aria-invalid');
			// Figma `Error`: the destructive border alone at rest, the error ring on focus.
			cy.get('spartan-input-basic input[capsInput]').then(($basic) => {
				cy.get('spartan-input-invalid input[capsInput]').should(($input) => {
					expect(getComputedStyle($input[0]).borderTopColor).not.to.equal(getComputedStyle($basic[0]).borderTopColor);
				});
			});
			cy.get('spartan-input-invalid input[capsInput]').focus();
			cy.get('spartan-input-invalid input[capsInput]').should(($input) => {
				expect(getComputedStyle($input[0]).boxShadow).not.to.equal('none');
			});
		});
	}

	it('preserves native file selection and Field descriptions', () => {
		cy.get('spartan-input-file input[capsInput]')
			.should('have.attr', 'type', 'file')
			.selectFile({ contents: Cypress.Buffer.from('image contents'), fileName: 'picture.png', mimeType: 'image/png' });
		cy.get('spartan-input-file input[capsInput]').should(($input) => {
			const element = $input[0] as HTMLInputElement;
			expect(element.files?.[0].name).to.equal('picture.png');
		});
		cy.get('spartan-input-field input[capsInput]').should(($input) => {
			const ids = $input.attr('aria-describedby')?.split(' ') ?? [];
			expect(ids).to.have.length.greaterThan(0);
			for (const id of ids) expect($input[0].ownerDocument.getElementById(id)).not.to.equal(null);
		});
	});

	it('keeps native text entry and signal form bindings working', () => {
		cy.get('spartan-input-form input#form-name').clear();
		cy.get('spartan-input-form input#form-name').type('Capsule');
		cy.get('spartan-input-form input#form-email').clear();
		cy.get('spartan-input-form input#form-email').type('capsule@example.com');
		cy.get('spartan-input-form button').contains('Cancel').click();
		cy.get('spartan-input-form input#form-name').should('have.value', '');
		cy.get('spartan-input-form input#form-email').should('have.value', '');
	});

	it('inherits RTL direction while retaining the native password control', () => {
		cy.get('spartan-input-rtl caps-field').invoke('attr', 'dir', 'rtl');
		cy.get('spartan-input-rtl input[capsInput]')
			.should('have.attr', 'type', 'password')
			.and('have.css', 'direction', 'rtl')
			.type('secret');
		cy.get('spartan-input-rtl input[capsInput]').should('have.value', 'secret');
		cy.checkA11y({ include: [['spartan-input-rtl']] }, undefined, logViolations);
	});
});
