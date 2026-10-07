import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSliderImports } from '@capsule-ng/caps/slider';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-slider-rtl-preview',
	imports: [CapsFieldImports, CapsSliderImports],
	providers: [Directionality],
	host: {
		class: 'grid w-full max-w-sm gap-3',
		'[dir]': '_dir()',
	},
	template: `
		<caps-field>
			<caps-field-label>{{ _t()['volume'] }}</caps-field-label>
			<caps-slider [(value)]="_value" />
		</caps-field>
	`,
})
export class SliderRtlPreview {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;
	protected readonly _value = signal([60]);

	private readonly _translations: Translations = {
		en: { dir: 'ltr', values: { volume: 'Volume' } },
		ar: { dir: 'rtl', values: { volume: 'مستوى الصوت' } },
		he: { dir: 'rtl', values: { volume: 'עוצמת קול' } },
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
