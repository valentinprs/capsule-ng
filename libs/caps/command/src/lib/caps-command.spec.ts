import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import type { ClassValue } from 'clsx';
import {
	CapsCommand,
	CapsCommandImports,
	CapsCommandInputControl,
	CapsCommandItem,
	CapsCommandList,
	provideCapsCommandConfig,
} from '../index';

@Component({
	imports: [CapsCommandImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-command [(search)]="search" [disabled]="disabled()" (valueChange)="active.set($event)">
			<caps-command-input inputId="search-commands" aria-label="Find workspace command" placeholder="Find…" />
			<caps-command-list aria-label="Workspace commands">
				<caps-command-group label="Workspace">
					<button capsCommandItem value="Disabled" disabled (selected)="run('Disabled')">Disabled</button>
					<button capsCommandItem value="Calendar" (selected)="run('Calendar')">Calendar</button>
					<button capsCommandItem value="Profile" (selected)="run('Profile')">
						Profile
						<caps-command-shortcut>⌘P</caps-command-shortcut>
					</button>
				</caps-command-group>
				<caps-command-group label="Settings">
					<button capsCommandItem value="Billing" (selected)="run('Billing')">Billing</button>
				</caps-command-group>
				<caps-command-empty>No matching commands.</caps-command-empty>
				<caps-command-separator />
			</caps-command-list>
		</caps-command>
	`,
})
class Host {
	public readonly search = signal('');
	public readonly disabled = signal(false);
	public readonly active = signal('');
	public readonly calls = signal<string[]>([]);
	run(value: string) {
		this.calls.update((calls) => [...calls, value]);
	}
}
function setup() {
	const f = TestBed.createComponent(Host);
	f.detectChanges();
	return f;
}
async function stable(f: ReturnType<typeof setup>) {
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
}
it('names the native input, listbox and groups with unique active-descendant associations', async () => {
	const f = setup();
	await stable(f);
	const el: HTMLElement = f.nativeElement;
	const input = el.querySelector<HTMLInputElement>('input')!;
	const list = el.querySelector('caps-command-list')!;
	expect(input.type).toBe('text');
	expect(input.getAttribute('role')).toBe('combobox');
	expect(input.getAttribute('aria-label')).toBe('Find workspace command');
	expect(input.placeholder).toBe('Find…');
	expect(input.getAttribute('aria-controls')).toBe(list.id);
	expect(list.getAttribute('role')).toBe('listbox');
	expect(list.getAttribute('aria-label')).toBe('Workspace commands');
	expect(el.querySelector('caps-command-group')!.getAttribute('aria-label')).toBe('Workspace');
	const ids = Array.from(el.querySelectorAll('[id]')).map((n) => n.id);
	expect(new Set(ids).size).toBe(ids.length);
	expect(el.querySelector<HTMLButtonElement>('button')!.disabled).toBe(true);
	expect(el.querySelector<HTMLButtonElement>('#' + input.getAttribute('aria-activedescendant'))!.textContent).toContain(
		'Calendar',
	);
	expect((await axe.run(el, { rules: { region: { enabled: false } } })).violations).toEqual([]);
});
it('keeps input focus while Arrow/Home/End/wrap skip disabled items; Enter activates exactly once', async () => {
	const f = setup();
	await stable(f);
	const el: HTMLElement = f.nativeElement;
	const input = el.querySelector<HTMLInputElement>('input')!;
	input.focus();
	await userEvent.keyboard('{ArrowDown}');
	await stable(f);
	expect(f.componentInstance.active()).toBe('Profile');
	expect(document.activeElement).toBe(input);
	await userEvent.keyboard('{End}');
	await stable(f);
	expect(f.componentInstance.active()).toBe('Billing');
	await userEvent.keyboard('{ArrowDown}');
	await stable(f);
	expect(f.componentInstance.active()).toBe('Calendar');
	await userEvent.keyboard('{Home}{Enter}');
	await stable(f);
	expect(f.componentInstance.calls()).toEqual(['Calendar']);
});
it('preserves native button Enter/Space and click without duplicate activation or nested controls', async () => {
	const f = setup();
	await stable(f);
	const buttons = f.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
	buttons[2].focus();
	await userEvent.keyboard('{Enter}');
	await stable(f);
	expect(f.componentInstance.calls()).toEqual(['Profile']);
	await userEvent.keyboard(' ');
	await stable(f);
	expect(f.componentInstance.calls()).toEqual(['Profile', 'Profile']);
	buttons[0].click();
	await stable(f);
	expect(f.componentInstance.calls()).toHaveLength(2);
	await userEvent.click(buttons[1]);
	await stable(f);
	expect(f.componentInstance.calls()).toEqual(['Profile', 'Profile', 'Calendar']);
	expect(f.nativeElement.querySelector('button button, button input, button a')).toBeNull();
});
it('synchronizes bound search, filtering, group visibility, empty status and reset', async () => {
	const f = setup();
	await stable(f);
	const input = f.nativeElement.querySelector('input') as HTMLInputElement;
	input.focus();
	await userEvent.type(input, 'profile');
	await stable(f);
	expect(f.componentInstance.search()).toBe('profile');
	expect(f.nativeElement.querySelectorAll('button:not([data-hidden])')).toHaveLength(1);
	expect(f.nativeElement.querySelectorAll('caps-command-group')[1].hasAttribute('data-hidden')).toBe(true);
	expect(f.nativeElement.querySelector('caps-command-empty').hidden).toBe(true);
	f.componentInstance.search.set('absent');
	await stable(f);
	expect(input.value).toBe('absent');
	expect(f.nativeElement.querySelector('caps-command-empty').hidden).toBe(false);
	await userEvent.keyboard('{Enter}');
	await stable(f);
	expect(f.componentInstance.calls()).toEqual([]);
	f.componentInstance.search.set('');
	await stable(f);
	expect(f.nativeElement.querySelector('caps-command-empty').hidden).toBe(true);
});
it('disables the real input and every native item and suppresses programmatic Enter activation', async () => {
	const f = setup();
	await stable(f);
	const input = f.nativeElement.querySelector('input') as HTMLInputElement;
	f.componentInstance.disabled.set(true);
	await stable(f);
	expect(input.disabled).toBe(true);
	for (const b of f.nativeElement.querySelectorAll('button')) {
		expect(b.disabled).toBe(true);
		b.click();
	}
	input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
	await stable(f);
	expect(f.componentInstance.calls()).toEqual([]);
});
@Component({
	imports: [CapsCommand, CapsCommandInputControl, CapsCommandList, CapsCommandItem],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-command>
			<input capsCommandInput aria-label="Custom search" />
			<caps-command-list>
				<button capsCommandItem value="A">A</button>
				<button capsCommandItem value="B">B</button>
			</caps-command-list>
		</caps-command>
	`,
})
class NativeHost {}
it('imports the native input directive independently and honors configured filtering', async () => {
	TestBed.configureTestingModule({
		providers: [provideCapsCommandConfig({ filter: (value, search) => value === search || !search })],
	});
	const f = TestBed.createComponent(NativeHost);
	f.detectChanges();
	await f.whenStable();
	const input = f.nativeElement.querySelector('input') as HTMLInputElement;
	expect(input.getAttribute('aria-label')).toBe('Custom search');
	await userEvent.type(input, 'B');
	f.detectChanges();
	await f.whenStable();
	expect(f.nativeElement.querySelectorAll('button:not([data-hidden])')).toHaveLength(1);
	expect(f.nativeElement.querySelector('button:not([data-hidden])').textContent).toBe('B');
});
@Component({
	imports: [CapsCommandImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-command [formControl]="control">
			<caps-command-input />
			<caps-command-list>
				<button capsCommandItem value="Alpha">Alpha</button>
				<button capsCommandItem value="Beta">Beta</button>
			</caps-command-list>
		</caps-command>
	`,
})
class FormHost {
	public readonly control = new FormControl('Alpha');
}
it('retains reactive forms initialization, edited search, touched and disabled state', async () => {
	const f = TestBed.createComponent(FormHost);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	const input = f.nativeElement.querySelector('input') as HTMLInputElement;
	expect(input.value).toBe('Alpha');
	await userEvent.clear(input);
	await userEvent.type(input, 'Beta');
	f.detectChanges();
	await f.whenStable();
	expect(f.componentInstance.control.value).toBe('Beta');
	input.blur();
	f.detectChanges();
	expect(f.componentInstance.control.touched).toBe(true);
	f.componentInstance.control.reset();
	f.detectChanges();
	await f.whenStable();
	expect(input.value).toBe('');
	f.componentInstance.control.disable();
	f.detectChanges();
	await f.whenStable();
	expect(input.disabled).toBe(true);
});
@Component({
	imports: [CapsCommandImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button type="button" (click)="open.set(true)">Open palette</button>
		<caps-command-dialog
			[(open)]="open"
			title="Workspace palette"
			description="Choose an action"
			[dialogContentClass]="contentClass()"
		>
			<caps-command>
				<caps-command-input aria-label="Palette search" />
				<caps-command-list><button capsCommandItem value="Run" (selected)="run()">Run</button></caps-command-list>
			</caps-command>
		</caps-command-dialog>
	`,
})
class DialogHost {
	public readonly contentClass = signal<ClassValue>(['class-array', { 'class-object': true }]);
	public readonly open = signal(false);
	public readonly calls = signal(0);
	run() {
		this.calls.update((n) => n + 1);
		this.open.set(false);
	}
}
it('composes CapsDialog title/description, initial focus, Escape, restoration and selection closure', async () => {
	const f = TestBed.createComponent(DialogHost);
	f.detectChanges();
	await f.whenStable();
	const trigger = f.nativeElement.querySelector('button') as HTMLButtonElement;
	await userEvent.click(trigger);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	const dialog = document.querySelector('[role=dialog]')!;
	const panel = document.querySelector('caps-dialog-panel')!;
	expect(panel.classList.contains('class-array')).toBe(true);
	expect(panel.classList.contains('class-object')).toBe(true);
	expect(dialog).toBeTruthy();
	const input = dialog.querySelector('input')!;
	await expect.poll(() => document.activeElement).toBe(input);
	expect(dialog.getAttribute('aria-labelledby')).toBeTruthy();
	expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)!.textContent).toBe('Workspace palette');
	expect(document.getElementById(dialog.getAttribute('aria-describedby')!)!.textContent).toBe('Choose an action');
	expect((await axe.run(dialog, { rules: { region: { enabled: false } } })).violations).toEqual([]);
	await userEvent.keyboard('{Escape}');
	f.detectChanges();
	await f.whenStable();
	await expect.poll(() => document.querySelector('[role=dialog]')).toBeNull();
	await expect.poll(() => document.activeElement).toBe(trigger);
	await userEvent.click(trigger);
	f.detectChanges();
	await f.whenStable();
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	await f.whenStable();
	expect(f.componentInstance.calls()).toBe(1);
	await expect.poll(() => document.querySelector('[role=dialog]')).toBeNull();
});

@Component({
	imports: [CapsCommandImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-command>
			<caps-command-input />
			<caps-command-list>
				<caps-command-group id="rich-group">
					<caps-command-group-label>
						Workspace actions
						<span>today</span>
					</caps-command-group-label>
					<button capsCommandItem value="Run">Run</button>
				</caps-command-group>
			</caps-command-list>
		</caps-command>
	`,
})
class RichHost {}
it('associates rich projected group headings without asking consumers to wire IDs', async () => {
	const f = TestBed.createComponent(RichHost);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	const group = f.nativeElement.querySelector('caps-command-group') as HTMLElement;
	const label = document.getElementById(group.getAttribute('aria-labelledby')!)!;
	expect(label.textContent).toContain('Workspace actions today');
	expect(group.id).toBe('rich-group');
	expect(group.getAttribute('aria-label')).toBeNull();
});
@Component({
	imports: [CapsCommandImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-command [(search)]="search">
			<caps-command-input />
			<caps-command-list>
				<caps-command-group label="Dynamic">
					@for (item of items(); track item) {
						<button capsCommandItem [value]="item">{{ item }}</button>
					}
				</caps-command-group>
				<caps-command-empty>No items</caps-command-empty>
			</caps-command-list>
		</caps-command>
	`,
})
class DynamicHost {
	public readonly search = signal('');
	public readonly items = signal(['Alpha', 'Beta']);
}
it('updates native item registration and empty state when the application replaces the collection', async () => {
	const f = TestBed.createComponent(DynamicHost);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	const input = f.nativeElement.querySelector('input') as HTMLInputElement;
	f.componentInstance.items.set([]);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	expect(f.nativeElement.querySelector('caps-command-empty').hidden).toBe(false);
	f.componentInstance.items.set(['Gamma']);
	f.detectChanges();
	await f.whenStable();
	f.detectChanges();
	expect(f.nativeElement.querySelector('caps-command-empty').hidden).toBe(true);
	expect(f.nativeElement.querySelectorAll('button')).toHaveLength(1);
	input.focus();
	await userEvent.keyboard('{Home}');
	f.detectChanges();
	await f.whenStable();
	expect(f.nativeElement.querySelector('button').id).toBe(input.getAttribute('aria-activedescendant'));
});
