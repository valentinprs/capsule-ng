describe('Capsule Calendar catalogue', () => {
	beforeEach(() => {
		cy.visit('/components/calendar');
		cy.get('spartan-calendar-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-calendar-multiple').should('not.have.attr', 'ngh');
		cy.injectAxe();
	});
	it('hydrates the public calendar, selects via native buttons and preserves named grids', () => {
		cy.get('spartan-calendar-preview caps-calendar')
			.first()
			.within(() => {
				cy.get('[role=grid]').should('have.attr', 'aria-label');
				cy.get('button[role=gridcell]').filter(':not(:disabled):not([data-outside])').first().as('day').click();
				cy.get('@day').should('have.attr', 'aria-selected', 'true');
				cy.get('button[role=gridcell][tabindex="0"]').focus();
				cy.get('button[role=gridcell][tabindex="0"]').trigger('keydown', { key: 'ArrowRight' });
				cy.get('button[role=gridcell][tabindex="0"]').should('have.focus');
			});
		cy.checkA11y('caps-calendar');
	});
	it('selects multiple days and a range and retains valid month/year grid anatomy', () => {
		cy.get('spartan-calendar-multiple caps-calendar-multi')
			.first()
			.within(() => {
				cy.get('button[role=gridcell]').filter(':not(:disabled):not([data-outside])').eq(10).as('multiDay').click();
				cy.get('@multiDay').should('have.attr', 'aria-selected', 'true');
			});
		cy.get('spartan-calendar-range caps-calendar-range')
			.first()
			.within(() => {
				cy.get('button[role=gridcell]').filter(':not(:disabled):not([data-outside])').eq(10).click();
				cy.get('button[role=gridcell]').filter(':not(:disabled):not([data-outside])').eq(14).click();
				cy.get('[data-range-start=true]').should('have.length', 1);
				cy.get('[data-range-end=true]').should('have.length', 1);
			});
		cy.get('caps-month-year-calendar [role=grid] > [role=row]').should('have.length.greaterThan', 0);
		cy.checkA11y('caps-calendar-multi, caps-calendar-range, caps-month-year-calendar');
	});
	it('serves Capsule snippets and public API for every migrated variant', () => {
		cy.request('/data/primitives-snippets/calendar.json')
			.its('body.calendar')
			.then((snippets) => {
				expect(JSON.stringify(snippets)).to.contain('@capsule-ng/caps/calendar');
				expect(JSON.stringify(snippets)).not.to.match(/@spartan-ng\/(helm|brain)\/calendar|<hlm-calendar/);
			});
		cy.request('/data/ui-api/calendar.json')
			.its('body.calendar.caps')
			.then((api) => {
				expect(Object.keys(api)).to.include.members([
					'CapsCalendar',
					'CapsCalendarMulti',
					'CapsCalendarRange',
					'CapsMonthYearCalendar',
				]);
			});
	});
});
