import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, required } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { provideErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@spartan-ng/brain/forms';
import { CapsFieldImports } from '../index';

@Component({
	selector: 'caps-field-validation-host',
	imports: [CapsFieldImports, CapsInputImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field [orientation]="orientation()" [forceInvalid]="forceInvalid()" class="w-80">
			<caps-field-content>
				<!-- Field infers the association; the tests verify the resulting native for/id. -->
				<caps-field-label [id]="labelId()" [for]="labelFor()" class="font-bold">Email</caps-field-label>
				@if (showDescription()) {
					<caps-field-description [id]="descriptionId()">Email instructions</caps-field-description>
				}
				<caps-field-error validator="required" id="required-error">Email is required</caps-field-error>
				<caps-field-error validator="email" id="email-error">Use a valid email</caps-field-error>
				@if (showManualError()) {
					<caps-field-error [forceShow]="forceShow()" [id]="manualErrorId()">Server error</caps-field-error>
				}
			</caps-field-content>
			<input capsInput type="email" [formControl]="control" aria-describedby="manual manual" />
		</caps-field>
		<p id="manual">Additional instructions</p>
	`,
})
class ValidationHost {
	public readonly control = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required, Validators.email],
	});
	public readonly orientation = input<'vertical' | 'horizontal' | 'responsive'>('vertical');
	public readonly forceInvalid = signal(false);
	public readonly labelId = signal('email-label');
	public readonly labelFor = signal<string | undefined>(undefined);
	public readonly forceShow = signal(false);
	public readonly showManualError = signal(false);
	public readonly showDescription = signal(true);
	public readonly descriptionId = signal('email-description');
	public readonly manualErrorId = signal('server-error');
}

@Component({
	selector: 'caps-field-group-host',
	imports: [CapsFieldImports, CapsInputImports, CapsTextareaImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field-set [disabled]="disabled()" aria-describedby="manual-set" class="gap-8">
			@if (showLegend()) {
				<caps-field-legend id="profile-legend" [variant]="variant()" class="font-bold">{{ title() }}</caps-field-legend>
			}
			<caps-field-description id="set-help">Profile instructions</caps-field-description>
			<caps-field-group>
				<caps-field>
					<caps-field-label for="name">Name</caps-field-label>
					<input capsInput id="name" />
					<caps-field-description id="name-help">Name instructions</caps-field-description>
				</caps-field>
				<caps-field-separator>Or</caps-field-separator>
				<caps-field>
					<!-- The projected textarea label is associated by Field. -->
					<caps-field-label>Message</caps-field-label>
					<textarea capsTextarea></textarea>
					<caps-field-description>Message instructions</caps-field-description>
				</caps-field>
			</caps-field-group>
		</caps-field-set>
		<p id="manual-set">Manual profile instructions</p>
	`,
})
class GroupHost {
	public readonly disabled = signal(true);
	public readonly showLegend = signal(true);
	public readonly title = signal('Profile');
	public readonly variant = input<'legend' | 'label'>('legend');
}

@Component({
	selector: 'caps-field-template-host',
	imports: [CapsFieldImports, CapsInputImports, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form #form="ngForm">
			<caps-field>
				<caps-field-label for="template-name">Name</caps-field-label>
				<caps-field-content>
					<input capsInput id="template-name" name="name" required [(ngModel)]="name" />
				</caps-field-content>
				<caps-field-error validator="required">Name is required</caps-field-error>
			</caps-field>
			<button type="submit">Submit</button>
		</form>
	`,
})
class TemplateHost {
	public name = '';
}

@Component({
	selector: 'caps-field-signal-host',
	imports: [CapsFieldImports, CapsTextareaImports, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<!-- The native textarea association is inferred and asserted below. -->
			<caps-field-label>Message</caps-field-label>
			<textarea capsTextarea [formField]="fields.message"></textarea>
			<caps-field-error validator="required">Message is required</caps-field-error>
		</caps-field>
	`,
})
class SignalHost {
	public readonly model = signal({ message: '' });
	public readonly fields = form(this.model, (path) => required(path.message));
}

@Component({
	selector: 'caps-field-standalone-message-host',
	imports: [CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field-description>Standalone help</caps-field-description>
		<caps-field-error>Standalone error</caps-field-error>
	`,
})
class StandaloneHost {}

@Component({
	selector: 'caps-field-reactive-group-host',
	imports: [CapsFieldImports, CapsInputImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form">
			<caps-field-set>
				<caps-field-legend>Email settings</caps-field-legend>
				<caps-field-group>
					<caps-field>
						<caps-field-content>
							<caps-field-label for="group-email">Email</caps-field-label>
							<input capsInput id="group-email" formControlName="email" />
							<caps-field-error validator="required">Email is required</caps-field-error>
						</caps-field-content>
					</caps-field>
				</caps-field-group>
			</caps-field-set>
		</form>
	`,
})
class ReactiveGroupHost {
	public readonly form = new FormGroup({
		email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
	});
}

describe('Capsule Field composition', () => {
	function render() {
		const fixture = TestBed.createComponent(ValidationHost);
		fixture.detectChanges();
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		const field: HTMLElement = fixture.nativeElement.querySelector('caps-field');
		return { fixture, input, field, host: fixture.componentInstance };
	}

	it('associates labels and descriptions through FieldContent and names the group', () => {
		const { fixture, input, field } = render();
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		expect(label.htmlFor).toBe(input.id);
		expect(label.control).toBe(input);
		expect(label.getAttribute('data-slot')).toBe('field-label');
		expect(label.classList).toContain('caps-field-label');
		expect(field.getAttribute('role')).toBe('group');
		expect(field.getAttribute('aria-labelledby')).toBe(label.id);
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description');
		label.click();
		expect(document.activeElement).toBe(input);
	});

	it('forwards label IDs and classes to the native element and updates the group name', () => {
		const { fixture, input, field, host } = render();
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		expect(label.id).toBe('email-label');
		expect(fixture.nativeElement.querySelectorAll('#email-label')).toHaveLength(1);
		expect(label.classList).toContain('font-bold');
		host.labelId.set('updated-email-label');
		host.labelFor.set('explicit-control');
		fixture.detectChanges();
		expect(label.id).toBe('updated-email-label');
		expect(label.htmlFor).toBe('explicit-control');
		expect(field.getAttribute('aria-labelledby')).toBe('updated-email-label');
		expect(fixture.nativeElement.querySelectorAll('#updated-email-label')).toHaveLength(1);
		host.labelFor.set(undefined);
		fixture.detectChanges();
		expect(label.htmlFor).toBe(input.id);
	});

	it.each(['vertical', 'horizontal', 'responsive'] as const)(
		'supports %s layout and merges consumer classes',
		(orientation) => {
			const { fixture, field } = render();
			fixture.componentRef.setInput('orientation', orientation);
			fixture.detectChanges();
			expect(field.getAttribute('data-orientation')).toBe(orientation);
			expect(field.classList).toContain('caps-field');
			expect(field.classList).toContain('w-80');
			expect(field.classList).not.toContain('w-full');
		},
	);

	it('shows only the matching validator after touch and links only visible errors', () => {
		const { fixture, input, field, host } = render();
		const requiredError: HTMLElement = fixture.nativeElement.querySelector('#required-error');
		const emailError: HTMLElement = fixture.nativeElement.querySelector('#email-error');
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(requiredError.hidden).toBe(true);
		expect(emailError.hidden).toBe(true);
		expect(field.hasAttribute('data-matches-spartan-invalid')).toBe(false);

		host.control.markAsTouched();
		fixture.detectChanges();
		expect(requiredError.hidden).toBe(false);
		expect(emailError.hidden).toBe(true);
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description required-error');
		expect(field.getAttribute('data-matches-spartan-invalid')).toBe('true');

		host.control.setValue('invalid');
		fixture.detectChanges();
		expect(requiredError.hidden).toBe(true);
		expect(emailError.hidden).toBe(false);
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description email-error');

		host.control.setValue('valid@example.com');
		fixture.detectChanges();
		expect(emailError.hidden).toBe(true);
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description');
		expect(input.hasAttribute('aria-invalid')).toBe(false);
		expect(field.hasAttribute('data-matches-spartan-invalid')).toBe(false);
	});

	it('updates and removes description IDs without stale references', () => {
		const { fixture, input, host } = render();
		host.descriptionId.set('updated-description');
		fixture.detectChanges();
		expect(input.getAttribute('aria-describedby')).toBe('manual updated-description');
		host.showDescription.set(false);
		fixture.detectChanges();
		expect(input.getAttribute('aria-describedby')).toBe('manual');
	});

	it('registers forced messages through FieldContent, handles ID changes, hide and destruction', () => {
		const { fixture, input, host } = render();
		host.control.setValue('valid@example.com');
		host.showManualError.set(true);
		host.forceShow.set(true);
		fixture.detectChanges();
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description server-error');
		expect(input.hasAttribute('aria-invalid')).toBe(false);
		host.manualErrorId.set('new-server-error');
		fixture.detectChanges();
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description new-server-error');
		host.forceShow.set(false);
		fixture.detectChanges();
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description');
		host.forceShow.set(true);
		fixture.detectChanges();
		host.showManualError.set(false);
		fixture.detectChanges();
		expect(input.getAttribute('aria-describedby')).toBe('manual email-description');
	});

	it('keeps forced appearance separate from native validation and error visibility', () => {
		const { fixture, input, field, host } = render();
		host.control.setValue('valid@example.com');
		host.forceInvalid.set(true);
		fixture.detectChanges();
		expect(field.getAttribute('data-matches-spartan-invalid')).toBe('true');
		expect(input.hasAttribute('aria-invalid')).toBe(false);
		expect(fixture.nativeElement.querySelector('#required-error').hidden).toBe(true);
	});

	it('preserves native fieldset/legend naming, disabled behavior, and independent description scopes', () => {
		const fixture = TestBed.createComponent(GroupHost);
		fixture.detectChanges();
		const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
		const legend: HTMLLegendElement = fixture.nativeElement.querySelector('legend');
		expect(legend.parentElement).toBe(fieldset);
		expect(legend.textContent).toContain('Profile');
		expect(legend.id).toBe('profile-legend');
		expect(fixture.nativeElement.querySelectorAll('#profile-legend')).toHaveLength(1);
		expect(legend.classList).toContain('font-bold');
		expect(fieldset.classList).toContain('gap-8');
		expect(fieldset.disabled).toBe(true);
		expect(input.matches(':disabled')).toBe(true);
		expect(textarea.matches(':disabled')).toBe(true);
		expect(fieldset.getAttribute('aria-describedby')).toBe('manual-set set-help');
		expect(input.getAttribute('aria-describedby')).toBe('name-help');
		const help: HTMLElement = fixture.nativeElement.querySelector('textarea + caps-field-description');
		expect(textarea.getAttribute('aria-describedby')).toBe(help.id);
		expect(help.id).toMatch(/^caps-field-description-\d+$/);
		fixture.componentRef.setInput('variant', 'label');
		fixture.detectChanges();
		expect(legend.getAttribute('data-variant')).toBe('label');
		expect(fixture.nativeElement.querySelector('caps-field-separator').textContent).toContain('Or');
		fixture.componentInstance.disabled.set(false);
		fixture.detectChanges();
		expect(fieldset.disabled).toBe(false);
		expect(input.matches(':disabled')).toBe(false);
		expect(textarea.matches(':disabled')).toBe(false);
	});

	it('projects dynamic legend content as the first native fieldset child and removes it cleanly', () => {
		const fixture = TestBed.createComponent(GroupHost);
		fixture.detectChanges();
		const fieldset: HTMLFieldSetElement = fixture.nativeElement.querySelector('fieldset');
		expect(fieldset.firstElementChild?.tagName).toBe('LEGEND');
		fixture.componentInstance.title.set('Updated profile');
		fixture.detectChanges();
		expect(fieldset.firstElementChild?.textContent).toContain('Updated profile');
		fixture.componentInstance.showLegend.set(false);
		fixture.detectChanges();
		expect(fieldset.querySelector('legend')).toBeNull();
		expect(fieldset.querySelector('input')).not.toBeNull();
		fixture.componentInstance.showLegend.set(true);
		fixture.detectChanges();
		expect(fieldset.firstElementChild?.textContent).toContain('Updated profile');
		expect(fieldset.querySelectorAll('legend')).toHaveLength(1);
	});

	it('supports template-driven validation after form submission', async () => {
		const fixture = TestBed.createComponent(TemplateHost);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
		const parentForm = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
		expect(parentForm.controls['name']).toBeDefined();
		expect(error.hidden).toBe(true);
		fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
		fixture.detectChanges();
		expect(error.hidden).toBe(false);
		expect(fixture.nativeElement.querySelector('input').getAttribute('aria-describedby')).toBe(error.id);
		fixture.nativeElement.querySelector('form').dispatchEvent(new Event('reset', { bubbles: true }));
		fixture.detectChanges();
		expect(error.hidden).toBe(true);
	});

	it('supports signal-form textarea validation and inferred naming', () => {
		const fixture = TestBed.createComponent(SignalHost);
		fixture.detectChanges();
		const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');
		const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
		expect(error.hidden).toBe(true);
		textarea.dispatchEvent(new Event('blur'));
		fixture.detectChanges();
		expect(error.hidden).toBe(false);
		expect(textarea.getAttribute('aria-describedby')).toBe(error.id);
		textarea.value = 'Valid multiline\nmessage';
		textarea.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(error.hidden).toBe(true);
		expect(textarea.hasAttribute('aria-describedby')).toBe(false);
	});

	it('renders standalone descriptions and errors with distinct generated IDs', () => {
		const fixture = TestBed.createComponent(StandaloneHost);
		fixture.detectChanges();
		const description: HTMLElement = fixture.nativeElement.querySelector('caps-field-description');
		const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
		expect(error.hidden).toBe(false);
		expect(error.getAttribute('role')).toBe('alert');
		expect(description.textContent).toContain('Standalone help');
		expect(error.textContent).toContain('Standalone error');
		expect(description.id).not.toBe(error.id);
	});
	it('preserves FormControlName ownership through Group, Field and FieldContent', () => {
		const fixture = TestBed.createComponent(ReactiveGroupHost);
		fixture.detectChanges();
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		const error: HTMLElement = fixture.nativeElement.querySelector('caps-field-error');
		fixture.componentInstance.form.controls.email.markAsTouched();
		fixture.detectChanges();
		expect(error.hidden).toBe(false);
		input.value = 'value from native control';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(fixture.componentInstance.form.controls.email.value).toBe('value from native control');
		expect(error.hidden).toBe(true);
	});

	it('honors the configured Brain matcher for Field styling and error visibility', () => {
		TestBed.overrideComponent(ValidationHost, {
			add: { providers: [provideErrorStateMatcher(ShowOnDirtyErrorStateMatcher)] },
		});
		const { fixture, host, field } = render();
		const error: HTMLElement = fixture.nativeElement.querySelector('#required-error');
		host.control.markAsTouched();
		fixture.detectChanges();
		expect(error.hidden).toBe(true);
		expect(field.hasAttribute('data-matches-spartan-invalid')).toBe(false);
		host.control.markAsDirty();
		fixture.detectChanges();
		expect(error.hidden).toBe(false);
		expect(field.getAttribute('data-matches-spartan-invalid')).toBe('true');
	});
});

@Component({
	imports: [CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field-label class="border p-4">Static</caps-field-label>
		<caps-field-label [class]="styles()">Dynamic</caps-field-label>
	`,
})
class ForwardedClassHost {
	public readonly styles = signal('p-2 border-2');
}

describe('caps-field-label class forwarding', () => {
	it('applies static and changing consumer classes only to the native element', () => {
		const fixture = TestBed.createComponent(ForwardedClassHost);
		fixture.detectChanges();
		const hosts = Array.from(fixture.nativeElement.querySelectorAll('caps-field-label')) as HTMLElement[];
		expect(hosts[0].classList).not.toContain('p-4');
		expect(hosts[0].classList).not.toContain('border');
		expect(hosts[0].querySelector('label')?.classList).toContain('p-4');
		expect(hosts[1].classList).not.toContain('p-2');
		expect(hosts[1].querySelector('label')?.classList).toContain('p-2');
		fixture.componentInstance.styles.set('p-6');
		fixture.detectChanges();
		expect(hosts[1].classList).not.toContain('p-6');
		expect(hosts[1].querySelector('label')?.classList).toContain('p-6');
		expect(hosts[1].querySelector('label')?.classList).not.toContain('p-2');
		expect(hosts[0].classList).toContain('block');
	});
});
