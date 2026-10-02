import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmNativeSelect, HlmNativeSelectImports } from '@spartan-ng/helm/native-select';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export default {
	title: 'Native Select',
	component: HlmNativeSelect,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [HlmNativeSelectImports, CapsFieldImports, ReactiveFormsModule, CapsButton],
		}),
	],
} as Meta<HlmNativeSelect>;

type Story = StoryObj<HlmNativeSelect>;

export const Default: Story = {
	render: () => ({
		template: `
<hlm-native-select>
  <option hlmNativeSelectOption value="">Select a fruit</option>
  <option hlmNativeSelectOption value="apple">Apple</option>
  <option hlmNativeSelectOption value="banana">Banana</option>
  <option hlmNativeSelectOption value="blueberry">Blueberry</option>
  <option hlmNativeSelectOption value="pineapple">Pineapple</option>
</hlm-native-select>
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
					<hlm-native-select id="select-fruit" formControlName="fruit">
						<option hlmNativeSelectOption value="">Select a fruit</option>
						<option hlmNativeSelectOption value="apple">Apple</option>
						<option hlmNativeSelectOption value="banana">Banana</option>
						<option hlmNativeSelectOption value="blueberry">Blueberry</option>
						<option hlmNativeSelectOption value="pineapple">Pineapple</option>
					</hlm-native-select>

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
