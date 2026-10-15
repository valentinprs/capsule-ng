import { Component, computed, inject } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCalculator,
	lucideCalendar,
	lucideCog,
	lucidePlus,
	lucideSearch,
	lucideSmile,
	lucideUser,
	lucideWallet,
} from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-command-rtl',
	imports: [CapsCommandImports, CapsCardImports, NgIcon],
	providers: [
		provideIcons({
			lucideSearch,
			lucideCalendar,
			lucideSmile,
			lucidePlus,
			lucideUser,
			lucideWallet,
			lucideCog,
			lucideCalculator,
		}),
	],
	host: {
		class: 'w-full py-0',
		'[attr.dir]': '_dir()',
	},
	template: `
		<caps-card class="py-0">
			<caps-card-content class="p-0">
				<caps-command>
					<caps-command-input [placeholder]="_t()['placeholder']" />
					<caps-command-list>
						<caps-command-empty>{{ _t()['empty'] }}</caps-command-empty>
						<caps-command-group label="{{ _t()['suggestions'] }}">
							<button capsCommandItem value="Calendar">
								<ng-icon name="lucideCalendar" />
								{{ _t()['calendar'] }}
							</button>
							<button capsCommandItem value="Search Emoji">
								<ng-icon name="lucideSmile" />
								{{ _t()['searchEmoji'] }}
							</button>
							<button capsCommandItem value="Calculator" disabled>
								<ng-icon name="lucideCalculator" />
								{{ _t()['calculator'] }}
							</button>
						</caps-command-group>

						<caps-command-separator />

						<caps-command-group label="{{ _t()['settings'] }}">
							<button capsCommandItem value="Profile">
								<ng-icon name="lucideUser" />
								{{ _t()['profile'] }}
								<caps-command-shortcut>⌘P</caps-command-shortcut>
							</button>
							<button capsCommandItem value="Billing">
								<ng-icon name="lucideWallet" />
								{{ _t()['billing'] }}
								<caps-command-shortcut>⌘B</caps-command-shortcut>
							</button>
							<button capsCommandItem value="Settings">
								<ng-icon name="lucideCog" />
								{{ _t()['settings'] }}
								<caps-command-shortcut>⌘S</caps-command-shortcut>
							</button>
						</caps-command-group>
					</caps-command-list>
				</caps-command>
			</caps-card-content>
		</caps-card>
	`,
})
export class CommandRtl {
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				placeholder: 'Type a command or search...',
				empty: 'No results found.',
				suggestions: 'Suggestions',
				calendar: 'Calendar',
				searchEmoji: 'Search Emoji',
				calculator: 'Calculator',
				settings: 'Settings',
				profile: 'Profile',
				billing: 'Billing',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				placeholder: 'اكتب أمرًا أو ابحث...',
				empty: 'لم يتم العثور على نتائج.',
				suggestions: 'اقتراحات',
				calendar: 'التقويم',
				searchEmoji: 'البحث عن الرموز التعبيرية',
				calculator: 'الآلة الحاسبة',
				settings: 'الإعدادات',
				profile: 'الملف الشخصي',
				billing: 'الفوترة',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				placeholder: 'הקלד פקודה או חפש...',
				empty: 'לא נמצאו תוצאות.',
				suggestions: 'הצעות',
				calendar: 'לוח שנה',
				searchEmoji: "חפש אמוג'י",
				calculator: 'מחשבון',
				settings: 'הגדרות',
				profile: 'פרופיל',
				billing: 'חיוב',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
