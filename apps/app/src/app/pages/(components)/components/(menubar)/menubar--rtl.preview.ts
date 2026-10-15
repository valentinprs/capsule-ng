import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsMenubarImports } from '@capsule-ng/caps/menubar';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-menubar-rtl',
	imports: [CapsMenubarImports, CapsDropdownMenuImports],
	providers: [Directionality],
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<caps-menubar>
			<button [capsMenubarTrigger]="file">
				{{ _t()['file'] }}
			</button>

			<button [capsMenubarTrigger]="edit">
				{{ _t()['edit'] }}
			</button>

			<button [capsMenubarTrigger]="view">
				{{ _t()['view'] }}
			</button>

			<button [capsMenubarTrigger]="profiles">
				{{ _t()['profiles'] }}
			</button>
		</caps-menubar>

		<!-- FILE -->

		<ng-template #file>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						{{ _t()['newTab'] }}
						<caps-menu-shortcut>⌘T</caps-menu-shortcut>
					</button>

					<button capsMenuItem>
						{{ _t()['newWindow'] }}
						<caps-menu-shortcut>⌘N</caps-menu-shortcut>
					</button>

					<button capsMenuItem disabled>
						{{ _t()['newIncognitoWindow'] }}
					</button>
				</caps-menu-group>

				<caps-menu-separator />

				<button [capsMenuSubTrigger]="share" align="start" side="right">
					{{ _t()['share'] }}
				</button>

				<caps-menu-separator />

				<button capsMenuItem>
					{{ _t()['print'] }}
					<caps-menu-shortcut>⌘P</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>

		<!-- SHARE SUBMENU -->

		<ng-template #share>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						{{ _t()['emailLink'] }}
					</button>

					<button capsMenuItem>
						{{ _t()['messages'] }}
					</button>

					<button capsMenuItem>
						{{ _t()['notes'] }}
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<!-- EDIT -->

		<ng-template #edit>
			<caps-menu class="w-56">
				<caps-menu-group>
					<button capsMenuItem>
						{{ _t()['undo'] }}
						<caps-menu-shortcut>⌘Z</caps-menu-shortcut>
					</button>

					<button capsMenuItem>
						{{ _t()['redo'] }}
						<caps-menu-shortcut>⇧⌘Z</caps-menu-shortcut>
					</button>
				</caps-menu-group>

				<caps-menu-separator />

				<button [capsMenuSubTrigger]="find" align="start" side="right">
					{{ _t()['find'] }}
				</button>

				<caps-menu-separator />

				<caps-menu-group>
					<button capsMenuItem>
						{{ _t()['cut'] }}
					</button>

					<button capsMenuItem>
						{{ _t()['copy'] }}
					</button>

					<button capsMenuItem>
						{{ _t()['paste'] }}
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<!-- FIND SUBMENU -->

		<ng-template #find>
			<caps-menu>
				<button capsMenuItem>
					{{ _t()['searchTheWeb'] }}
				</button>

				<caps-menu-separator />

				<caps-menu-group>
					<button capsMenuItem>
						{{ _t()['findItem'] }}
					</button>

					<button capsMenuItem>
						{{ _t()['findNext'] }}
					</button>

					<button capsMenuItem>
						{{ _t()['findPrevious'] }}
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<!-- VIEW -->

		<ng-template #view>
			<caps-menu class="w-64">
				<button capsMenuCheckboxItem>
					{{ _t()['bookmarksBar'] }}
				</button>

				<button capsMenuCheckboxItem [checked]="true">
					{{ _t()['fullUrls'] }}
				</button>

				<caps-menu-separator />

				<button capsMenuItem>
					{{ _t()['reload'] }}
					<caps-menu-shortcut>⌘R</caps-menu-shortcut>
				</button>

				<button capsMenuItem disabled>
					{{ _t()['forceReload'] }}
					<caps-menu-shortcut>⇧⌘R</caps-menu-shortcut>
				</button>

				<caps-menu-separator />

				<button capsMenuItem>
					{{ _t()['toggleFullscreen'] }}
				</button>

				<caps-menu-separator />

				<button capsMenuItem>
					{{ _t()['hideSidebar'] }}
				</button>
			</caps-menu>
		</ng-template>

		<!-- PROFILES -->

		<ng-template #profiles>
			<caps-menu class="w-48">
				<caps-menu-group type="radio" [(value)]="_profile">
					<button capsMenuRadioItem value="andy">
						{{ _t()['andy'] }}
					</button>

					<button capsMenuRadioItem value="benoit">
						{{ _t()['benoit'] }}
					</button>

					<button capsMenuRadioItem value="luis">
						{{ _t()['luis'] }}
					</button>
				</caps-menu-group>

				<caps-menu-separator />

				<button capsMenuItem>
					{{ _t()['editProfile'] }}
				</button>

				<caps-menu-separator />

				<button capsMenuItem>
					{{ _t()['addProfile'] }}
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class MenubarRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				file: 'File',
				newTab: 'New Tab',
				newWindow: 'New Window',
				newIncognitoWindow: 'New Incognito Window',
				share: 'Share',
				emailLink: 'Email link',
				messages: 'Messages',
				notes: 'Notes',
				print: 'Print...',
				edit: 'Edit',
				undo: 'Undo',
				redo: 'Redo',
				find: 'Find',
				searchTheWeb: 'Search the web',
				findItem: 'Find...',
				findNext: 'Find Next',
				findPrevious: 'Find Previous',
				cut: 'Cut',
				copy: 'Copy',
				paste: 'Paste',
				view: 'View',
				bookmarksBar: 'Bookmarks Bar',
				fullUrls: 'Full URLs',
				reload: 'Reload',
				forceReload: 'Force Reload',
				toggleFullscreen: 'Toggle Fullscreen',
				hideSidebar: 'Hide Sidebar',
				profiles: 'Profiles',
				andy: 'Andy',
				benoit: 'Benoit',
				luis: 'Luis',
				editProfile: 'Edit...',
				addProfile: 'Add Profile...',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				file: 'ملف',
				newTab: 'علامة تبويب جديدة',
				newWindow: 'نافذة جديدة',
				newIncognitoWindow: 'نافذة التصفح المتخفي الجديدة',
				share: 'مشاركة',
				emailLink: 'رابط البريد الإلكتروني',
				messages: 'الرسائل',
				notes: 'الملاحظات',
				print: 'طباعة...',
				edit: 'تعديل',
				undo: 'تراجع',
				redo: 'إعادة',
				find: 'بحث',
				searchTheWeb: 'البحث على الويب',
				findItem: 'بحث...',
				findNext: 'البحث التالي',
				findPrevious: 'البحث السابق',
				cut: 'قص',
				copy: 'نسخ',
				paste: 'لصق',
				view: 'عرض',
				bookmarksBar: 'شريط الإشارات المرجعية',
				fullUrls: 'عناوين URL الكاملة',
				reload: 'إعادة تحميل',
				forceReload: 'إعادة تحميل قسري',
				toggleFullscreen: 'تبديل وضع ملء الشاشة',
				hideSidebar: 'إخفاء الشريط الجانبي',
				profiles: 'الملفات الشخصية',
				andy: 'Andy',
				benoit: 'Benoit',
				luis: 'Luis',
				editProfile: 'تعديل...',
				addProfile: 'إضافة ملف شخصي...',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				file: 'קובץ',
				newTab: 'כרטיסייה חדשה',
				newWindow: 'חלון חדש',
				newIncognitoWindow: 'חלון גלישה בסתר חדש',
				share: 'שתף',
				emailLink: 'קישור אימייל',
				messages: 'הודעות',
				notes: 'הערות',
				print: 'הדפס...',
				edit: 'ערוך',
				undo: 'בטל',
				redo: 'בצע שוב',
				find: 'מצא',
				searchTheWeb: 'חפש באינטרנט',
				findItem: 'מצא...',
				findNext: 'מצא הבא',
				findPrevious: 'מצא הקודם',
				cut: 'גזור',
				copy: 'העתק',
				paste: 'הדבק',
				view: 'תצוגה',
				bookmarksBar: 'סרגל סימניות',
				fullUrls: 'כתובות URL מלאות',
				reload: 'רענן',
				forceReload: 'רענן בכוח',
				toggleFullscreen: 'החלף מסך מלא',
				hideSidebar: 'הסתר סרגל צד',
				profiles: 'פרופילים',
				andy: 'Andy',
				benoit: 'Benoit',
				luis: 'Luis',
				editProfile: 'ערוך...',
				addProfile: 'הוסף פרופיל...',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
	protected readonly _profile = signal<string | string[]>('benoit');

	private readonly _directionality = inject(Directionality);

	constructor() {
		effect(() => {
			const dir = this._dir();
			untracked(() => this._directionality.valueSignal.set(dir));
		});
	}
}
