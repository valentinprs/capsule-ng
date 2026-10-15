import 'cypress-real-events';
const families = {
	'scroll-area': [
		'spartan-scroll-area-preview',
		'spartan-scroll-area-horizontal-preview',
		'spartan-scroll-area-rtl-preview',
	],
	resizable: [
		'spartan-resizable-example',
		'spartan-resizable-vertical-preview',
		'spartan-resizable-handle-preview',
		'spartan-resizable-dynamic-preview',
		'spartan-resizable-rtl-preview',
	],
};
function waitForHydratedHosts(selector: string) {
	cy.get(selector, { timeout: 120000 }).should(($hosts) => {
		expect($hosts.length).to.be.greaterThan(0);
		for (const host of $hosts.toArray()) {
			expect(host.closest('[ngh]'), 'host and ancestors hydrated').to.equal(null);
			expect(host.querySelector('[ngh]'), 'projected descendants hydrated').to.equal(null);
		}
	});
}
describe('Capsule scroll and resizable catalogue', () => {
	for (const [route, examples] of Object.entries(families))
		for (const theme of ['light', 'dark'])
			for (const width of [1280, 390]) {
				it(`${route} hydrates with named controls and no accessibility failures in ${theme} at ${width}px`, () => {
					cy.viewport(width, 900);
					cy.visit(`/components/${route}`);
					waitForHydratedHosts(examples.join(','));
					cy.document().then((doc) => {
						doc.documentElement.classList.remove('light', 'dark');
						doc.documentElement.classList.add(theme);
					});
					cy.document().then(async (doc) => {
						await doc.fonts.ready;
						const loaded: string[] = [];
						doc.fonts.forEach((face) => {
							if (face.status === 'loaded') loaded.push(face.family);
						});
						expect(loaded.some((family) => family.includes('Inter'))).to.equal(true);
						expect(getComputedStyle(doc.body).fontFamily).to.include('Inter');
					});
					cy.injectAxe();
					cy.checkA11y({ include: examples.map((example) => [example]) });
					cy.get(examples.join(',')).each(($example) => {
						expect($example.find('button button,button a,a button,label label')).to.have.length(0);
						expect($example[0].getBoundingClientRect().width).to.be.at.most(width);
					});
					if (route === 'resizable') {
						const handle = 'spartan-resizable-handle-preview caps-resizable-handle';
						cy.get(handle).scrollIntoView();
						cy.get(handle).focus();
						cy.get(handle).should('be.focused');
						cy.realPress('End');
						cy.get('spartan-resizable-handle-preview caps-resizable-handle').should('have.attr', 'aria-valuenow', '50');
						cy.realPress('Home');
						cy.get('spartan-resizable-handle-preview caps-resizable-handle').should('have.attr', 'aria-valuenow', '20');
					} else {
						const viewport = 'spartan-scroll-area-preview [data-slot=scroll-area-viewport]';
						cy.get(viewport).scrollIntoView();
						cy.get(viewport).focus();
						cy.get(viewport).should('be.focused');
						cy.realPress('ArrowDown');
						cy.get(viewport).should(($el) => expect($el[0].scrollTop).to.be.greaterThan(0));
					}
				});
			}
	it('reconciles panels added and removed by the public Capsule button', () => {
		cy.visit('/components/resizable');
		const group = 'spartan-resizable-dynamic-preview caps-resizable-group';
		waitForHydratedHosts(group);
		cy.get(group).children('caps-resizable-panel').should('have.length', 2);
		cy.contains('spartan-resizable-dynamic-preview button', 'Add panel').click();
		cy.get(group).children('caps-resizable-panel').should('have.length', 3);
		cy.contains('spartan-resizable-dynamic-preview button', 'Remove panel').click();
		cy.get(group).children('caps-resizable-panel').should('have.length', 2);
	});
});
