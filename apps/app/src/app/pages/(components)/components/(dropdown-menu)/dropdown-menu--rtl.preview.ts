import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCreditCard, lucideSettings, lucideUser } from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';
import { MenuSide } from '@spartan-ng/brain/core';

@Component({
	selector: 'spartan-dropdown-rtl',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideUser, lucideCreditCard, lucideSettings }), Directionality],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">
			{{ _t()['open'] }}
		</button>

		<ng-template #menu>
			<caps-menu class="w-36">
				<button [capsMenuSubTrigger]="accountMenu" side="right" align="start">
					{{ _t()['account'] }}
				</button>
				<caps-menu-separator />
				<caps-menu-group label="{{ _t()['team'] }}">
					<button capsMenuItem>
						{{ _t()['team'] }}
					</button>
					<button [capsMenuSubTrigger]="inviteMenu" side="right" align="start">
						{{ _t()['inviteUsers'] }}
					</button>
					<button capsMenuItem>
						{{ _t()['newTeam'] }}
						<caps-menu-shortcut>⌘+T</caps-menu-shortcut>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group label="{{ _t()['view'] }}">
					<button capsMenuCheckboxItem [(checked)]="statusBar">
						{{ _t()['statusBar'] }}
					</button>

					<button capsMenuCheckboxItem [(checked)]="activityBar">
						{{ _t()['activityBar'] }}
					</button>

					<button capsMenuCheckboxItem [(checked)]="panel">
						{{ _t()['panel'] }}
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group label="{{ _t()['position'] }}" type="radio" [(value)]="position">
					<button capsMenuRadioItem value="top">
						{{ _t()['top'] }}
					</button>
					<button capsMenuRadioItem value="bottom">
						{{ _t()['bottom'] }}
					</button>
					<button capsMenuRadioItem value="right">
						{{ _t()['right'] }}
					</button>
					<button capsMenuRadioItem value="left">
						{{ _t()['left'] }}
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					{{ _t()['logout'] }}
				</button>
			</caps-menu>
		</ng-template>

		<ng-template #accountMenu>
			<caps-menu>
				<button capsMenuItem>
					<ng-icon name="lucideUser" />
					{{ _t()['profile'] }}
				</button>
				<button capsMenuItem>
					<ng-icon name="lucideCreditCard" />
					{{ _t()['billing'] }}
				</button>
				<button capsMenuItem>
					<ng-icon name="lucideSettings" />
					{{ _t()['settings'] }}
				</button>
			</caps-menu>
		</ng-template>

		<ng-template #inviteMenu>
			<caps-menu>
				<button capsMenuItem>
					{{ _t()['email'] }}
				</button>
				<button capsMenuItem>
					{{ _t()['message'] }}
				</button>
				<button [capsMenuSubTrigger]="moreMenu" side="right" align="start">
					{{ _t()['more'] }}
				</button>
				<caps-menu-separator />
				<button capsMenuItem>
					{{ _t()['advanced'] }}
				</button>
			</caps-menu>
		</ng-template>

		<ng-template #moreMenu>
			<caps-menu>
				<button capsMenuItem>
					{{ _t()['calendar'] }}
				</button>
				<button capsMenuItem>
					{{ _t()['chat'] }}
				</button>
				<caps-menu-separator />
				<button capsMenuItem>
					{{ _t()['webhook'] }}
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownRtl {
	public readonly statusBar = signal(true);
	public readonly activityBar = signal(false);
	public readonly panel = signal(false);
	public readonly position = signal<MenuSide>('bottom');

	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				open: 'Open',
				account: 'Account',
				profile: 'Profile',
				billing: 'Billing',
				settings: 'Settings',
				logout: 'Log out',
				team: 'Team',
				inviteUsers: 'Invite users',
				email: 'Email',
				message: 'Message',
				more: 'More',
				calendar: 'Calendar',
				chat: 'Chat',
				webhook: 'Webhook',
				advanced: 'Advanced...',
				newTeam: 'New Team',
				view: 'View',
				statusBar: 'Status Bar',
				activityBar: 'Activity Bar',
				panel: 'Panel',
				position: 'Position',
				top: 'Top',
				bottom: 'Bottom',
				right: 'Right',
				left: 'Left',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				open: 'افتح القائمة',
				account: 'الحساب',
				profile: 'الملف الشخصي',
				billing: 'الفوترة',
				settings: 'الإعدادات',
				logout: 'تسجيل الخروج',
				team: 'الفريق',
				inviteUsers: 'دعوة المستخدمين',
				email: 'البريد الإلكتروني',
				message: 'رسالة',
				more: 'المزيد',
				calendar: 'تقويم',
				chat: 'دردشة',
				webhook: 'خطاف ويب',
				advanced: 'متقدم...',
				newTeam: 'فريق جديد',
				view: 'عرض',
				statusBar: 'شريط الحالة',
				activityBar: 'شريط النشاط',
				panel: 'اللوحة',
				position: 'الموضع',
				top: 'أعلى',
				bottom: 'أسفل',
				right: 'يمين',
				left: 'يسار',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				open: 'פתח תפריט',
				account: 'חשבון',
				profile: 'פרופיל',
				billing: 'חיוב',
				settings: 'הגדרות',
				logout: 'התנתק',
				team: 'הצוות',
				inviteUsers: 'הזמן משתמשים',
				email: 'אימייל',
				message: 'הודעה',
				more: 'עוד',
				calendar: 'יומן',
				chat: "צ'אט",
				webhook: 'Webhook',
				advanced: 'מתקדם...',
				newTeam: 'צוות חדש',
				view: 'תצוגה',
				statusBar: 'שורת סטטוס',
				activityBar: 'שורת פעילות',
				panel: 'לוח',
				position: 'מיקום',
				top: 'למעלה',
				bottom: 'למטה',
				right: 'ימין',
				left: 'שמאל',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	private readonly _directionality = inject(Directionality);

	constructor() {
		effect(() => {
			const dir = this._dir();
			untracked(() => this._directionality.valueSignal.set(dir));
		});
	}
}
