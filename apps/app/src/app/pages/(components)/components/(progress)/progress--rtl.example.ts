import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsProgressImports } from '@capsule-ng/caps/progress';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-progress-rtl-preview',
	imports: [CapsProgressImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'grid w-full max-w-sm gap-3',
		'[dir]': '_dir()',
	},
	template: `
		<p id="rtl-download-label" class="text-sm font-medium">{{ _t()['downloading'] }}</p>
		<caps-progress id="rtl-progress" [value]="60" aria-labelledby="rtl-download-label" />
	`,
})
export class ProgressRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: { dir: 'ltr', values: { downloading: 'Downloading…' } },
		ar: { dir: 'rtl', values: { downloading: '…جارٍ التنزيل' } },
		he: { dir: 'rtl', values: { downloading: '…מוריד' } },
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
