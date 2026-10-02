import { Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight, lucidePlus } from '@ng-icons/lucide';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-button-rtl-preview',
	imports: [CapsButtonImports, NgIcon],
	providers: [
		provideIcons({
			lucideArrowRight,
			lucidePlus,
		}),
	],
	host: {
		class: 'flex flex-wrap items-center gap-2 md:flex-row',
		'[dir]': '_dir()',
	},
	template: `
		<button capsButton variant="outline">{{ _t()['button'] }}</button>
		<button capsButton variant="destructive">{{ _t()['delete'] }}</button>
		<button capsButton variant="outline">
			{{ _t()['submit'] }}
			<ng-icon class="rtl:rotate-180" data-icon="inline-end" name="lucideArrowRight" />
		</button>
		<button capsButton variant="outline" size="icon" aria-label="Add">
			<ng-icon name="lucidePlus" />
		</button>
		<button capsButton variant="secondary" disabled>
			<span
				aria-hidden="true"
				data-icon="inline-start"
				class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
			></span>
			{{ _t()['loading'] }}
		</button>
	`,
})
export class ButtonRtlPreview {
	private readonly _language = inject(TranslateService).language;
	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				button: 'Button',
				submit: 'Submit',
				delete: 'Delete',
				loading: 'Loading',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				button: 'زر',
				submit: 'إرسال',
				delete: 'حذف',
				loading: 'جاري التحميل',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				button: 'כפתור',
				submit: 'שלח',
				delete: 'מחק',
				loading: 'טוען',
			},
		},
	};
	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
