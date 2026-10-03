import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-radio-group-rtl-preview',
	imports: [FormsModule, CapsRadioGroupImports, CapsLabelImports],
	providers: [Directionality],
	host: {
		class: 'grid w-full max-w-sm gap-3',
		'[dir]': '_dir()',
	},
	template: `
		<label capsLabel id="rtl-radio-label">{{ _t()['label'] }}</label>
		<caps-radio-group aria-labelledby="rtl-radio-label" [(ngModel)]="_value">
			<div class="flex items-center gap-3">
				<caps-radio value="default" id="rtl-r1"></caps-radio>
				<label capsLabel for="rtl-r1">{{ _t()['default'] }}</label>
			</div>
			<div class="flex items-center gap-3">
				<caps-radio value="comfortable" id="rtl-r2"></caps-radio>
				<label capsLabel for="rtl-r2">{{ _t()['comfortable'] }}</label>
			</div>
			<div class="flex items-center gap-3">
				<caps-radio value="compact" id="rtl-r3"></caps-radio>
				<label capsLabel for="rtl-r3">{{ _t()['compact'] }}</label>
			</div>
		</caps-radio-group>
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
