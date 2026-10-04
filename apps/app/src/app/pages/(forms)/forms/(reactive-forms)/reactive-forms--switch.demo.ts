import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';

@Component({
	selector: 'spartan-reactive-form-switch-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Security Settings</caps-card-title>
				<caps-card-description>Manage your account security preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-switch-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label for="two-factor">Multi-factor authentication</caps-field-label>
								<caps-field-description>
									Enable multi-factor authentication to secure your account.
								</caps-field-description>
								<caps-field-error>It is highly recommended to enable two-factor authentication.</caps-field-error>
							</caps-field-content>
							<hlm-switch inputId="two-factor" formControlName="twoFactor" />
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset({ twoFactor: false })">Reset</button>
				<button capsButton type="submit" form="form-switch-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class ReactiveFormSwitchDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		twoFactor: [false, Validators.requiredTrue],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

export const reactiveFormsSwitchDemoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';

@Component({
	selector: 'spartan-reactive-form-switch-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Security Settings</caps-card-title>
				<caps-card-description>Manage your account security preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-switch-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label for="two-factor">Multi-factor authentication</caps-field-label>
								<caps-field-description>
									Enable multi-factor authentication to secure your account.
								</caps-field-description>
								<caps-field-error>It is highly recommended to enable two-factor authentication.</caps-field-error>
							</caps-field-content>
							<hlm-switch inputId="two-factor" formControlName="twoFactor" />
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset({ twoFactor: false })">Reset</button>
					<button capsButton type="submit" form="form-switch-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormSwitchDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		twoFactor: [false, Validators.requiredTrue],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}
`;
