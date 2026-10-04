import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, form, FormField, minLength, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-signal-form-checkbox-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsCheckboxImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Notifications</caps-card-title>
				<caps-card-description>Manage your notification preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-checkbox-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend variant="label">Responses</caps-field-legend>
							<caps-field-description>
								Get notified for requests that take time, like research or image generation.
							</caps-field-description>
							<caps-field orientation="horizontal">
								<caps-checkbox [formField]="form.responses" />
								<caps-field-label class="font-normal">Push notifications</caps-field-label>
							</caps-field>
						</caps-field-set>
						<caps-field-separator />
						<caps-field-group>
							<caps-field-set>
								<caps-field-legend variant="label">Tasks</caps-field-legend>
								<caps-field-description>Get notified when tasks you've created have updates.</caps-field-description>
								<caps-field-group data-slot="checkbox-group">
									@for (task of tasks; track task.id) {
										<caps-field
											orientation="horizontal"
											[forceInvalid]="form.tasks().invalid() && form.tasks().touched()"
										>
											<caps-checkbox
												[forceInvalid]="form.tasks().invalid() && form.tasks().touched()"
												[checked]="form.tasks().value().includes(task.id)"
												(checkedChange)="handleChange($event, task.id)"
											/>
											<caps-field-label class="font-normal">
												{{ task.label }}
											</caps-field-label>
										</caps-field>
									}
								</caps-field-group>
							</caps-field-set>
							@if (form.tasks().invalid() && form.tasks().touched()) {
								@for (error of form.tasks().errors(); track error) {
									<caps-field-error>{{ error.message }}</caps-field-error>
								}
							}
						</caps-field-group>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-checkbox-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class SignalFormCheckboxDemo {
	protected readonly _model = signal<{
		responses: boolean;
		tasks: string[];
	}>({
		responses: true,
		tasks: [],
	});

	public readonly form = form(this._model, (schemaPath) => {
		disabled(schemaPath.responses);

		minLength(schemaPath.tasks, 1, { message: 'Please select at least one notification type.' });
	});

	public tasks = [
		{
			id: 'push',
			label: 'Push notifications',
		},
		{
			id: 'email',
			label: 'Email notifications',
		},
	];

	async submit(event: Event) {
		event.preventDefault();

		// marks all fields as touched, revealing validation errors
		submit(this.form, async () => {
			const model = this._model();

			console.log('You submitted the following values:', JSON.stringify(model, null, 2));
		});
	}

	handleChange(checked: boolean, id: string) {
		if (checked) {
			this.form.tasks().value.update((tasks) => [...tasks, id]);
		} else {
			this.form.tasks().value.update((tasks) => tasks.filter((taskId) => taskId !== id));
		}

		this.form.tasks().markAsTouched();
	}

	reset() {
		this.form().reset({
			responses: true,
			tasks: [],
		});
	}
}

export const signalFormsCheckboxDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-signal-form-checkbox-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsCheckboxImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Notifications</caps-card-title>
				<caps-card-description>Manage your notification preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-checkbox-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend variant="label">Responses</caps-field-legend>
							<caps-field-description>
								Get notified for requests that take time, like research or image generation.
							</caps-field-description>
							<caps-field orientation="horizontal">
									<caps-checkbox [formField]="form.responses" />
									<caps-field-label class="font-normal">Push notifications</caps-field-label>
								</caps-field>
						</caps-field-set>
						<caps-field-separator />
						<caps-field-group>
							<caps-field-set>
								<caps-field-legend variant="label">Tasks</caps-field-legend>
								<caps-field-description>Get notified when tasks you've created have updates.</caps-field-description>
								<caps-field-group data-slot="checkbox-group">
									@for (task of tasks; track task.id) {
										<caps-field
											orientation="horizontal"
											[forceInvalid]="form.tasks().invalid() && form.tasks().touched()"
										>
											<caps-checkbox

												[forceInvalid]="form.tasks().invalid() && form.tasks().touched()"
												[checked]="form.tasks().value().includes(task.id)"
												(checkedChange)="handleChange($event, task.id)"
											/>
											<caps-field-label class="font-normal">
												{{ task.label }}
											</caps-field-label>
										</caps-field>
									}
								</caps-field-group>
							</caps-field-set>
							@if (form.tasks().invalid() && form.tasks().touched()) {
								@for (error of form.tasks().errors(); track error) {
									<caps-field-error>{{ error.message }}</caps-field-error>
								}
							}
						</caps-field-group>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-checkbox-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class SignalFormCheckboxDemo {
	protected readonly _model = signal<{
		responses: boolean;
		tasks: string[];
	}>({
		responses: true,
		tasks: [],
	});

	public readonly form = form(this._model, (schemaPath) => {
		disabled(schemaPath.responses);

		required(schemaPath.tasks, { message: 'Please select at least one notification type.' });
		minLength(schemaPath.tasks, 1, { message: 'Please select at least one notification type.' });
	});

	public tasks = [
		{
			id: 'push',
			label: 'Push notifications',
		},
		{
			id: 'email',
			label: 'Email notifications',
		},
	];

	async submit(event: Event) {
		event.preventDefault();

		// marks all fields as touched, revealing validation errors
		submit(this.form, async () => {
			const model = this._model();

			console.log('You submitted the following values:', JSON.stringify(model, null, 2));
		});
	}

	handleChange(checked: boolean, id: string) {
		if (checked) {
			this.form.tasks().value.update((tasks) => [...tasks, id]);
		} else {
			this.form.tasks().value.update((tasks) => tasks.filter((taskId) => taskId !== id));
		}

		this.form.tasks().markAsTouched();
	}

	reset() {
		this.form().reset({
			responses: true,
			tasks: [],
		});
	}
}
`;
