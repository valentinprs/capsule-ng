import 'cypress-real-events';

const selectExamples = [
	'spartan-select-preview',
	'spartan-select-group-preview',
	'spartan-select-multiple-preview',
	'spartan-select-object-preview',
	'spartan-select-placeholder-preview',
	'spartan-select-scrollable-preview',
	'spartan-select-disabled-preview',
	'spartan-select-invalid-preview',
	'spartan-select-form-preview',
	'spartan-select-rtl',
];
const nativeExamples = [
	'spartan-native-select-preview',
	'spartan-native-select-groups-example',
	'spartan-native-select-disabled-example',
	'spartan-native-select-invalid-example',
	'spartan-native-select-form-example',
	'spartan-native-select-rtl',
];

describe('Capsule selection catalogue', () => {
	for (const [slug, examples] of [
		['select', selectExamples],
		['native-select', nativeExamples],
	] as const) {
		for (const theme of ['light', 'dark']) {
			for (const viewport of [
				[1280, 900],
				[390, 844],
			]) {
				it(`${slug} hydrates and remains accessible in ${theme} at ${viewport[0]}px`, () => {
					cy.viewport(viewport[0], viewport[1]);
					cy.visit(`/components/${slug}`);
					for (const example of examples) cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					cy.injectAxe();
					cy.checkA11y({ include: examples.map((example) => [example]) });
					if (slug === 'select') {
						cy.get('spartan-select-preview [role="combobox"]').click();
						cy.get('[role="listbox"]').should('be.visible');
						cy.checkA11y('.cdk-overlay-container');
						cy.contains('[role="option"]', 'Banana').click();
						cy.get('spartan-select-preview [role="combobox"]').should('contain.text', 'Banana').click();
						cy.contains('[role="option"]', 'Banana').should('have.attr', 'aria-selected', 'true');
						cy.realPress('Escape');
						cy.get('spartan-select-preview [role="combobox"]')
							.should('be.focused')
							.and('have.attr', 'aria-expanded', 'false');
					} else {
						cy.get('spartan-native-select-preview select').select('done');
						cy.get('spartan-native-select-preview select').should('have.value', 'done');
					}
				});
			}
		}
	}
	it('renders forced errors and only styles invalid forms after touch', () => {
		cy.visit('/components/select');
		cy.get('spartan-select-form-preview').should('not.have.attr', 'ngh');
		const trigger = 'spartan-select-form-preview [role="combobox"]';
		cy.get(trigger).should('have.attr', 'aria-invalid', 'true').and('not.have.attr', 'data-matches-spartan-invalid');
		cy.get(trigger)
			.invoke('css', 'border-color')
			.then((pristineBorder) => {
				cy.get(trigger).scrollIntoView();
				cy.get(trigger).focus();
				cy.get(trigger).should('be.focused');
				cy.get(trigger).blur();
				cy.get(trigger)
					.should('have.attr', 'data-matches-spartan-invalid', 'true')
					.and('not.have.css', 'border-color', pristineBorder);
				cy.get('spartan-select-invalid-preview [role="combobox"]')
					.should('have.attr', 'data-matches-spartan-invalid', 'true')
					.and('not.have.attr', 'aria-invalid');
				cy.get('spartan-select-invalid-preview [role="combobox"]').should(
					'not.have.css',
					'border-color',
					pristineBorder,
				);
			});
	});
});
