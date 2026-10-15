import 'cypress-real-events';

// Catalogue runs in DEV. Hydration statistics are distinct from font/layout readiness.
export function visitHydrated(url: string): void {
	cy.visit(url, {
		onBeforeLoad(win) {
			const log = win.console.log;
			Reflect.set(win, '__sonner56Hydration', '');
			Reflect.set(win, '__sonner56NativeEvents', []);
			for (const type of ['pointerdown', 'click', 'focusin', 'keydown'])
				win.document.addEventListener(
					type,
					(event) => {
						const target = event.target as Element;
						Reflect.get(win, '__sonner56NativeEvents').push({
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
				if (/^Angular hydrated [1-9]\d* component\(s\)/.test(message)) Reflect.set(win, '__sonner56Hydration', message);
				log.apply(win.console, args);
			};
		},
	});
	cy.window().should((win) => {
		expect(Reflect.get(win, '__sonner56Hydration'), 'DEV whenStable/hydration cleanup receipt').to.match(
			/^Angular hydrated [1-9]\d* component\(s\)/,
		);
		expect(Reflect.get(win, 'ngDevMode').hydratedComponents, 'DEV hydrated components').to.be.greaterThan(0);
	});
}
export function nativeClick(selector: string, label?: string | RegExp): void {
	const control = () => (label === undefined ? cy.get(selector) : cy.contains(selector, label));
	control().then(($control) => $control[0].scrollIntoView({ block: 'center', inline: 'center' }));
	control().then(
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
						Reflect.get(win, '__sonner56NativeEvents').push({
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
	control().realClick({ position: 'center', scrollBehavior: false });
}
