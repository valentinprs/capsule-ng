import { Component, computed, inject } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';
@Component({
	selector: 'spartan-select-rtl',
	imports: [CapsSelectImports],
	template: `
		<caps-select
			aria-label="Fruit"
			[attr.dir]="_dir()"
			[itemToString]="itemToString"
			[placeholder]="_t()['selectFruit']"
			class="w-32"
			[dir]="_dir()"
		>
			<caps-select-group label="{{ _t()['fruits'] }}">
				@for (fruit of _fruits(); track fruit.value) {
					<caps-select-option [value]="fruit.value">{{ fruit.label }}</caps-select-option>
				}
			</caps-select-group>
			<caps-select-separator />
			<caps-select-group label="{{ _t()['vegetables'] }}">
				@for (vegetable of _vegetables(); track vegetable.value) {
					<caps-select-option [value]="vegetable.value">{{ vegetable.label }}</caps-select-option>
				}
			</caps-select-group>
		</caps-select>
	`,
})
export class SelectRtlPreview {
	public readonly fruits = ['apple', 'banana', 'blueberry', 'grapes', 'pineapple'];
	public readonly vegetables = ['carrot', 'broccoli', 'spinach'];

	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				selectFruit: 'Select a fruit',
				fruits: 'Fruits',
				apple: 'Apple',
				banana: 'Banana',
				blueberry: 'Blueberry',
				grapes: 'Grapes',
				pineapple: 'Pineapple',
				vegetables: 'Vegetables',
				carrot: 'Carrot',
				broccoli: 'Broccoli',
				spinach: 'Spinach',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				selectFruit: 'اختر فاكهة',
				fruits: 'الفواكه',
				apple: 'تفاح',
				banana: 'موز',
				blueberry: 'توت أزرق',
				grapes: 'عنب',
				pineapple: 'أناناس',
				vegetables: 'الخضروات',
				carrot: 'جزر',
				broccoli: 'بروكلي',
				spinach: 'سبانخ',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				selectFruit: 'בחר פרי',
				fruits: 'פירות',
				apple: 'תפוח',
				banana: 'בננה',
				blueberry: 'אוכמניה',
				grapes: 'ענבים',
				pineapple: 'אננס',
				vegetables: 'ירקות',
				carrot: 'גזר',
				broccoli: 'ברוקולי',
				spinach: 'תרד',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	protected readonly _fruits = computed(() => this.fruits.map((value) => ({ value, label: this._t()[value] })));
	protected readonly _vegetables = computed(() => this.vegetables.map((value) => ({ value, label: this._t()[value] })));
	protected readonly _allItems = computed(() => [...this._fruits(), ...this._vegetables()]);
	public readonly itemToString = (value: string) =>
		this._allItems().find((item) => item.value === value)?.label ?? value;
}
