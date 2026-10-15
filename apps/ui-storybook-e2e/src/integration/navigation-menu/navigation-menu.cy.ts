// cypress-real-events sends keyboard input as CDP `rawKeyDown`, which is dropped when the spec runs
// without window focus. Our navigation-menu moves focus imperatively from its Tab/Arrow handlers
// (preventDefault + .focus()), so dispatching a native KeyboardEvent on the focused element
// exercises the real behaviour reliably. A native event (not jQuery's .trigger) is required so
// Angular's `keydown.arrowDown` host binding sees the right `event.key`.
const TAB: KeyboardEventInit = { key: 'Tab' };
const pressKey = (init: KeyboardEventInit) =>
	cy.focused().then(($el) => {
		$el[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init }));
	});

describe('navigation-menu', () => {
	const checkA11y = () =>
		cy.checkA11y('#storybook-root', {
			rules: {
				'page-has-heading-one': { enabled: false },
				'landmark-one-main': { enabled: false },
			},
		});

	const readyNavigation = () => {
		cy.get('#storybook-root caps-navigation-menu').should('exist');
		cy.get('#storybook-root').should(($root) => {
			expect($root[0].closest('[ngh]')).to.equal(null);
			expect($root[0].querySelector('[ngh]')).to.equal(null);
		});
		cy.document().then((doc) => doc.fonts.ready);
		cy.window().then(
			(win) => new Promise((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(resolve))),
		);
	};

	const openHome = () => {
		cy.findByRole('button', { name: /home/i }).realHover();
		cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-expanded', 'true');
	};

	describe('default (open on hover)', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=navigation-menu--default');
			cy.injectAxe();
			cy.viewport(1000, 1000);
			readyNavigation();
		});

		it('has no a11y violations and wires aria-expanded/controls only while open', () => {
			checkA11y();

			cy.findByRole('button', { name: /home/i })
				.should('have.attr', 'aria-expanded', 'false')
				.and('not.have.attr', 'aria-controls');

			openHome();
			cy.findByRole('link', { name: /introduction/i }).should('be.visible');
			cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-controls');
		});

		it('marks only the explicit current destination and checks the opened Capsule panel', () => {
			cy.findByRole('link', { name: /^docs$/i })
				.should('have.attr', 'href', '/docs')
				.and('have.attr', 'aria-current', 'page');
			openHome();
			cy.findByRole('link', { name: /introduction/i }).should('not.have.attr', 'aria-current');
			cy.get('.caps-navigation-menu-content').should('have.attr', 'role', 'group');
			cy.checkA11y('.caps-navigation-menu-content', {
				rules: { 'page-has-heading-one': { enabled: false }, 'landmark-one-main': { enabled: false } },
			});
		});

		it('keeps opened navigation inside a mobile viewport in light and dark themes', () => {
			cy.viewport(390, 844);
			for (const theme of ['light', 'dark']) {
				cy.document().then((doc) => {
					for (const el of doc.querySelectorAll('.light,.dark')) el.classList.remove('light', 'dark');
					doc.documentElement.classList.add(theme);
					doc.body.classList.add(theme);
				});
				// Escape closes the panel while the pointer remains over Home; produce a new hover entry.
				cy.get('body').realHover({ position: 'bottomRight' });
				openHome();
				cy.get('.caps-navigation-menu-content')
					.should('be.visible')
					.then((panel) => {
						const rect = panel[0].getBoundingClientRect();
						expect(rect.left).to.be.at.least(0);
						expect(rect.right).to.be.at.most(390);
					});
				cy.checkA11y('.caps-navigation-menu-content');
				cy.findByRole('link', { name: /introduction/i }).focus();
				pressKey({ key: 'Escape' });
				cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-expanded', 'false');
			}
		});

		it('renders a single chevron per trigger', () => {
			cy.findByRole('button', { name: /home/i }).find('ng-icon').should('have.length', 1);
		});

		it('enters the panel with ArrowDown', () => {
			openHome();

			cy.findByRole('button', { name: /home/i }).focus();
			pressKey({ key: 'ArrowDown' });
			cy.findByRole('link', { name: /Capsule/i }).should('be.focused');
		});

		it('enters the panel when tabbing from the trigger', () => {
			openHome();

			cy.findByRole('button', { name: /home/i }).focus();
			pressKey(TAB);
			cy.findByRole('link', { name: /Capsule/i }).should('be.focused');
		});

		it('walks through the panel items with Tab / Shift+Tab', () => {
			openHome();

			cy.findByRole('link', { name: /Capsule/i }).focus();
			pressKey(TAB);
			cy.findByRole('link', { name: /introduction/i }).should('be.focused');

			pressKey({ ...TAB, shiftKey: true });
			cy.findByRole('link', { name: /Capsule/i }).should('be.focused');
		});

		it('keeps focus in the menu when tabbing past the last item (issue #1484)', () => {
			openHome();

			// Tab once more after the final dropdown link - this used to drop focus out of the nav.
			cy.findByRole('link', { name: /typography/i }).focus();
			pressKey(TAB);

			cy.findByRole('button', { name: /components/i }).should('be.focused');
			cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-expanded', 'false');
		});

		it('returns focus to the trigger on Shift+Tab from the first item', () => {
			openHome();

			cy.findByRole('link', { name: /Capsule/i }).focus();
			pressKey({ ...TAB, shiftKey: true });
			cy.findByRole('button', { name: /home/i }).should('be.focused');
		});

		it('closes on Escape and restores focus to the trigger', () => {
			openHome();

			cy.findByRole('link', { name: /introduction/i }).focus();
			pressKey({ key: 'Escape' });

			cy.findByRole('button', { name: /home/i }).should('be.focused').and('have.attr', 'aria-expanded', 'false');
		});
	});

	describe('click to open', () => {
		beforeEach(() => {
			cy.visit('/iframe.html?id=navigation-menu--click-to-open');
			cy.injectAxe();
			cy.viewport(1000, 1000);
			readyNavigation();
		});

		it('opens on click and toggles closed on a second click', () => {
			cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-expanded', 'false');

			cy.findByRole('button', { name: /home/i }).click();
			cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-expanded', 'true');
			cy.findByRole('link', { name: /introduction/i }).should('be.visible');

			cy.findByRole('button', { name: /home/i }).click();
			cy.findByRole('button', { name: /home/i }).should('have.attr', 'aria-expanded', 'false');
		});
	});
});
