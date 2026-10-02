import type { Result } from 'axe-core';

const EXAMPLES = [
	'spartan-button-preview',
	'spartan-button-size-preview',
	'spartan-button-default',
	'spartan-button-outline',
	'spartan-button-secondary',
	'spartan-button-ghost',
	'spartan-button-destructive',
	'spartan-button-link',
	'spartan-button-icon',
	'spartan-button-with-icon',
	'spartan-button-rounded-preview',
	'spartan-button-spinner',
	'spartan-button-anchor',
	'spartan-button-rtl-preview',
];

function logViolations(violations: Result[]): void {
	for (const violation of violations) {
		for (const node of violation.nodes) cy.task('log', `${node.target.join(' ')}: ${node.failureSummary}`);
	}
	cy.task(
		'table',
		violations.map(({ id, impact, nodes }) => ({
			id,
			impact,
			nodes: nodes.map((node) => node.target.join(' ')).join(', '),
		})),
	);
}

describe('Capsule button catalogue', { testIsolation: false }, () => {
	before(() => {
		cy.visit('/components/button');
		for (const example of EXAMPLES) {
			cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.get(`${example} [capsButton]`).should('have.class', 'caps-button');
		}
		cy.injectAxe();
	});

	for (const theme of ['light', 'dark']) {
		it(`keeps every example accessible in ${theme} theme`, () => {
			cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
			// A theme change starts color transitions. Audit the settled palette rather than mixing
			// the new background with text colors captured from the previous theme.
			cy.document().then((document) =>
				Promise.all(
					document
						.getAnimations()
						.filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
						.map((animation) => animation.finished.catch(() => undefined)),
				),
			);
			cy.checkA11y({ include: EXAMPLES.map((example) => [example]) }, undefined, logViolations);
		});
	}

	it('renders increasing sizes, focus and disabled loading states', () => {
		cy.get('spartan-button-size-preview button').then(($buttons) => {
			const heights = [0, 2, 4, 6].map((index) => $buttons[index].getBoundingClientRect().height);
			for (let index = 1; index < heights.length; index++) {
				expect(heights[index]).to.be.greaterThan(heights[index - 1]);
			}
		});
		cy.get('spartan-button-outline button').first().focus();
		cy.get('spartan-button-outline button').first().should('be.focused');
		cy.get('spartan-button-outline button')
			.first()
			.should(($button) => {
				expect(getComputedStyle($button[0]).boxShadow).not.to.equal('none');
			});
		cy.get('spartan-button-spinner button').should('be.disabled');
	});

	it('preserves native link semantics for button-styled anchors', () => {
		cy.get('spartan-button-anchor a[capsButton]')
			.should('have.attr', 'href', 'https://github.com/valentinprs/capsule-ng')
			.and('have.attr', 'target', '_blank')
			.and('not.have.attr', 'role');
	});

	it('serves Capsule snippets for every migrated component', () => {
		const legacyImport = /@spartan-ng\/(?:helm|brain)\/(?:button|breadcrumb|input|textarea|label|field)(?:['"/]|$)/;
		const legacySelector =
			/\b(?:hlmBtn|hlmInput|brnInput|hlmTextarea|brnTextarea|hlmLabel|brnLabel|brnField)\b|<\/?(?:hlm|brn)-(?:breadcrumb|field)(?:[\s>-])/;
		for (const component of ['button', 'breadcrumb', 'input', 'textarea', 'label', 'field']) {
			cy.request<Record<string, string>>(`/data/primitives-snippets/${component}.json`).then(({ body }) => {
				expect(Object.keys(body)).not.to.have.length(0);
				for (const [name, code] of Object.entries(body)) {
					expect(code, `${component}/${name}: imports`).not.to.match(legacyImport);
					expect(code, `${component}/${name}: selectors`).not.to.match(legacySelector);
				}
			});
		}
	});
});
