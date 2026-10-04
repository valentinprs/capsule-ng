import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideBookmark } from '@ng-icons/lucide';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-badge-rtl',
	imports: [CapsBadgeImports, NgIcon],
	providers: [provideIcons({ lucideBadgeCheck, lucideBookmark })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2" [dir]="_dir()">
			<caps-badge>{{ _t()['badge'] }}</caps-badge>
			<caps-badge variant="gray">{{ _t()['secondary'] }}</caps-badge>
			<caps-badge variant="red">{{ _t()['destructive'] }}</caps-badge>
			<caps-badge variant="outline">{{ _t()['outline'] }}</caps-badge>
			<caps-badge variant="gray">
				<ng-icon name="lucideBadgeCheck" />
				{{ _t()['verified'] }}
			</caps-badge>
			<caps-badge variant="outline">
				{{ _t()['bookmark'] }}
				<ng-icon name="lucideBookmark" />
			</caps-badge>
		</div>
	`,
})
export class BadgeRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				badge: 'Badge',
				secondary: 'Secondary',
				destructive: 'Destructive',
				outline: 'Outline',
				verified: 'Verified',
				bookmark: 'Bookmark',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				badge: 'شارة',
				secondary: 'ثانوي',
				destructive: 'مدمر',
				outline: 'مخطط',
				verified: 'متحقق',
				bookmark: 'إشارة مرجعية',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				badge: 'תג',
				secondary: 'משני',
				destructive: 'הרסני',
				outline: 'קווי מתאר',
				verified: 'מאומת',
				bookmark: 'סימנייה',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
