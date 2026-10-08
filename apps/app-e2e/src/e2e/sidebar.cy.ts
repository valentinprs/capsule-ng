import 'cypress-real-events/support';

function visitHydrated(url: string): void {
	cy.visit(url, {
		onBeforeLoad(window) {
			const log = window.console.log;
			window.console.log = (...args: unknown[]) => {
				const message = args.map(String).join(' ');
				if (/^Angular hydrated [1-9]\d* component\(s\)/.test(message))
					Object.defineProperty(window, '__sidebarHydrationReceipt', { value: message, configurable: true });
				log.apply(window.console, args);
			};
		},
	});
	cy.window()
		.its('__sidebarHydrationReceipt')
		.should('match', /^Angular hydrated [1-9]\d* component\(s\)/);
	cy.window().its('ngDevMode.hydratedComponents').should('be.greaterThan', 0);
}

function nativeTheme(dark: boolean): void {
	visitHydrated('/documentation/dark-mode');
	cy.document().then((document) => {
		if (document.documentElement.classList.contains('dark') !== dark) {
			cy.contains('button', 'Toggle theme').scrollIntoView();
			cy.contains('button', 'Toggle theme').click();
			cy.document().then((fresh) => {
				if (fresh.documentElement.classList.contains('dark') !== dark) {
					cy.contains('button', 'Toggle theme').scrollIntoView();
					cy.contains('button', 'Toggle theme').click();
				}
			});
		}
	});
	cy.document().should((document) => expect(document.documentElement.classList.contains('dark')).to.equal(dark));
}

describe('Capsule Sidebar public navigation', () => {
	for (const dark of [false, true]) {
		it(`keeps native navigation and collapse usable on desktop in ${dark ? 'dark' : 'light'} theme`, () => {
			cy.viewport(1280, 900);
			cy.clearCookie('sidebar_state');
			nativeTheme(dark);
			visitHydrated('/sidebar-preview/sidebar-collapsable-icons');
			cy.document().then(async (document) => {
				const inter = await document.fonts.load('16px Inter');
				expect(inter.length).to.be.greaterThan(0);
				const mono = await document.fonts.load('14px "Geist Mono"');
				expect(mono.length).to.be.greaterThan(0);
				await document.fonts.ready;
			});
			cy.get('caps-sidebar nav ul').each(($list) => {
				expect(Array.from($list[0].children).every((child) => child.tagName === 'LI')).to.equal(true);
			});
			cy.get('caps-sidebar-inset button[capsSidebarTrigger]').last().click();
			cy.get('caps-sidebar[data-collapsible="icon"]').should('exist');
			cy.get('caps-sidebar nav').first().find('a[href]').first().should('have.attr', 'href');
			cy.document().then((document) => expect(document.documentElement.scrollWidth).to.be.at.most(1280));
			cy.injectAxe();
			cy.checkA11y('caps-sidebar-wrapper');
		});
	}
	it('opens a named mobile Sheet, closes the nested menu first and restores native trigger focus', () => {
		cy.viewport(390, 844);
		cy.clearCookie('sidebar_state');
		visitHydrated('/sidebar-preview/sidebar-collapsable-icons');
		cy.get('caps-sidebar[data-mobile="true"]').should('exist');
		cy.get('caps-sidebar-inset button[capsSidebarTrigger]').last().scrollIntoView();
		cy.get('caps-sidebar-inset button[capsSidebarTrigger]').last().click();
		cy.get('[role="dialog"]').should('have.attr', 'aria-labelledby');
		cy.get('[role="dialog"] caps-sheet-title').should('contain', 'Sidebar');
		cy.get('[role="dialog"] button[aria-haspopup="menu"]').last().scrollIntoView();
		cy.get('[role="dialog"] button[aria-haspopup="menu"]').last().click();
		cy.get('[role="menu"]').should('exist');
		cy.realPress('Escape');
		cy.get('[role="menu"]').should('not.exist');
		cy.get('[role="dialog"]').should('exist');
		cy.realPress('Escape');
		cy.get('[role="dialog"]').should('not.exist');
		cy.get('caps-sidebar-inset button[capsSidebarTrigger]').last().should('have.focus');
	});
	it('keeps RTL navigation native and within the mobile viewport', () => {
		cy.viewport(390, 844);
		cy.clearCookie('sidebar_state');
		visitHydrated('/sidebar-preview/sidebar-rtl');
		cy.get('caps-sidebar-inset button[capsSidebarTrigger]').last().click();
		cy.get('[role="dialog"] a[href]').first().should('have.attr', 'href');
		cy.document().then((document) => expect(document.documentElement.scrollWidth).to.be.at.most(390));
		cy.injectAxe();
		cy.checkA11y('[role="dialog"]');
	});
});
