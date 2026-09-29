import type { Result } from 'axe-core';

/**
 * Axe accessibility check of the breadcrumb docs page (issue #7).
 *
 * The audit is scoped to the breadcrumb content - the preview and every example - so that
 * violations in the surrounding site chrome (header, sidebar, code tabs, API docs) do not mask or
 * fail the breadcrumb check. The site chrome is not part of the caps component contract.
 */
const PAGE = '/components/breadcrumb';

/*
 * `landmark-unique` is disabled: the docs page renders four standalone breadcrumb demos, each one
 * a `navigation` landmark with the default `aria-label="breadcrumb"`. On a real page there is a
 * single breadcrumb; when there are several, the consumer names them via the `aria-label` input.
 * Every other rule (roles, aria-current, names, contrast, ...) stays enabled.
 */

const EXAMPLES = [
	'spartan-breadcrumb-preview',
	'spartan-breadcrumb-dropdown',
	'spartan-breadcrumb-collapsed',
	'spartan-breadcrumb-rtl',
];

function logViolations(violations: Result[]): void {
	cy.task('log', `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} detected`);
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

function visitBreadcrumbPage(): void {
	cy.visit(PAGE);
	for (const example of EXAMPLES) {
		// The page is server-rendered; Angular removes the `ngh` attribute once a component is
		// hydrated. Wait for it so interactions and the audit run against the live app. On a cold dev
		// server the client bundle is also compiled on demand, so hydration can take well over 20s.
		cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
		cy.get(`${example} caps-breadcrumb`).should('exist');
	}
	cy.injectAxe();
	cy.configureAxe({ rules: [{ id: 'landmark-unique', enabled: false }] });
}

describe('breadcrumb docs page accessibility', () => {
	beforeEach(() => visitBreadcrumbPage());

	it('renders every example with the breadcrumb roles and aria-current', () => {
		for (const example of EXAMPLES) {
			cy.get(`${example} caps-breadcrumb`).should('have.attr', 'role', 'navigation');
			cy.get(`${example} caps-breadcrumb [aria-current="page"]`).should('have.length', 1);
		}
		cy.get('spartan-breadcrumb-rtl').should('have.attr', 'dir', 'rtl');
	});

	it('has no axe violations in the preview and the examples', () => {
		cy.checkA11y({ include: EXAMPLES.map((example) => [example]) }, undefined, logViolations);
	});

	it('has no axe violations with the dropdown example menu open', () => {
		cy.get('spartan-breadcrumb-dropdown button[capsButton]').as('trigger');
		cy.get('@trigger').should('have.attr', 'aria-haspopup');
		cy.get('@trigger').click();
		cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
		cy.get('[role="menu"]').should('be.visible');

		cy.checkA11y({ include: [['spartan-breadcrumb-dropdown'], ['[role="menu"]']] }, undefined, logViolations);
	});
});
