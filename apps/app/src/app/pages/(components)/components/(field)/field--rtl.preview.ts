import { Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-field-rtl',
	imports: [
		HlmCheckboxImports,
		CapsTextareaImports,
		CapsButtonImports,
		CapsInputImports,
		CapsFieldImports,
		HlmSelectImports,
	],
	host: {
		class: 'w-full max-w-md',
		'[attr.dir]': '_dir()',
	},
	template: `
		<form>
			<caps-field-group>
				<caps-field-set>
					<caps-field-legend>{{ _t()['paymentMethod'] }}</caps-field-legend>
					<caps-field-description>{{ _t()['secureTransactions'] }}</caps-field-description>

					<caps-field-group>
						<caps-field>
							<caps-field-label for="field-rtl-name-on-card">{{ _t()['nameOnCard'] }}</caps-field-label>
							<input capsInput placeholder="John Doe" id="field-rtl-name-on-card" />
						</caps-field>
						<caps-field class="col-span-2">
							<caps-field-label for="field-rtl-card-number">{{ _t()['cardNumber'] }}</caps-field-label>
							<input capsInput placeholder="1234 1234 1234 1234" id="field-rtl-card-number" />
							<caps-field-description>{{ _t()['cardNumberDescription'] }}</caps-field-description>
						</caps-field>
						<div class="grid grid-cols-3 gap-4">
							<caps-field>
								<caps-field-label for="field-rtl-exp-month--trigger">{{ _t()['month'] }}</caps-field-label>
								<hlm-select id="field-rtl-exp-month" class="inline-block" [itemToString]="_monthToString">
									<hlm-select-trigger buttonId="field-rtl-exp-month--trigger" class="w-full">
										<hlm-select-value />
									</hlm-select-trigger>
									<hlm-select-content *hlmSelectPortal>
										<hlm-select-group>
											@for (month of _months(); track month.value) {
												<hlm-select-item [value]="month.value">{{ month.label }}</hlm-select-item>
											}
										</hlm-select-group>
									</hlm-select-content>
								</hlm-select>
							</caps-field>
							<caps-field>
								<caps-field-label for="field-rtl-exp-year--trigger">{{ _t()['year'] }}</caps-field-label>
								<hlm-select id="field-rtl-exp-year" class="inline-block">
									<hlm-select-trigger buttonId="field-rtl-exp-year--trigger" class="w-full">
										<hlm-select-value />
									</hlm-select-trigger>
									<hlm-select-content *hlmSelectPortal>
										<hlm-select-group>
											@for (year of years; track year.value) {
												<hlm-select-item [value]="year.value">{{ year.label }}</hlm-select-item>
											}
										</hlm-select-group>
									</hlm-select-content>
								</hlm-select>
							</caps-field>
							<caps-field>
								<caps-field-label for="field-rtl-cvv">{{ _t()['cvv'] }}</caps-field-label>
								<input capsInput placeholder="123" id="field-rtl-cvv" />
							</caps-field>
						</div>
					</caps-field-group>
				</caps-field-set>
				<caps-field-separator />
				<caps-field-set>
					<caps-field-legend>{{ _t()['billingAddress'] }}</caps-field-legend>
					<caps-field-description>{{ _t()['billingAddressDescription'] }}</caps-field-description>
					<caps-field-group>
						<caps-field orientation="horizontal">
							<hlm-checkbox inputId="field-rtl-billing-address" [checked]="true" />
							<caps-field-label for="field-rtl-billing-address">{{ _t()['sameAsShipping'] }}</caps-field-label>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label for="field-rtl-comments">{{ _t()['comments'] }}</caps-field-label>
							<textarea
								capsTextarea
								class="resize-none"
								id="field-rtl-comments"
								[placeholder]="_t()['commentsPlaceholder']"
							></textarea>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field orientation="horizontal">
					<button capsButton>{{ _t()['submit'] }}</button>
					<button capsButton variant="outline">{{ _t()['cancel'] }}</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
export class FieldRtl {
	protected readonly _months = computed(() => {
		const t = this._t();
		return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m) => ({
			label: t[`month${m}` as keyof typeof t],
			value: m,
		}));
	});

	protected readonly _monthToString = (value: string) => this._months().find((m) => m.value === value)?.label ?? value;

	public readonly years = [
		{ label: 'YYYY', value: null },
		{ label: '2024', value: '2024' },
		{ label: '2025', value: '2025' },
		{ label: '2026', value: '2026' },
		{ label: '2027', value: '2027' },
		{ label: '2028', value: '2028' },
		{ label: '2029', value: '2029' },
	];

	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				paymentMethod: 'Payment Method',
				secureTransactions: 'All transactions are secure and encrypted',
				nameOnCard: 'Name on Card',
				cardNumber: 'Card Number',
				cardNumberDescription: 'Enter your 16-digit card number',
				month: 'Month',
				year: 'Year',
				cvv: 'CVV',
				monthPlaceholder: 'MM',
				month01: '01',
				month02: '02',
				month03: '03',
				month04: '04',
				month05: '05',
				month06: '06',
				month07: '07',
				month08: '08',
				month09: '09',
				month10: '10',
				month11: '11',
				month12: '12',
				billingAddress: 'Billing Address',
				billingAddressDescription: 'The billing address associated with your payment method',
				sameAsShipping: 'Same as shipping address',
				comments: 'Comments',
				commentsPlaceholder: 'Add any additional comments',
				submit: 'Submit',
				cancel: 'Cancel',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				paymentMethod: 'طريقة الدفع',
				secureTransactions: 'جميع المعاملات آمنة ومشفرة',
				nameOnCard: 'الاسم على البطاقة',
				cardNumber: 'رقم البطاقة',
				cardNumberDescription: 'أدخل رقم البطاقة المكون من 16 رقمًا',
				month: 'الشهر',
				year: 'السنة',
				cvv: 'CVV',
				monthPlaceholder: 'ش.ش',
				month01: '٠١',
				month02: '٠٢',
				month03: '٠٣',
				month04: '٠٤',
				month05: '٠٥',
				month06: '٠٦',
				month07: '٠٧',
				month08: '٠٨',
				month09: '٠٩',
				month10: '١٠',
				month11: '١١',
				month12: '١٢',
				billingAddress: 'عنوان الفوترة',
				billingAddressDescription: 'عنوان الفوترة المرتبط بطريقة الدفع الخاصة بك',
				sameAsShipping: 'نفس عنوان الشحن',
				comments: 'تعليقات',
				commentsPlaceholder: 'أضف أي تعليقات إضافية',
				submit: 'إرسال',
				cancel: 'إلغاء',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				paymentMethod: 'אמצעי תשלום',
				secureTransactions: 'כל העסקאות מאובטחות ומוצפנות',
				nameOnCard: 'שם על הכרטיס',
				cardNumber: 'מספר כרטיס',
				cardNumberDescription: 'הזן את מספר הכרטיס בן 16 הספרות שלך',
				month: 'חודש',
				year: 'שנה',
				cvv: 'CVV',
				monthPlaceholder: 'MM',
				month01: '01',
				month02: '02',
				month03: '03',
				month04: '04',
				month05: '05',
				month06: '06',
				month07: '07',
				month08: '08',
				month09: '09',
				month10: '10',
				month11: '11',
				month12: '12',
				billingAddress: 'כתובת חיוב',
				billingAddressDescription: 'כתובת החיוב המשויכת לאמצעי התשלום שלך',
				sameAsShipping: 'זהה לכתובת המשלוח',
				comments: 'הערות',
				commentsPlaceholder: 'הוסף הערות נוספות',
				submit: 'שלח',
				cancel: 'בטל',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
