import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-spinner-rtl',
	imports: [CapsSpinnerImports, CapsItemImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
			<caps-item [dir]="_dir()">
				<caps-item-media>
					<caps-spinner aria-hidden="true" />
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>{{ _t()['title'] }}</caps-item-title>
				</caps-item-content>
				<caps-item-content class="flex-none justify-end">
					<span class="text-sm tabular-nums">{{ _t()['amount'] }}</span>
				</caps-item-content>
			</caps-item>
		</div>
	`,
})
export class SpartanSpinnerRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				title: 'Processing payment...',
				amount: '$100.00',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				title: 'جاري معالجة الدفع...',
				amount: '١٠٠.٠٠ دولار',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				title: 'מעבד תשלום...',
				amount: '$100.00',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
