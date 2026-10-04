import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { userEvent } from '@vitest/browser/context';
import { CapsInputGroupImports } from '../index';

@Component({
	imports: [
		CapsInputGroupImports,
		CapsInputImports,
		CapsTextareaImports,
		CapsButtonImports,
		CapsFieldImports,
		ReactiveFormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field dir="rtl">
			<caps-field-label>Search</caps-field-label>
			<caps-input-group>
				<input capsInput [formControl]="control" />
				<caps-input-group-addon [align]="align()">
					<caps-input-group-text>https://</caps-input-group-text>
				</caps-input-group-addon>
				<caps-input-group-addon align="inline-end">
					<button capsButton type="button" (click)="clear()">Clear</button>
				</caps-input-group-addon>
			</caps-input-group>
			<caps-field-description>Enter a search term.</caps-field-description>
		</caps-field>
		<caps-input-group><textarea capsTextarea aria-label="Message"></textarea></caps-input-group>
	`,
})
class Host {
	public readonly control = new FormControl('', { nonNullable: true, validators: Validators.required });
	public readonly align = signal<'inline-start' | 'block-start'>('inline-start');
	public clear(): void {
		this.control.setValue('');
	}
}

describe('CapsInputGroup native composition', () => {
	it('retains native editing, forms, labels and descriptions without a group value accessor', async () => {
		const fixture = TestBed.createComponent(Host);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		const description: HTMLElement = fixture.nativeElement.querySelector('caps-field-description');
		expect(label.htmlFor).toBe(input.id);
		expect(input.getAttribute('aria-describedby')).toBe(description.id);
		label.click();
		await userEvent.keyboard('capsule');
		fixture.detectChanges();
		expect(fixture.componentInstance.control.value).toBe('capsule');
		const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
		button.click();
		fixture.detectChanges();
		expect(input.value).toBe('');
		fixture.componentInstance.control.disable();
		fixture.detectChanges();
		expect(input.disabled).toBe(true);
		expect(fixture.nativeElement.querySelector('textarea').getAttribute('data-slot')).toBe('textarea');
	});
	it('preserves logical addon placement and native action focus in RTL', async () => {
		const fixture = TestBed.createComponent(Host);
		fixture.detectChanges();
		await fixture.whenStable();
		const addon: HTMLElement = fixture.nativeElement.querySelector('caps-input-group-addon');
		expect(addon.getAttribute('data-align')).toBe('inline-start');
		fixture.componentInstance.align.set('block-start');
		fixture.detectChanges();
		expect(addon.getAttribute('data-align')).toBe('block-start');
		const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
		button.focus();
		expect(document.activeElement).toBe(button);
		expect(fixture.nativeElement.querySelector('label button')).toBeNull();
	});
});
