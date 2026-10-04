import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsNativeSelect, CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export default {
	title: 'Native Select',
	component: CapsNativeSelect,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsNativeSelectImports, CapsFieldImports, ReactiveFormsModule, CapsButton],
		}),
	],
} as Meta<CapsNativeSelect>;

type Story = StoryObj<CapsNativeSelect>;

export const Default: Story = {
	render: () => ({
		template: `
<select capsNativeSelect aria-label="Fruit">
  <option value="">Select a fruit</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="blueberry">Blueberry</option>
  <option value="pineapple">Pineapple</option>
</select>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: (args) => ({
		props: {
			...args,
			form: new FormGroup({
				fruit: new FormControl('', { validators: [Validators.required] }),
			}),
		},
		template: /* HTML */ `
			<form [formGroup]="form" class="w-full max-w-sm space-y-3">
				<caps-field>
					<caps-field-label>Fruit *</caps-field-label>
					<select capsNativeSelect id="select-fruit" formControlName="fruit">
						<option value="">Select a fruit</option>
						<option value="apple">Apple</option>
						<option value="banana">Banana</option>
						<option value="blueberry">Blueberry</option>
						<option value="pineapple">Pineapple</option>
					</select>
					<caps-field-description>Pick a fruit so we can tailor the recommendations.</caps-field-description>
					<caps-field-error>Select your favorite fruit to continue.</caps-field-error>
				</caps-field>
				<div class="flex flex-wrap items-center gap-2">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</div>
			</form>
		`,
	}),
};
