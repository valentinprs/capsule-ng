import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-dialog-rtl',
	imports: [CapsDialogImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog [dir]="_dir()">
			<button capsDialogTrigger capsButton variant="outline">{{ _t()['openDialog'] }}</button>
			<ng-template capsDialogContent let-ctx class="sm:max-w-sm">
				<caps-dialog-header>
					<caps-dialog-title>{{ _t()['editProfile'] }}</caps-dialog-title>
					<caps-dialog-description>{{ _t()['description'] }}</caps-dialog-description>
				</caps-dialog-header>
				<caps-field-group>
					<caps-field>
						<caps-field-label for="name">{{ _t()['name'] }}</caps-field-label>
						<input capsInput id="name" value="Pedro Duarte" />
					</caps-field>
					<caps-field>
						<caps-field-label for="username">{{ _t()['username'] }}</caps-field-label>
						<input capsInput id="username" value="@peduarte" />
					</caps-field>
				</caps-field-group>
				<caps-dialog-footer>
					<button capsButton variant="outline" capsDialogClose>{{ _t()['cancel'] }}</button>
					<button capsButton type="submit">{{ _t()['saveChanges'] }}</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogRtl {
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				openDialog: 'Open Dialog',
				editProfile: 'Edit profile',
				description: "Make changes to your profile here. Click save when you're done.",
				name: 'Name',
				username: 'Username',
				cancel: 'Cancel',
				saveChanges: 'Save changes',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				openDialog: 'فتح الحوار',
				editProfile: 'تعديل الملف الشخصي',
				description: 'قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.',
				name: 'الاسم',
				username: 'اسم المستخدم',
				cancel: 'إلغاء',
				saveChanges: 'حفظ التغييرات',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				openDialog: 'פתח דיאלוג',
				editProfile: 'ערוך פרופיל',
				description: 'בצע שינויים בפרופיל שלך כאן. לחץ על שמור כשתסיים.',
				name: 'שם',
				username: 'שם משתמש',
				cancel: 'בטל',
				saveChanges: 'שמור שינויים',
			},
		},
	};
	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
