import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsMessageImports } from '@capsule-ng/caps/message';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-message-rtl-preview',
	imports: [CapsMessageImports, CapsBubbleImports, CapsAvatarImports, CapsMarkerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'theme-blue flex w-full max-w-sm flex-col gap-6',
	},
	template: `
		<div class="flex w-full flex-col gap-6" [dir]="_dir()">
			<caps-message align="end">
				<caps-message-avatar>
					<caps-avatar>
						<img capsAvatarImage src="/assets/avatar.png" alt="@me" class="grayscale" />
						<caps-avatar-fallback>ME</caps-avatar-fallback>
					</caps-avatar>
				</caps-message-avatar>
				<caps-message-content>
					<caps-bubble>
						<caps-bubble-content>{{ _t()['user'] }}</caps-bubble-content>
					</caps-bubble>
					<caps-message-footer>{{ _t()['delivered'] }}</caps-message-footer>
				</caps-message-content>
			</caps-message>

			<caps-message>
				<caps-message-avatar>
					<caps-avatar>
						<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
						<caps-avatar-fallback>SP</caps-avatar-fallback>
					</caps-avatar>
				</caps-message-avatar>
				<caps-message-content>
					<caps-bubble variant="muted">
						<caps-bubble-content>{{ _t()['assistant'] }}</caps-bubble-content>
					</caps-bubble>
				</caps-message-content>
			</caps-message>

			<caps-marker role="status">
				<caps-marker-content class="shimmer">{{ _t()['typing'] }}</caps-marker-content>
			</caps-marker>
		</div>
	`,
})
export class MessageRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				user: "It's a one-line change.",
				delivered: 'Delivered',
				assistant: 'Alright, let me take a look.',
				typing: 'Spartan is typing...',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				user: 'إنه تغيير بسطر واحد.',
				delivered: 'تم التسليم',
				assistant: 'حسنًا، دعني ألقي نظرة.',
				typing: 'سبارتان يكتب...',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				user: 'זה שינוי של שורה אחת.',
				delivered: 'נמסר',
				assistant: 'בסדר, תן לי להסתכל.',
				typing: 'ספרטאן מקליד...',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
