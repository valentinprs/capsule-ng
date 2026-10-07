import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight, lucideRotateCcw } from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-context-menu-rtl',
	imports: [CapsContextMenuImports, NgIcon],
	providers: [provideIcons({ lucideArrowLeft, lucideArrowRight, lucideRotateCcw }), Directionality],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<div
			[capsContextMenuTrigger]="menu"
			align="start"
			side="right"
			class="flex aspect-video w-full min-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
			tabindex="0"
		>
			<span class="hidden pointer-fine:inline-block">{{ _t()['rightClick'] }}</span>
			<span class="hidden pointer-coarse:inline-block">{{ _t()['longPress'] }}</span>
		</div>

		<ng-template #menu>
			<caps-menu class="w-48">
				<caps-menu-group>
					<button [capsMenuSubTrigger]="navigationMenu" side="right" align="start">
						{{ _t()['navigation'] }}
					</button>
					<button [capsMenuSubTrigger]="moreToolsMenu" side="right" align="start">
						{{ _t()['moreTools'] }}
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuCheckboxItem [checked]="true">
						{{ _t()['showBookmarks'] }}
					</button>
					<button capsMenuCheckboxItem>
						{{ _t()['showFullUrls'] }}
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group label="{{ _t()['people'] }}">
					<button capsMenuRadioItem [checked]="true">
						{{ _t()['pedro'] }}
					</button>
					<button capsMenuRadioItem>
						{{ _t()['colm'] }}
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<ng-template #navigationMenu>
			<caps-menu class="w-44">
				<button capsMenuItem>
					<ng-icon name="lucideArrowLeft" />
					{{ _t()['back'] }}
					<caps-menu-shortcut>⌘[</caps-menu-shortcut>
				</button>
				<button capsMenuItem disabled>
					<ng-icon name="lucideArrowRight" />
					{{ _t()['forward'] }}
					<caps-menu-shortcut>⌘]</caps-menu-shortcut>
				</button>
				<button capsMenuItem>
					<ng-icon name="lucideRotateCcw" />
					{{ _t()['reload'] }}
					<caps-menu-shortcut>⌘R</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>
		<ng-template #moreToolsMenu>
			<caps-menu class="w-44">
				<caps-menu-group>
					<button capsMenuItem>
						{{ _t()['savePage'] }}
					</button>
					<button capsMenuItem>
						{{ _t()['createShortcut'] }}
					</button>
					<button capsMenuItem>
						{{ _t()['nameWindow'] }}
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>
					{{ _t()['developerTools'] }}
				</button>
				<caps-menu-separator />
				<button capsMenuItem danger>
					{{ _t()['delete'] }}
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				rightClick: 'Right click here',
				longPress: 'Long press here',
				navigation: 'Navigation',
				back: 'Back',
				forward: 'Forward',
				reload: 'Reload',
				moreTools: 'More Tools',
				savePage: 'Save Page...',
				createShortcut: 'Create Shortcut...',
				nameWindow: 'Name Window...',
				developerTools: 'Developer Tools',
				delete: 'Delete',
				showBookmarks: 'Show Bookmarks',
				showFullUrls: 'Show Full URLs',
				people: 'People',
				pedro: 'Pedro Duarte',
				colm: 'Colm Tuite',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				rightClick: 'انقر بزر الماوس الأيمن هنا',
				longPress: 'اضغط مطولاً هنا',
				navigation: 'التنقل',
				back: 'رجوع',
				forward: 'تقدم',
				reload: 'إعادة تحميل',
				moreTools: 'المزيد من الأدوات',
				savePage: 'حفظ الصفحة...',
				createShortcut: 'إنشاء اختصار...',
				nameWindow: 'تسمية النافذة...',
				developerTools: 'أدوات المطور',
				delete: 'حذف',
				showBookmarks: 'إظهار الإشارات المرجعية',
				showFullUrls: 'إظهار عناوين URL الكاملة',
				people: 'الأشخاص',
				pedro: 'Pedro Duarte',
				colm: 'Colm Tuite',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				rightClick: 'לחץ לחיצה ימנית כאן',
				longPress: 'לחץ לחיצה ארוכה כאן',
				navigation: 'ניווט',
				back: 'חזור',
				forward: 'קדימה',
				reload: 'רענן',
				moreTools: 'כלים נוספים',
				savePage: 'שמור עמוד...',
				createShortcut: 'צור קיצור דרך...',
				nameWindow: 'שם חלון...',
				developerTools: 'כלי מפתח',
				delete: 'מחק',
				showBookmarks: 'הצג סימניות',
				showFullUrls: 'הצג כתובות URL מלאות',
				people: 'אנשים',
				pedro: 'Pedro Duarte',
				colm: 'Colm Tuite',
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
