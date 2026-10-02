import { Component, computed, inject } from '@angular/core';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-label-rtl',
	imports: [CapsLabelImports, HlmCheckboxImports],
	template: `
		<div class="flex gap-2" [dir]="_dir()">
			<hlm-checkbox inputId="terms-rtl" />
			<label capsLabel for="terms-rtl">{{ _t()['label'] }}</label>
		</div>
	`,
})
export class LabelRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				label: 'Accept terms and conditions',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				label: 'قبول الشروط والأحكام',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				label: 'קבל תנאים והגבלות',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
