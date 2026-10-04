import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { HlmCalendar } from '@spartan-ng/helm/calendar';
@Component({
	selector: 'spartan-calendar-month-and-year-dropdown',
	imports: [HlmCalendar, CapsSelectImports, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<div class="flex w-max flex-col gap-2">
			<hlm-calendar class="bg-background" [captionLayout]="_captionLayout()" />
			<caps-select
				aria-label="Calendar caption layout"
				[(ngModel)]="_captionLayout"
				[itemToString]="itemToString"
				class="bg-background w-full"
			>
				@for (option of options; track option.value) {
					<caps-select-option [value]="option.value">{{ option.label }}</caps-select-option>
				}
			</caps-select>
		</div>
	`,
})
export class CalendarMonthAndYearComponent {
	protected readonly _captionLayout = model<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('dropdown');

	public readonly options = [
		{ value: 'dropdown', label: 'Month and Year' },
		{ value: 'dropdown-months', label: 'Only Month' },
		{ value: 'dropdown-years', label: 'Only Year' },
	];

	public readonly itemToString = (value: string) => this.options.find((option) => option.value === value)?.label || '';
}
