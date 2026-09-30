import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { BrnLabel } from '@spartan-ng/brain/label';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { CapsTextareaImports } from '../index';

@Component({
	selector: 'caps-textarea-host',
	imports: [CapsTextareaImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<textarea
			capsTextarea
			[id]="id()"
			[forceInvalid]="forceInvalid()"
			[disabled]="disabled()"
			class="min-h-24 w-80 resize-y font-bold"
			placeholder="Your message"
			rows="4"
			cols="30"
			maxlength="500"
			required
			readonly
			aria-label="Message"
		></textarea>
	`,
})
class TextareaHost {
	public readonly id = input<string>('message');
	public readonly forceInvalid = input(false);
	public readonly disabled = input(false);
}

@Component({
	selector: 'caps-textarea-generated-id-host',
	imports: [CapsTextareaImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<textarea capsTextarea aria-label="First message"></textarea>
		<textarea capsTextarea aria-label="Second message"></textarea>
		<div capsTextarea></div>
	`,
})
class GeneratedIdHost {}

@Component({
	selector: 'caps-textarea-form-host',
	imports: [CapsTextareaImports, ReactiveFormsModule, HlmFieldImports, BrnLabel],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-field>
			<!-- BrnLabel infers the textarea's generated ID from Field; the association is asserted below. -->
			<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
			<label brnLabel>Message</label>
			<textarea capsTextarea [formControl]="control" [aria-describedby]="describedBy()" rows="3"></textarea>
			<p hlmFieldDescription id="message-description">Tell us what is on your mind.</p>
			<hlm-field-error id="message-error">Message is required.</hlm-field-error>
		</hlm-field>
		<p id="manual-description">Additional instructions.</p>
	`,
})
class FormHost {
	public readonly control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
	public readonly describedBy = input<string | null>('manual-description message-description');
}

@Component({
	selector: 'caps-textarea-template-form-host',
	imports: [CapsTextareaImports, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<textarea capsTextarea [(ngModel)]="message" aria-label="Message"></textarea>
	`,
})
class TemplateFormHost {
	public message = 'First line\nSecond line';
}

@Component({
	selector: 'caps-textarea-signal-form-host',
	imports: [CapsTextareaImports, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<textarea capsTextarea [formField]="form.message" aria-label="Message"></textarea>
	`,
})
class SignalFormHost {
	public readonly model = signal({ message: 'First line\nSecond line' });
	public readonly form = form(this.model, (path) => required(path.message));
}

describe('capsTextarea', () => {
	it('keeps the native element, attributes and Capsule slot', () => {
		const fixture = TestBed.createComponent(TextareaHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

		expect(textarea.tagName).toBe('TEXTAREA');
		expect(textarea.getAttribute('data-slot')).toBe('textarea');
		expect(textarea.hasAttribute('role')).toBe(false);
		expect(textarea.hasAttribute('tabindex')).toBe(false);
		expect(textarea.placeholder).toBe('Your message');
		expect(textarea.rows).toBe(4);
		expect(textarea.cols).toBe(30);
		expect(textarea.maxLength).toBe(500);
		expect(textarea.required).toBe(true);
		expect(textarea.readOnly).toBe(true);
		expect(textarea.id).toBe('message');
	});

	it('merges consumer classes and sizing overrides while retaining the hook', () => {
		const fixture = TestBed.createComponent(TextareaHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

		expect(textarea.classList).toContain('caps-textarea');
		expect(textarea.classList).toContain('font-bold');
		expect(textarea.classList).toContain('min-h-24');
		expect(textarea.classList).not.toContain('min-h-16');
		expect(textarea.classList).toContain('w-80');
		expect(textarea.classList).not.toContain('w-full');
		expect(textarea.classList).toContain('field-sizing-content');
		expect(textarea.classList).toContain('resize-y');
	});

	it('generates unique IDs and only attaches to native textareas', () => {
		const fixture = TestBed.createComponent(GeneratedIdHost);
		fixture.detectChanges();
		const textareas: HTMLTextAreaElement[] = Array.from(fixture.nativeElement.querySelectorAll('textarea'));

		expect(textareas[0].id).toMatch(/^brn-textarea-\d+$/);
		expect(textareas[1].id).toMatch(/^brn-textarea-\d+$/);
		expect(textareas[0].id).not.toBe(textareas[1].id);
		expect(fixture.nativeElement.querySelector('div').classList).not.toContain('caps-textarea');
	});

	it('updates explicit IDs and native disabled state', () => {
		const fixture = TestBed.createComponent(TextareaHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

		fixture.componentRef.setInput('id', 'updated-message');
		fixture.componentRef.setInput('disabled', true);
		fixture.detectChanges();
		expect(textarea.id).toBe('updated-message');
		expect(textarea.disabled).toBe(true);

		fixture.componentRef.setInput('disabled', false);
		fixture.detectChanges();
		expect(textarea.disabled).toBe(false);
	});

	it('forces invalid styling without inventing an ARIA validation state', () => {
		const fixture = TestBed.createComponent(TextareaHost);
		fixture.componentRef.setInput('forceInvalid', true);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

		expect(textarea.getAttribute('data-matches-spartan-invalid')).toBe('true');
		expect(textarea.hasAttribute('aria-invalid')).toBe(false);
		expect(textarea.hasAttribute('data-invalid')).toBe(false);

		fixture.componentRef.setInput('forceInvalid', false);
		fixture.detectChanges();
		expect(textarea.hasAttribute('data-matches-spartan-invalid')).toBe(false);
	});

	it('preserves multiline reactive values and model-driven disabled state', () => {
		const fixture = TestBed.createComponent(FormHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
		const control = fixture.componentInstance.control;

		control.setValue('First line\nSecond line');
		fixture.detectChanges();
		expect(textarea.value).toBe('First line\nSecond line');

		textarea.value = 'Edited first line\nEdited second line';
		textarea.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(control.value).toBe('Edited first line\nEdited second line');
		expect(textarea.getAttribute('data-dirty')).toBe('true');

		control.disable();
		fixture.detectChanges();
		expect(textarea.disabled).toBe(true);
		control.enable();
		fixture.detectChanges();
		expect(textarea.disabled).toBe(false);
	});

	it('associates the inferred Field label and combines manual, description and validation error IDs', () => {
		const fixture = TestBed.createComponent(FormHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		const control = fixture.componentInstance.control;

		expect(label.htmlFor).toBe(textarea.id);
		expect(textarea.getAttribute('aria-describedby')?.split(' ')).toEqual([
			'manual-description',
			'message-description',
		]);
		expect(textarea.getAttribute('aria-invalid')).toBe('true');
		expect(textarea.hasAttribute('data-matches-spartan-invalid')).toBe(false);

		control.markAsTouched();
		control.updateValueAndValidity();
		fixture.detectChanges();
		expect(textarea.getAttribute('data-touched')).toBe('true');
		expect(textarea.getAttribute('data-matches-spartan-invalid')).toBe('true');
		expect(textarea.getAttribute('aria-describedby')?.split(' ')).toEqual([
			'manual-description',
			'message-description',
			'message-error',
		]);

		fixture.componentRef.setInput('describedBy', null);
		control.setValue('Valid message');
		fixture.detectChanges();
		expect(textarea.getAttribute('aria-describedby')).toBe('message-description');
		expect(textarea.hasAttribute('aria-invalid')).toBe(false);
		expect(textarea.hasAttribute('data-matches-spartan-invalid')).toBe(false);
	});

	it('preserves the native textarea value accessor for template-driven forms', async () => {
		const fixture = TestBed.createComponent(TemplateFormHost);
		fixture.detectChanges();
		await fixture.whenStable();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
		expect(textarea.value).toBe('First line\nSecond line');

		textarea.value = 'New first line\nNew second line';
		textarea.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.componentInstance.message).toBe('New first line\nNew second line');
	});

	it('preserves signal-form multiline values and validation state', () => {
		const fixture = TestBed.createComponent(SignalFormHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
		expect(textarea.value).toBe('First line\nSecond line');

		textarea.value = 'Updated first line\nUpdated second line';
		textarea.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(fixture.componentInstance.model().message).toBe('Updated first line\nUpdated second line');

		textarea.value = '';
		textarea.dispatchEvent(new Event('input'));
		textarea.dispatchEvent(new Event('blur'));
		fixture.detectChanges();
		expect(fixture.componentInstance.form.message().invalid()).toBe(true);
		expect(textarea.getAttribute('aria-invalid')).toBe('true');
		expect(textarea.getAttribute('data-matches-spartan-invalid')).toBe('true');
	});
});
