import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
	selector: 'spartan-reactive-form-switch-demo',
	imports: [ReactiveFormsModule, HlmCardImports, CapsFieldImports, CapsSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Security Settings</h3>
				<p hlmCardDescription>Manage your account security preferences.</p>
			</hlm-card-header>
			<div hlmCardContent>
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
							<caps-switch id="two-factor" formControlName="twoFactor" />
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="form.reset({ twoFactor: false })">Reset</button>
					<button capsButton type="submit" form="form-switch-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
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
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-reactive-form-switch-demo',
	imports: [ReactiveFormsModule, HlmCardImports, CapsFieldImports, CapsSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Security Settings</h3>
				<p hlmCardDescription>Manage your account security preferences.</p>
			</hlm-card-header>
			<div hlmCardContent>
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
							<caps-switch id="two-factor" formControlName="twoFactor" />
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="form.reset({ twoFactor: false })">Reset</button>
					<button capsButton type="submit" form="form-switch-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
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
