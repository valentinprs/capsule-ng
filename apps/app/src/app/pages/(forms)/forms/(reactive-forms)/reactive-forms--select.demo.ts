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
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { HlmCardImports } from '@spartan-ng/helm/card';
@Component({
	selector: 'spartan-reactive-form-select-demo',
	imports: [ReactiveFormsModule, HlmCardImports, CapsFieldImports, CapsSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-lg' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Language Preferences</h3>
				<p hlmCardDescription>Select your preferred spoken language.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form id="form-select-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label>Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>
								<caps-field-error validator="required">Please select your spoken language.</caps-field-error>
								<caps-field-error validator="autoDetect">
									Auto-detection is not allowed. Please select a specific language.
								</caps-field-error>
							</caps-field-content>
							<caps-select formControlName="language" [itemToString]="itemToString" placeholder="Select" id="language">
								<caps-select-option value="auto">Auto</caps-select-option>
								<caps-select-separator />
								@for (language of spokenLanguages; track $index) {
									<caps-select-option [value]="language.value">{{ language.label }}</caps-select-option>
								}
							</caps-select>
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				<button capsButton type="submit" form="form-select-demo">Submit</button>
			</hlm-card-footer>
		</hlm-card>
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
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-reactive-form-select-demo',
	imports: [ReactiveFormsModule, HlmCardImports, CapsFieldImports, CapsSelectImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Language Preferences</h3>
				<p hlmCardDescription>Select your preferred spoken language.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form id="form-select-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field orientation="responsive">
							<caps-field-content>
								<caps-field-label>Spoken Language</caps-field-label>
								<caps-field-description>For best results, select the language you speak.</caps-field-description>
								<caps-field-error validator="required">Please select your spoken language.</caps-field-error>
								<caps-field-error validator="autoDetect">
									Auto-detection is not allowed. Please select a specific language.
								</caps-field-error>
							</caps-field-content>
							<caps-select formControlName="language" [itemToString]="itemToString"   placeholder="Select"   id="language">

										<caps-select-option value="auto">Auto</caps-select-option>
										<caps-select-separator />
										@for (language of spokenLanguages; track $index) {
											<caps-select-option [value]="language.value">{{ language.label }}</caps-select-option>
										}
							</caps-select>
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-select-demo">Submit</button>
			</hlm-card-footer>
		</hlm-card>
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
