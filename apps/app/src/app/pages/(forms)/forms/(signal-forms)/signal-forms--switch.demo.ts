import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-signal-form-switch-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Security Settings</caps-card-title>
				<caps-card-description>Manage your account security preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-switch-demo" (submit)="submit($event)">
					<caps-field orientation="horizontal">
						<caps-field-content>
							<caps-field-label>Multi-factor authentication</caps-field-label>
							<caps-field-description>
								Enable multi-factor authentication to secure your account.
							</caps-field-description>
							@for (error of form.twoFactor().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field-content>
						<caps-switch [formField]="form.twoFactor" />
					</caps-field>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-switch-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
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
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-signal-form-switch-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsSwitchImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Security Settings</caps-card-title>
				<caps-card-description>Manage your account security preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-switch-demo" (submit)="submit($event)">
					<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label>Multi-factor authentication</caps-field-label>
								<caps-field-description>
									Enable multi-factor authentication to secure your account.
								</caps-field-description>
								@for (error of form.twoFactor().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-switch [formField]="form.twoFactor" />
						</caps-field>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-switch-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
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
