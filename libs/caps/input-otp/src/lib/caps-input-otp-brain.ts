import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BrnInputOtp } from '@spartan-ng/brain/input-otp';

/** @internal View adapter: Brain retains value, paste, focus and completion behavior. */
@Component({
	selector: 'caps-input-otp-brain',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div [style]="containerStyles()">
			<input
				#otpInput
				data-slot="input-otp-control"
				[id]="inputId()"
				[autocomplete]="inputAutocomplete()"
				[style]="inputStyles()"
				[disabled]="_disabled()"
				[inputMode]="inputMode()"
				[value]="_composing ? _compositionValue : (value() ?? '')"
				[attr.aria-label]="label()"
				[attr.aria-labelledby]="labelledBy()"
				[attr.aria-describedby]="describedBy()"
				[attr.aria-invalid]="controlInvalid() ? 'true' : null"
				(input)="onInputChange($event)"
				(paste)="onPaste($event)"
				(compositionstart)="_compositionStart($event)"
				(compositionend)="_compositionEnd($event)"
				(focus)="_focused.set(true)"
				(blur)="onBlur()"
			/>
		</div>
	`,
})
export class CapsInputOtpBrain extends BrnInputOtp {
	protected _composing = false;
	protected _compositionValue = '';
	public readonly label = input<string | null>(null);
	public readonly labelledBy = input<string | null>(null);
	public readonly describedBy = input<string | null>(null);
	public readonly controlInvalid = input(false);
	public readonly blurred = output<void>();
	protected override onInputChange(event: Event): void {
		if (this._composing || (event as InputEvent).isComposing) {
			this._composing = true;
			this._compositionValue = (event.target as HTMLInputElement).value;
		}
		super.onInputChange(event);
		if (!this._composing && !(event as InputEvent).isComposing) {
			this._syncNativeValue(event.target as HTMLInputElement);
		}
	}
	protected _compositionStart(event: CompositionEvent): void {
		this._composing = true;
		this._compositionValue = (event.target as HTMLInputElement).value;
	}
	protected _compositionEnd(event: CompositionEvent): void {
		this._composing = false;
		this._syncNativeValue(event.target as HTMLInputElement);
	}
	private _syncNativeValue(control: HTMLInputElement): void {
		const value = this.value() ?? '';
		if (control.value === value) return;
		// A repeated overflow edit can keep Brain's value unchanged, so Angular does not rewrite it.
		const { selectionStart, selectionEnd, selectionDirection } = control;
		control.value = value;
		if (selectionStart !== null && selectionEnd !== null) {
			control.setSelectionRange(
				Math.min(selectionStart, value.length),
				Math.min(selectionEnd, value.length),
				selectionDirection ?? 'none',
			);
		}
	}
	protected override onBlur(): void {
		super.onBlur();
		this.blurred.emit();
	}
}
