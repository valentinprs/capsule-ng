import { Directionality } from '@angular/cdk/bidi';
import { Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-tooltip-rtl-preview',
	imports: [CapsButtonImports, CapsTooltipImports],
	providers: [Directionality],
	host: {
		class: 'flex w-full flex-wrap items-center justify-center gap-3',
		'[dir]': '_dir()',
	},
	template: `
		<button [capsTooltip]="_t()['save']" placement="top" capsButton variant="outline">{{ _t()['top'] }}</button>
		<button [capsTooltip]="_t()['save']" placement="bottom" capsButton variant="outline">{{ _t()['bottom'] }}</button>
		<button [capsTooltip]="_t()['save']" placement="left" capsButton variant="outline">{{ _t()['left'] }}</button>
		<button [capsTooltip]="_t()['save']" placement="right" capsButton variant="outline">{{ _t()['right'] }}</button>
	`,
})
export class TooltipRtlPreview {
	private readonly _directionality = inject(Directionality);
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: { save: 'Save your changes', top: 'Top', bottom: 'Bottom', left: 'Left', right: 'Right' },
		},
		ar: {
			dir: 'rtl',
			values: { save: 'احفظ تغييراتك', top: 'أعلى', bottom: 'أسفل', left: 'يسار', right: 'يمين' },
		},
		he: {
			dir: 'rtl',
			values: { save: 'שמור את השינויים שלך', top: 'למעלה', bottom: 'למטה', left: 'שמאל', right: 'ימין' },
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
