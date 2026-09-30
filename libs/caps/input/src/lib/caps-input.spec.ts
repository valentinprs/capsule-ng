import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { CapsInput, CapsInputImports } from '../index';

@Component({
	selector: 'caps-input-native-host',
	imports: [CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<input
			capsInput
			[type]="type()"
			placeholder="Your email"
			required
			readonly
			disabled
			autocomplete="email"
			class="custom-input w-64"
		/>
		<input capsInput />
		<input capsInput id="explicit-input" forceInvalid />
	`,
})
class NativeHost {
	public readonly type = input('text');
}

@Component({
	selector: 'caps-input-field-host',
	imports: [CapsInput, ReactiveFormsModule, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-field>
			<!-- The test verifies Brain infers the generated control ID; no explicit for is intentional. -->
			<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
			<label hlmFieldLabel>Email</label>
			<input
				capsInput
				type="email"
				[formControl]="control"
				[forceInvalid]="forceInvalid()"
				aria-describedby="manual manual"
			/>
			<hlm-field-description>We will email you updates.</hlm-field-description>
			<hlm-field-error>Provide a valid email address.</hlm-field-error>
		</hlm-field>
		<p id="manual">Additional instructions.</p>
	`,
})
class FieldHost {
	public readonly control = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required, Validators.email],
	});
	public readonly forceInvalid = signal(false);
}

@Component({
	selector: 'caps-input-template-host',
	imports: [CapsInputImports, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<input capsInput [(ngModel)]="value" [disabled]="disabled()" />
	`,
})
class TemplateHost {
	public value = 'initial';
	public readonly disabled = signal(false);
}

@Component({
	selector: 'caps-input-signal-host',
	imports: [CapsInputImports, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<input capsInput [formField]="fields.name" />
	`,
})
class SignalHost {
	public readonly model = signal({ name: 'initial' });
	public readonly fields = form(this.model);
}

describe('capsInput native API', () => {
	it.each(['text', 'email', 'password', 'search', 'url', 'file'])('preserves native attributes for type %s', (type) => {
		const fixture = TestBed.createComponent(NativeHost);
		fixture.componentRef.setInput('type', type);
		fixture.detectChanges();
		const element: HTMLInputElement = fixture.nativeElement.querySelector('input');

		expect(element.tagName).toBe('INPUT');
		expect(element.type).toBe(type);
		expect(element.placeholder).toBe('Your email');
		expect(element.required).toBe(true);
		expect(element.readOnly).toBe(true);
		expect(element.disabled).toBe(true);
		expect(element.autocomplete).toBe('email');
		expect(element.hasAttribute('role')).toBe(false);
		expect(element.hasAttribute('tabindex')).toBe(false);
	});

	it('generates unique IDs and preserves explicit IDs', () => {
		const fixture = TestBed.createComponent(NativeHost);
		fixture.detectChanges();
		const elements: HTMLInputElement[] = Array.from(fixture.nativeElement.querySelectorAll('input'));

		expect(elements[0].id).toMatch(/^brn-input-\d+$/);
		expect(elements[1].id).toMatch(/^brn-input-\d+$/);
		expect(elements[0].id).not.toBe(elements[1].id);
		expect(elements[2].id).toBe('explicit-input');
	});

	it('merges consumer classes while retaining the styling hook and data slot', () => {
		const fixture = TestBed.createComponent(NativeHost);
		fixture.detectChanges();
		const element: HTMLInputElement = fixture.nativeElement.querySelector('input');

		expect(element.classList).toContain('caps-input');
		expect(element.classList).toContain('custom-input');
		expect(element.classList).toContain('w-64');
		expect(element.classList).not.toContain('w-full');
		expect(element.getAttribute('data-slot')).toBe('input');
	});

	it('forces error appearance without inventing an ARIA validation error', () => {
		const fixture = TestBed.createComponent(NativeHost);
		fixture.detectChanges();
		const element: HTMLInputElement = fixture.nativeElement.querySelector('#explicit-input');

		expect(element.getAttribute('data-matches-spartan-invalid')).toBe('true');
		expect(element.hasAttribute('aria-invalid')).toBe(false);
		expect(element.hasAttribute('data-invalid')).toBe(false);
	});
});

describe('capsInput form and Field integration', () => {
	async function renderField() {
		const fixture = TestBed.createComponent(FieldHost);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const element: HTMLInputElement = fixture.nativeElement.querySelector('input');
		return { fixture, element, host: fixture.componentInstance };
	}

	it('uses the generated ID for the Field label and merges manual and Field description IDs', async () => {
		const { fixture, element } = await renderField();
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		const description: HTMLElement = fixture.nativeElement.querySelector('[data-slot="field-description"]');

		expect(label.htmlFor).toBe(element.id);
		expect(element.getAttribute('aria-describedby')?.split(' ')).toEqual(['manual', description.id]);
	});

	it('retains validation-driven ARIA state and only styles errors after touch', async () => {
		const { fixture, element, host } = await renderField();

		expect(element.getAttribute('aria-invalid')).toBe('true');
		expect(element.hasAttribute('data-matches-spartan-invalid')).toBe(false);
		host.control.markAsTouched();
		fixture.detectChanges();

		expect(element.getAttribute('data-touched')).toBe('true');
		expect(element.getAttribute('data-matches-spartan-invalid')).toBe('true');
		const error: HTMLElement = fixture.nativeElement.querySelector('[data-slot="field-error"]');
		expect(element.getAttribute('aria-describedby')?.split(' ')).toContain(error.id);

		host.control.setValue('person@example.com');
		fixture.detectChanges();
		expect(element.value).toBe('person@example.com');
		expect(element.hasAttribute('aria-invalid')).toBe(false);
		expect(element.hasAttribute('data-matches-spartan-invalid')).toBe(false);
	});

	it('preserves native typing, dirty state, and reactive disabled state', async () => {
		const { fixture, element, host } = await renderField();
		element.value = 'typed@example.com';
		element.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		expect(host.control.value).toBe('typed@example.com');
		expect(element.getAttribute('data-dirty')).toBe('true');
		host.control.disable();
		fixture.detectChanges();
		expect(element.disabled).toBe(true);
		host.control.enable();
		fixture.detectChanges();
		expect(element.disabled).toBe(false);
	});

	it('keeps forced invalid appearance separate from a valid control', async () => {
		const { fixture, element, host } = await renderField();
		host.control.setValue('valid@example.com');
		host.forceInvalid.set(true);
		fixture.detectChanges();

		expect(element.getAttribute('data-matches-spartan-invalid')).toBe('true');
		expect(element.hasAttribute('aria-invalid')).toBe(false);
		host.forceInvalid.set(false);
		fixture.detectChanges();
		expect(element.hasAttribute('data-matches-spartan-invalid')).toBe(false);
	});

	it('uses the native template-driven value accessor', async () => {
		const fixture = TestBed.createComponent(TemplateHost);
		fixture.detectChanges();
		await fixture.whenStable();
		const element: HTMLInputElement = fixture.nativeElement.querySelector('input');
		expect(element.value).toBe('initial');
		element.value = 'updated';
		element.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(fixture.componentInstance.value).toBe('updated');
		fixture.componentInstance.disabled.set(true);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(element.disabled).toBe(true);
	});

	it('keeps signal forms on the native control', () => {
		const fixture = TestBed.createComponent(SignalHost);
		fixture.detectChanges();
		const element: HTMLInputElement = fixture.nativeElement.querySelector('input');
		expect(element.value).toBe('initial');
		element.value = 'updated';
		element.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(fixture.componentInstance.model().name).toBe('updated');
		fixture.componentInstance.model.set({ name: 'from model' });
		fixture.detectChanges();
		expect(element.value).toBe('from model');
	});
});
