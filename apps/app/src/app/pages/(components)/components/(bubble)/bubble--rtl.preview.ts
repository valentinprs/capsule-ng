import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-bubble-rtl-preview',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'theme-blue flex w-full max-w-sm flex-col gap-8',
	},
	template: `
		<div class="flex w-full flex-col gap-8" [dir]="_dir()">
			<caps-bubble variant="muted">
				<caps-bubble-content>{{ _t()['start'] }}</caps-bubble-content>
			</caps-bubble>
			<caps-bubble align="end">
				<caps-bubble-content>{{ _t()['end'] }}</caps-bubble-content>
				<caps-bubble-reactions role="img" [attr.aria-label]="_t()['reactionLabel']">
					<span>👍</span>
				</caps-bubble-reactions>
			</caps-bubble>
		</div>
	`,
})
export class BubbleRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				start: 'This bubble is aligned to the start. This is the default alignment.',
				end: 'This bubble is aligned to the end. Use this for user messages.',
				reactionLabel: 'Reaction: thumbs up',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				start: 'هذه الفقاعة محاذاة إلى البداية. هذا هو المحاذاة الافتراضية.',
				end: 'هذه الفقاعة محاذاة إلى النهاية. استخدم هذا لرسائل المستخدم.',
				reactionLabel: 'تفاعل: إبهام لأعلى',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				start: 'הבועה הזו מיושרת להתחלה. זוהי היישור ברירת המחדל.',
				end: 'הבועה הזו מיושרת לסוף. השתמש בזה להודעות משתמש.',
				reactionLabel: 'תגובה: אגודל למעלה',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
