import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { userEvent } from '@vitest/browser/context';
import { CapsCheckbox } from '../index';

@Component({
	imports: [CapsCheckbox, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Notifications</caps-field-label>
			<caps-checkbox [formControl]="control" required aria-describedby="manual manual" />
			<caps-field-description>Receive updates.</caps-field-description>
			<caps-field-error validator="required">Required.</caps-field-error>
		</caps-field>
	`,
})
class Host {
	public readonly control = new FormControl(false, { nonNullable: true, validators: Validators.requiredTrue });
}

describe('CapsCheckbox public forms and Field integration', () => {
	it('associates labels and descriptions, updates the form and reflects validation on its interactive button', async () => {
		const fixture = TestBed.createComponent(Host);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		const description: HTMLElement = fixture.nativeElement.querySelector('caps-field-description');
		expect(button.getAttribute('role')).toBe('checkbox');
		expect(label.htmlFor).toBe(button.id);
		expect(button.getAttribute('aria-describedby')?.split(' ')).toEqual(['manual', description.id]);
		expect(button.getAttribute('aria-required')).toBe('true');
		expect(button.getAttribute('aria-invalid')).toBe('true');
		fixture.componentInstance.control.markAsTouched();
		fixture.detectChanges();
		await fixture.whenStable();
		const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
		expect(button.getAttribute('aria-describedby')?.split(' ')).toContain(error.id);
		label.click();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.componentInstance.control.value).toBe(true);
		expect(button.getAttribute('aria-checked')).toBe('true');
		expect(button.hasAttribute('aria-invalid')).toBe(false);
		expect(button.getAttribute('data-dirty')).toBe('true');
		fixture.componentInstance.control.disable();
		fixture.detectChanges();
		expect(button.disabled).toBe(true);
		button.click();
		expect(fixture.componentInstance.control.value).toBe(true);
	});
});

@Component({
	imports: [CapsCheckbox, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-checkbox [(checked)]="checked" [(indeterminate)]="mixed" forceInvalid aria-label="Direct" />
		<caps-checkbox [(ngModel)]="model" aria-label="Template" />
	`,
})
class BindingHost {
	public readonly checked = signal(false);
	public readonly mixed = signal(true);
	public readonly model = signal(false);
}

describe('CapsCheckbox native keyboard and binding behavior', () => {
	it('activates by keyboard and keeps direct and template bindings synchronized', async () => {
		const fixture = TestBed.createComponent(BindingHost);
		fixture.detectChanges();
		await fixture.whenStable();
		const [direct, template] = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
		expect(direct.getAttribute('aria-checked')).toBe('mixed');
		expect(direct.getAttribute('aria-invalid')).toBeNull();
		expect(direct.getAttribute('data-matches-spartan-invalid')).toBe('true');
		direct.focus();
		await userEvent.keyboard('[Space]');
		fixture.detectChanges();
		expect(fixture.componentInstance.checked()).toBe(true);
		expect(direct.getAttribute('aria-checked')).toBe('true');
		expect(fixture.componentInstance.mixed()).toBe(false);
		template.focus();
		await userEvent.keyboard('[Enter]');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.componentInstance.model()).toBe(true);
		fixture.componentInstance.model.set(false);
		fixture.changeDetectorRef.markForCheck();
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		expect(template.getAttribute('aria-checked')).toBe('false');
	});
});
