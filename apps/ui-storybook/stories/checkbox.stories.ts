import { NgIcon } from '@ng-icons/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton, CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCheckbox, CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

import { CapsLabel } from '@capsule-ng/caps/label';

@Component({
	selector: 'caps-checkbox-component-tester',
	imports: [CapsCheckboxImports, CapsButton, CapsLabel, ReactiveFormsModule, JsonPipe],
	template: `
		<form [formGroup]="form">
			<div class="flex items-center gap-4">
				<label id="checkbox-label" for="testCheckboxDis1" capsLabel>
					Test Disabled Checkbox with Reactive Forms
					<caps-checkbox
						class="ml-2"
						id="testCheckboxDis1"
						aria-labelledby="checkbox-label"
						formControlName="checkbox"
					/>
				</label>

				<button capsButton type="button" role="button" (click)="enableOrDisableCheckbox()">
					Enable or disable checkbox
				</button>
			</div>
		</form>
		{{ form.value | json }}
	`,
})
class CapsCheckboxTester {
	public readonly form = inject(FormBuilder).group({
		checkbox: [false],
	});

	enableOrDisableCheckbox(): void {
		this.form.enabled ? this.form.disable() : this.form.enable();
	}
}

@Component({
	selector: 'caps-checkbox-hint-error-story',
	imports: [CapsCheckboxImports, CapsButtonImports, CapsFieldImports, ReactiveFormsModule],
	template: `
		<form [formGroup]="form" class="space-y-3">
			<caps-field orientation="horizontal" class="items-start gap-2">
				<caps-checkbox id="field-terms" formControlName="agreement" />
				<caps-field-label class="font-normal">I agree to the terms and conditions.</caps-field-label>
				<caps-field-error>You must accept the terms to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
class CheckboxHintErrorStory {
	public readonly form = inject(FormBuilder).group({
		agreement: [false, Validators.requiredTrue],
	});
}

const meta: Meta<CapsCheckbox> = {
	title: 'Checkbox',
	component: CapsCheckbox,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				CapsCheckboxImports,
				CapsFieldImports,
				CapsLabel,
				NgIcon,

				ReactiveFormsModule,
				CapsButtonImports,
				CapsCheckboxTester,
				CheckboxHintErrorStory,
			],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsCheckbox>;

export const Default: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-checkbox id="testCheckbox" aria-label="test checkbox" />
		`,
	}),
};

export const InsideLabel: Story = {
	render: () => ({
		template: /* HTML */ `
			<label id="checkbox-label" class="flex items-center" capsLabel>
				Test Checkbox
				<caps-checkbox class="ml-2" id="testCheckbox" />
			</label>
		`,
	}),
};

export const LabeledWithAriaLabeledBy: Story = {
	render: () => ({
		template: /* HTML */ `
			<div id="checkbox-label" class="flex items-center">
				<label id="testCheckbox" for="testCheckboxAria" capsLabel>Test Checkbox</label>
				<caps-checkbox class="ml-2" id="testCheckboxAria" aria-labelledby="testCheckbox" />
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: /* HTML */ `
			<div class="flex items-center">
				<label id="checkbox-label" for="testCheckboxDis1" capsLabel>Test Checkbox</label>
				<caps-checkbox disabled class="ml-2" id="testCheckboxDis1" aria-labelledby="checkbox-label" />
			</div>

			<div class="flex items-center pt-4">
				<caps-checkbox disabled id="testCheckboxDis2" />
				<label class="ml-2" for="testCheckboxDis2" capsLabel>Test Checkbox 2</label>
			</div>

			<div class="flex items-center pt-4">
				<caps-checkbox id="testCheckboxDis3" />
				<label class="ml-2" for="testCheckboxDis3" capsLabel>Test Checkbox 3 enabled</label>
			</div>
		`,
	}),
};

export const disabledWithForms: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-checkbox-component-tester />
		`,
	}),
};

export const Indeterminate: Story = {
	render: () => ({
		template: /* HTML */ `
			<div id="checkbox-label" class="flex items-center">
				<label id="testCheckbox" for="testCheckboxIndeterminate" capsLabel>Test Checkbox</label>
				<caps-checkbox
					[indeterminate]="true"
					class="ml-2"
					id="testCheckboxIndeterminate"
					aria-labelledby="testCheckbox"
				/>
			</div>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: `<caps-checkbox-hint-error-story />`,
	}),
};
