import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { buttonVariants, CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { BrnCalendarImports, BrnMonthYearCalendar, injectBrnCalendarI18n } from '@spartan-ng/brain/calendar';
import { injectDateAdapter } from '@spartan-ng/brain/date-time';
import { classes, hlm } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-month-year-calendar',
	imports: [BrnCalendarImports, NgIcon, CapsButtonImports],
	viewProviders: [provideIcons({ lucideChevronLeft, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnMonthYearCalendar,
			inputs: ['min', 'max', 'disabled', 'date', 'defaultFocusedDate', 'view'],
			outputs: ['dateChange'],
		},
	],
	host: { 'data-slot': 'month-year-calendar' },
	template: `
		<div class="flex flex-col gap-4">
			<!-- Header -->
			<div class="flex w-full items-center justify-between gap-1.5">
				<button
					brnMonthYearCalendarPreviousButton
					capsButton
					variant="outline"
					class="order-first size-(--cell-size) rounded-md p-0 select-none aria-disabled:opacity-50"
				>
					<ng-icon name="lucideChevronLeft" class="rtl:rotate-180" aria-hidden="true" />
				</button>

				<button
					capsButton
					variant="ghost"
					class="h-(--cell-size) py-0 select-none aria-disabled:opacity-50"
					brnMonthYearCalendarHeader
				>
					{{ _heading() }}
				</button>

				<button
					brnMonthYearCalendarNextButton
					capsButton
					variant="outline"
					class="order-last size-(--cell-size) rounded-md p-0 select-none aria-disabled:opacity-50"
				>
					<ng-icon name="lucideChevronRight" class="rtl:rotate-180" aria-hidden="true" />
				</button>
			</div>

			<!-- Grid -->
			@switch (_picker.view()) {
				@case ('year') {
					<div brnMonthYearCalendarGrid [attr.aria-label]="_heading()" class="flex flex-col gap-2">
						@for (row of _yearsRows(); track $index) {
							<div role="row" class="grid grid-cols-4 gap-2">
								@for (year of row; track _dateAdapter.getYear(year)) {
									<button brnMonthYearCalendarYearButton [date]="year" [class]="_btnClass">
										{{ _i18n.config().formatYear(_dateAdapter.getYear(year)) }}
									</button>
								}
							</div>
						}
					</div>
				}
				@case ('month') {
					<div brnMonthYearCalendarGrid [attr.aria-label]="_heading()" class="flex flex-col gap-2">
						@for (row of _monthsRows(); track $index) {
							<div role="row" class="grid grid-cols-4 gap-2">
								@for (month of row; track _dateAdapter.getMonth(month)) {
									<button brnMonthYearCalendarMonthButton [date]="month" [class]="_btnClass">
										{{ _i18n.config().months()[_dateAdapter.getMonth(month)] }}
									</button>
								}
							</div>
						}
					</div>
				}
			}
		</div>
	`,
})
export class CapsMonthYearCalendar<T> {
	/** Access the calendar i18n */
	protected readonly _i18n = injectBrnCalendarI18n();

	/** Access the date adapter */
	protected readonly _dateAdapter = injectDateAdapter<T>();

	/** Access the picker directive */
	protected readonly _picker = inject(BrnMonthYearCalendar<T>);

	/** The heading for the current view. */
	protected readonly _heading = computed(() => {
		const config = this._i18n.config();

		if (this._picker.view() === 'month') {
			return config.formatYear(this._dateAdapter.getYear(this._picker.focusedDate()));
		}

		const { start, end } = this._picker.yearRange();
		return `${config.formatYear(start)} – ${config.formatYear(end)}`;
	});

	protected readonly _yearsRows = computed(() => this._rows(this._picker.years()));
	protected readonly _monthsRows = computed(() => this._rows(this._picker.months()));
	private _rows(dates: T[]): T[][] {
		return Array.from({ length: Math.ceil(dates.length / 4) }, (_, index) => dates.slice(index * 4, index * 4 + 4));
	}

	protected readonly _btnClass = hlm(
		buttonVariants({ variant: 'ghost' }),
		'data-[today=true]:bg-muted rounded-(--cell-radius)',
		'data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:hover:bg-primary data-[selected=true]:hover:text-primary-foreground',
		'data-[focused=true]:border-ring data-[focused=true]:ring-ring/50 data-[focused=true]:ring-[3px]',
		'aria-disabled:pointer-events-none aria-disabled:opacity-50',
		'h-(--cell-size)',
	);

	constructor() {
		classes(
			() =>
				'caps-calendar group/calendar bg-background block in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
		);
	}
}
