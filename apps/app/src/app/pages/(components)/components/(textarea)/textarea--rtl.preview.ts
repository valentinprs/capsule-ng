import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-textarea-rtl',
	imports: [CapsTextareaImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field [dir]="_dir()">
			<caps-field-label for="textarea-message-rtl">{{ _t()['label'] }}</caps-field-label>
			<textarea capsTextarea id="textarea-message-rtl" [placeholder]="_t()['placeholder']"></textarea>
			<caps-field-description>{{ _t()['description'] }}</caps-field-description>
		</caps-field>
	`,
})
export class TextareaRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				label: 'Feedback',
				placeholder: 'Your feedback helps us improve...',
				description: 'Share your thoughts about our service.',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				label: 'التعليقات',
				placeholder: 'تعليقاتك تساعدنا على التحسين...',
				description: 'شاركنا أفكارك حول خدمتنا.',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				label: 'משוב',
				placeholder: 'המשוב שלך עוזר לנו להשתפר...',
				description: 'שתף את מחשבותיך על השירות שלנו.',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
