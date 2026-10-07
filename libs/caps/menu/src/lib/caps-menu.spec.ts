import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
import { CapsDropdownMenuImports, type CapsMenuPlacement } from '@capsule-ng/caps/dropdown-menu';
import { CapsMenubarImports } from '@capsule-ng/caps/menubar';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@vitest/browser/context';

@Component({
	imports: [CapsDropdownMenuImports, CapsContextMenuImports, CapsMenubarImports],
	providers: [Directionality],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form (submit)="submits = submits + 1; $event.preventDefault()">
			<button
				type="button"
				[capsDropdownMenuTrigger]="menu"
				[(open)]="open"
				[placement]="placement()"
				[disabled]="triggerDisabled()"
			>
				Actions
			</button>
			<button type="button">Outside</button>
		</form>
		<div tabindex="0" [capsContextMenuTrigger]="menu" [disabled]="disabled()">Document</div>
		<caps-menubar aria-label="Editor">
			<button [capsMenubarTrigger]="menu">File</button>
			<button [capsMenubarTrigger]="other" [disabled]="barDisabled()">Edit</button>
			<button [capsMenubarTrigger]="other">View</button>
		</caps-menubar>
		<ng-template #menu>
			<caps-menu aria-label="Document actions">
				<button capsMenuItem (itemClick)="actions = actions + 1">Rename</button>
				<a capsMenuItem href="#download" download>Download</a>
				<button capsMenuItem disabled (itemClick)="actions = actions + 100">Unavailable</button>
				<caps-menu-separator />
				<button capsMenuCheckboxItem [(checked)]="grid" (checkedChange)="checks.push($event)" [disabled]="disabled()">
					Grid
				</button>
				<caps-menu-group type="radio" label="Density" [(value)]="density">
					<button capsMenuRadioItem value="compact">Compact</button>
					<button capsMenuRadioItem value="comfortable">Comfortable</button>
					@if (extra()) {
						<button capsMenuRadioItem value="expanded">Expanded</button>
					}
				</caps-menu-group>
				<caps-menu-group type="checkbox" label="Channels" [(value)]="channels">
					<button capsMenuCheckboxItem value="mail">Email</button>
					<button capsMenuCheckboxItem value="sms">SMS</button>
				</caps-menu-group>
				<button [capsMenuSubTrigger]="other" [disabled]="subDisabled()">Export</button>
			</caps-menu>
		</ng-template>
		<ng-template #other>
			<caps-menu>
				<button capsMenuItem>PDF</button>
				<button capsMenuItem>CSV</button>
			</caps-menu>
		</ng-template>
	`,
})
class MenuHost {
	public readonly open = signal(false);
	public readonly placement = signal<CapsMenuPlacement>('bottom-start');
	public readonly grid = signal(false);
	public readonly density = signal<string | string[]>('compact');
	public readonly channels = signal<string | string[]>(['mail']);
	public readonly disabled = signal(false);
	public readonly triggerDisabled = signal(false);
	public readonly barDisabled = signal(false);
	public readonly subDisabled = signal(false);
	public readonly extra = signal(false);
	public checks: boolean[] = [];
	public actions = 0;
	public submits = 0;
}
const settle = async (fixture: Awaited<ReturnType<typeof render<MenuHost>>>['fixture']) => {
	fixture.detectChanges();
	await fixture.whenStable();
	await new Promise((resolve) => setTimeout(resolve, 0));
	fixture.detectChanges();
};
const press = (element: HTMLElement, key: string, keyCode: number, shiftKey = false) => {
	element.dispatchEvent(
		new KeyboardEvent('keydown', { key, code: key, keyCode, which: keyCode, bubbles: true, shiftKey }),
	);
};
afterEach(() => document.querySelectorAll('.cdk-overlay-container').forEach((element) => element.remove()));
describe('Caps menus public native composition', () => {
	it('defers content, preserves native links and exposes one native command per item', async () => {
		const { fixture } = await render(MenuHost);
		expect(screen.queryByRole('menu')).toBeNull();
		screen.getByRole('button', { name: 'Actions' }).click();
		await settle(fixture);
		const menu = screen.getByRole('menu');
		expect(menu.tagName).toBe('CAPS-MENU');
		expect(screen.getByRole('menuitem', { name: 'Unavailable' }).getAttribute('aria-disabled')).toBe('true');
		const link = screen.getByRole('menuitem', { name: 'Download' });
		expect(link.tagName).toBe('A');
		expect(link.getAttribute('href')).toBe('#download');
		expect(link.hasAttribute('download')).toBe(true);
		expect(screen.getByRole('group', { name: 'Density' })).toBeTruthy();
		expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe('horizontal');
		expect(
			menu.querySelectorAll('button button,button a,a button,input,[role="checkbox"],[role="radio"]'),
		).toHaveLength(0);
		const action = screen.getByRole('menuitem', { name: 'Rename' });
		expect(action.getAttribute('type')).toBe('button');
		action.click();
		await settle(fixture);
		expect(fixture.componentInstance.actions).toBe(1);
		expect(fixture.componentInstance.submits).toBe(0);
		expect(fixture.componentInstance.open()).toBe(false);
		expect(screen.queryByRole('menu')).toBeNull();
	});
	it('keeps checkbox selection open, emits one checkedChange, and blocks disabled native activation', async () => {
		const { fixture } = await render(MenuHost);
		screen.getByRole('button', { name: 'Actions' }).click();
		await settle(fixture);
		const grid = screen.getByRole('menuitemcheckbox', { name: 'Grid' });
		grid.click();
		await settle(fixture);
		expect(fixture.componentInstance.grid()).toBe(true);
		expect(fixture.componentInstance.checks).toEqual([true]);
		expect(grid.getAttribute('aria-checked')).toBe('true');
		expect(grid.querySelector('.caps-menu-indicator')?.getAttribute('aria-hidden')).toBe('true');
		expect(screen.queryByRole('menu')).toBeTruthy();
		fixture.componentInstance.disabled.set(true);
		await settle(fixture);
		expect((grid as HTMLButtonElement).disabled).toBe(true);
		grid.click();
		press(grid, 'Enter', 13);
		await settle(fixture);
		expect(fixture.componentInstance.grid()).toBe(true);
		expect(fixture.componentInstance.checks).toEqual([true]);
	});
	it('coordinates radio group values, external updates and dynamically projected choices', async () => {
		const { fixture } = await render(MenuHost);
		screen.getByRole('button', { name: 'Actions' }).click();
		await settle(fixture);
		expect(screen.getByRole('menuitemradio', { name: 'Compact' }).getAttribute('aria-checked')).toBe('true');
		screen.getByRole('menuitemradio', { name: 'Comfortable' }).click();
		await settle(fixture);
		expect(fixture.componentInstance.density()).toBe('comfortable');
		expect(screen.getByRole('menuitemradio', { name: 'Compact' }).getAttribute('aria-checked')).toBe('false');
		fixture.componentInstance.density.set('expanded');
		fixture.componentInstance.extra.set(true);
		await settle(fixture);
		expect(screen.getByRole('menuitemradio', { name: 'Expanded' }).getAttribute('aria-checked')).toBe('true');
		expect(screen.getByRole('menuitemradio', { name: 'Comfortable' }).getAttribute('aria-checked')).toBe('false');
		expect(screen.queryByRole('menu')).toBeTruthy();
	});
	it('updates checkbox group values without affecting another group', async () => {
		const { fixture } = await render(MenuHost);
		screen.getByRole('button', { name: 'Actions' }).click();
		await settle(fixture);
		expect(screen.getByRole('menuitemcheckbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('true');
		screen.getByRole('menuitemcheckbox', { name: 'SMS' }).click();
		await settle(fixture);
		expect(fixture.componentInstance.channels()).toEqual(['mail', 'sms']);
		expect(fixture.componentInstance.density()).toBe('compact');
		expect(fixture.componentInstance.grid()).toBe(false);
		fixture.componentInstance.channels.set([]);
		await settle(fixture);
		expect(screen.getByRole('menuitemcheckbox', { name: 'Email' }).getAttribute('aria-checked')).toBe('false');
	});
	it('navigates enabled commands, opens submenus, restores focus and closes outside', async () => {
		const { fixture } = await render(MenuHost);
		const trigger = screen.getByRole('button', { name: 'Actions' });
		trigger.focus();
		press(trigger, 'ArrowDown', 40);
		await settle(fixture);
		expect(document.activeElement?.textContent?.trim()).toBe('Rename');
		press(document.activeElement as HTMLElement, 'ArrowDown', 40);
		await settle(fixture);
		expect(document.activeElement?.textContent?.trim()).toBe('Download');
		press(document.activeElement as HTMLElement, 'ArrowDown', 40);
		await settle(fixture);
		expect(document.activeElement?.getAttribute('role')).toBe('menuitemcheckbox');
		const sub = screen.getByRole('menuitem', { name: 'Export' });
		sub.focus();
		press(sub, 'ArrowRight', 39);
		await settle(fixture);
		expect(screen.getAllByRole('menu')).toHaveLength(2);
		expect(document.activeElement?.textContent?.trim()).toBe('PDF');
		press(document.activeElement as HTMLElement, 'Escape', 27);
		await settle(fixture);
		expect(screen.getAllByRole('menu')).toHaveLength(1);
		expect(document.activeElement).toBe(sub);
		press(sub, 'Escape', 27);
		await settle(fixture);
		expect(document.activeElement).toBe(trigger);
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(fixture.componentInstance.open()).toBe(false);
		trigger.click();
		await settle(fixture);
		await userEvent.click(screen.getByRole('button', { name: 'Outside' }));
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeNull();
		expect(document.activeElement?.textContent).toBe('Outside');
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
		expect(fixture.componentInstance.open()).toBe(false);
	});
	it('opens a keyboard context menu and restores its focus surface, including disabled state', async () => {
		const { fixture } = await render(MenuHost);
		const surface = screen.getByText('Document');
		surface.focus();
		press(surface, 'F10', 121, true);
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeTruthy();
		expect(document.activeElement?.textContent?.trim()).toBe('Rename');
		press(document.activeElement as HTMLElement, 'Escape', 27);
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeNull();
		expect(document.activeElement).toBe(surface);
		fixture.componentInstance.disabled.set(true);
		await settle(fixture);
		press(surface, 'ContextMenu', 93);
		surface.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, button: 2, clientX: 100, clientY: 100 }));
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeNull();
	});
	it('coordinates menubar siblings and returns focus after a command', async () => {
		const { fixture } = await render(MenuHost);
		expect(screen.getByRole('menubar', { name: 'Editor' })).toBeTruthy();
		const file = screen.getByRole('menuitem', { name: 'File' });
		file.focus();
		press(file, 'ArrowDown', 40);
		await settle(fixture);
		press(document.activeElement as HTMLElement, 'ArrowRight', 39);
		await settle(fixture);
		expect(screen.getByRole('menuitem', { name: 'Edit' }).getAttribute('aria-expanded')).toBe('true');
		expect(file.getAttribute('aria-expanded')).toBe('false');
		screen.getByRole('menuitem', { name: 'PDF' }).click();
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeNull();
		expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
	});
	it('skips disabled native menubar triggers during horizontal navigation', async () => {
		const { fixture } = await render(MenuHost);
		fixture.componentInstance.barDisabled.set(true);
		await settle(fixture);
		const file = screen.getByRole('menuitem', { name: 'File' });
		expect((screen.getByRole('menuitem', { name: 'Edit' }) as HTMLButtonElement).disabled).toBe(true);
		screen.getByRole('menubar', { name: 'Editor' }).focus();
		await settle(fixture);
		expect(document.activeElement).toBe(file);
		press(file, 'ArrowRight', 39);
		await settle(fixture);
		expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'View' }));
		press(document.activeElement as HTMLElement, 'ArrowDown', 40);
		await settle(fixture);
		expect(document.activeElement?.textContent?.trim()).toBe('PDF');
	});
	it('blocks disabled native submenu activation and reopens after enabling', async () => {
		const { fixture } = await render(MenuHost);
		fixture.componentInstance.subDisabled.set(true);
		screen.getByRole('button', { name: 'Actions' }).click();
		await settle(fixture);
		const sub = screen.getByRole('menuitem', { name: 'Export' }) as HTMLButtonElement;
		expect(sub.disabled).toBe(true);
		expect(sub.getAttribute('aria-disabled')).toBe('true');
		sub.click();
		press(sub, 'ArrowRight', 39);
		await settle(fixture);
		expect(screen.getAllByRole('menu')).toHaveLength(1);
		fixture.componentInstance.subDisabled.set(false);
		await settle(fixture);
		sub.focus();
		press(sub, 'ArrowRight', 39);
		await settle(fixture);
		expect(screen.getAllByRole('menu')).toHaveLength(2);
		expect(document.activeElement?.textContent?.trim()).toBe('PDF');
	});
	it('handles Escape inside the menu without closing an enclosing overlay', async () => {
		const { fixture } = await render(MenuHost);
		const outer = vi.fn();
		document.body.addEventListener('keydown', outer);
		try {
			screen.getByRole('button', { name: 'Actions' }).click();
			await settle(fixture);
			press(screen.getByRole('menuitem', { name: 'Rename' }), 'Escape', 27);
			await settle(fixture);
			expect(screen.queryByRole('menu')).toBeNull();
			expect(outer).not.toHaveBeenCalled();
			press(screen.getByRole('button', { name: 'Outside' }), 'Escape', 27);
			expect(outer).toHaveBeenCalledOnce();
		} finally {
			document.body.removeEventListener('keydown', outer);
		}
	});
	it('closes the whole stack when the native trigger is clicked after hovering a submenu', async () => {
		const { fixture } = await render(MenuHost);
		const trigger = screen.getByRole('button', { name: 'Actions' });
		await userEvent.click(trigger);
		await settle(fixture);
		await userEvent.hover(screen.getByRole('menuitem', { name: 'Export' }));
		await vi.waitFor(() => expect(screen.getAllByRole('menu')).toHaveLength(2));
		await userEvent.hover(screen.getByRole('menuitem', { name: 'CSV' }));
		await userEvent.click(trigger);
		await vi.waitFor(() => {
			expect(trigger.getAttribute('aria-expanded')).toBe('false');
			expect(fixture.componentInstance.open()).toBe(false);
			expect(screen.queryByRole('menu')).toBeNull();
		});
	});
	it('honors disabled dropdown state for native and controlled activation', async () => {
		const { fixture } = await render(MenuHost);
		const trigger = screen.getByRole('button', { name: 'Actions' }) as HTMLButtonElement;
		fixture.componentInstance.triggerDisabled.set(true);
		await settle(fixture);
		expect(trigger.disabled).toBe(true);
		trigger.click();
		press(trigger, 'ArrowDown', 40);
		fixture.componentInstance.open.set(true);
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeNull();
		fixture.componentInstance.triggerDisabled.set(false);
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeTruthy();
	});
	it('preserves controlled opening and inherited lateral panel positioning', async () => {
		const { fixture } = await render(MenuHost);
		fixture.componentInstance.placement.set('right-start');
		fixture.componentInstance.open.set(true);
		await settle(fixture);
		const menu = screen.getByRole('menu');
		const trigger = screen.getByRole('button', { name: 'Actions' });
		expect(trigger.getAttribute('aria-expanded')).toBe('true');
		expect(['right', 'left']).toContain(menu.getAttribute('data-side'));
		fixture.componentInstance.open.set(false);
		await settle(fixture);
		expect(screen.queryByRole('menu')).toBeNull();
		expect(trigger.getAttribute('aria-expanded')).toBe('false');
	});
});
