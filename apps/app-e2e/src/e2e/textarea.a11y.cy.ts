import type { Result } from 'axe-core';

const PAGE = '/components/textarea';
const EXAMPLES = [
	'spartan-textarea-preview',
	'spartan-textarea-field',
	'spartan-textarea-disabled',
	'spartan-textarea-invalid',
	'spartan-textarea-button',
	'spartan-textarea-form',
	'spartan-textarea-rtl',
];

function logViolations(violations: Result[]): void {
	cy.task('log', `${violations.length} accessibility violations detected`);
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

describe('Capsule textarea docs accessibility', { testIsolation: false }, () => {
	before(() => {
		cy.visit(PAGE);
		for (const example of EXAMPLES) {
			cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.get(`${example} textarea[capsTextarea]`).should('have.class', 'caps-textarea');
		}
		cy.injectAxe();
	});

	it('keeps native names, descriptions, disabled and forced invalid behavior', () => {
		cy.get('textarea[capsTextarea]').each(($textarea) => {
			expect($textarea.attr('data-slot')).to.equal('textarea');
			expect($textarea.attr('role')).to.equal(undefined);
		});
		cy.get('spartan-textarea-field label').click();
		cy.get('spartan-textarea-field textarea').should('be.focused').and('have.attr', 'aria-describedby');
		cy.get('spartan-textarea-disabled textarea').should('be.disabled');
		cy.get('spartan-textarea-invalid textarea')
			.should('have.attr', 'data-matches-spartan-invalid', 'true')
			.and('not.have.attr', 'aria-invalid');
		cy.get('spartan-textarea-rtl hlm-field').should('have.attr', 'dir', 'rtl');
		cy.get('spartan-textarea-rtl textarea').should('have.css', 'direction', 'rtl');
		cy.get('textarea[capsTextarea]').then(($textareas) => {
			const ids = Array.from($textareas, (textarea) => textarea.id);
			expect(new Set(ids).size).to.equal(ids.length);
		});
	});

	it('keeps multiline editing and native form binding', () => {
		cy.get('spartan-textarea-form textarea').clear();
		cy.get('spartan-textarea-form textarea').type('First line{enter}Second line');
		cy.get('spartan-textarea-form textarea').should('have.value', 'First line\nSecond line').and('not.be.disabled');
	});

	for (const theme of ['light', 'dark']) {
		it(`has accessible examples and focus/invalid styling in the ${theme} theme`, () => {
			cy.document().then((document) => document.documentElement.classList.toggle('dark', theme === 'dark'));
			cy.get('spartan-textarea-preview textarea').focus();
			cy.get('spartan-textarea-preview textarea').should(($textarea) => {
				const styles = getComputedStyle($textarea[0]);
				expect(parseFloat(styles.minHeight)).to.be.at.least(64);
				expect(styles.resize).not.to.equal('none');
				expect(styles.boxShadow).not.to.equal('none');
			});
			cy.get('spartan-textarea-invalid textarea').should(($textarea) => {
				const styles = getComputedStyle($textarea[0]);
				expect(styles.boxShadow).not.to.equal('none');
			});
			// Scope the audit to all component examples; catalogue chrome is outside this primitive.
			cy.checkA11y({ include: EXAMPLES.map((example) => [example]) }, undefined, logViolations);
		});
	}

	it('keeps a usable native row and scroll fallback without content sizing', () => {
		cy.get('spartan-textarea-preview textarea').then(($textarea) => {
			const textarea = $textarea[0];
			// Emulate a browser without content sizing. Rows and overflow remain native.
			textarea.style.setProperty('field-sizing', 'fixed');
			textarea.rows = 5;
		});
		cy.get('spartan-textarea-preview textarea').type('One{enter}Two{enter}Three{enter}Four{enter}Five{enter}Six');
		cy.get('spartan-textarea-preview textarea').should(($textarea) => {
			const textarea = $textarea[0];
			expect(textarea.rows).to.equal(5);
			expect(textarea.clientHeight).to.be.at.least(64);
			expect(textarea.scrollHeight).to.be.at.least(textarea.clientHeight);
			expect(getComputedStyle(textarea).overflowY).not.to.equal('hidden');
		});
	});
});
