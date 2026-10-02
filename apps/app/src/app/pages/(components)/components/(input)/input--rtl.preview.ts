import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-input-rtl',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field [dir]="_dir()">
			<caps-field-label for="input-rtl-api-key">{{ _t()['apiKey'] }}</caps-field-label>
			<input capsInput id="input-rtl-api-key" type="password" [placeholder]="_t()['placeholder']" />
			<caps-field-description>{{ _t()['description'] }}</caps-field-description>
		</caps-field>
	`,
})
export class InputRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				apiKey: 'API Key',
				placeholder: 'sk-...',
				description: 'Your API key is encrypted and stored securely.',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				apiKey: 'مفتاح API',
				placeholder: 'sk-...',
				description: 'مفتاح API الخاص بك مشفر ومخزن بأمان.',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				apiKey: 'מפתח API',
				placeholder: 'sk-...',
				description: 'מפתח ה-API שלך מוצפן ונשמר בצורה מאובטחת.',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
