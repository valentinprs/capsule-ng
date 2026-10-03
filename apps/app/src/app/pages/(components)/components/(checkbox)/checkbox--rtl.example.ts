import { Component, computed, inject } from '@angular/core';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-checkbox-rtl-preview',
	imports: [CapsFieldImports, CapsCheckboxImports],
	host: {
		class: 'flex flex-col gap-4',
		'[dir]': '_dir()',
	},
	template: `
		@for (item of _items; track item.labelKey) {
			<caps-field orientation="horizontal">
				<caps-checkbox [checked]="item.checked" />
				<caps-field-label>{{ _t()[item.labelKey] }}</caps-field-label>
			</caps-field>
		}
	`,
})
export class CheckboxRtlPreview {
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				terms: 'Accept terms and conditions',
				newsletter: 'Subscribe to the newsletter',
				notifications: 'Enable notifications',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				terms: 'أوافق على الشروط والأحكام',
				newsletter: 'الاشتراك في النشرة الإخبارية',
				notifications: 'تفعيل الإشعارات',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				terms: 'אני מסכים לתנאים ולהגבלות',
				newsletter: 'הירשם לניוזלטר',
				notifications: 'הפעל התראות',
			},
		},
	};

	protected readonly _items = [
		{ labelKey: 'terms' as const, checked: true },
		{ labelKey: 'newsletter' as const, checked: false },
		{ labelKey: 'notifications' as const, checked: false },
	];

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
