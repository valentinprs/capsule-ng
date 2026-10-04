import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	ReactiveFormsModule,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-reactive-form-select-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-lg' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Language Preferences</caps-card-title>
				<caps-card-description>Select your preferred spoken language.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-select-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label for="language">Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>
								<caps-field-error validator="required">Please select your spoken language.</caps-field-error>
								<caps-field-error validator="autoDetect">
									Auto-detection is not allowed. Please select a specific language.
								</caps-field-error>
							</caps-field-content>
							<hlm-select formControlName="language" [itemToString]="itemToString">
								<hlm-select-trigger buttonId="language">
									<hlm-select-value placeholder="Select" />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-group>
										<hlm-select-item value="auto">Auto</hlm-select-item>
										<div hlmSelectSeparator></div>
										@for (language of spokenLanguages; track $index) {
											<hlm-select-item [value]="language.value">{{ language.label }}</hlm-select-item>
										}
									</hlm-select-group>
								</hlm-select-content>
							</hlm-select>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				<button capsButton type="submit" form="form-select-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class ReactiveFormSelectDemo {
	private readonly _fb = inject(FormBuilder);

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

	public form = this._fb.group({
		language: [null, [Validators.required, autoDetectLanguage()]],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

function autoDetectLanguage(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return control.value === 'auto' ? { autoDetect: true } : null;
	};
}

export const reactiveFormsSelectDemoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	ReactiveFormsModule,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-reactive-form-select-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Language Preferences</caps-card-title>
				<caps-card-description>Select your preferred spoken language.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-select-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label for="language">Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>
								<caps-field-error validator="required">Please select your spoken language.</caps-field-error>
								<caps-field-error validator="autoDetect">
									Auto-detection is not allowed. Please select a specific language.
								</caps-field-error>
							</caps-field-content>
							<hlm-select formControlName="language" [itemToString]="itemToString">
								<hlm-select-trigger buttonId="language">
									<hlm-select-value placeholder="Select" />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-group>
										<hlm-select-item value="auto">Auto</hlm-select-item>
										<div hlmSelectSeparator></div>
										@for (language of spokenLanguages; track $index) {
											<hlm-select-item [value]="language.value">{{ language.label }}</hlm-select-item>
										}
									</hlm-select-group>
								</hlm-select-content>
							</hlm-select>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-select-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormSelectDemo {
	private readonly _fb = inject(FormBuilder);

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

	public form = this._fb.group({
		language: ['', [Validators.required, autoDetectLanguage()]],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

function autoDetectLanguage(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		return control.value === 'auto' ? { autoDetect: true } : null;
	};
}
`;
