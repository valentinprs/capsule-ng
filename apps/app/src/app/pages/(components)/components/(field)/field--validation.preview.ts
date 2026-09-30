import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-field-validation-preview',
	imports: [CapsFieldImports, CapsInputImports, CapsButtonImports, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-md' },
	template: `
		<caps-field-group>
			<div class="flex flex-wrap gap-2">
				<button capsButton type="button" (click)="emailControl.markAsTouched()">Validate</button>
				<button capsButton variant="ghost" type="button" (click)="manualError.set(!manualError())">
					Toggle manual message
				</button>
				<button capsButton variant="ghost" type="button" (click)="reset()">Reset</button>
			</div>
			<caps-field [forceInvalid]="manualError()">
				<caps-field-content>
					<!-- Capsule Field supplies the native label/control association. -->
					<label capsLabel>Email address</label>
					<caps-field-description>Leave the field to see validation, then enter a valid email.</caps-field-description>
					<caps-field-error validator="required">Email is required.</caps-field-error>
					<caps-field-error validator="email">Enter a valid email address.</caps-field-error>
					@if (manualError()) {
						<caps-field-error forceShow>This is a manually displayed message.</caps-field-error>
					}
				</caps-field-content>
				<input capsInput type="email" autocomplete="email" [formControl]="emailControl" placeholder="you@example.com" />
			</caps-field>
		</caps-field-group>
	`,
})
export class FieldValidationPreview {
	public readonly emailControl = new FormControl('', {
		nonNullable: true,
		validators: [Validators.required, Validators.email],
	});
	public readonly manualError = signal(false);
	public reset() {
		this.emailControl.reset();
		this.manualError.set(false);
	}
}
