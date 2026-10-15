import 'cypress-real-events';

describe('Capsule command and key hints', () => {
	beforeEach(() => {
		cy.viewport(1280, 900);
		cy.visit('/components/command');
		cy.get('spartan-command-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-command-preview caps-command').should('be.visible');
		cy.document().then((doc) => doc.defaultView?.focus());
		cy.injectAxe();
	});
	it('filters groups, skips disabled commands and keeps active-descendant input focus', () => {
		cy.get('spartan-command-preview').within(() => {
			cy.get('input').should('have.attr', 'aria-label').and('not.be.empty');
			cy.get('input').focus();
			cy.realPress('ArrowDown');
			cy.get('button[data-selected]').should('contain.text', 'Search Emoji');
			cy.realPress('ArrowDown');
			cy.get('button[data-selected]').should('contain.text', 'Profile');
			cy.focused().should('have.attr', 'role', 'combobox');
			cy.get('input').type('zz-no-command');
			cy.get('caps-command-empty').should('be.visible').and('contain.text', 'No results');
			cy.get('button:visible').should('have.length', 0);
			cy.get('input').clear();
			cy.get('input').type('Billing');
			cy.get('button:visible').should('have.length', 1).and('contain.text', 'Billing');
		});
		cy.checkA11y('spartan-command-preview');
	});
	it('opens a lazy dialog, activates with Enter, closes and restores focus; Escape also closes', () => {
		cy.get('spartan-command-basic button').contains('Open Menu').click();
		cy.get('[role=dialog]').should('contain.text', 'Command Palette');
		cy.focused().should('have.attr', 'role', 'combobox');
		cy.realPress('Enter');
		cy.get('[role=dialog]').should('not.exist');
		cy.focused().should('contain.text', 'Open Menu');
		cy.get('spartan-command-basic button').contains('Open Menu').click();
		cy.checkA11y('[role=dialog]');
		cy.realPress('Escape');
		cy.get('[role=dialog]').should('not.exist');
		cy.focused().should('contain.text', 'Open Menu');
	});
	it('keeps Cmd/Ctrl K in the docs consumer and searches/navigates from the keyboard', () => {
		cy.get('spartan-header spartan-docs-dialog button').first().focus();
		cy.realPress(['Control', 'k']);
		cy.get('[role=dialog]').should('exist');
		cy.focused().should('have.attr', 'role', 'combobox');
		cy.get('[role=dialog] input').type('Breadcrumb');
		cy.get('[role=dialog] button[capsCommandItem]:visible').should('have.length', 1);
		cy.realPress('Enter');
		cy.location('pathname').should('equal', '/components/breadcrumb');
	});
	it('renders every native key hint and supports narrow layouts without adding controls', () => {
		cy.visit('/components/kbd');
		cy.get('spartan-kbd-preview kbd[capsKbd]').should('have.length', 6);
		cy.get('caps-kbd-group').should('exist');
		cy.get('kbd[capsKbd][tabindex]').should('not.exist');
		cy.viewport(390, 844);
		cy.get('spartan-kbd-button-preview button').first().should('be.visible').and('contain.text', 'Accept');
		cy.get('button button, button input, button a, label label').should('not.exist');
		cy.injectAxe();
		cy.checkA11y(
			'spartan-kbd-preview,spartan-kbd-group-preview,spartan-kbd-button-preview,spartan-kbd-input-group-preview',
		);
	});
});
