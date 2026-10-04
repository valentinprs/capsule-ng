describe('select', () => {
	const verifySelectSetup = ({ disabled = false, groups = false } = {}) => {
		// Trigger
		cy.get('[brnselecttrigger]')
			.invoke('attr', 'id')
			.should('match', /^caps-select-/);
		cy.get('[brnselecttrigger]').should('have.attr', 'role', 'combobox');
		cy.get('[brnselecttrigger]').should('have.attr', 'aria-haspopup', 'listbox');
		cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');

		if (!disabled) {
			// Open select
			cy.get('[brnselecttrigger]').click();

			// Listbox
			cy.get('[role="listbox"]').should('have.attr', 'role', 'listbox');

			// Item
			cy.get('caps-select-option').should('have.attr', 'role', 'option');
			cy.get('caps-select-option').should('have.attr', 'aria-selected', 'false');
			cy.get('caps-select-option').should('have.attr', 'aria-disabled', 'false');

			if (groups) {
				cy.get('caps-select-group').each(($group) => {
					cy.wrap($group).should('have.attr', 'role', 'group');
					cy.wrap($group).invoke('attr', 'aria-label').should('not.be.empty');
					cy.wrap($group).find('.caps-select-group-label').invoke('text').should('equal', $group.attr('aria-label'));
				});
			}

			// close select
			cy.get('body').click();
			cy.get('[brnselecttrigger]').should('have.focus');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
		}
	};

	describe('default', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=select--default');
			cy.injectAxe();
		});

		it('click on trigger should open and close it content', () => {
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'true');
			cy.get('body').click();
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
		});

		it('click outside should close the content', () => {
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'true');
			cy.get('body').click();
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
		});

		it('second click on trigger should close the content', () => {
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'true');
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
		});

		it('should close after selecting an option in single mode', () => {
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();

			cy.get('caps-select-option')
				.eq(0)
				.then(($el) => {
					const optionValue = $el.attr('value');
					cy.get('caps-select-option').eq(0).click();
					cy.get('.caps-select-content').should('not.exist');
					cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
					cy.get('[data-slot="select-trigger"]').contains(optionValue, { matchCase: false });
				});
		});
	});

	describe('multiple', () => {
		beforeEach(() => {
			cy.injectAxe();
		});

		it('should stay open after selecting an option in multi mode', () => {
			cy.visit('/iframe.html?id=select--multiple');
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();
			cy.get('.caps-select-content').should('exist');
			cy.get('caps-select-option').eq(0).click();
			cy.get('.caps-select-content').should('exist');
			cy.get('caps-select-option')
				.eq(0)
				.then(($el) => {
					const optionValue = $el.attr('value');
					cy.get('caps-select-option').eq(1).click();
					cy.get('caps-select-option')
						.eq(1)
						.then(($el2) => {
							const optionValue2 = $el2.attr('value');
							cy.get('[data-slot="select-trigger"]').contains(optionValue, { matchCase: false });
							cy.get('[data-slot="select-trigger"]').contains(optionValue2, { matchCase: false });

							cy.get('body').click();
							cy.get('.caps-select-content').should('not.exist');
							cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
						});
				});
		});

		it('should stay open after selecting an option in multi mode', () => {
			cy.visit('/iframe.html?id=select--multiple');
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();
			cy.get('.caps-select-content').should('exist');
			cy.get('caps-select-option').eq(0).click();
			cy.get('.caps-select-content').should('exist');
			cy.get('caps-select-option')
				.eq(0)
				.then(($el) => {
					const optionValue = $el.attr('value');
					cy.get('caps-select-option').eq(1).click();
					cy.get('caps-select-option')
						.eq(1)
						.then(($el2) => {
							const optionValue2 = $el2.attr('value');
							cy.get('[data-slot="select-trigger"]').contains(optionValue, { matchCase: false });
							cy.get('[data-slot="select-trigger"]').contains(optionValue2, { matchCase: false });

							cy.get('[brnselecttrigger]').click();
							cy.get('.caps-select-content').should('not.exist');
							cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
						});
				});
		});

		it('should toggle an item on keypress', () => {
			cy.visit('/iframe.html?id=select--multiple');
			verifySelectSetup();
			cy.get('[brnselecttrigger]').click();

			// select the first item
			cy.get('caps-select-option').eq(0).realType('{enter}');
			cy.get('caps-select-option').eq(0).should('have.attr', 'aria-selected', 'true');

			cy.get('[data-slot="select-trigger"]').contains('Apple', { matchCase: false });

			// deselect the first item
			cy.get('caps-select-option').eq(0).realType('{enter}');

			// check if the first item is deselected
			cy.get('caps-select-option').eq(0).should('have.attr', 'aria-selected', 'false');

			cy.get('[data-slot="select-trigger"]').should('not.contain.text', 'Apple');
		});
	});

	describe('disabled', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=select--default&args=disabled:true');
			cy.injectAxe();
		});

		it('should not open if disabled', () => {
			verifySelectSetup({ disabled: true });
			cy.get('[brnselecttrigger]').should('be.disabled');
			cy.get('[data-slot="select-trigger"]').click({ force: true });
			cy.get('.caps-select-content').should('not.exist');
		});
	});

	describe('disabled option', () => {
		it('should not be able to select a disabled option', () => {
			cy.visit('/iframe.html?id=select--disabled-option');
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').eq(0).should('not.have.attr', 'data-disabled');
			cy.get('[data-testid="banana-option"]').should('have.attr', 'aria-disabled', 'true');
			cy.get('[data-testid="banana-option"]').should('have.attr', 'data-disabled', '');
			cy.get('[data-testid="banana-option"]').click({ force: true });
			cy.get('pre').should('have.text', 'Form Control Value: ""');
			cy.get('caps-select-option').eq(0).click();
			cy.get('pre').should('have.text', 'Form Control Value: "apple"');
		});
	});

	describe('form validation', () => {
		beforeEach(() => {
			cy.injectAxe();
		});

		it('should have form validation classes and reflect control status', () => {
			cy.visit('/iframe.html?id=select--reactive-form-control-with-validation');

			// initial
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on open
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
			cy.get('body').click();

			// no selection
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-matches-spartan-invalid', 'true');

			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').first().click();
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').last().click();
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-dirty', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid', 'true');

			// on real selection
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').eq(0).click();
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-dirty', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
		});

		it('should have initial value set correctly when options are provided in a for loop', () => {
			cy.visit('/iframe.html?id=select--reactive-form-control-with-for-and-initial-value&args=initialValue:banana');

			// initial
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on open
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
			cy.get('[brnselecttrigger]').click();

			// no selection
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on real selection
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').eq(0).click();
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-dirty', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
		});

		it('should have form validation classes and reflect control status with label', () => {
			cy.visit('/iframe.html?id=select--reactive-form-control-with-validation-with-label');

			// initial
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on open
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
			cy.get('[brnselecttrigger]').click();

			// no selection
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-invalid', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-matches-spartan-invalid', 'true');

			// on real selection
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').eq(0).click();
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-dirty', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
		});

		it('should have form validation classes and reflect control status when assigned with initial value', () => {
			cy.visit('/iframe.html?id=select--reactive-form-control-with-validation&args=value:apple');

			// initial
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on open
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
			cy.get('[brnselecttrigger]').click();

			// no selection
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on real selection
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').eq(0).click();
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-dirty', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
		});

		it('should have form validation classes and reflect control status', () => {
			cy.visit('/iframe.html?id=select--reactive-form-control');

			// initial
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on open
			cy.get('[brnselecttrigger]').click();
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-touched');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
			cy.get('[brnselecttrigger]').click();

			// no selection
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-dirty');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');

			// on real selection
			cy.get('[brnselecttrigger]').click();
			cy.get('caps-select-option').eq(0).click();
			cy.get('[brnselecttrigger]').should('have.attr', 'data-touched', 'true');
			cy.get('[brnselecttrigger]').should('have.attr', 'data-dirty', 'true');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'aria-invalid');
			cy.get('[brnselecttrigger]').should('not.have.attr', 'data-matches-spartan-invalid');
		});
	});

	describe('scrollable', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=select--scrollable');
			cy.injectAxe();
		});

		it('should be scrollable', () => {
			verifySelectSetup({ groups: true });
			cy.get('[brnselecttrigger]').click();
			cy.get('.caps-select-content').should('exist');
			cy.get('.caps-select-content').should(($panel) => expect($panel[0].scrollTop).to.equal(0));
			cy.get('.caps-select-content').realMouseWheel({ deltaY: 500 });
			cy.get('.caps-select-content').should(($panel) => expect($panel[0].scrollTop).to.be.greaterThan(0));
			cy.get('.caps-select-content').scrollTo('bottom');
			cy.get('.caps-select-content').should(($panel) => {
				expect(Math.ceil($panel[0].scrollTop + $panel[0].clientHeight)).to.be.at.least($panel[0].scrollHeight);
			});
			cy.get('.caps-select-content').scrollTo('top');
			cy.get('.caps-select-content').should(($panel) => expect($panel[0].scrollTop).to.equal(0));
		});
	});

	describe('falsy value', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=select--falsy-value');
			cy.injectAxe();
		});

		it('should select an option with a falsy value on enter keypress', () => {
			cy.get('[brnselecttrigger]').click();

			cy.realPress('ArrowDown');
			cy.realPress('Enter');

			// the falsy value is committed and the panel closes
			cy.get('.caps-select-content').should('not.exist');
			cy.get('[brnselecttrigger]').should('have.attr', 'aria-expanded', 'false');
			cy.get('[data-testid="value"]').should('contain.text', 'false');
		});
	});
});
