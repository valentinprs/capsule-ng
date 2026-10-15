import { partitionKnownSonnerViolations } from '@capsule-ng/test-support/sonner';
import type { AxeResults } from 'axe-core';
import 'cypress-real-events';
import { nativeClick, visitHydrated } from '../support/sonner';

describe('Capsule Sonner', () => {
	beforeEach(() => visitHydrated('/components/sonner'));
	it('server-renders the public host and hydrates native actions with plain-text content', () => {
		cy.request('/components/sonner').its('body').should('contain', '<caps-toaster');
		nativeClick('spartan-sonner-preview button', 'Show Toast');
		cy.get('[data-sonner-toast]')
			.should('be.visible')
			.and('have.attr', 'role', 'status')
			.and('have.attr', 'aria-live', 'polite');
		cy.get('[data-sonner-toast]').should('contain.text', 'Sunday, December 03, 2023 at 9:00 AM');
		cy.get('[data-sonner-toast]').should('have.attr', 'data-mounted', 'true');
		cy.get('[data-sonner-toaster]').realHover();
		cy.injectAxe();
		cy.window()
			.then((win) => Reflect.get(win, 'axe').run(win.document))
			.then((raw: AxeResults) =>
				cy.document().then((document) => {
					const classified = partitionKnownSonnerViolations(raw.violations, document);
					return cy
						.writeFile(Cypress.config('projectRoot') + '/../../work/sonner56-full-document-axe.json', {
							raw,
							classified,
							html: document.querySelector('caps-toaster')?.outerHTML,
						})
						.then(() => {
							expect(classified.remaining, 'all other full-document axe nodes and checks').to.deep.equal([]);
							expect(classified.missingExpected, 'obsolete Sonner exceptions require review/removal').to.deep.equal([]);
						});
				}),
			);
		cy.get('[data-caps-toast-action]').should('have.attr', 'capsbutton');
		cy.get('[data-caps-toast-action]').focus();
		cy.realPress('Enter');
		cy.get('spartan-sonner-preview').should('contain.text', 'Event creation undone');
		cy.get('[data-sonner-toast]').should('not.exist');
		cy.get('spartan-sonner').find('button button,button a,a button,a a').should('not.exist');
	});
	it('replaces loading by the same ID and supports explicit closing', () => {
		nativeClick('spartan-sonner-preview button', 'Update by ID');
		cy.get('[data-sonner-toast]').should('have.length', 1).and('have.attr', 'data-type', 'loading');
		cy.get('[data-sonner-toast]').should('have.length', 1).and('contain.text', 'Event saved');
		nativeClick('spartan-sonner-preview button', 'Close latest');
		cy.get('[data-sonner-toast]').should('not.exist');
	});
	it('exposes all retained semantic types, promise settlement and all six positions', () => {
		for (const [label, type] of [
			['Default', 'default'],
			['Success', 'success'],
			['Info', 'info'],
			['Error', 'error'],
			['Warning', 'warning'],
		] as const) {
			nativeClick('spartan-sonner-types-example button', label);
			cy.get(`[data-sonner-toast][data-type="${type}"]`).should('exist');
		}
		nativeClick('spartan-sonner-types-example button', 'Promise');
		cy.get('[data-sonner-toast][data-type="loading"]').should('exist');
		cy.contains('[data-sonner-toast]', 'Angular Connect has been created').should('exist');
		for (const label of ['Top Left', 'Top Center', 'Top Right', 'Bottom Left', 'Bottom Center', 'Bottom Right']) {
			const [y, x] = label.toLowerCase().split(' ');
			nativeClick('spartan-sonner-position-example button', label);
			cy.get(`[data-sonner-toaster][data-x-position="${x}"][data-y-position="${y}"] [data-sonner-toast]`).should(
				'exist',
			);
		}
	});
	it('serves Capsule metadata and migrated snippets for every notification consumer', () => {
		cy.request('/data/ui-api/sonner.json').then(({ body }) => {
			expect(body.sonner.caps.CapsToaster.selector).to.equal('caps-toaster');
			expect(Object.keys(body.sonner.caps)).to.deep.equal(['CapsToaster']);
		});
		for (const family of ['sonner', 'questionnaire', 'input-otp', 'sidebar', 'bubble', 'marker', 'message-scroller']) {
			cy.request(`/data/primitives-snippets/${family}.json`).then(({ body }) => {
				expect(JSON.stringify(body)).not.to.match(/@spartan-ng\/(?:brain|helm)\/sonner|HlmToaster|hlm-toaster/);
			});
		}
	});
	for (const width of [390, 1280]) {
		for (const dark of [false, true]) {
			it(`keeps the notification and actions inside the ${width}px ${dark ? 'dark' : 'light'} viewport`, () => {
				cy.viewport(width, 900);
				visitHydrated('/documentation/dark-mode');
				cy.document().then((document) => {
					if (document.documentElement.classList.contains('dark') !== dark) {
						nativeClick('button', 'Toggle theme');
						cy.document().then((next) => {
							// ThemeService toggles system→light, then light→dark.
							if (next.documentElement.classList.contains('dark') !== dark) nativeClick('button', 'Toggle theme');
						});
					}
				});
				cy.document().should((document) => expect(document.documentElement.classList.contains('dark')).to.equal(dark));
				visitHydrated('/components/sonner');
				nativeClick('spartan-sonner-preview button', 'Show Toast');
				cy.get('[data-sonner-toast]')
					.should('be.visible')
					.then(($toast) => {
						const bounds = $toast[0].getBoundingClientRect();
						expect(bounds.left).to.be.at.least(0);
						expect(bounds.right).to.be.at.most(width);
					});
				cy.get('[data-caps-toast-action]').should('be.visible');
				cy.get('[data-close-button]').should('have.attr', 'aria-label', 'Close toast');
				nativeClick('[data-close-button]');
				cy.get('[data-sonner-toast]').should('not.exist');
			});
		}
	}
});
