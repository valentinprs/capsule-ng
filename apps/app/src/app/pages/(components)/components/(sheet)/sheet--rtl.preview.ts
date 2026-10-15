import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-sheet-rtl',
	imports: [CapsSheetImports, CapsFieldImports, CapsButtonImports, CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet [dir]="_dir()">
			<button capsSheetTrigger capsButton variant="outline">{{ _t()['open'] }}</button>
			<ng-template capsSheetContent [class]="_font()" [side]="_dir() === 'rtl' ? 'left' : 'right'">
				<caps-sheet-header>
					<caps-sheet-title>{{ _t()['editProfile'] }}</caps-sheet-title>
					<caps-sheet-description>{{ _t()['description'] }}</caps-sheet-description>
				</caps-sheet-header>
				<caps-field-group class="px-4">
					<caps-field>
						<caps-field-label>{{ _t()['name'] }}</caps-field-label>
						<input capsInput value="Pedro Duarte" />
					</caps-field>
					<caps-field>
						<caps-field-label>{{ _t()['username'] }}</caps-field-label>
						<input capsInput value="peduarte" />
					</caps-field>
				</caps-field-group>
				<caps-sheet-footer>
					<button capsButton type="submit">{{ _t()['save'] }}</button>
					<button capsSheetClose capsButton variant="outline">{{ _t()['close'] }}</button>
				</caps-sheet-footer>
			</ng-template>
		</caps-sheet>
	`,
})
export class SheetRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				open: 'Open',
				editProfile: 'Edit profile',
				description: "Make changes to your profile here. Click save when you're done.",
				name: 'Name',
				username: 'Username',
				save: 'Save changes',
				close: 'Close',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				open: 'فتح',
				editProfile: 'تعديل الملف الشخصي',
				description: 'قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.',
				name: 'الاسم',
				username: 'اسم المستخدم',
				save: 'حفظ التغييرات',
				close: 'إغلاق',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				open: 'פתח',
				editProfile: 'עריכת פרופיל',
				description: 'בצע שינויים בפרופיל שלך כאן. לחץ שמור כשתסיים.',
				name: 'שם',
				username: 'שם משתמש',
				save: 'שמור שינויים',
				close: 'סגור',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
	protected readonly _font = computed(() =>
		this._language() === 'ar' ? 'font-ar' : this._language() === 'he' ? 'font-he' : '',
	);
}
