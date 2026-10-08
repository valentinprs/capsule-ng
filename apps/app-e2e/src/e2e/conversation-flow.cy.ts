import 'cypress-real-events';
// Catalogue runs in DEV. Hydration statistics are distinct from font/layout readiness.
function visitHydrated(url: string): void {
	cy.visit(url, {
		onBeforeLoad(win) {
			const log = win.console.log;
			Reflect.set(win, '__lot26Hydration', '');
			Reflect.set(win, '__lot26NativeEvents', []);
			for (const type of ['pointerdown', 'click', 'focusin', 'keydown'])
				win.document.addEventListener(
					type,
					(event) => {
						const target = event.target as Element;
						Reflect.get(win, '__lot26NativeEvents').push({
							type,
							trusted: event.isTrusted,
							target: target.localName,
							slot: target.getAttribute('data-slot'),
							text: target.textContent?.trim().slice(0, 120),
							key: Reflect.get(event, 'key'),
						});
					},
					true,
				);
			win.console.log = (...args) => {
				const message = args.map(String).join(' ');
				if (/^Angular hydrated [1-9]\d* component\(s\)/.test(message)) Reflect.set(win, '__lot26Hydration', message);
				log.apply(win.console, args);
			};
		},
	});
	cy.window().should((win) => {
		expect(Reflect.get(win, '__lot26Hydration'), 'DEV whenStable/hydration cleanup receipt').to.match(
			/^Angular hydrated [1-9]\d* component\(s\)/,
		);
		expect(Reflect.get(win, 'ngDevMode').hydratedComponents, 'DEV hydrated components').to.be.greaterThan(0);
	});
}
function readyNative(selector: string): void {
	cy.get(selector).then(($control) => $control[0].scrollIntoView({ block: 'center', inline: 'center' }));
	cy.get(selector).then(
		($control) =>
			new Cypress.Promise<void>((resolve, reject) => {
				const element = $control[0],
					win = element.ownerDocument.defaultView!;
				const started = win.performance.now();
				let previous = '',
					stable = 0;
				const sample = () => {
					if (!element.isConnected) return reject(new Error('Native control detached'));
					const ancestors: Element[] = [];
					for (let node: Element | null = element; node; node = node.parentElement) ancestors.push(node);
					const geometry = ancestors.map((node) => {
						const rect = node.getBoundingClientRect();
						return {
							opacity: win.getComputedStyle(node).opacity,
							x: rect.x,
							y: rect.y,
							width: rect.width,
							height: rect.height,
						};
					});
					const pending = ancestors.some((node) =>
						node
							.getAnimations({ subtree: false })
							.some(
								(animation) =>
									Number.isFinite(animation.effect?.getComputedTiming().iterations) &&
									(animation.pending || animation.playState === 'running'),
							),
					);
					const rect = element.getBoundingClientRect(),
						hit = element.ownerDocument.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
					const state = JSON.stringify(geometry),
						ready =
							!pending &&
							geometry.every(
								(item) =>
									(item.opacity.endsWith('%') ? Number(item.opacity.slice(0, -1)) / 100 : Number(item.opacity)) === 1,
							) &&
							rect.width > 0 &&
							rect.height > 0 &&
							!!hit &&
							(hit === element || element.contains(hit));
					stable = ready && state === previous ? stable + 1 : 0;
					previous = state;
					if (stable >= 4) {
						Reflect.get(win, '__lot26NativeEvents').push({
							type: 'ready-native',
							selector,
							geometry,
							hit: hit?.outerHTML.slice(0, 400),
						});
						return resolve();
					}
					if (win.performance.now() - started > 15000)
						return reject(new Error('Native control/ancestors/hit-test not stable: ' + state));
					win.requestAnimationFrame(sample);
				};
				win.requestAnimationFrame(sample);
			}),
	);
}

// Explicit suite configuration overrides inherited CI retries for this contract.
describe('Capsule conversation flow', { retries: 0 }, () => {
	afterEach(function () {
		const name = this.currentTest?.title.replace(/[^a-z0-9]+/gi, '-');
		const output = Cypress.config('projectRoot') + '/../../work/cypress-native-' + name + '-' + Date.now();
		cy.window().then((win) =>
			cy.writeFile(output + '.json', {
				hydration: Reflect.get(win, '__lot26Hydration'),
				statistics: Reflect.get(win, 'ngDevMode'),
				nativeEvents: Reflect.get(win, '__lot26NativeEvents'),
				toasterCount: win.document.querySelectorAll('hlm-toaster').length,
				toastTitles: Array.from(win.document.querySelectorAll('[data-sonner-toast] [data-title]')).map(
					(el) => el.textContent,
				),
			}),
		);
		if (this.currentTest?.state === 'failed')
			cy.document().then((doc) => cy.writeFile(output + '.html', doc.documentElement.outerHTML));
	});
	it('hydrates both family pages and publishes Capsule snippets/API', () => {
		for (const family of ['marker', 'message-scroller']) {
			visitHydrated('/components/' + family);
			cy.get('caps-' + family).should('exist');
			cy.contains('Capsule API').should('exist');
			cy.contains('Helm API').should('not.exist');
			cy.request('/data/primitives-snippets/' + family + '.json')
				.its('body')
				.then((data) => {
					expect(JSON.stringify(data)).to.contain('caps-' + family);
					expect(JSON.stringify(data)).not.to.contain('@spartan-ng/helm/' + family);
				});
			cy.get('button button,button a,a button,a a').should('not.exist');
			cy.get('hlm-toaster').should('have.length', 1);
		}
	});
	it('uses a native Marker keyboard action with decorative status icons', () => {
		visitHydrated('/components/marker');
		const preview = 'spartan-marker-link-button-preview';
		cy.get(preview).scrollIntoView();
		cy.get(preview).should(($root) => expect($root.closest('[ngh]')).to.have.length(0));
		readyNative(preview + ' button[capsMarker]');
		cy.get(preview + ' button[capsMarker]').focus();
		cy.get(preview + ' button[capsMarker]').should('be.focused');
		cy.realPress('Enter');
		cy.contains('[data-sonner-toast] [data-title]', 'You clicked the revert button').should('be.visible');
		cy.get(preview + ' button[capsMarker]').should('have.attr', 'type', 'button');
		cy.get(preview + ' a[capsMarker]').should('have.attr', 'href', '#examples__links_and_buttons');
		cy.get('spartan-marker-status-preview caps-marker-icon').should('have.attr', 'aria-hidden', 'true');
		cy.get('spartan-marker-status-preview caps-spinner').should('have.attr', 'aria-hidden', 'true');
		cy.injectAxe();
		cy.checkA11y(preview);
		cy.checkA11y('spartan-marker-status-preview');
		// Record unfiltered full-document interference separately; no global axe PASS is claimed.
		cy.window()
			.then((win) => Reflect.get(win, 'axe').run(win.document))
			.then((result) =>
				cy.writeFile(
					Cypress.config('projectRoot') + '/../../work/sonner-existing-full-document-axe-' + Date.now() + '.json',
					result,
				),
			);
	});
	it('preserves a visible logical row across real history loading without transcript announcements', () => {
		visitHydrated('/components/message-scroller');
		const preview = 'spartan-message-scroller-load-history-preview';
		const viewport = preview + ' [data-slot="message-scroller-viewport"]';
		let row: Element;
		let offset: number;
		let key: string;
		cy.get(preview).scrollIntoView();
		cy.get(preview).should(($root) => expect($root.closest('[ngh]')).to.have.length(0));
		cy.get(viewport).focus();
		cy.get(viewport).should('be.focused');
		cy.realPress('Home');
		cy.get(viewport).should(($v) => expect($v[0].scrollTop).to.be.lessThan(2));
		cy.get(viewport).then(($v) => {
			const bounds = $v[0].getBoundingClientRect();
			row = Array.from($v[0].querySelectorAll('[data-message-id]')).find(
				(el) => el.getBoundingClientRect().top >= bounds.top - 1,
			)!;
			expect(row, 'existing visible registered row').to.exist;
			key = row.getAttribute('data-message-id')!;
			offset = row.getBoundingClientRect().top - bounds.top;
		});
		readyNative(preview + ' caps-card-footer button');
		cy.contains(preview + ' caps-card-footer button', 'Load History').realClick({
			position: 'center',
			scrollBehavior: false,
		});
		cy.contains(preview + ' button', 'History Loaded').should('be.disabled');
		cy.get(viewport).should(($v) => {
			expect($v[0].contains(row), 'same row instance').to.equal(true);
			expect(row.getAttribute('data-message-id')).to.equal(key);
			expect(Math.abs(row.getBoundingClientRect().top - $v[0].getBoundingClientRect().top - offset)).to.be.lessThan(2);
		});
		cy.get(preview + ' [role="log"]').should('have.attr', 'aria-live', 'off');
		cy.get(preview + ' [data-slot="message-scroller-announcement"]').should(($status) => {
			expect($status.text().trim(), 'no message/history announcement').to.equal('');
		});
		cy.get(preview + ' [data-message-scroller-spacer]').should('have.length', 1);
		cy.injectAxe();
		cy.checkA11y(preview);
		cy.window()
			.then((win) => Reflect.get(win, 'axe').run(win.document))
			.then((result) =>
				cy.writeFile(
					Cypress.config('projectRoot') + '/../../work/scroller-full-document-axe-' + Date.now() + '.json',
					result,
				),
			);
	});
	it('uses native viewport scrolling and jump action with stable focus and owned anatomy', () => {
		visitHydrated('/components/message-scroller');
		const preview = 'spartan-message-scroller-load-history-preview';
		const viewport = preview + ' [data-slot="message-scroller-viewport"]';
		cy.get(preview).scrollIntoView();
		readyNative(preview + ' caps-card-footer button');
		cy.contains(preview + ' caps-card-footer button', 'Load History').realClick({
			position: 'center',
			scrollBehavior: false,
		});
		cy.contains(preview + ' button', 'History Loaded').should('be.disabled');
		cy.get(viewport).should(($v) => expect($v[0].scrollHeight).to.be.greaterThan($v[0].clientHeight + 8));
		cy.get(viewport).focus();
		cy.get(viewport).should('be.focused');
		cy.realPress('Home');
		cy.get(viewport).should(($v) => expect($v[0].scrollTop).to.be.lessThan(2));
		readyNative(preview + ' button[caps-message-scroller-button]');
		cy.get(preview + ' button[caps-message-scroller-button]')
			.should('have.attr', 'data-active', 'true')
			.focus();
		cy.realPress('Enter');
		cy.get(viewport)
			.should('be.focused')
			.and(($v) => expect($v[0].scrollHeight - $v[0].clientHeight - $v[0].scrollTop).to.be.lessThan(9));
		cy.get(preview + ' button[caps-message-scroller-button]')
			.should('have.attr', 'data-active', 'false')
			.and('have.attr', 'tabindex', '-1');
		cy.get(preview + ' [role="log"]').should('have.length', 1);
		cy.get(preview + ' [role="region"]').should('have.attr', 'aria-label', 'History messages');
	});
});
