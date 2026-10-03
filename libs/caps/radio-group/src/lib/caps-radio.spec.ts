import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { userEvent } from '@vitest/browser/context';
import { CapsRadioGroupImports } from '../index';

@Component({
	selector: 'caps-radio-test',
	imports: [CapsRadioGroupImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-radio-group [formControl]="control" required name="delivery">
			<caps-radio value="standard">Standard</caps-radio>
			<caps-radio value="express">Express</caps-radio>
		</caps-radio-group>
	`,
})
class Host {
	public readonly control = new FormControl('standard');
}

describe('Caps radio consumer API', () => {
	it('keeps native radios, selection, required state and reactive disabled state', () => {
		const fixture = TestBed.createComponent(Host);
		fixture.detectChanges();
		const radios = Array.from(fixture.nativeElement.querySelectorAll('input')) as HTMLInputElement[];
		expect(radios.map((r) => r.type)).toEqual(['radio', 'radio']);
		expect(radios.map((r) => r.name)).toEqual(['delivery', 'delivery']);
		expect(radios.map((r) => r.checked)).toEqual([true, false]);
		expect(radios.every((r) => r.required)).toBe(true);
		const labels = Array.from(fixture.nativeElement.querySelectorAll('label')) as HTMLLabelElement[];
		expect(labels[1].htmlFor).toBe(radios[1].id);
		radios[1].click();
		fixture.detectChanges();
		expect(fixture.componentInstance.control.value).toBe('express');
		fixture.componentInstance.control.disable();
		fixture.detectChanges();
		expect(radios.every((r) => r.disabled)).toBe(true);
	});
});

@Component({
	selector: 'caps-radio-field-test',
	imports: [CapsRadioGroupImports, ReactiveFormsModule, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Delivery</caps-field-label>
			<caps-radio-group [formControl]="control" aria-describedby="manual">
				<caps-field>
					<caps-field-label>Standard option</caps-field-label>
					<caps-radio value="standard" />
					<caps-field-description>Three days</caps-field-description>
				</caps-field>
				<caps-radio value="express">Express</caps-radio>
			</caps-radio-group>
			<caps-field-description>Choose a speed</caps-field-description>
			<caps-field-error>Required</caps-field-error>
		</caps-field>
		<p id="manual">Manual</p>
	`,
})
class FieldHost {
	public readonly control = new FormControl('', Validators.required);
}

it('associates group and option Fields without stealing labels or descriptions', async () => {
	const fixture = TestBed.createComponent(FieldHost);
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
	const group: HTMLElement = fixture.nativeElement.querySelector('caps-radio-group');
	const labels = Array.from(fixture.nativeElement.querySelectorAll('caps-field-label label')) as HTMLLabelElement[];
	const descriptions = Array.from(fixture.nativeElement.querySelectorAll('caps-field-description')) as HTMLElement[];
	const radio: HTMLInputElement = fixture.nativeElement.querySelector('input');
	expect(group.getAttribute('aria-labelledby')).toBe(labels[0].id);
	expect(labels[0].htmlFor).toBe('');
	expect(labels[1].htmlFor).toBe(radio.id);
	expect(radio.getAttribute('aria-describedby')).toBe(descriptions[0].id);
	expect(group.getAttribute('aria-describedby')?.split(' ')).toEqual(['manual', descriptions[1].id]);
	fixture.componentInstance.control.markAsTouched();
	fixture.detectChanges();
	const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
	expect(group.getAttribute('aria-describedby')?.split(' ')).toContain(error.id);
	expect(group.getAttribute('aria-invalid')).toBe('true');
});

@Component({
	selector: 'caps-radio-bindings-test',
	imports: [CapsRadioGroupImports, FormsModule, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-radio-group [(value)]="selected">
			<caps-radio value="a">A</caps-radio>
			<caps-radio value="b" disabled>B</caps-radio>
			<caps-radio value="c">C</caps-radio>
		</caps-radio-group>
		<caps-radio-group [(ngModel)]="templateValue">
			<caps-radio value="a">A</caps-radio>
			<caps-radio value="b">B</caps-radio>
		</caps-radio-group>
		<caps-radio-group [formField]="fields.choice">
			<caps-radio value="a">A</caps-radio>
			<caps-radio value="b">B</caps-radio>
		</caps-radio-group>
	`,
})
class BindingHost {
	public readonly selected = signal('a');
	public templateValue = 'a';
	public readonly model = signal({ choice: 'a' });
	public readonly fields = form(this.model);
}

it('retains native arrow navigation and skips disabled options', async () => {
	const fixture = TestBed.createComponent(BindingHost);
	fixture.detectChanges();
	await fixture.whenStable();
	const radios = Array.from(
		fixture.nativeElement.querySelectorAll('caps-radio-group:first-child input'),
	) as HTMLInputElement[];
	radios[0].focus();
	await userEvent.keyboard('[ArrowRight]');
	fixture.detectChanges();
	expect(document.activeElement).toBe(radios[2]);
	expect(fixture.componentInstance.selected()).toBe('c');
	await userEvent.keyboard('[ArrowLeft]');
	fixture.detectChanges();
	expect(document.activeElement).toBe(radios[0]);
	expect(fixture.componentInstance.selected()).toBe('a');
});

it('synchronizes template-driven and signal form values', async () => {
	const fixture = TestBed.createComponent(BindingHost);
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
	const groups = fixture.nativeElement.querySelectorAll('caps-radio-group');
	groups[1].querySelectorAll('input')[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.templateValue).toBe('b');
	groups[2].querySelectorAll('input')[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.model().choice).toBe('b');
	fixture.componentInstance.model.set({ choice: 'a' });
	fixture.detectChanges();
	expect(groups[2].querySelectorAll('input')[0].checked).toBe(true);
});

@Component({
	selector: 'caps-radio-card-disabled-test',
	imports: [CapsRadioGroupImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<fieldset [disabled]="disabled()">
			<caps-radio-group [(value)]="selected">
				<caps-field-label for="card-a">
					Card A
					<caps-radio id="card-a" value="a" />
				</caps-field-label>
				<caps-field-label for="card-b">
					Card B
					<caps-radio id="card-b" value="b" />
				</caps-field-label>
			</caps-radio-group>
		</fieldset>
	`,
})
class DisabledCardHost {
	public readonly disabled = signal(true);
	public readonly selected = signal('a');
}

it('keeps FieldLabel cards valid and native fieldset disabling applies to the indicator', () => {
	const fixture = TestBed.createComponent(DisabledCardHost);
	fixture.detectChanges();
	expect(fixture.nativeElement.querySelector('label label')).toBeNull();
	const indicators = fixture.nativeElement.querySelectorAll('.caps-radio-indicator');
	indicators[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.selected()).toBe('a');
	fixture.componentInstance.disabled.set(false);
	fixture.detectChanges();
	indicators[1].click();
	fixture.detectChanges();
	expect(fixture.componentInstance.selected()).toBe('b');
});
