import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideChevronRight } from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-item-rtl-preview',
	imports: [CapsItemImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideBadgeCheck, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-md flex-col gap-6',
		'[dir]': '_dir()',
	},
	template: `
		<caps-item>
			<caps-item-content>
				<caps-item-title>{{ _t()['basicItem'] }}</caps-item-title>
				<caps-item-description>{{ _t()['basicItemDesc'] }}</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<button capsButton variant="outline" size="sm">{{ _t()['action'] }}</button>
			</caps-item-actions>
		</caps-item>
		<a capsItem href="#">
			<caps-item-media>
				<ng-icon name="lucideBadgeCheck" class="text-[length:--spacing(5)]" />
			</caps-item-media>
			<caps-item-content>
				<caps-item-title>{{ _t()['verifiedTitle'] }}</caps-item-title>
			</caps-item-content>
			<caps-item-actions>
				<ng-icon name="lucideChevronRight" class="text-[length:--spacing(4)]" />
			</caps-item-actions>
		</a>
	`,
})
export class ItemRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				basicItem: 'Basic Item',
				basicItemDesc: 'A simple item with title and description.',
				action: 'Action',
				verifiedTitle: 'Your profile has been verified.',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				basicItem: 'عنصر أساسي',
				basicItemDesc: 'عنصر بسيط يحتوي على عنوان ووصف.',
				action: 'إجراء',
				verifiedTitle: 'تم التحقق من ملفك الشخصي.',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				basicItem: 'פריט בסיסי',
				basicItemDesc: 'פריט פשוט עם כותרת ותיאור.',
				action: 'פעולה',
				verifiedTitle: 'הפרופיל שלך אומת.',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
