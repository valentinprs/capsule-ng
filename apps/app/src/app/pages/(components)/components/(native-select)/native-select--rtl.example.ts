import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';
@Component({
	selector: 'spartan-native-select-rtl',
	imports: [CapsNativeSelectImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<select capsNativeSelect aria-label="Status" [attr.dir]="_dir()">
			<option value="">{{ _t()['placeholder'] }}</option>
			<option value="todo">{{ _t()['todo'] }}</option>
			<option value="in-progress">{{ _t()['inProgress'] }}</option>
			<option value="done">{{ _t()['done'] }}</option>
			<option value="cancelled">{{ _t()['cancelled'] }}</option>
		</select>
	`,
})
export class NativeSelectRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				placeholder: 'Select status',
				todo: 'Todo',
				inProgress: 'In Progress',
				done: 'Done',
				cancelled: 'Cancelled',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				placeholder: 'اختر الحالة',
				todo: 'مهام',
				inProgress: 'قيد التنفيذ',
				done: 'منجز',
				cancelled: 'ملغي',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				placeholder: 'בחר סטטוס',
				todo: 'לעשות',
				inProgress: 'בתהליך',
				done: 'הושלם',
				cancelled: 'בוטל',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
