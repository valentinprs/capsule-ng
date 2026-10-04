import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, minLength, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-bug-report-form',
	imports: [
		FormRoot,
		FormField,
		CapsCardImports,
		CapsFieldImports,
		CapsButtonImports,
		CapsInputImports,
		HlmInputGroupImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Bug Report</caps-card-title>
				<caps-card-description>Help us improve by reporting bugs you encounter.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<!-- formRoot sets novalidate and handles form submission -->
				<form [formRoot]="form" id="form-bug-report">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="title">Bug Title</caps-field-label>
							<input
								id="title"
								capsInput
								placeholder="Login button not working on mobile"
								autoComplete="off"
								[formField]="form.title"
							/>

							@for (error of form.title().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="description">Description</caps-field-label>
							<hlm-input-group>
								<textarea
									hlmInputGroupTextarea
									id="description"
									class="min-h-24"
									placeholder="I'm having an issue with the login button on mobile."
									rows="6"
									[formField]="form.description"
								></textarea>
								<hlm-input-group-addon align="block-end">
									<span hlmInputGroupText>{{ descriptionLength() }}/100 characters</span>
								</hlm-input-group-addon>
							</hlm-input-group>
							<caps-field-description>
								Include steps to reproduce, expected behavior, and what actually happened.
							</caps-field-description>

							@for (error of form.description().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-bug-report">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class BugFormsDemo {
	protected readonly _model = signal({
		title: '',
		description: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.title, { message: 'Title must be entered.' });
			minLength(schemaPath.title, 5, { message: 'Title must be at least 5 characters.' });
			maxLength(schemaPath.title, 32, { message: 'Title cannot exceed 32 characters.' });

			required(schemaPath.description, { message: 'Description must be entered.' });
			minLength(schemaPath.description, 20, {
				message: 'Description must be at least 20 characters.',
			});
			maxLength(schemaPath.description, 100, {
				message: 'Description must be at most 100 characters',
			});
		},
		{
			// triggers the submission flow by calling `submit()` - marks all fields as touched, revealing validation errors
			submission: {
				action: async () => {
					const model = this._model();

					console.log('You submitted the following values:', JSON.stringify(model, null, 2));

					// submit to api
				},
			},
		},
	);

	public readonly descriptionLength = computed(() => this.form.description().value().length);

	reset() {
		this.form().reset({
			title: '',
			description: '',
		});
	}
}

export const demoCode = `
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, minLength, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-bug-report-form',
	imports: [
		FormRoot,
		FormField,
		CapsCardImports,
		CapsFieldImports,
		CapsButtonImports,
		CapsInputImports,
		HlmInputGroupImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Bug Report</caps-card-title>
				<caps-card-description>Help us improve by reporting bugs you encounter.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<!-- formRoot sets novalidate and handles form submission -->
				<form [formRoot]="form" id="form-bug-report">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="title">Bug Title</caps-field-label>
							<input
								id="title"
								capsInput
								placeholder="Login button not working on mobile"
								autoComplete="off"
								[formField]="form.title"
							/>

							@for (error of form.title().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="description">Description</caps-field-label>
							<hlm-input-group>
								<textarea
									hlmInputGroupTextarea
									id="description"
									class="min-h-24"
									placeholder="I'm having an issue with the login button on mobile."
									rows="6"
									[formField]="form.description"
								></textarea>
								<hlm-input-group-addon align="block-end">
									<span hlmInputGroupText>{{ descriptionLength() }}/100 characters</span>
								</hlm-input-group-addon>
							</hlm-input-group>
							<caps-field-description>
								Include steps to reproduce, expected behavior, and what actually happened.
							</caps-field-description>

							@for (error of form.description().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-bug-report">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class BugFormsDemo {
	protected readonly _model = signal({
		title: '',
		description: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.title, { message: 'Title must be entered.' });
			minLength(schemaPath.title, 5, { message: 'Title must be at least 5 characters.' });
			maxLength(schemaPath.title, 32, { message: 'Title cannot exceed 32 characters.' });

			required(schemaPath.description, { message: 'Description must be entered.' });
			minLength(schemaPath.description, 20, {
				message: 'Description must be at least 20 characters.',
			});
			maxLength(schemaPath.description, 100, {
				message: 'Description must be at most 100 characters',
			});
		},
		{
			// triggers the submission flow by calling \`submit()\` - marks all fields as touched, revealing validation errors
			submission: {
				action: async () => {
					const model = this._model();

					console.log('You submitted the following values:', JSON.stringify(model, null, 2));

					// submit to api
				},
			},
		},
	);

	public readonly descriptionLength = computed(() => this.form.description().value().length);

	reset() {
		this.form().reset({
			title: '',
			description: '',
		});
	}
}
`;

export const demoAnatomyCode = `
<caps-field>
	<caps-field-label>Bug Title</caps-field-label>
	<input
		capsInput
		id="title"
		placeholder="Login button not working on mobile"
		autocomplete="off"
		[formField]="form.title"
	/>
	@for (error of form.title().errors(); track error) {
		<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
	}
</caps-field>
`;

export const demoFormModelCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, maxLength, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'spartan-bug-report-form',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`...\`,
})
export class BugFormsDemo {
  protected readonly _model = signal({
    title: '',
    description: '',
  });

  public readonly form = form(this._model, (schemaPath) => {
    required(schemaPath.title, { message: 'Title must be entered.' });
    minLength(schemaPath.title, 5, { message: 'Title must be at least 5 characters.' });
    maxLength(schemaPath.title, 100, { message: 'Title cannot exceed 32 characters.' });

    required(schemaPath.description, { message: 'Description must be entered.' });
    minLength(schemaPath.description, 20, {
      message: 'Description must be at least 20 characters.',
    });
    maxLength(schemaPath.description, 100, {
      message: 'Description must be at most 100 characters',
    });
  });
}
`;

export const demoSetupFormWithFormRoot = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormRoot, maxLength, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'spartan-bug-report-form',
  imports: [FormRoot],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- formRoot sets novalidate and handles form submission -->
    <form [formRoot]="form">
      <!-- Build the form here -->
    </form>
  \`,
})
export class BugFormsDemo {
  protected readonly _model = signal({
    title: '',
    description: '',
  });

  public readonly form = form(
    this._model,
    (schemaPath) => {
      required(schemaPath.title, { message: 'Title must be entered.' });
      minLength(schemaPath.title, 5, { message: 'Title must be at least 5 characters.' });
      maxLength(schemaPath.title, 100, { message: 'Title cannot exceed 32 characters.' });

      required(schemaPath.description, { message: 'Description must be entered.' });
      minLength(schemaPath.description, 20, {
        message: 'Description must be at least 20 characters.',
      });
      maxLength(schemaPath.description, 100, {
        message: 'Description must be at most 100 characters',
      });
    },
    {
      // triggers the submission flow by calling \`submit()\` - marks all fields as touched, revealing validation errors
      submission: {
        action: async () => {
          // submit to api
          const model = this._model();
        },
      },
    },
  );
}
`;

export const demoSetupFormWithSubmit = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, maxLength, minLength, required, submit } from '@angular/forms/signals';

@Component({
  selector: 'spartan-bug-report-form',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- novalidate - disables browser built-in validation -->
    <form novalidate (submit)="submitBug($event)">
      <!-- Build the form here -->
    </form>
  \`,
})
export class BugFormsDemo {
  protected readonly _model = signal({
    title: '',
    description: '',
  });

  public readonly form = form(this._model, (schemaPath) => {
    required(schemaPath.title, { message: 'Title must be entered.' });
    minLength(schemaPath.title, 5, { message: 'Title must be at least 5 characters.' });
    maxLength(schemaPath.title, 32, { message: 'Title cannot exceed 32 characters.' });

    required(schemaPath.description, { message: 'Description must be entered.' });
    minLength(schemaPath.description, 20, {
      message: 'Description must be at least 20 characters.',
    });
    maxLength(schemaPath.description, 100, {
      message: 'Description must be at most 100 characters',
    });
  });

  async submitBug(event: Event) {
    // stop browser from navigating on form submission
    event.preventDefault();

    // marks all fields as touched, revealing validation errors
    const success = await submit(this.form, async () => {
      // submit to api
      const model = this._model();
    });
  }
}
`;

export const demoForceShowCode = `
<caps-field>
	<caps-field-label for="title">Bug Title</caps-field-label>
	<input capsInput id="title" [formField]="form.title" />
	<caps-field-error forceShow>This error is always visible.</caps-field-error>
</caps-field>`;

export const demoSubmittingState = `
<button capsButton type="submit" [disabled]="form().submitting()">
  @if (form().submitting()) {
    <hlm-spinner />
  }
  Submit
</button>
`;

export const demoResetForm = `
<button capsButton variant="outline" type="button" (click)="reset()">
	Reset
</button>

reset() {
  this.form().reset({
    // provide default values
    responses: true,
    tasks: [],
  });
}
`;
