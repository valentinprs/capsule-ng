import type { Result } from 'axe-core';

const examples = {
	'input-group': [
		'spartan-input-group-preview',
		'spartan-input-group-icon-preview',
		'spartan-input-group-text-preview',
		'spartan-input-group-button-preview',
		'spartan-input-group-kbd',
		'spartan-input-group-tooltip-preview',
		'spartan-input-group-textarea-preview',
		'spartan-input-group-label-preview',
		'spartan-input-group-dropdown-preview',
		'spartan-input-group-button-group-preview',
		'spartan-input-group-custom-input-preview',
		'spartan-input-group-form-preview',
		'spartan-input-group-spinner-preview',
		'spartan-input-group-rtl',
	],
	'input-otp': [
		'spartan-input-otp-preview',
		'spartan-input-otp-separator',
		'spartan-input-otp-disabled',
		'spartan-input-otp-invalid',
		'spartan-input-otp-form',
		'spartan-input-otp-rtl',
	],
};

const violations = (results: Result[]) => cy.task('log', JSON.stringify(results, null, 2));

describe('Capsule composed inputs', () => {
	for (const slug of ['input-group', 'input-otp'] as const) {
		for (const theme of ['light', 'dark']) {
			for (const width of [390, 1280]) {
				it(`${slug} hydrates and is accessible in ${theme} at ${width}px`, () => {
					cy.viewport(width, 900);
					cy.visit(`/components/${slug}`);
					for (const example of examples[slug]) cy.get(example).should('not.have.attr', 'ngh');
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					cy.document().then((doc) =>
						cy.wrap(
							Promise.allSettled(
								doc
									.getAnimations()
									.filter((animation) => {
										const timing = animation.effect?.getComputedTiming();
										// Scroll-driven scrollbar animations have no time-based finish promise.
										return typeof timing?.endTime === 'number' && Number.isFinite(timing.endTime);
									})
									.map((animation) => animation.finished),
							),
						),
					);
					cy.injectAxe();
					cy.checkA11y({ include: examples[slug].map((example) => [example]) }, undefined, violations);
					cy.get(examples[slug][0]).should(($example) => {
						const control = $example[0].querySelector(`caps-${slug}`)!;
						const rect = control.getBoundingClientRect();
						expect(rect.left).to.be.at.least(0);
						expect(rect.right).to.be.at.most(width);
					});
				});
			}
		}
	}

	it('keeps InputGroup editing and action semantics on native controls', () => {
		cy.visit('/components/input-group');
		cy.get('spartan-input-group-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-input-group-preview input').type('Capsule');
		cy.get('spartan-input-group-preview input').should('have.value', 'Capsule');
		cy.get('spartan-input-group-preview caps-input-group').should(($group) => {
			expect(getComputedStyle($group[0]).boxShadow).not.to.equal('none');
		});
		cy.get('spartan-input-group-label-preview label[for="email-2"]').click();
		cy.get('#email-2').should('be.focused');
		cy.get('spartan-input-group-label-preview label button').should('not.exist');
		cy.get('spartan-input-group-custom-input-preview textarea').type('A longer message');
		cy.get('spartan-input-group-custom-input-preview textarea').should('have.value', 'A longer message');
	});

	it('uses one OTP input with native keyboard editing and decorative slots', () => {
		cy.visit('/components/input-otp');
		cy.get('spartan-input-otp-preview').should('not.have.attr', 'ngh');
		cy.get('spartan-input-otp-preview input').should('have.length', 1).type('123456');
		cy.get('spartan-input-otp-preview input').should('have.value', '123456');
		cy.get('spartan-input-otp-preview caps-input-otp-slot')
			.should('have.length', 6)
			.and('have.attr', 'aria-hidden', 'true');
		cy.get('spartan-input-otp-preview input').type('{leftarrow}{backspace}');
		cy.get('spartan-input-otp-preview input').should('have.value', '12346');
		cy.get('spartan-input-otp-disabled input').should('be.disabled').and('have.value', '123456');
		cy.get('spartan-input-otp-rtl label').click();
		cy.get('spartan-input-otp-rtl input').should('be.focused');
	});
	it('preserves the composed password label, focus, value and visibility action in Signal Forms', () => {
		cy.visit('/forms/signal-forms');
		cy.get('spartan-signal-form-custom-control-demo').should('not.have.attr', 'ngh');
		cy.get('spartan-signal-form-custom-control-demo label[for="password"]').click();
		cy.get('spartan-signal-form-custom-control-demo spartan-password-input input')
			.should('be.focused')
			.and('have.attr', 'type', 'password')
			.type('Capsule-test-35');
		cy.get('spartan-signal-form-custom-control-demo spartan-password-input button')
			.should('have.attr', 'type', 'button')
			.and('have.attr', 'aria-label', 'Show password')
			.click();
		cy.get('spartan-signal-form-custom-control-demo spartan-password-input input')
			.should('have.attr', 'type', 'text')
			.and('have.value', 'Capsule-test-35');
		cy.get('spartan-signal-form-custom-control-demo spartan-password-input button').should(
			'have.attr',
			'aria-label',
			'Hide password',
		);
		cy.get('spartan-signal-form-custom-control-demo label button').should('not.exist');
		cy.injectAxe();
		cy.checkA11y('spartan-signal-form-custom-control-demo', undefined, violations);
	});
	for (const [route, selectors] of [
		['/', ['spartan-button-group-input-group', 'spartan-input-group-button-example']],
		['/components/button-group', ['spartan-button-group-input-group']],
		['/components/spinner', ['spartan-spinner-input-group-preview']],
	] as const) {
		it(`names composed actions and keeps status readable on ${route}`, () => {
			cy.viewport(1280, 900);
			cy.visit(route);
			for (const selector of selectors) cy.get(selector).should('not.have.attr', 'ngh');
			cy.injectAxe();
			cy.checkA11y({ include: selectors.map((selector) => [selector]) }, undefined, violations);
		});
	}
});
