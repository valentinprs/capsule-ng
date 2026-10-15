import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-combobox-rtl',
	imports: [CapsComboboxImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field [attr.dir]="_dir()">
			<caps-field-label>{{ _t()['label'] }}</caps-field-label>
			<caps-combobox-multiple autoHighlight [(value)]="values" [dir]="_dir()" [itemToString]="_itemToString">
				<caps-combobox-chips class="max-w-xs">
					<ng-template capsComboboxValues let-values>
						@for (value of values; track $index) {
							<caps-combobox-chip [value]="value">{{ _t()[value] }}</caps-combobox-chip>
						}
					</ng-template>

					<input capsComboboxChipInput [placeholder]="_t()['placeholder']" aria-label="Search frameworks" />
				</caps-combobox-chips>
				<caps-combobox-content [attr.lang]="_language()" [attr.data-lang]="_language()">
					<caps-combobox-empty>{{ _t()['empty'] }}</caps-combobox-empty>

					@for (category of categories(); track category.value) {
						<caps-combobox-option [value]="category.value">{{ category.label }}</caps-combobox-option>
					}
				</caps-combobox-content>
			</caps-combobox-multiple>
		</caps-field>
	`,
})
export class ComboboxRtlPreview {
	public values = signal(['technology']);

	private readonly _keys = ['technology', 'design', 'business', 'marketing', 'education', 'health'];

	public readonly categories = computed(() => this._keys.map((key) => ({ value: key, label: this._t()[key] })));

	protected readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				label: 'Categories',
				placeholder: 'Add categories',
				empty: 'No categories found.',
				technology: 'Technology',
				design: 'Design',
				business: 'Business',
				marketing: 'Marketing',
				education: 'Education',
				health: 'Health',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				label: 'الفئات',
				placeholder: 'أضف فئات',
				empty: 'لم يتم العثور على فئات.',
				technology: 'التكنولوجيا',
				design: 'التصميم',
				business: 'الأعمال',
				marketing: 'التسويق',
				education: 'التعليم',
				health: 'الصحة',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				label: 'קטגוריות',
				placeholder: 'הוסף קטגוריות',
				empty: 'לא נמצאו קטגוריות.',
				technology: 'טכנולוגיה',
				design: 'עיצוב',
				business: 'עסקים',
				marketing: 'שיווק',
				education: 'חינוך',
				health: 'בריאות',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _itemToString = (key: string) => this._t()[key] ?? key;
	protected readonly _dir = computed(() => this._translation().dir);
}
