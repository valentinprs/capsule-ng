import 'cypress-real-events/support';

const examples = {
	card: [
		'spartan-card-preview',
		'spartan-card-density-preview',
		'spartan-card-width-preview',
		'spartan-card-max-width-preview',
		'spartan-card-spacing',
		'spartan-card-edge-to-edge',
		'spartan-card-image-preview',
		'spartan-card-rtl',
	],
	separator: [
		'spartan-separator-preview',
		'spartan-separator-vertical',
		'spartan-separator-menu',
		'spartan-separator-list',
		'spartan-separator-rtl',
	],
	'aspect-ratio': [
		'spartan-aspect-ratio-preview',
		'spartan-aspect-ratio-square',
		'spartan-aspect-ratio-portrait',
		'spartan-aspect-ratio-rtl',
	],
};

for (const family of ['card', 'separator', 'aspect-ratio'] as const) {
	describe(`Capsule ${family} catalogue`, () => {
		beforeEach(() => {
			cy.visit(`/components/${family}`);
			for (const example of examples[family]) cy.get(example, { timeout: 120000 }).should('not.have.attr', 'ngh');
			cy.injectAxe();
		});
		for (const theme of ['light', 'dark']) {
			for (const width of [375, 1280]) {
				it(`preserves semantics and responsive composition at ${width}px in ${theme}`, () => {
					cy.viewport(width, 900);
					cy.get('html').invoke('toggleClass', 'dark', theme === 'dark');
					// Native controls animate their inherited text color when the theme changes.
					// Audit the finished theme, not an intermediate frame with light surfaces/dark text tokens.
					cy.document().then((document) => {
						document.documentElement.getBoundingClientRect();
						return Promise.all(
							document
								.getAnimations()
								.filter((animation) => Number.isFinite(animation.effect?.getTiming().iterations))
								.map((animation) => animation.finished.catch(() => undefined)),
						);
					});
					cy.checkA11y({ include: examples[family].map((example) => [example]) }, undefined, (violations) => {
						cy.task(
							'table',
							violations.map(({ id, nodes }) => ({
								id,
								details: nodes.map((node) => node.failureSummary).join('; '),
								targets: nodes.map((node) => node.target.join(' ')).join('; '),
							})),
						);
					});
					cy.get(examples[family].join(',')).find('button button, a a, label label').should('not.exist');
					if (family === 'aspect-ratio') {
						cy.get('spartan-aspect-ratio-preview caps-aspect-ratio').then(($ratio) => {
							const bounds = $ratio[0].getBoundingClientRect();
							expect(bounds.width / bounds.height).to.be.closeTo(16 / 9, 0.02);
							expect(bounds.width).to.be.lessThan(width);
						});
					}
					if (family === 'card') {
						cy.get('spartan-card-preview caps-card-title > h2').should('contain.text', 'Login to your account');
						cy.get('spartan-card-preview caps-card').should('not.have.attr', 'role');
						cy.get('spartan-card-width-preview [data-width-parent]').each(($parent) => {
							const parentWidth = $parent[0].getBoundingClientRect().width;
							const cards = $parent[0].querySelectorAll('caps-card');
							expect(cards[0].getBoundingClientRect().width).to.be.closeTo(parentWidth, 1);
							expect(cards[1].getBoundingClientRect().width).to.be.lessThan(parentWidth - 10);
						});
						cy.get('spartan-card-max-width-preview caps-card').each(($card, index) => {
							const card = $card[0];
							const parentWidth = card.parentElement!.getBoundingClientRect().width;
							const actualWidth = card.getBoundingClientRect().width;
							expect(actualWidth).to.be.at.most(parentWidth + 1);
							if (index < 3) {
								const rem = parseFloat(getComputedStyle(card.ownerDocument.documentElement).fontSize);
								expect(actualWidth).to.be.closeTo(Math.min(parentWidth, [24, 28, 32][index] * rem), 1);
							}
							expect(card.scrollWidth).to.be.at.most(card.clientWidth + 1);
						});
						cy.get('spartan-card-density-preview caps-card').then(($card) => {
							expect(getComputedStyle($card[0]).paddingTop).to.equal('12px');
							const title = $card[0].querySelector('caps-card-title')!;
							expect(getComputedStyle(title).fontSize).to.equal('14px');
						});
					}
				});
			}
		}
		if (family === 'card') {
			it('activates the native input through its generated Field label and keeps native actions', () => {
				cy.get('spartan-card-preview caps-field-label').first().click();
				cy.get('spartan-card-preview input[type=email]').should('be.focused');
				cy.get('spartan-card-preview button').first().focus();
				cy.realPress('Tab');
				cy.get('spartan-card-preview input[type=email]').should('be.focused');
				cy.get('spartan-card-preview button[type=submit]').should('have.attr', 'form', 'login-form');
			});
		}
	});
}
