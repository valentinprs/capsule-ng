import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDrawerImports } from '@capsule-ng/caps/drawer';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-drawer-rtl',
	imports: [CapsDrawerImports, CapsFieldImports, CapsButtonImports, CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-drawer [dir]="_dir()">
			<button capsDrawerTrigger capsButton variant="outline">{{ _t()['open'] }}</button>
			<ng-template capsDrawerContent [class]="_font()">
				<caps-drawer-header>
					<caps-drawer-title>{{ _t()['editProfile'] }}</caps-drawer-title>
					<caps-drawer-description>{{ _t()['description'] }}</caps-drawer-description>
				</caps-drawer-header>
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
				<caps-drawer-footer>
					<button capsButton type="submit">{{ _t()['save'] }}</button>
					<button capsDrawerClose capsButton variant="outline">{{ _t()['close'] }}</button>
				</caps-drawer-footer>
			</ng-template>
		</caps-drawer>
	`,
})
export class DrawerRtl {
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
