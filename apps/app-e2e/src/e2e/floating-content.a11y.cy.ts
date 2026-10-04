import '@testing-library/cypress/add-commands';
import 'cypress-real-events';

const settled = () =>
	cy
		.get('.caps-floating-content')
		.should('have.attr', 'data-state', 'open')
		.then(($panel) => cy.wrap(Promise.all($panel[0].getAnimations().map((animation) => animation.finished))));

const examples = {
	popover: ['spartan-popover-preview', 'spartan-popover-basic', 'spartan-popover-align', 'spartan-popover-rtl-preview'],
	tooltip: [
		'spartan-tooltip-preview',
		'spartan-tooltip-simple',
		'spartan-tooltip-group',
		'spartan-tooltip-position',
		'spartan-tooltip-disabled',
		'spartan-tooltip-template',
		'spartan-tooltip-disabled-button-with-tooltip',
		'spartan-tooltip-rtl-preview',
	],
	'hover-card': ['spartan-hover-card-preview', 'spartan-hover-card-rtl-preview'],
};

describe('Capsule floating catalogue', () => {
	for (const slug of ['popover', 'tooltip', 'hover-card'] as const) {
		for (const theme of ['light', 'dark']) {
			for (const width of [390, 1280]) {
				it(`${slug} hydrates and is accessible in ${theme} at ${width}px`, () => {
					cy.viewport(width, 900);
					cy.visit(`/components/${slug}`);
					for (const example of examples[slug]) cy.get(example).should('not.have.attr', 'ngh');
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					cy.injectAxe();
					cy.checkA11y({ include: examples[slug].map((example) => [example]) }, undefined, (violations) =>
						cy.task('log', JSON.stringify(violations, null, 2)),
					);
					if (slug === 'popover') {
						const trigger = 'spartan-popover-preview [capsPopoverTrigger]';
						cy.get(trigger).click();
						cy.findByRole('dialog', { name: 'Open Popover' }).should('be.visible');
						cy.get('.caps-popover-content').should('contain.text', 'Dimensions').and('have.class', 'w-80');
						settled();
						cy.checkA11y('.cdk-overlay-container', undefined, (violations) =>
							cy.task('log', JSON.stringify(violations, null, 2)),
						);
						cy.get('[role="dialog"] input').first().should('be.focused');
						cy.realPress('Escape');
						cy.get('[role="dialog"]').should('not.exist');
						cy.get(trigger).should('be.focused');
						cy.realPress('Enter');
						cy.findByRole('dialog').should('be.visible');
						cy.realPress('Escape');
					} else if (slug === 'tooltip') {
						const trigger = 'spartan-tooltip-preview [capsTooltip]';
						cy.get(trigger).focus();
						cy.findByRole('tooltip').should('contain.text', 'Add to library').and('be.visible');
						cy.get(trigger).should('be.focused');
						settled();
						cy.checkA11y('.cdk-overlay-container', undefined, (violations) =>
							cy.task('log', JSON.stringify(violations, null, 2)),
						);
						cy.realPress('Escape');
						cy.get('[role="tooltip"]').should('not.exist');
						cy.get(trigger).should('be.focused');
					} else {
						const trigger = 'spartan-hover-card-preview a[capsHoverCardTrigger]';
						cy.get(trigger).should('have.attr', 'href', 'https://analogjs.org').focus();
						cy.get('.caps-hover-card-content').should('contain.text', 'Angular meta-framework').and('be.visible');
						cy.get(trigger).should('be.focused');
						settled();
						cy.checkA11y('.cdk-overlay-container', undefined, (violations) =>
							cy.task('log', JSON.stringify(violations, null, 2)),
						);
						cy.realPress('Escape');
						cy.get('.caps-hover-card-content').should('not.exist');
					}
				});
			}
		}
	}
	it('supports disabled wrapper focus, template text and the mobile native menu', () => {
		cy.visit('/components/tooltip');
		cy.get('spartan-tooltip-disabled-button-with-tooltip').should('not.have.attr', 'ngh');
		cy.get('spartan-tooltip-disabled-button-with-tooltip [tabindex="0"]').scrollIntoView();
		cy.get('spartan-tooltip-disabled-button-with-tooltip [tabindex="0"]').focus();
		cy.findByRole('tooltip').should('contain.text', 'Simple tooltip');
		cy.realPress('Escape');
		cy.get('spartan-tooltip-template button').focus();
		cy.findByRole('tooltip').should('contain.text', 'Add to library');
		cy.realPress('Escape');
		cy.viewport(390, 844);
		cy.visit('/');
		cy.get('spartan-mobile-nav').should('not.have.attr', 'ngh');
		cy.get('spartan-mobile-nav [capsPopoverTrigger]').click();
		cy.findByRole('dialog').should('be.visible');
		cy.contains('[role="dialog"] a', 'Popover').click();
		cy.url().should('include', '/components/popover');
		cy.get('spartan-mobile-nav [capsPopoverTrigger]').should('have.attr', 'aria-expanded', 'false');
	});
});
