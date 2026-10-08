import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
import { CapsDatePickerImports, CapsDatePickerMulti } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsDatePickerMulti<Date>> = {
	title: 'Date Picker Multi',
	component: CapsDatePickerMulti,
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
			providers: [
				provideCapsCalendarI18n({
					months: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					formatHeader: (m, y) => new Date(y, m).toLocaleDateString('en', { month: 'long', year: 'numeric' }),
				}),
			],
			imports: [CapsDatePickerImports, ReactiveFormsModule, CapsFieldImports, CapsButton],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-date-picker-multi [minDate]="minDate" [maxDate]="maxDate" [captionLayout]="captionLayout">
                <caps-date-picker-trigger buttonId="date">Pick a date</caps-date-picker-trigger>
            </caps-date-picker-multi>
		</div>
		`,
	}),
};

export default meta;

type Story = StoryObj<CapsDatePickerMulti<Date>>;

export const Default: Story = {
	args: { minDate: new Date(2020, 4, 1), maxDate: new Date(2030, 6, 1), captionLayout: 'label' },
};

export const Input: Story = {
	render: () => ({
		props: {},
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-date-picker-multi #picker>
				<caps-date-multi-input inputId="date-input" aria-label="Days" placeholder="dd/MM/yyyy, dd/MM/yyyy" />
				</caps-date-picker-multi>
			<output id="date-trigger" [attr.data-placeholder]="picker.hasDate() ? null : ''">{{ picker.formattedDate() ?? 'unset' }}</output>
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
		<h1 class="sr-only">Date Picker form</h1><form [formGroup]="form" class="space-y-3 w-full max-w-sm">
			<caps-field>
				<caps-field-label>Dates *</caps-field-label>
				<caps-date-picker-multi
					formControlName="dates"
					[captionLayout]="captionLayout"
					[minDate]="minDate"
					[maxDate]="maxDate">
					<caps-date-picker-trigger buttonId="date">Select dates</caps-date-picker-trigger>
				</caps-date-picker-multi>

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
