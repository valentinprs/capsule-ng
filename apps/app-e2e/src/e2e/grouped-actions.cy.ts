import 'cypress-real-events';

describe('Capsule grouped actions', () => {
	for (const family of ['toggle', 'toggle-group', 'button-group']) {
		it(`server-renders and hydrates all ${family} examples with native controls`, () => {
			cy.request(`/components/${family}`).then((response) => {
				const html = Cypress.$(response.body);
				expect(html.find(family === 'toggle' ? 'button[capstoggle]' : `caps-${family}`).length).to.be.greaterThan(0);
			});
			cy.visit(`/components/${family}`);
			cy.get(`spartan-${family}-preview`).should('not.have.attr', 'ngh');
			cy.get('main')
				.find('hlm-toggle-group,hlm-button-group,[hlmToggle],[hlmToggleGroupItem],[hlmButtonGroup]')
				.should('not.exist');
			cy.get('main').find('button button,button a,a button,a a,label label').should('not.exist');
			cy.injectAxe();
			cy.get('main .preview').each((preview) =>
				cy.checkA11y(preview[0], undefined, (violations) => {
					cy.task(
						'log',
						JSON.stringify(
							violations.map(({ id, nodes }) => ({ id, nodes })),
							null,
							2,
						),
					);
				}),
			);
		});
	}
	it('keeps standalone toggle native pressed state and disabled buttons', () => {
		cy.visit('/components/toggle');
		cy.get('spartan-toggle-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-toggle-preview button').should('have.attr', 'aria-pressed', 'false').focus();
		cy.realPress('Enter');
		cy.get('spartan-toggle-preview button').should('have.attr', 'aria-pressed', 'true');
		cy.realPress('Space');
		cy.get('spartan-toggle-preview button').should('have.attr', 'aria-pressed', 'false');
		cy.get('spartan-toggle-disabled button').should('be.disabled');
	});
	it('hydrates signal form selection and names the custom group through Field', () => {
		cy.visit('/components/toggle-group');
		cy.get('spartan-toggle-group-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-toggle-group-form caps-toggle-group button').eq(0).should('have.attr', 'aria-pressed', 'true');
		cy.get('spartan-toggle-group-form caps-toggle-group button').eq(1).click();
		cy.get('spartan-toggle-group-form caps-toggle-group button').eq(0).should('have.attr', 'aria-pressed', 'false');
		cy.get('spartan-toggle-group-form caps-toggle-group button').eq(1).should('have.attr', 'aria-pressed', 'true');
		cy.get('spartan-toggle-group-custom caps-toggle-group')
			.invoke('attr', 'aria-labelledby')
			.then((id) => cy.get(`label[id="${id}"]`).should('have.text', 'Font Weight'));
		cy.get('spartan-toggle-group-disabled button').each((button) => cy.wrap(button).should('be.disabled'));
	});
	it('keeps Carbon stacked/fluid layout and a functional projected popover trigger', () => {
		cy.visit('/components/button-group');
		cy.get('spartan-button-group-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-button-group-orientation caps-button-group').should('have.css', 'flex-direction', 'column');
		cy.get('spartan-button-group-fluid caps-button-group')
			.should('have.attr', 'data-fluid', 'true')
			.and('have.css', 'flex-direction', 'row');
		cy.get('spartan-button-group-popover button[aria-label="Open agent tasks"]').click();
		cy.get('.caps-popover-content[data-state="open"]').should('be.visible').and('contain.text', 'Agent Tasks');
		cy.realPress('Escape');
		cy.get('spartan-button-group-popover button[aria-label="Open agent tasks"]').should('be.focused');
	});
});
