import '@testing-library/cypress/add-commands';
import 'cypress-real-events/support';

describe('Capsule dialog catalogue variants', () => {
	for (const family of ['dialog', 'alert-dialog']) {
		for (const theme of ['light', 'dark']) {
			it(`opens and audits every ${family} trigger example in ${theme}`, () => {
				cy.viewport(390, 844);
				cy.visit(`/components/${family}`);
				cy.get(`spartan-${family}-preview`, { timeout: 120000 }).should('not.have.attr', 'ngh');
				cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
				cy.injectAxe();
				const trigger = family === 'dialog' ? '[capsDialogTrigger]' : '[capsAlertDialogTrigger]';
				cy.get(trigger).each(($trigger) => {
					cy.wrap($trigger).click();
					cy.findByRole(family === 'dialog' ? 'dialog' : 'alertdialog').should('be.visible');
					cy.get('caps-dialog-panel').then(($panel) =>
						cy.wrap(Promise.all($panel[0].getAnimations({ subtree: true }).map((animation) => animation.finished))),
					);
					cy.checkA11y('.cdk-overlay-container', { rules: { region: { enabled: false } } });
					cy.realPress('Escape');
					cy.findByRole(family === 'dialog' ? 'dialog' : 'alertdialog').should('not.exist');
				});
			});
		}
	}
});
