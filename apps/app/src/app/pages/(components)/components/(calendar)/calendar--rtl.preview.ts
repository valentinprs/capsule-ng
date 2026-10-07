import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsCalendar, injectCapsCalendarI18n, provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';
import { DateTime } from 'luxon';
import { CALENDAR_I18N } from '../(date-picker)/date-picker--rtl.preview';

@Component({
	selector: 'spartan-calendar-rtl',
	imports: [CapsCalendar, CapsCardImports],
	providers: [provideCapsCalendarI18n()],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[dir]': '_dir()',
		class: 'p-0 w-fit mx-auto',
	},
	template: `
		<caps-card class="p-0">
			<caps-card-content class="p-0">
				<caps-calendar [(date)]="selectedDate" [min]="minDate" [max]="maxDate" captionLayout="dropdown" />
			</caps-card-content>
		</caps-card>
	`,
})
export class CalendarRtl {
	/** The selected date */
	public selectedDate = new Date();

	/** The minimum date */
	public minDate = new Date(new Date().setMonth(new Date().getMonth() - 2));

	/** The maximum date */
	public maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2));

	private readonly _language = inject(TranslateService).language;
	private readonly _calendarI18n = injectCapsCalendarI18n();

	constructor() {
		effect(() => {
			const language = this._language();
			untracked(() => this._calendarI18n.use(CALENDAR_I18N[language]));
		});
	}

	protected readonly _formatDate = computed(() => {
		const locale = this._language();
		return (date: Date) => DateTime.fromJSDate(date).setLocale(locale).toLocaleString(DateTime.DATE_FULL);
	});

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {},
		},
		ar: {
			dir: 'rtl',
			values: {},
		},
		he: {
			dir: 'rtl',
			values: {},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
