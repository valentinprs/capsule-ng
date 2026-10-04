import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { disabled, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { userEvent } from '@vitest/browser/context';
import { CapsInputOtpImports } from '../index';

@Component({
	imports: [CapsInputOtpImports, CapsFieldImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Verification code</caps-field-label>
			<caps-input-otp
				[formControl]="control"
				[disabled]="explicitDisabled()"
				[length]="length()"
				aria-describedby="manual manual"
				[transformPaste]="stripSeparators"
				(valueChange)="changes.push($event)"
				(completed)="complete.push($event)"
			>
				<caps-input-otp-group>
					@for (index of indices(); track index) {
						<caps-input-otp-slot [index]="index" />
					}
				</caps-input-otp-group>
			</caps-input-otp>
			<caps-field-description>Check your inbox.</caps-field-description>
			<caps-field-error validator="required">Required.</caps-field-error>
		</caps-field>
	`,
})
class Host {
	public readonly control = new FormControl<string | null>(null, Validators.required);
	public readonly length = signal(4);
	public readonly explicitDisabled = signal(false);
	public readonly indices = signal([0, 1, 2, 3]);
	public readonly changes: string[] = [];
	public readonly complete: string[] = [];
	public readonly stripSeparators = (text: string) => text.replaceAll('-', '');
}

async function setup() {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
	const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
	return { fixture, input, host: fixture.componentInstance };
}

describe('CapsInputOtp public native input and forms contract', () => {
	it('associates Field labels/descriptions and keeps the projected slots decorative', async () => {
		const { fixture, input, host } = await setup();
		const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
		const description: HTMLElement = fixture.nativeElement.querySelector('caps-field-description');
		expect(fixture.nativeElement.querySelectorAll('input')).toHaveLength(1);
		expect(label.htmlFor).toBe(input.id);
		expect(input.autocomplete).toBe('one-time-code');
		expect(input.inputMode).toBe('numeric');
		expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual(['manual', description.id]);
		expect(input.getAttribute('aria-invalid')).toBe('true');
		expect(fixture.nativeElement.querySelector('caps-input-otp-slot').getAttribute('aria-hidden')).toBe('true');
		label.click();
		expect(document.activeElement).toBe(input);
		await userEvent.keyboard('12');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.control.value).toBe('12');
		expect(host.control.dirty).toBe(true);
		expect(
			Array.from(fixture.nativeElement.querySelectorAll('caps-input-otp-slot')).map((slot: unknown) =>
				(slot as HTMLElement).textContent?.trim(),
			),
		).toEqual(['1', '2', '', '']);
		input.blur();
		fixture.detectChanges();
		expect(host.control.touched).toBe(true);
	});

	it('uses native selection/backspace and Brain completion without duplicating value events', async () => {
		const { fixture, input, host } = await setup();
		input.focus();
		await userEvent.keyboard('1234');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.control.value).toBe('1234');
		expect(host.complete).toEqual(['1234']);
		expect(host.changes).toEqual(['1', '12', '123', '1234']);
		await userEvent.keyboard('[ArrowLeft][Backspace]');
		fixture.detectChanges();
		expect(host.control.value).toBe('124');
		expect(host.complete).toEqual(['1234']);
	});

	it('keeps native editing synchronized when typing beyond length without changing the canonical value', async () => {
		const { fixture, input, host } = await setup();
		input.focus();
		await userEvent.keyboard('12345');
		fixture.detectChanges();
		await fixture.whenStable();
		input.value = '12355';
		input.dispatchEvent(new InputEvent('input', { data: '5', bubbles: true }));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.control.value).toBe('1235');
		expect(input.value).toBe('1235');
		await userEvent.keyboard('[Backspace]');
		fixture.detectChanges();
		expect(host.control.value).toBe('123');
	});

	it('transforms and bounds paste, preserving repeated full-value and writeValue completion semantics', async () => {
		const { fixture, input, host } = await setup();
		const clipboardData = new DataTransfer();
		clipboardData.setData('text/plain', 'AB-CD-E');
		input.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.control.value).toBe('ABCD');
		expect(host.complete).toEqual(['ABCD']);
		input.dispatchEvent(new ClipboardEvent('paste', { clipboardData, bubbles: true, cancelable: true }));
		fixture.detectChanges();
		expect(host.complete).toEqual(['ABCD']);
		host.control.setValue('WXYZ');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.value).toBe('WXYZ');
		expect(host.complete).toEqual(['ABCD', 'WXYZ']);
		host.control.setValue('WXYZ');
		fixture.detectChanges();
		expect(host.complete).toEqual(['ABCD', 'WXYZ', 'WXYZ']);
		expect(host.changes).toEqual(['ABCD', 'ABCD']);
		host.control.reset();
		fixture.detectChanges();
		expect(input.value).toBe('');
	});

	it('propagates form disabled state and supports changing length and projected slots', async () => {
		const { fixture, input, host } = await setup();
		host.control.disable();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(true);
		input.focus();
		expect(document.activeElement).not.toBe(input);
		host.control.enable();
		host.length.set(2);
		host.indices.set([0, 1]);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(false);
		expect(fixture.nativeElement.querySelectorAll('caps-input-otp-slot')).toHaveLength(2);
		host.control.setValue('XY');
		fixture.detectChanges();
		expect(host.complete).toEqual(['XY']);
	});

	it('keeps explicit disabled and forms disabled independent', async () => {
		const { fixture, input, host } = await setup();
		host.explicitDisabled.set(true);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(true);
		host.control.disable();
		host.control.enable();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(true);
		host.explicitDisabled.set(false);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(false);
		host.control.disable();
		host.explicitDisabled.set(true);
		fixture.detectChanges();
		await fixture.whenStable();
		host.explicitDisabled.set(false);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(true);
	});

	it('preserves native composition events without promising numeric filtering', async () => {
		const { fixture, input, host } = await setup();
		input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
		input.value = 'あ';
		input.dispatchEvent(new InputEvent('input', { data: 'あ', isComposing: true, bubbles: true }));
		input.dispatchEvent(new CompositionEvent('compositionend', { data: 'あ', bubbles: true }));
		fixture.detectChanges();
		expect(host.control.value).toBe('あ');
		expect(host.changes).toEqual(['あ']);
		expect(host.complete).toEqual([]);
	});
	it('does not rewrite active IME composition and reconciles the native view when composition ends', async () => {
		const { fixture, input, host } = await setup();
		input.focus();
		input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
		input.value = '1234x';
		input.dispatchEvent(new InputEvent('input', { data: 'x', isComposing: true, bubbles: true }));
		expect(host.control.value).toBe('123x');
		expect(input.value).toBe('1234x');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.value).toBe('1234x');
		input.dispatchEvent(new CompositionEvent('compositionend', { data: 'x', bubbles: true }));
		expect(input.value).toBe('123x');
		expect(host.changes).toEqual(['123x']);
		expect(host.complete).toEqual(['123x']);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.value).toBe('123x');
	});
});

@Component({
	imports: [CapsInputOtpImports, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-input-otp length="4" [formField]="fields.code" aria-label="Security code">
			<caps-input-otp-group>
				@for (index of [0, 1, 2, 3]; track index) {
					<caps-input-otp-slot [index]="index" />
				}
			</caps-input-otp-group>
		</caps-input-otp>
	`,
})
class SignalFormHost {
	public readonly model = signal({ code: '' });
	public readonly locked = signal(false);
	public readonly fields = form(this.model, (path) => {
		required(path.code);
		minLength(path.code, 4);
		maxLength(path.code, 4);
		disabled(path.code, () => this.locked());
	});
}

describe('CapsInputOtp signal forms compatibility', () => {
	it('synchronizes values, touched state, length validation, disabling and programmatic reset', async () => {
		const fixture = TestBed.createComponent(SignalFormHost);
		fixture.detectChanges();
		await fixture.whenStable();
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		const host = fixture.componentInstance;
		expect(host.fields.code().invalid()).toBe(true);
		input.focus();
		await userEvent.keyboard('12');
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.model().code).toBe('12');
		expect(host.fields.code().invalid()).toBe(true);
		await userEvent.keyboard('34');
		input.blur();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.model().code).toBe('1234');
		expect(host.fields.code().invalid()).toBe(false);
		expect(host.fields.code().touched()).toBe(true);
		host.locked.set(true);
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(true);
		host.locked.set(false);
		host.fields().reset({ code: '' });
		fixture.detectChanges();
		await fixture.whenStable();
		expect(input.disabled).toBe(false);
		expect(input.value).toBe('');
		expect(host.fields.code().touched()).toBe(false);
	});
});
