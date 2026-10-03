import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, form, FormField, minLength, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
	selector: 'spartan-signal-form-checkbox-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsCheckboxImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Notifications</h3>
				<p hlmCardDescription>Manage your notification preferences.</p>
			</hlm-card-header>
			<div hlmCardContent>
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
			</div>
			<hlm-card-footer>
				<div class="flex gap-2">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-checkbox-demo">Submit</button>
				</div>
			</hlm-card-footer>
		</hlm-card>
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
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-signal-form-checkbox-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsCheckboxImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Notifications</h3>
				<p hlmCardDescription>Manage your notification preferences.</p>
			</hlm-card-header>
			<div hlmCardContent>
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
			</div>
			<hlm-card-footer>
				<div class="flex gap-2">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-checkbox-demo">Submit</button>
				</div>
			</hlm-card-footer>
		</hlm-card>
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
