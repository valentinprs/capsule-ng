import type { Result } from 'axe-core';

const examples = {
	checkbox: 'spartan-checkbox-preview',
	'radio-group': 'spartan-radio-group-preview',
	switch: 'spartan-switch-preview',
};

function logViolations(violations: Result[]): void {
	cy.task(
		'table',
		violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target).join(', ') })),
	);
}

for (const [component, preview] of Object.entries(examples)) {
	describe(`Capsule ${component} catalogue`, () => {
		beforeEach(() => {
			cy.visit(`/components/${component}`);
			cy.get(preview, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.injectAxe();
		});

		for (const theme of ['light', 'dark']) {
			for (const width of [390, 1280]) {
				it(`is accessible and fits at ${width}px in ${theme}`, () => {
					cy.viewport(width, 900);
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					cy.get(preview).scrollIntoView();
					cy.checkA11y(preview, undefined, logViolations);
					cy.get(preview).should(($preview) => {
						const rect = $preview[0].getBoundingClientRect();
						expect(rect.left).to.be.at.least(0);
						expect(rect.right).to.be.at.most(width);
					});
					cy.get(preview).screenshot(`form-choices-${component}-${theme}-${width}`);
				});
			}
		}

		it('activates the native control through its visible label', () => {
			if (component === 'checkbox') {
				cy.contains(`${preview} label`, 'Accept terms and conditions').first().click();
				cy.get(`${preview} button[role="checkbox"]`).first().should('have.attr', 'aria-checked', 'true');
				cy.get(`${preview} button[role="checkbox"]:disabled`).should('have.length', 1);
			} else if (component === 'switch') {
				cy.contains(`${preview} label`, 'Airplane mode').click();
				cy.get(`${preview} button[role="switch"]`).should('have.attr', 'aria-checked', 'true');
			} else {
				cy.contains(`${preview} label`, 'Compact').click();
				cy.get(`${preview} input[value="compact"]`).should('be.checked');
				cy.get(`${preview} input[value="comfortable"]`).should('not.be.checked');
				cy.get(`${preview} input[value="default"]`).should('be.disabled');
			}
		});
	});
}
