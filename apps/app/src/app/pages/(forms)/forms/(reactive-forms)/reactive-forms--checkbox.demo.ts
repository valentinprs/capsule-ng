import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-reactive-form-checkbox-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmCheckboxImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Notifications</caps-card-title>
				<caps-card-description>Manage your notification preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-checkbox-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend variant="label">Responses</caps-field-legend>
							<caps-field-description>
								Get notified for requests that take time, like research or image generation.
							</caps-field-description>
							<caps-field-group>
								<caps-field orientation="horizontal">
									<hlm-checkbox inputId="responses" formControlName="responses" />
									<caps-field-label class="font-normal" for="responses">Push notifications</caps-field-label>
								</caps-field>
							</caps-field-group>
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
											[forceInvalid]="form.controls.tasks.invalid && form.controls.tasks.touched"
										>
											<hlm-checkbox
												[inputId]="'task-' + task.id"
												[forceInvalid]="form.controls.tasks.invalid && form.controls.tasks.touched"
												[checked]="form.controls.tasks.value.includes(task.id)"
												(checkedChange)="handleChange($event, task.id)"
											/>
											<caps-field-label class="font-normal" [for]="'task-' + task.id">
												{{ task.label }}
											</caps-field-label>
										</caps-field>
									}
								</caps-field-group>
							</caps-field-set>
							@if (form.controls.tasks.invalid && form.controls.tasks.touched) {
								<caps-field-error>Please select at least one notification type.</caps-field-error>
							}
						</caps-field-group>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset({ responses: true, tasks: [] })">
					Reset
				</button>
				<button capsButton type="submit" form="form-checkbox-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class ReactiveFormCheckboxDemo {
	private readonly _fb = inject(FormBuilder);

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

	public form = this._fb.group({
		responses: [{ value: true, disabled: true }],
		tasks: this._fb.array([], Validators.required),
	});

	handleChange(checked: boolean, id: string) {
		const tasks = this.form.controls.tasks;

		if (checked) {
			tasks.push(this._fb.control(id));
		} else {
			const index = tasks.controls.findIndex((x) => x.value === id);
			tasks.removeAt(index);
		}

		this.form.controls.tasks.markAsTouched();
	}

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.getRawValue(), null, 2));
	}
}

export const reactiveFormsCheckboxDemoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-reactive-form-checkbox-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmCheckboxImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Notifications</caps-card-title>
				<caps-card-description>Manage your notification preferences.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-checkbox-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend variant="label">Responses</caps-field-legend>
							<caps-field-description>
								Get notified for requests that take time, like research or image generation.
							</caps-field-description>
							<caps-field-group>
								<caps-field orientation="horizontal">
									<hlm-checkbox inputId="responses" formControlName="responses" />
									<caps-field-label class="font-normal" for="responses">Push notifications</caps-field-label>
								</caps-field>
							</caps-field-group>
						</caps-field-set>
						<caps-field-separator />
						<caps-field-group>
							<caps-field-set>
								<caps-field-legend variant="label">Tasks</caps-field-legend>
								<caps-field-description>Get notified when tasks you've created have updates.</caps-field-description>
								<caps-field-group data-slot="checkbox-group">
									@for (task of tasks; track task.id) {
										<caps-field orientation="horizontal">
											<hlm-checkbox
												[inputId]="'task-' + task.id"
												[checked]="form.controls.tasks.value.includes(task.id)"
												(checkedChange)="handleChange($event, task.id)"
											/>
											<caps-field-label class="font-normal" [for]="'task-' + task.id">{{ task.label }}</caps-field-label>
										</caps-field>
									}
								</caps-field-group>
							</caps-field-set>
							@if (form.controls.tasks.invalid && form.controls.tasks.touched) {
								<caps-field-error>Please select at least one notification type.</caps-field-error>
							}
						</caps-field-group>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset({ responses: true, tasks: [] })">
						Reset
					</button>
					<button capsButton type="submit" form="form-checkbox-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormCheckboxDemo {
	private readonly _fb = inject(FormBuilder);

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

	public form = this._fb.group({
		responses: [{ value: true, disabled: true }],
		tasks: this._fb.array([], Validators.required),
	});

	handleChange(checked: boolean, id: string) {
		const tasks = this.form.controls.tasks;

		if (checked) {
			tasks.push(this._fb.control(id));
		} else {
			const index = tasks.controls.findIndex((x) => x.value === id);
			tasks.removeAt(index);
		}

		this.form.controls.tasks.markAsTouched();
	}

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.getRawValue(), null, 2));
	}
}
`;
