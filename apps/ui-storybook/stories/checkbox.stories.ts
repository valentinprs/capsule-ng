import { NgIcon } from '@ng-icons/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton, CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCheckbox, HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

import { CapsLabel } from '@capsule-ng/caps/label';

@Component({
	selector: 'hlm-checkbox-component-tester',
	imports: [HlmCheckboxImports, CapsButton, CapsLabel, ReactiveFormsModule, JsonPipe],
	template: `
		<form [formGroup]="form">
			<div class="flex items-center gap-4">
				<label id="checkbox-label" for="testCheckboxDis1" capsLabel>
					Test Disabled Checkbox with Reactive Forms
					<hlm-checkbox
						class="ml-2"
						inputId="testCheckboxDis1"
						aria-labelledby="testCheckbox"
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
class HlmCheckboxTester {
	form = inject(FormBuilder).group({
		checkbox: [false],
	});

	enableOrDisableCheckbox(): void {
		this.form.enabled ? this.form.disable() : this.form.enable();
	}
}

@Component({
	selector: 'hlm-checkbox-hint-error-story',
	standalone: true,
	imports: [HlmCheckboxImports, CapsButtonImports, CapsFieldImports, ReactiveFormsModule],
	template: `
		<form [formGroup]="form" class="space-y-3">
			<caps-field orientation="horizontal" class="items-start gap-2">
				<hlm-checkbox inputId="field-terms" formControlName="agreement" />
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

const meta: Meta<HlmCheckbox> = {
	title: 'Checkbox',
	component: HlmCheckbox,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				HlmCheckboxImports,
				CapsFieldImports,
				CapsLabel,
				NgIcon,

				ReactiveFormsModule,
				CapsButtonImports,
				HlmCheckboxTester,
				CheckboxHintErrorStory,
			],
		}),
	],
};

export default meta;
type Story = StoryObj<HlmCheckbox>;

export const Default: Story = {
	render: () => ({
		template: /* HTML */ `
			<hlm-checkbox inputId="testCheckbox" aria-checked="mixed" aria-label="test checkbox" />
		`,
	}),
};

export const InsideLabel: Story = {
	render: () => ({
		template: /* HTML */ `
			<label id="checkbox-label" class="flex items-center" capsLabel>
				Test Checkbox
				<hlm-checkbox class="ml-2" inputId="testCheckbox" />
			</label>
		`,
	}),
};

export const LabeledWithAriaLabeledBy: Story = {
	render: () => ({
		template: /* HTML */ `
			<div id="checkbox-label" class="flex items-center">
				<label id="testCheckbox" for="testCheckboxAria" capsLabel>Test Checkbox</label>
				<hlm-checkbox class="ml-2" inputId="testCheckboxAria" aria-labelledby="testCheckbox" />
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: /* HTML */ `
			<div class="flex items-center">
				<label id="checkbox-label" for="testCheckboxDis1" capsLabel>Test Checkbox</label>
				<hlm-checkbox disabled class="ml-2" inputId="testCheckboxDis1" aria-labelledby="testCheckbox" />
			</div>

			<div class="flex items-center pt-4">
				<hlm-checkbox disabled inputId="testCheckboxDis2" />
				<label class="ml-2" for="testCheckboxDis2" capsLabel>Test Checkbox 2</label>
			</div>

			<div class="flex items-center pt-4">
				<hlm-checkbox inputId="testCheckboxDis3" />
				<label class="ml-2" for="testCheckboxDis3" capsLabel>Test Checkbox 3 enabled</label>
			</div>
		`,
	}),
};

export const disabledWithForms: Story = {
	render: () => ({
		template: /* HTML */ `
			<hlm-checkbox-component-tester />
		`,
	}),
};

export const Indeterminate: Story = {
	render: () => ({
		template: /* HTML */ `
			<div id="checkbox-label" class="flex items-center">
				<label id="testCheckbox" for="testCheckboxIndeterminate" capsLabel>Test Checkbox</label>
				<hlm-checkbox
					indeterminate="true"
					class="ml-2"
					inputId="testCheckboxIndeterminate"
					aria-labelledby="testCheckbox"
				/>
			</div>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: `<hlm-checkbox-hint-error-story />`,
	}),
};
