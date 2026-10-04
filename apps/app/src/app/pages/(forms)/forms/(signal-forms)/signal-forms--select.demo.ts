import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-signal-form-select-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, HlmSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Language Preferences</caps-card-title>
				<caps-card-description>Select your preferred spoken language.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-select-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label for="language">Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>

								@for (error of form.language().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<hlm-select [formField]="form.language" [itemToString]="itemToString">
								<hlm-select-trigger buttonId="language">
									<hlm-select-value placeholder="Select" />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-group>
										<hlm-select-item value="auto">Auto</hlm-select-item>
										<div hlmSelectSeparator></div>
										@for (language of spokenLanguages; track $index) {
											<hlm-select-item [value]="language.value">
												{{ language.label }}
											</hlm-select-item>
										}
									</hlm-select-group>
								</hlm-select-content>
							</hlm-select>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-select-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class SignalFormSelectDemo {
	public spokenLanguages = [
		{ label: 'English', value: 'en' },
		{ label: 'Spanish', value: 'es' },
		{ label: 'French', value: 'fr' },
		{ label: 'German', value: 'de' },
		{ label: 'Italian', value: 'it' },
		{ label: 'Chinese', value: 'zh' },
		{ label: 'Japanese', value: 'ja' },
	];

	public itemToString = (value: string) => {
		if (value === 'auto') {
			return 'Auto';
		}
		const language = this.spokenLanguages.find((lang) => lang.value === value);
		return language ? language.label : '';
	};

	protected readonly _model = signal<{
		language: string | null;
	}>({
		language: null,
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.language, { message: 'Language is a required field.' });
		validate(schemaPath.language, ({ value }) => {
			if (value() === 'auto') {
				return {
					kind: 'auto-detect',
					message: 'Auto-detection is not allowed. Please select a specific language.',
				};
			}
			return null;
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
			language: null,
		});
	}
}

export const signalFormsSelectDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-signal-form-select-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, HlmSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Language Preferences</caps-card-title>
				<caps-card-description>Select your preferred spoken language.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-select-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label for="language">Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>

								@for (error of form.language().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<hlm-select [formField]="form.language" [itemToString]="itemToString">
								<hlm-select-trigger buttonId="language">
									<hlm-select-value placeholder="Select" />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-group>
										<hlm-select-item value="auto">Auto</hlm-select-item>
										<div hlmSelectSeparator></div>
										@for (language of spokenLanguages; track $index) {
											<hlm-select-item [value]="language.value">
												{{ language.label }}
											</hlm-select-item>
										}
									</hlm-select-group>
								</hlm-select-content>
							</hlm-select>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-select-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class SignalFormSelectDemo {
	public spokenLanguages = [
		{ label: 'English', value: 'en' },
		{ label: 'Spanish', value: 'es' },
		{ label: 'French', value: 'fr' },
		{ label: 'German', value: 'de' },
		{ label: 'Italian', value: 'it' },
		{ label: 'Chinese', value: 'zh' },
		{ label: 'Japanese', value: 'ja' },
	];

	public itemToString = (value: string) => {
		if (value === 'auto') {
			return 'Auto';
		}
		const language = this.spokenLanguages.find((lang) => lang.value === value);
		return language ? language.label : '';
	};

	protected readonly _model = signal<{
		language: string | null;
	}>({
		language: null,
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.language, { message: 'Language is a required field.' });
		validate(schemaPath.language, ({ value }) => {
			if (value() === 'auto') {
				return {
					kind: 'auto-detect',
					message: 'Auto-detection is not allowed. Please select a specific language.',
				};
			}
			return null;
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
			language: null,
		});
	}
}
`;
