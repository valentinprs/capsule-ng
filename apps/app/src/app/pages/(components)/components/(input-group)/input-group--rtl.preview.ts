import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-input-group-rtl',
	imports: [
		CapsButtonImports,
		CapsTextareaImports,
		CapsInputImports,
		CapsInputGroupImports,
		NgIcon,
		CapsSpinnerImports,
		CapsFieldImports,
	],
	providers: [provideIcons({ lucideSearch })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group [dir]="_dir()">
			<input capsInput [placeholder]="_t()['placeholder']" [attr.aria-label]="_t()['placeholder']" />
			<caps-input-group-addon>
				<ng-icon name="lucideSearch" />
			</caps-input-group-addon>
			<caps-input-group-addon align="inline-end">{{ _t()['results'] }}</caps-input-group-addon>
		</caps-input-group>

		<caps-input-group [dir]="_dir()">
			<input capsInput [placeholder]="_t()['searching']" [attr.aria-label]="_t()['searching']" />
			<caps-input-group-addon align="inline-end">
				<caps-spinner aria-hidden="true" />
			</caps-input-group-addon>
		</caps-input-group>

		<caps-input-group [dir]="_dir()">
			<input capsInput [placeholder]="_t()['savingChanges']" [attr.aria-label]="_t()['savingChanges']" />
			<caps-input-group-addon align="inline-end">
				<caps-input-group-text>{{ _t()['saving'] }}</caps-input-group-text>
				<caps-spinner aria-hidden="true" />
			</caps-input-group-addon>
		</caps-input-group>

		<caps-field-group [dir]="_dir()">
			<caps-field>
				<caps-field-label for="rtl-textarea">{{ _t()['textareaLabel'] }}</caps-field-label>
				<caps-input-group>
					<textarea capsTextarea id="rtl-textarea" [placeholder]="_t()['textareaPlaceholder']"></textarea>
					<caps-input-group-addon align="block-end">
						<caps-input-group-text>{{ _t()['characterCount'] }}</caps-input-group-text>
						<button capsButton variant="default" size="sm" class="ms-auto" type="button">{{ _t()['post'] }}</button>
					</caps-input-group-addon>
				</caps-input-group>
			</caps-field>
		</caps-field-group>
	`,
})
export class InputGroupRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				placeholder: 'Search...',
				results: '12 results',
				searching: 'Searching...',
				saving: 'Saving...',
				savingChanges: 'Saving changes...',
				textareaLabel: 'Textarea',
				textareaPlaceholder: 'Write a comment...',
				characterCount: '0/280',
				post: 'Post',
				textareaDescription: 'Footer positioned below the textarea.',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				placeholder: 'بحث...',
				results: '١٢ نتيجة',
				searching: 'جاري البحث...',
				saving: 'جاري الحفظ...',
				savingChanges: 'جاري حفظ التغييرات...',
				textareaLabel: 'منطقة النص',
				textareaPlaceholder: 'اكتب تعليقًا...',
				characterCount: '٠/٢٨٠',
				post: 'نشر',
				textareaDescription: 'تذييل موضع أسفل منطقة النص.',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				placeholder: 'חפש...',
				results: '12 תוצאות',
				searching: 'מחפש...',
				saving: 'שומר...',
				savingChanges: 'שומר שינויים...',
				textareaLabel: 'אזור טקסט',
				textareaPlaceholder: 'כתוב תגובה...',
				characterCount: '0/280',
				post: 'פרסם',
				textareaDescription: 'כותרת תחתונה ממוקמת מתחת לאזור הטקסט.',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
