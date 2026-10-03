import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-checkbox-form',
	imports: [ReactiveFormsModule, CapsButtonImports, CapsCheckboxImports, CapsFieldImports],
	host: { class: 'block w-full max-w-md' },
	template: `
		<form class="space-y-4" [formGroup]="form" (ngSubmit)="form.markAllAsTouched()">
			<caps-field orientation="horizontal">
				<caps-checkbox id="checkbox-agreement" formControlName="agreement" required />
				<caps-field-content>
					<caps-field-label for="checkbox-agreement">Accept terms and conditions</caps-field-label>
					<caps-field-description>You must accept the terms before continuing.</caps-field-description>
					<caps-field-error validator="required">Please accept the terms.</caps-field-error>
				</caps-field-content>
			</caps-field>
			<div class="flex gap-2">
				<button capsButton type="submit">Validate</button>
				<button capsButton type="button" variant="outline" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
export class CheckboxForm {
	public readonly form = new FormGroup({
		agreement: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
	});
}
