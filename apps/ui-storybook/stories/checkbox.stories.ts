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
	imports: [CapsCheckboxImports, CapsButton, CapsFieldImports, ReactiveFormsModule, JsonPipe],
	template: `
		<form [formGroup]="form">
			<div class="flex items-center gap-4">
				<caps-field orientation="horizontal">
					<caps-field-label>Test Disabled Checkbox with Reactive Forms</caps-field-label>
					<caps-checkbox formControlName="checkbox" />
				</caps-field>

				<button capsButton type="button" (click)="enableOrDisableCheckbox()">Enable or disable checkbox</button>
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
			<caps-field orientation="horizontal">
				<caps-checkbox formControlName="agreement" />
				<caps-field-content>
					<caps-field-label>I agree to the terms and conditions.</caps-field-label>
					<caps-field-error>You must accept the terms to continue.</caps-field-error>
				</caps-field-content>
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
			<label class="gap-2" capsLabel>
				Test Checkbox
				<caps-checkbox id="testCheckbox" />
			</label>
		`,
	}),
};

export const LabeledWithAriaLabeledBy: Story = {
	render: () => ({
		template: /* HTML */ `
			<div class="flex items-center gap-2">
				<label id="testCheckbox" for="testCheckboxAria" capsLabel>Test Checkbox</label>
				<caps-checkbox id="testCheckboxAria" aria-labelledby="testCheckbox" />
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: `
  <caps-field-group>
   <caps-field orientation="horizontal">
    <caps-field-label>Test Checkbox</caps-field-label>
    <caps-checkbox disabled />
   </caps-field>
   <caps-field orientation="horizontal">
    <caps-checkbox disabled />
    <caps-field-label>Test Checkbox 2</caps-field-label>
   </caps-field>
   <caps-field orientation="horizontal">
    <caps-checkbox />
    <caps-field-label>Test Checkbox 3 enabled</caps-field-label>
   </caps-field>
  </caps-field-group>
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
		template: `
  <caps-field orientation="horizontal">
   <caps-field-label>Test Checkbox</caps-field-label>
   <caps-checkbox [indeterminate]="true" id="testCheckboxIndeterminate" />
  </caps-field>
 `,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: `<caps-checkbox-hint-error-story />`,
	}),
};
