import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmDatePickerImports, HlmDatePickerMulti } from '@spartan-ng/helm/date-picker';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<HlmDatePickerMulti<Date>> = {
	title: 'Date Picker Multi',
	component: HlmDatePickerMulti,
	tags: ['autodocs'],
	args: {
		captionLayout: 'label',
		minDate: new Date(2020, 4, 1),
		maxDate: new Date(2030, 6, 1),
	},
	argTypes: {
		captionLayout: {
			options: ['dropdown', 'label', 'dropdown-months', 'dropdown-years'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [HlmDatePickerImports, ReactiveFormsModule, CapsFieldImports, CapsButton],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `
		<div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<hlm-date-picker-multi [minDate]="minDate" [maxDate]="maxDate" [captionLayout]="captionLayout">
                <hlm-date-picker-trigger buttonId="date">Pick a date</hlm-date-picker-trigger>
            </hlm-date-picker-multi>
		</div>
		`,
	}),
};

export default meta;

type Story = StoryObj<HlmDatePickerMulti<Date>>;

export const Default: Story = {
	args: { minDate: new Date(2020, 4, 1), maxDate: new Date(2030, 6, 1), captionLayout: 'label' },
};

export const Input: Story = {
	render: () => ({
		props: {},
		template: `
		<div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<hlm-date-picker-multi>
				<hlm-date-multi-input inputId="date-input" placeholder="dd/MM/yyyy, dd/MM/yyyy" />
				<hlm-date-picker-trigger buttonId="date-trigger" [showTrigger]="false">unset</hlm-date-picker-trigger>
			</hlm-date-picker-multi>
		</div>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: (args) => ({
		props: {
			...args,
			form: new FormGroup({
				dates: new FormControl(null, { validators: [Validators.required] }),
			}),
		},
		template: `
		<form [formGroup]="form" class="space-y-3 w-full max-w-sm">
			<caps-field>
				<caps-field-label>Dates *</caps-field-label>
				<hlm-date-picker-multi
					formControlName="dates"
					[captionLayout]="captionLayout"
					[minDate]="minDate"
					[maxDate]="maxDate">
					<hlm-date-picker-trigger buttonId="date">Select dates</hlm-date-picker-trigger>
				</hlm-date-picker-multi>

				<caps-field-description>Select multiple dates for your availability.</caps-field-description>

				<caps-field-error>Select at least one date to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
		`,
	}),
};
