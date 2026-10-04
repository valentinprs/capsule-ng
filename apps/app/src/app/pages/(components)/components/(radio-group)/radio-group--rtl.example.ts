import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-radio-group-rtl-preview',
	imports: [FormsModule, CapsRadioGroupImports, CapsFieldImports],
	providers: [Directionality],
	host: {
		class: 'grid w-full max-w-sm gap-3',
		'[dir]': '_dir()',
	},
	template: `
		<caps-field>
			<caps-field-label>{{ _t()['label'] }}</caps-field-label>
			<caps-radio-group [(ngModel)]="_value">
				<caps-radio value="default">{{ _t()['default'] }}</caps-radio>
				<caps-radio value="comfortable">{{ _t()['comfortable'] }}</caps-radio>
				<caps-radio value="compact">{{ _t()['compact'] }}</caps-radio>
			</caps-radio-group>
		</caps-field>
	`,
})
export class RadioGroupRtlPreview {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;
	protected _value = 'comfortable';

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: { label: 'Spacing', default: 'Default', comfortable: 'Comfortable', compact: 'Compact' },
		},
		ar: {
			dir: 'rtl',
			values: { label: 'التباعد', default: 'افتراضي', comfortable: 'مريح', compact: 'مضغوط' },
		},
		he: {
			dir: 'rtl',
			values: { label: 'מרווח', default: 'ברירת מחדל', comfortable: 'נוח', compact: 'קומפקטי' },
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
