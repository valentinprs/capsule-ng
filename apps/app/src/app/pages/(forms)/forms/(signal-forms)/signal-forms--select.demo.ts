import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { HlmCardImports } from '@spartan-ng/helm/card';
@Component({
	selector: 'spartan-signal-form-select-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Language Preferences</h3>
				<p hlmCardDescription>Select your preferred spoken language.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-select-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label>Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>
								@for (error of form.language().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-select [formField]="form.language" [itemToString]="itemToString" placeholder="Select" id="language">
								<caps-select-option value="auto">Auto</caps-select-option>
								<caps-select-separator />
								@for (language of spokenLanguages; track $index) {
									<caps-select-option [value]="language.value">
										{{ language.label }}
									</caps-select-option>
								}
							</caps-select>
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-select-demo">Submit</button>
			</hlm-card-footer>
		</hlm-card>
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
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-signal-form-select-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Language Preferences</h3>
				<p hlmCardDescription>Select your preferred spoken language.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-select-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label>Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>
								@for (error of form.language().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-select [formField]="form.language" [itemToString]="itemToString"   placeholder="Select"   id="language">

										<caps-select-option value="auto">Auto</caps-select-option>
										<caps-select-separator />
										@for (language of spokenLanguages; track $index) {
											<caps-select-option [value]="language.value">
												{{ language.label }}
											</caps-select-option>
										}
							</caps-select>
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-select-demo">Submit</button>
			</hlm-card-footer>
		</hlm-card>
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
