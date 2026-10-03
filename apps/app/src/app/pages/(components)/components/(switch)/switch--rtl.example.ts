import { Component, computed, inject } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-switch-rtl-preview',
	imports: [CapsFieldImports, CapsSwitch],
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<caps-field orientation="horizontal" class="max-w-sm">
			<caps-field-content>
				<caps-field-label>{{ _t()['label'] }}</caps-field-label>
				<caps-field-description>{{ _t()['description'] }}</caps-field-description>
			</caps-field-content>
			<caps-switch />
		</caps-field>
	`,
})
export class SwitchRtlPreview {
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				label: 'Share across devices',
				description: 'Focus is shared across devices, and turns off when you leave the app.',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				label: 'المشاركة عبر الأجهزة',
				description: 'يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				label: 'שיתוף בין מכשירים',
				description: 'המיקוד משותף בין מכשירים, וכבה כשאתה עוזב את האפליקציה.',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
