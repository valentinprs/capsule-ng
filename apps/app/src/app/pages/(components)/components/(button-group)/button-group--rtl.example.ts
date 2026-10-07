import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArchive,
	lucideArrowLeft,
	lucideCalendarPlus,
	lucideClock,
	lucideEllipsis,
	lucideListFilterPlus,
	lucideMailCheck,
	lucideTag,
	lucideTrash,
} from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-button-group-rtl-preview',
	imports: [CapsButtonImports, CapsButtonGroupImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideArrowLeft,
			lucideEllipsis,
			lucideMailCheck,
			lucideArchive,
			lucideClock,
			lucideCalendarPlus,
			lucideListFilterPlus,
			lucideTag,
			lucideTrash,
		}),
		Directionality,
	],
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<caps-button-group aria-label="Actions">
			<button capsButton variant="outline" size="icon" [attr.aria-label]="_t().goBack" class="hidden sm:flex">
				<ng-icon name="lucideArrowLeft" class="rtl:rotate-180" />
			</button>

			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline">{{ _t().archive }}</button>
				<button capsButton variant="outline">{{ _t().report }}</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline">{{ _t().snooze }}</button>
				<button
					capsButton
					variant="outline"
					[attr.aria-label]="_t().moreOptions"
					[capsDropdownMenuTrigger]="menu"
					placement="bottom-end"
				>
					<ng-icon name="lucideEllipsis" />
				</button>
			</caps-button-group>
		</caps-button-group>
		<ng-template #menu>
			<caps-menu class="w-52" [dir]="_dir()">
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideMailCheck" />
						<span>{{ _t().markAsRead }}</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideArchive" />
						<span>{{ _t().archive }}</span>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideClock" />
						<span>{{ _t().snooze }}</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideCalendarPlus" />
						<span>{{ _t().addToCalendar }}</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideListFilterPlus" />
						<span>{{ _t().addToList }}</span>
					</button>
					<button align="start" side="right" [capsMenuSubTrigger]="submenu">
						<ng-icon name="lucideTag" />
						<span>{{ _t().labelAs }}</span>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash" />
					<span>{{ _t().delete }}</span>
				</button>
			</caps-menu>
		</ng-template>
		<ng-template #submenu>
			<caps-menu class="w-40" [dir]="_dir()">
				<caps-menu-group type="radio" [(value)]="label">
					<button capsMenuRadioItem value="personal">
						<span>{{ _t().personal }}</span>
					</button>
					<button capsMenuRadioItem value="work">
						<span>{{ _t().work }}</span>
					</button>
					<button capsMenuRadioItem value="other">
						<span>{{ _t().other }}</span>
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class ButtonGroupRtl {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations<{
		goBack: string;
		archive: string;
		report: string;
		snooze: string;
		moreOptions: string;
		markAsRead: string;
		addToCalendar: string;
		addToList: string;
		labelAs: string;
		delete: string;
		personal: string;
		work: string;
		other: string;
	}> = {
		en: {
			dir: 'ltr',
			values: {
				goBack: 'Go Back',
				archive: 'Archive',
				report: 'Report',
				snooze: 'Snooze',
				moreOptions: 'More Options',
				markAsRead: 'Mark as Read',
				addToCalendar: 'Add to Calendar',
				addToList: 'Add to List',
				labelAs: 'Label as...',
				delete: 'Delete',
				personal: 'Personal',
				work: 'Work',
				other: 'Other',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				goBack: 'رجوع',
				archive: 'أرشفة',
				report: 'إبلاغ',
				snooze: 'تأجيل',
				moreOptions: 'المزيد من الخيارات',
				markAsRead: 'تحديد كمقروء',
				addToCalendar: 'إضافة إلى التقويم',
				addToList: 'إضافة إلى القائمة',
				labelAs: 'تصنيف كـ...',
				delete: 'حذف',
				personal: 'شخصي',
				work: 'عمل',
				other: 'آخر',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				goBack: 'חזור',
				archive: 'ארכיון',
				report: 'דווח',
				snooze: 'דחה',
				moreOptions: 'אפשרויות נוספות',
				markAsRead: 'סמן כנקרא',
				addToCalendar: 'הוסף ליומן',
				addToList: 'הוסף לרשימה',
				labelAs: 'תייג כ...',
				delete: 'מחק',
				personal: 'אישי',
				work: 'עבודה',
				other: 'אחר',
			},
		},
	};

	public readonly label = signal<string | string[]>('personal');

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	constructor() {
		effect(() => {
			const dir = this._dir();
			untracked(() => this._directionality.valueSignal.set(dir));
		});
	}
}
