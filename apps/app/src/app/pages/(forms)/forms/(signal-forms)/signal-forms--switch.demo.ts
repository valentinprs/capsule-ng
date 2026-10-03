import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
	selector: 'spartan-signal-form-switch-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Security Settings</h3>
				<p hlmCardDescription>Manage your account security preferences.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-switch-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label for="two-factor">Multi-factor authentication</caps-field-label>
								<caps-field-description>
									Enable multi-factor authentication to secure your account.
								</caps-field-description>
								@for (error of form.twoFactor().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-switch id="two-factor" [formField]="form.twoFactor" />
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-switch-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
	`,
})
export class SignalFormSwitchDemo {
	protected readonly _model = signal({
		twoFactor: false,
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.twoFactor, {
			message: 'It is highly recommended to enable two-factor authentication.',
		});
	});

	async submit(event: Event) {
		event.preventDefault();

		// marks all fields as touched, revealing validation errors
		submit(this.form, async () => {
			const model = this._model();

			console.log('You submitted the following values:', JSON.stringify(model, null, 2));
		});
	}

	reset() {
		this.form().reset({
			twoFactor: false,
		});
	}
}

export const signalFormsSwitchDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-signal-form-switch-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Security Settings</h3>
				<p hlmCardDescription>Manage your account security preferences.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-switch-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label for="two-factor">Multi-factor authentication</caps-field-label>
								<caps-field-description>
									Enable multi-factor authentication to secure your account.
								</caps-field-description>
								@for (error of form.twoFactor().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-switch id="two-factor" [formField]="form.twoFactor" />
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-switch-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
	\`,
})
export class SignalFormSwitchDemo {
	protected readonly _model = signal({
		twoFactor: false,
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.twoFactor, {
			message: 'It is highly recommended to enable two-factor authentication.',
		});
	});

	async submit(event: Event) {
		event.preventDefault();

		// marks all fields as touched, revealing validation errors
		submit(this.form, async () => {
			const model = this._model();

			console.log('You submitted the following values:', JSON.stringify(model, null, 2));
		});
	}

	reset() {
		this.form().reset({
			twoFactor: false,
		});
	}
}
`;
