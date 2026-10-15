import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsSheetImports } from '../index';
@Component({
	selector: 'caps-sheet-test',
	imports: [CapsSheetImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button [capsSheetTriggerFor]="panel">External</button>
		<caps-sheet #panel="capsSheet" [(open)]="open" [disableClose]="disabled()" (closed)="result.set($event)">
			<button capsSheetTrigger>Open</button>
			<button capsSheetTrigger side="left">Left</button>
			<ng-template
				capsSheetContent
				[side]="side()"
				[showCloseButton]="showClose()"
				closeLabel="Dismiss"
				[class]="'public-class'"
			>
				<caps-sheet-header>
					<caps-sheet-title>Profile</caps-sheet-title>
					<caps-sheet-description>Public details.</caps-sheet-description>
				</caps-sheet-header>
				<input aria-label="Name" />
				<caps-sheet-footer>
					<button capsSheetClose>Cancel</button>
					<button (click)="panel.close('saved')">Save</button>
				</caps-sheet-footer>
			</ng-template>
		</caps-sheet>
	`,
})
class Host {
	public readonly open = signal(false);
	public readonly disabled = signal(false);
	public readonly showClose = signal(true);
	public readonly side = signal<'top' | 'bottom' | 'left' | 'right'>('right');
	public readonly result = signal<unknown>(null);
}
describe('Capsule Sheet public contract', () => {
	it('defers content, names the dialog and restores native trigger focus after close', async () => {
		const { fixture } = await render(Host);
		expect(screen.queryByText('Public details.')).toBeNull();
		const trigger = screen.getByRole('button', { name: 'Open' });
		await userEvent.click(trigger);
		const dialog = await screen.findByRole('dialog', { name: 'Profile' });
		expect(dialog.getAttribute('aria-describedby')).toBe(screen.getByText('Public details.').id);
		expect(dialog.querySelector('[data-slot="sheet-content"]')?.classList.contains('public-class')).toBe(true);
		expect(fixture.componentInstance.open()).toBe(true);
		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		expect(fixture.componentInstance.open()).toBe(false);
		expect(document.activeElement).toBe(trigger);
	});
	for (const side of ['top', 'bottom', 'left', 'right'] as const)
		it(`places a controlled panel on ${side}`, async () => {
			const { fixture } = await render(Host);
			fixture.componentInstance.side.set(side);
			fixture.componentInstance.open.set(true);
			fixture.detectChanges();
			const dialog = await screen.findByRole('dialog');
			expect(dialog.querySelector('[data-slot="sheet-content"]')?.getAttribute('data-side')).toBe(side);
			fixture.componentInstance.open.set(false);
			fixture.detectChanges();
			await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		});
	it('supports an external trigger and a per-trigger placement override', async () => {
		await render(Host);
		await userEvent.click(screen.getByRole('button', { name: 'External' }));
		await screen.findByRole('dialog');
		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		await userEvent.click(screen.getByRole('button', { name: 'Left' }));
		const d = await screen.findByRole('dialog');
		expect(d.querySelector('[data-slot="sheet-content"]')?.getAttribute('data-side')).toBe('left');
	});
	it('emits a close result through the public root method', async () => {
		const { fixture } = await render(Host);
		await userEvent.click(screen.getByRole('button', { name: 'Open' }));
		await screen.findByRole('dialog');
		await userEvent.click(screen.getByRole('button', { name: 'Save' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
		expect(fixture.componentInstance.result()).toBe('saved');
		expect(fixture.componentInstance.open()).toBe(false);
	});
	it('traps Tab, honors disableClose, hides built-in close and accepts explicit close', async () => {
		const { fixture } = await render(Host);
		fixture.componentInstance.disabled.set(true);
		fixture.componentInstance.showClose.set(false);
		fixture.detectChanges();
		await userEvent.click(screen.getByRole('button', { name: 'Open' }));
		const d = await screen.findByRole('dialog');
		expect(screen.queryByRole('button', { name: 'Dismiss' })).toBeNull();
		await waitFor(() => expect(d.contains(document.activeElement)).toBe(true));
		await userEvent.tab({ shift: true });
		expect(d.contains(document.activeElement)).toBe(true);
		await userEvent.tab();
		expect(d.contains(document.activeElement)).toBe(true);
		await userEvent.keyboard('{Escape}');
		expect(screen.getByRole('dialog')).toBeTruthy();
		await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
	});
});

@Component({
	selector: 'caps-sheet-dynamic-class-test',
	imports: [CapsSheetImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet>
			<button capsSheetTrigger>Open dynamic</button>
			<ng-template capsSheetContent [class]="classes()">
				<caps-sheet-title>Dynamic classes</caps-sheet-title>
				<button capsSheetClose>Close</button>
			</ng-template>
		</caps-sheet>
	`,
})
class DynamicClassHost {
	public readonly classes = signal('consumer-first');
}
it('updates public dynamic content classes on the rendered sheet', async () => {
	const { fixture } = await render(DynamicClassHost);
	await userEvent.click(screen.getByRole('button', { name: 'Open dynamic' }));
	const d = await screen.findByRole('dialog', { name: 'Dynamic classes' });
	const panel = d.querySelector('[data-slot="sheet-content"]');
	await waitFor(() => expect(panel?.classList.contains('consumer-first')).toBe(true));
	fixture.componentInstance.classes.set('consumer-second');
	fixture.detectChanges();
	await waitFor(() => {
		expect(panel?.classList.contains('consumer-second')).toBe(true);
		expect(panel?.classList.contains('consumer-first')).toBe(false);
	});
});
