function renderFrames(): void {
	cy.window().then(
		(win) =>
			new Promise<void>((resolve) => win.requestAnimationFrame(() => win.requestAnimationFrame(() => resolve()))),
	);
}
describe('Slider', () => {
	beforeEach(() => {
		cy.visit('/iframe.html?id=slider--default');
		cy.get('#storybook-root caps-slider').should((hosts) => {
			for (const host of hosts) {
				expect(host.querySelector('[ngh]')).to.equal(null);
				for (let node: Element | null = host; node; node = node.parentElement)
					expect(node.hasAttribute('ngh')).to.equal(false);
			}
		});
		renderFrames();
	});

	it('should render the slider with the correct initial value', () => {
		cy.get('[role="slider"]').should('have.length', 1).and('have.attr', 'aria-valuenow', '0');
	});

	it('should allow dragging to change the value', () => {
		let start!: number;

		cy.get('[data-slot="slider-thumb"]').should('be.visible');

		cy.get('[role="slider"]')
			.eq(0)
			.invoke('attr', 'aria-valuenow')
			.then((v) => (start = Number(v)));

		cy.get('[data-slot="slider-thumb"]').scrollIntoView();
		cy.get('[data-slot="slider-thumb"]').should('be.visible');

		cy.get('[data-slot="slider-thumb"]')
			.eq(0)
			.then(($thumb) => {
				const rect = $thumb[0].getBoundingClientRect();
				const x0 = Math.round(rect.left + rect.width / 2);
				const y0 = Math.round(rect.top + rect.height / 2);

				const x1 = x0 + 60;
				const x2 = x0 + 120;

				cy.wrap($thumb).trigger('pointerdown', { pointerId: 1, clientX: x0, clientY: y0 });
				cy.wrap($thumb).trigger('pointermove', { pointerId: 1, clientX: x1, clientY: y0 });
				cy.wrap($thumb).trigger('pointermove', { pointerId: 1, clientX: x2, clientY: y0 });
				cy.wrap($thumb).trigger('pointerup', { pointerId: 1, clientX: x2, clientY: y0 });
			});

		cy.get('[role="slider"]')
			.eq(0)
			.invoke('attr', 'aria-valuenow')
			.then((end) => {
				expect(Number(end)).to.not.equal(start);
			});
	});

	it('should support keyboard interactions', () => {
		cy.get('[role="slider"]').realClick();
		cy.get('[role="slider"]').should('be.focused');

		cy.realPress('ArrowRight');
		renderFrames();

		cy.get('[role="slider"]')
			.invoke('attr', 'aria-valuenow')
			.then((newValue) => {
				expect(Number(newValue)).to.be.equal(1);
			});

		// Press left arrow key
		cy.realPress('ArrowLeft');
		renderFrames();
		cy.get('[role="slider"]')
			.invoke('attr', 'aria-valuenow')
			.then((newValue) => {
				expect(Number(newValue)).to.be.equal(0);
			});

		// Press Shift + right arrow key
		cy.realPress(['Shift', 'ArrowRight']);
		renderFrames();
		cy.get('[role="slider"]')
			.invoke('attr', 'aria-valuenow')
			.then((newValue) => {
				expect(Number(newValue)).to.be.equal(10);
			});

		// Press Shift + left arrow key
		cy.realPress(['Shift', 'ArrowLeft']);
		renderFrames();
		cy.get('[role="slider"]')
			.invoke('attr', 'aria-valuenow')
			.then((newValue) => {
				expect(Number(newValue)).to.be.equal(0);
			});

		// Press End key
		cy.realPress('End');
		renderFrames();
		cy.get('[role="slider"]')
			.invoke('attr', 'aria-valuenow')
			.then((newValue) => {
				expect(Number(newValue)).to.be.equal(100);
			});

		// Press Home key
		cy.realPress('Home');
		renderFrames();
		cy.get('[role="slider"]')
			.invoke('attr', 'aria-valuenow')
			.then((newValue) => {
				expect(Number(newValue)).to.be.equal(0);
			});
	});

	it('should drag the whole range when draggableRange is enabled', () => {
		cy.visit('/iframe.html?id=slider--draggable-range');

		let start0!: number;
		let start1!: number;

		cy.get('[role="slider"]').should('have.length', 2);
		cy.get('[role="slider"]')
			.eq(0)
			.invoke('attr', 'aria-valuenow')
			.then((v) => (start0 = Number(v)));
		cy.get('[role="slider"]')
			.eq(1)
			.invoke('attr', 'aria-valuenow')
			.then((v) => (start1 = Number(v)));

		cy.get('[data-slot="slider-range"]').scrollIntoView();
		cy.get('[data-slot="slider-range"]').should('be.visible');

		cy.get('[data-slot="slider-range"]').then(($range) => {
			const rect = $range[0].getBoundingClientRect();
			const x0 = Math.round(rect.left + rect.width / 2);
			const y0 = Math.round(rect.top + rect.height / 2);
			const x1 = x0 + 80;
			const x2 = x0 + 160;

			// Keep pointer events targeted on the RANGE so event.target stays range
			cy.wrap($range).trigger('pointerdown', { pointerId: 1, clientX: x0, clientY: y0 });
			cy.wrap($range).trigger('pointermove', { pointerId: 1, clientX: x1, clientY: y0 });
			cy.wrap($range).trigger('pointermove', { pointerId: 1, clientX: x2, clientY: y0 });
			cy.wrap($range).trigger('pointerup', { pointerId: 1, clientX: x2, clientY: y0 });
		});

		cy.get('[role="slider"]')
			.eq(0)
			.invoke('attr', 'aria-valuenow')
			.then((v0) => {
				const end0 = Number(v0);
				expect(end0).to.not.equal(start0);

				cy.get('[role="slider"]')
					.eq(1)
					.invoke('attr', 'aria-valuenow')
					.then((v1) => {
						const end1 = Number(v1);
						expect(end1).to.not.equal(start1);
						expect(end1 - end0).to.equal(start1 - start0);
					});
			});
	});

	it('should drag all thumbs together when draggableRangeOnly is enabled', () => {
		cy.visit('/iframe.html?id=slider--draggable-range-only');

		cy.get('[role="slider"]').should('have.length', 3);
		cy.get('[data-slot="slider-thumb"]').should('have.length', 3).and('be.visible');

		let start0!: number;
		let start1!: number;
		let start2!: number;

		cy.get('[role="slider"]')
			.eq(0)
			.invoke('attr', 'aria-valuenow')
			.then((v) => (start0 = Number(v)));
		cy.get('[role="slider"]')
			.eq(1)
			.invoke('attr', 'aria-valuenow')
			.then((v) => (start1 = Number(v)));
		cy.get('[role="slider"]')
			.eq(2)
			.invoke('attr', 'aria-valuenow')
			.then((v) => (start2 = Number(v)));

		cy.get('[data-slot="slider-thumb"]').eq(1).scrollIntoView();
		cy.get('[data-slot="slider-thumb"]').eq(1).should('be.visible');

		// Drag the middle thumb; in draggableRangeOnly mode this should move the whole set [v0,v1,v2].
		cy.get('[data-slot="slider-thumb"]')
			.eq(1)
			.then(($thumb) => {
				const rect = $thumb[0].getBoundingClientRect();
				const yViewport = Math.round(rect.top + rect.height / 2);

				const x0Viewport = Math.round(rect.left + rect.width / 2);
				const x1Viewport = x0Viewport + 80;
				const x2Viewport = x0Viewport + 160;

				cy.wrap($thumb).trigger('pointerdown', {
					pointerId: 1,
					clientX: x0Viewport,
					clientY: yViewport,
				});
				cy.wrap($thumb).trigger('pointermove', {
					pointerId: 1,
					clientX: x1Viewport,
					clientY: yViewport,
					force: true,
				});
				cy.wrap($thumb).trigger('pointermove', {
					pointerId: 1,
					clientX: x2Viewport,
					clientY: yViewport,
					force: true,
				});
				cy.wrap($thumb).trigger('pointerup', { pointerId: 1, clientX: x2Viewport, clientY: yViewport });
			});

		cy.get('[role="slider"]')
			.eq(0)
			.invoke('attr', 'aria-valuenow')
			.then((v0) => {
				const end0 = Number(v0);
				expect(end0).to.not.equal(start0);

				cy.get('[role="slider"]')
					.eq(1)
					.invoke('attr', 'aria-valuenow')
					.then((v1) => {
						const end1 = Number(v1);
						expect(end1).to.not.equal(start1);

						cy.get('[role="slider"]')
							.eq(2)
							.invoke('attr', 'aria-valuenow')
							.then((v2) => {
								const end2 = Number(v2);
								expect(end2).to.not.equal(start2);

								// spacing preserved for 3 thumbs
								expect(end1 - end0).to.equal(start1 - start0);
								expect(end2 - end1).to.equal(start2 - start1);
							});
					});
			});
	});
	it('keeps disabled sliders native and out of tab order', () => {
		cy.visit('/iframe.html?id=slider--disabled');
		cy.get('caps-slider button[role=slider]')
			.should('be.disabled')
			.and('have.attr', 'aria-disabled', 'true')
			.and('have.attr', 'tabindex', '-1');
		cy.injectAxe();
		cy.checkA11y('caps-slider');
	});
	it('associates Field validation with the actual thumb and activates it by its label', () => {
		cy.visit('/iframe.html?id=slider--validation');
		cy.get('caps-field-label label').realClick();
		cy.get('caps-slider button[role=slider]').should('be.focused').and('have.attr', 'aria-invalid', 'true');
		cy.contains('button', 'Validate').realClick();
		cy.get('caps-field-error')
			.should('be.visible')
			.invoke('attr', 'id')
			.then((id) => {
				cy.get('caps-slider button[role=slider]').invoke('attr', 'aria-describedby').should('contain', id);
			});
		cy.injectAxe();
		cy.checkA11y('form');
	});
});
