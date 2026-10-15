describe('Capsule Date Picker catalogue', () => {
	beforeEach(() => {
		cy.visit('/components/date-picker');
		cy.get('spartan-date-picker-preview').should('not.have.attr', 'ngh');
		cy.injectAxe();
	});
	it('selects through the public trigger and returns native focus after Escape', () => {
		cy.get('spartan-date-picker-preview caps-date-picker-trigger button').as('trigger').click();
		cy.get('caps-calendar [role=grid]').should('have.attr', 'aria-label');
		cy.get('caps-calendar button[role=gridcell]').filter(':not(:disabled):not([data-outside])').eq(10).click();
		cy.get('@trigger').should('not.have.attr', 'data-placeholder');
		cy.get('body').type('{esc}');
		cy.get('caps-calendar').should('not.exist');
		cy.get('@trigger').should('have.focus');
		cy.checkA11y('spartan-date-picker-preview');
	});
	it('commits native input text, keeps editing stable after Enter, and retains invalid raw text', () => {
		cy.get('spartan-date-picker-input-example input').as('input');
		cy.get('@input').type('15.06.2024{enter}');
		cy.get('@input').should('have.value', '15.06.2024');
		cy.get('@input').blur();
		cy.get('@input').should('have.value', '15 Jun 2024');
		cy.get('@input').clear();
		cy.get('@input').type('not a date');
		cy.get('@input').blur();
		cy.get('@input').should('have.value', 'not a date');
		cy.get('spartan-date-picker-input-example button[aria-label="Clear date"]').click();
		cy.get('@input').should('have.value', '').and('have.focus');
	});
	it('serves all thirteen public snippets and documents inherited native input capabilities', () => {
		cy.request('/data/primitives-snippets/date-picker.json')
			.its('body.date-picker')
			.then((snippets) => {
				expect(Object.keys(snippets)).to.include.members([
					'default',
					'config',
					'format',
					'input',
					'form',
					'formInput',
					'multi',
					'formMulti',
					'range',
					'formRange',
					'monthYear',
					'dateTime',
					'rtl',
				]);
				expect(JSON.stringify(snippets)).to.contain('@capsule-ng/caps/date-picker');
				expect(JSON.stringify(snippets)).not.to.match(/@spartan-ng\/helm\/(date-picker|button|field|input)|<hlm-/);
			});
		cy.request('/data/ui-api/date-picker.json')
			.its('body.date-picker.caps')
			.then((api) => {
				expect(Object.keys(api)).to.include.members([
					'CapsDatePicker',
					'CapsDateRangePicker',
					'CapsDatePickerMulti',
					'CapsMonthYearPicker',
				]);
				expect(api.CapsDatePickerInput.inputs.map((input: { name: string }) => input.name)).to.include.members([
					'inputId',
					'inputValue',
					'showClear',
					'openOnClick',
					'parseDate',
				]);
			});
	});
});
