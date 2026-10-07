import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsDrawerImports } from '../index';
@Component({
	selector: 'caps-drawer-test',
	imports: [CapsDrawerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-drawer [(open)]="open" dir="rtl">
			<button capsDrawerTrigger>Open Drawer</button>
			<ng-template capsDrawerContent [side]="side()" [class]="'drawer-static-class'" [closeThreshold]="0.5">
				<caps-drawer-title>Outer</caps-drawer-title>
				<caps-drawer-description>Outer details.</caps-drawer-description>
				<caps-drawer>
					<button capsDrawerTrigger>Open Nested</button>
					<ng-template capsDrawerContent>
						<caps-drawer-title>Nested</caps-drawer-title>
						<button capsDrawerClose>Close Nested</button>
					</ng-template>
				</caps-drawer>
				<caps-drawer-footer><button capsDrawerClose>Cancel</button></caps-drawer-footer>
			</ng-template>
		</caps-drawer>
	`,
})
class Host {
	public readonly open = signal(false);
	public readonly side = signal<'top' | 'bottom' | 'left' | 'right'>('bottom');
}
describe('Capsule Drawer public contract', () => {
	for (const side of ['top', 'bottom', 'left', 'right'] as const)
		it(`preserves ${side} direction and accessible content`, async () => {
			const { fixture } = await render(Host);
			fixture.componentInstance.side.set(side);
			fixture.detectChanges();
			await userEvent.click(screen.getByRole('button', { name: 'Open Drawer' }));
			const d = await screen.findByRole('dialog', { name: 'Outer' });
			expect(d.getAttribute('aria-describedby')).toBe(screen.getByText('Outer details.').id);
			expect(d.querySelector('[data-slot="drawer-content"]')?.classList.contains('drawer-static-class')).toBe(true);
			expect(getComputedStyle(d).direction).toBe('rtl');
			expect(d.querySelector('[data-slot="drawer-content"]')?.getAttribute('data-vaul-drawer-direction')).toBe(side);
			expect(fixture.componentInstance.open()).toBe(true);
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
			expect(fixture.componentInstance.open()).toBe(false);
			expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Open Drawer' }));
		});
	it('isolates nested names and closes only the top drawer before restoring focus', async () => {
		await render(Host);
		await userEvent.click(screen.getByRole('button', { name: 'Open Drawer' }));
		await screen.findByRole('dialog', { name: 'Outer' });
		const nested = screen.getByRole('button', { name: 'Open Nested' });
		await userEvent.click(nested);
		const d = await screen.findByRole('dialog', { name: 'Nested' });
		expect(d.getAttribute('aria-describedby')).toBeNull();
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Nested' })).toBeNull());
		expect(screen.getByRole('dialog', { name: 'Outer' })).toBeTruthy();
		expect(document.activeElement).toBe(nested);
	});
	it('delegates a downward pointer swipe to Brain and synchronizes closing', async () => {
		const { fixture } = await render(Host);
		await userEvent.click(screen.getByRole('button', { name: 'Open Drawer' }));
		const d = await screen.findByRole('dialog', { name: 'Outer' });
		const panel = d.querySelector<HTMLElement>('[data-slot="drawer-content"]')!;
		panel.style.height = '200px';
		panel.style.width = '300px';
		await new Promise((resolve) => setTimeout(resolve, 550));
		panel.dispatchEvent(
			new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch', pointerId: 1, clientX: 20, clientY: 20 }),
		);
		document.dispatchEvent(
			new PointerEvent('pointermove', { bubbles: true, pointerType: 'touch', pointerId: 1, clientX: 20, clientY: 160 }),
		);
		expect(panel.style.transform).toContain('translateY');
		document.dispatchEvent(
			new PointerEvent('pointerup', { bubbles: true, pointerType: 'touch', pointerId: 1, clientX: 20, clientY: 160 }),
		);
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		expect(fixture.componentInstance.open()).toBe(false);
	});
});

@Component({
	selector: 'caps-drawer-dynamic-class-test',
	imports: [CapsDrawerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-drawer>
			<button capsDrawerTrigger>Open dynamic</button>
			<ng-template capsDrawerContent [class]="classes()">
				<caps-drawer-title>Dynamic classes</caps-drawer-title>
				<button capsDrawerClose>Close</button>
			</ng-template>
		</caps-drawer>
	`,
})
class DynamicClassHost {
	public readonly classes = signal('consumer-first');
}
it('updates public dynamic content classes on the rendered drawer', async () => {
	const { fixture } = await render(DynamicClassHost);
	await userEvent.click(screen.getByRole('button', { name: 'Open dynamic' }));
	const d = await screen.findByRole('dialog', { name: 'Dynamic classes' });
	const panel = d.querySelector('[data-slot="drawer-content"]');
	await waitFor(() => expect(panel?.classList.contains('consumer-first')).toBe(true));
	fixture.componentInstance.classes.set('consumer-second');
	fixture.detectChanges();
	await waitFor(() => {
		expect(panel?.classList.contains('consumer-second')).toBe(true);
		expect(panel?.classList.contains('consumer-first')).toBe(false);
	});
});
