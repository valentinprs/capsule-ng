import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-tabs-rtl-preview',
	imports: [CapsTabsImports, CapsCardImports, CapsLabelImports, CapsInputImports, CapsButtonImports],
	providers: [Directionality],
	host: {
		class: 'block w-full max-w-lg',
		'[dir]': '_dir()',
	},
	template: `
		<caps-tabs value="account" class="w-full">
			<caps-tabs-list [attr.aria-label]="_t()['tabsLabel']">
				<button capsTabsTrigger value="account">{{ _t()['accountTab'] }}</button>
				<button capsTabsTrigger value="password">{{ _t()['passwordTab'] }}</button>
			</caps-tabs-list>
			<caps-tabs-content value="account">
				<caps-card>
					<caps-card-header>
						<caps-card-title [level]="3">{{ _t()['accountTab'] }}</caps-card-title>
						<caps-card-description>{{ _t()['accountDescription'] }}</caps-card-description>
					</caps-card-header>
					<caps-card-content>
						<label class="my-4 block" capsLabel>
							{{ _t()['nameLabel'] }}
							<input class="mt-1.5 w-full" value="Pedro Duarte" capsInput />
						</label>
						<label class="my-4 block" capsLabel>
							{{ _t()['usernameLabel'] }}
							<input class="mt-1.5 w-full" placeholder="@peduarte" capsInput />
						</label>
					</caps-card-content>
					<caps-card-footer class="gap-2">
						<button capsButton>{{ _t()['saveChanges'] }}</button>
					</caps-card-footer>
				</caps-card>
			</caps-tabs-content>
			<caps-tabs-content value="password">
				<caps-card>
					<caps-card-header>
						<caps-card-title [level]="3">{{ _t()['passwordTab'] }}</caps-card-title>
						<caps-card-description>{{ _t()['passwordDescription'] }}</caps-card-description>
					</caps-card-header>
					<caps-card-content>
						<label class="my-4 block" capsLabel>
							{{ _t()['oldPasswordLabel'] }}
							<input class="mt-1.5 w-full" type="password" capsInput />
						</label>
						<label class="my-4 block" capsLabel>
							{{ _t()['newPasswordLabel'] }}
							<input class="mt-1.5 w-full" type="password" capsInput />
						</label>
					</caps-card-content>
					<caps-card-footer class="gap-2">
						<button capsButton>{{ _t()['savePassword'] }}</button>
					</caps-card-footer>
				</caps-card>
			</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsRtlPreview {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				tabsLabel: 'Account settings',
				accountTab: 'Account',
				passwordTab: 'Password',
				accountDescription: "Make changes to your account here. Click save when you're done.",
				passwordDescription: "Change your password here. After saving, you'll be logged out.",
				nameLabel: 'Name',
				usernameLabel: 'Username',
				oldPasswordLabel: 'Old Password',
				newPasswordLabel: 'New Password',
				saveChanges: 'Save Changes',
				savePassword: 'Save Password',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				tabsLabel: 'إعدادات الحساب',
				accountTab: 'الحساب',
				passwordTab: 'كلمة المرور',
				accountDescription: 'قم بإجراء تغييرات على حسابك هنا. انقر على حفظ عند الانتهاء.',
				passwordDescription: 'غيّر كلمة المرور هنا. بعد الحفظ، سيتم تسجيل خروجك.',
				nameLabel: 'الاسم',
				usernameLabel: 'اسم المستخدم',
				oldPasswordLabel: 'كلمة المرور القديمة',
				newPasswordLabel: 'كلمة المرور الجديدة',
				saveChanges: 'حفظ التغييرات',
				savePassword: 'حفظ كلمة المرور',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				tabsLabel: 'הגדרות חשבון',
				accountTab: 'חשבון',
				passwordTab: 'סיסמה',
				accountDescription: 'בצע שינויים בחשבון שלך כאן. לחץ על שמירה בסיום.',
				passwordDescription: 'שנה את הסיסמה שלך כאן. לאחר השמירה, תנותק מהמערכת.',
				nameLabel: 'שם',
				usernameLabel: 'שם משתמש',
				oldPasswordLabel: 'סיסמה ישנה',
				newPasswordLabel: 'סיסמה חדשה',
				saveChanges: 'שמור שינויים',
				savePassword: 'שמור סיסמה',
			},
		},
	};

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
