import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { BrnToggleGroupItem } from '@spartan-ng/brain/toggle-group';
import { userEvent } from '@vitest/browser/context';
import { CapsToggleGroupImports } from '../index';

@Component({
	selector: 'caps-toggle-group-test',
	imports: [CapsToggleGroupImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-toggle-group [formControl]="control" [disabled]="disabled()" (valueChange)="changes.push($event)">
			<button capsToggleItem value="a">A</button>
			<button capsToggleItem value="b" disabled>B</button>
			<button capsToggleItem value="c">C</button>
		</caps-toggle-group>
	`,
})
class Host {
	public readonly control = new FormControl('a');
	public readonly disabled = signal(false);
	public readonly changes: unknown[] = [];
}

it('disables native items through CVA, blocks value/events, and preserves explicit disabled on enable', () => {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
	fixture.componentInstance.control.disable();
	fixture.detectChanges();
	expect(buttons.map((button) => button.disabled)).toEqual([true, true, true]);
	buttons[2].click();
	fixture.debugElement.queryAll(By.directive(BrnToggleGroupItem))[2].injector.get(BrnToggleGroupItem).toggle();
	fixture.detectChanges();
	expect(fixture.componentInstance.control.value).toBe('a');
	expect(fixture.componentInstance.changes).toEqual([]);
	fixture.componentInstance.control.enable();
	fixture.detectChanges();
	expect(buttons.map((button) => button.disabled)).toEqual([false, true, false]);
	buttons[1].click();
	expect(fixture.componentInstance.control.value).toBe('a');
	buttons[2].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.control.value).toBe('c');
	expect(fixture.componentInstance.changes).toEqual(['c']);
	expect(buttons.map((button) => button.getAttribute('aria-pressed'))).toEqual(['false', 'false', 'true']);
	fixture.componentInstance.disabled.set(true);
	fixture.componentInstance.control.disable();
	fixture.componentInstance.control.enable();
	fixture.detectChanges();
	expect(buttons.every((button) => button.disabled)).toBe(true);
	expect(fixture.nativeElement.querySelector('caps-toggle-group').getAttribute('aria-disabled')).toBe('true');
});

it('retains native Tab/Enter/Space, skips disabled buttons and touches on focusout', async () => {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('button'));
	buttons[0].focus();
	await userEvent.keyboard('{Tab}');
	expect(document.activeElement).toBe(buttons[2]);
	expect(fixture.componentInstance.control.touched).toBe(true);
	await userEvent.keyboard('{Enter}');
	fixture.detectChanges();
	expect(fixture.componentInstance.control.value).toBe('c');
	await userEvent.keyboard(' ');
	fixture.detectChanges();
	expect(fixture.componentInstance.control.value).toBeNull();
	fixture.componentInstance.control.disable();
	fixture.detectChanges();
	await userEvent.keyboard('{Enter}');
	expect(fixture.componentInstance.control.value).toBeNull();
	expect(fixture.componentInstance.changes).toEqual(['c', null]);
});

@Component({
	selector: 'caps-toggle-bindings-test',
	imports: [CapsToggleGroupImports, FormsModule, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-toggle-group [(value)]="value" [type]="type()" [nullable]="nullable()" (valueChange)="events.push($event)">
			<button capsToggleItem value="a">A</button>
			<button capsToggleItem value="b">B</button>
		</caps-toggle-group>
		<caps-toggle-group [(ngModel)]="templateValue">
			<button capsToggleItem value="a">A</button>
			<button capsToggleItem value="b">B</button>
		</caps-toggle-group>
		<caps-toggle-group [formField]="field.choice">
			<button capsToggleItem value="a">A</button>
			<button capsToggleItem value="b">B</button>
		</caps-toggle-group>
	`,
})
class BindingsHost {
	public readonly value = signal<unknown>('a');
	public readonly type = signal<'single' | 'multiple'>('single');
	public readonly nullable = signal(false);
	public readonly events: unknown[] = [];
	public templateValue = 'a';
	public readonly model = signal({ choice: 'a' });
	public readonly field = form(this.model);
}

it('preserves single/multiple selection and non-nullable last choice, and emits value changes', () => {
	const fixture = TestBed.createComponent(BindingsHost);
	fixture.detectChanges();
	const buttons: HTMLButtonElement[] = Array.from(
		fixture.nativeElement.querySelectorAll('caps-toggle-group:first-child button'),
	);
	buttons[0].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.value()).toBe('a');
	buttons[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.value()).toBe('b');
	expect(fixture.componentInstance.events).toEqual(['b']);
	fixture.componentInstance.type.set('multiple');
	fixture.componentInstance.value.set(['a']);
	fixture.detectChanges();
	buttons[0].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.value()).toEqual(['a']);
	buttons[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.value()).toEqual(['a', 'b']);
	buttons[0].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.value()).toEqual(['b']);
	fixture.componentInstance.nullable.set(true);
	fixture.detectChanges();
	buttons[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.value()).toEqual([]);
});

it('supports template-driven and signal forms through the existing value accessor', async () => {
	const fixture = TestBed.createComponent(BindingsHost);
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
	const groups: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('caps-toggle-group'));
	groups[1].querySelectorAll('button')[1].click();
	fixture.detectChanges();
	await fixture.whenStable();
	expect(fixture.componentInstance.templateValue).toBe('b');
	groups[2].querySelectorAll('button')[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.model().choice).toBe('b');
});

@Component({
	selector: 'caps-toggle-field-test',
	imports: [CapsToggleGroupImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Formatting</caps-field-label>
			<caps-toggle-group [formControl]="control" aria-describedby="manual">
				<button capsToggleItem value="bold">Bold</button>
			</caps-toggle-group>
			<caps-field-description>Choose formatting</caps-field-description>
			<caps-field-error>Required</caps-field-error>
		</caps-field>
		<p id="manual">Manual</p>
	`,
})
class FieldHost {
	public readonly control = new FormControl('', Validators.required);
}

it('names the group from Field and combines descriptions and visible validation errors', async () => {
	const fixture = TestBed.createComponent(FieldHost);
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
	const group: HTMLElement = fixture.nativeElement.querySelector('caps-toggle-group');
	const label: HTMLLabelElement = fixture.nativeElement.querySelector('caps-field-label label');
	const description: HTMLElement = fixture.nativeElement.querySelector('caps-field-description');
	expect(group.getAttribute('role')).toBe('group');
	expect(group.getAttribute('aria-labelledby')).toBe(label.id);
	expect(label.htmlFor).toBe('');
	expect(group.getAttribute('aria-describedby')?.split(' ')).toEqual(['manual', description.id]);
	fixture.componentInstance.control.markAsTouched();
	fixture.detectChanges();
	const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
	expect(group.getAttribute('aria-describedby')?.split(' ')).toContain(error.id);
	expect(group.getAttribute('aria-invalid')).toBe('true');
});
