import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { HlmCalendar } from '@spartan-ng/helm/calendar';

@Component({
	selector: 'spartan-calendar-year-and-month-dropdown',
	imports: [HlmCalendar, CapsSelectImports, FormsModule, CapsCardImports],
	host: {
		class: 'flex flex-col gap-4',
	},
	template: `
		<caps-card width="auto" class="mx-auto p-0">
			<caps-card-content class="p-0">
				<hlm-calendar [captionLayout]="_captionLayout()" />
			</caps-card-content>
		</caps-card>

		<caps-select
			aria-label="Calendar caption layout"
			[(ngModel)]="_captionLayout"
			[itemToString]="itemToString"
			placeholder="Select an option"
			class="inline-block w-full"
		>
			<caps-select-option value="dropdown">Month and Year</caps-select-option>
			<caps-select-option value="dropdown-months">Only Month</caps-select-option>
			<caps-select-option value="dropdown-years">Only Year</caps-select-option>
		</caps-select>
	`,
})
export class CalendarYearAndMonthDropdownsExample {
	protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');

	public readonly options = [
		{ value: 'dropdown', label: 'Month and Year' },
		{ value: 'dropdown-months', label: 'Only Month' },
		{ value: 'dropdown-years', label: 'Only Year' },
	];

	public readonly itemToString = (value: string) => this.options.find((option) => option.value === value)?.label || '';
}
