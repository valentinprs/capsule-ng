import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsPaginationImports } from '@capsule-ng/caps/pagination';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

function toArabicNumerals(num: number): string {
	const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
	return num
		.toString()
		.split('')
		.map((digit) => arabicNumerals[parseInt(digit, 10)])
		.join('');
}

@Component({
	selector: 'spartan-pagination-rtl',
	imports: [CapsPaginationImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-pagination [dir]="_dir()">
			<button type="button" capsPaginationPrevious>
				<span>{{ _t()['previous'] }}</span>
			</button>
			<a capsPaginationLink href="#">{{ formatNumber()(1) }}</a>
			<a capsPaginationLink href="#" isActive>{{ formatNumber()(2) }}</a>
			<a capsPaginationLink href="#">{{ formatNumber()(3) }}</a>
			<caps-pagination-ellipsis />
			<button type="button" capsPaginationNext>
				<span>{{ _t()['next'] }}</span>
			</button>
		</caps-pagination>
	`,
})
export class PaginationRtl {
	private readonly _language = inject(TranslateService).language;

	public readonly formatNumber = computed(() => {
		const lang = this._language();
		return (num: number): string => (lang === 'ar' ? toArabicNumerals(num) : num.toString());
	});

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				previous: 'Previous',
				next: 'Next',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				previous: 'السابق',
				next: 'التالي',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				previous: 'הקודם',
				next: 'הבא',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
