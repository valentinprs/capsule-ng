import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGitBranch, lucideSearch } from '@ng-icons/lucide';
import { HlmMarkerImports } from '@spartan-ng/helm/marker';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-marker-rtl-preview',
	imports: [HlmMarkerImports, CapsSpinner, NgIcon],
	providers: [provideIcons({ lucideGitBranch, lucideSearch })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'theme-blue flex w-full max-w-sm flex-col gap-8',
	},
	template: `
		<div class="flex w-full flex-col gap-8" [dir]="_dir()">
			<div hlmMarker>
				<span hlmMarkerIcon>
					<ng-icon name="lucideGitBranch" />
				</span>
				<span hlmMarkerContent>{{ _t()['branch'] }}</span>
			</div>
			<div hlmMarker role="status">
				<span hlmMarkerIcon>
					<caps-spinner aria-hidden="true" />
				</span>
				<span hlmMarkerContent class="shimmer">{{ _t()['thinking'] }}</span>
			</div>
			<div hlmMarker variant="separator">
				<span hlmMarkerContent>{{ _t()['separator'] }}</span>
			</div>
			<div hlmMarker>
				<span hlmMarkerIcon>
					<ng-icon name="lucideSearch" />
				</span>
				<span hlmMarkerContent>{{ _t()['explored'] }}</span>
			</div>
		</div>
	`,
})
export class MarkerRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				branch: 'Switched to a new branch',
				thinking: 'Thinking...',
				separator: 'Conversation compacted',
				explored: 'Explored 4 files',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				branch: 'تم التبديل إلى فرع جديد',
				thinking: 'جارٍ التفكير...',
				separator: 'تم ضغط المحادثة',
				explored: 'تم استكشاف 4 ملفات',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				branch: 'עבר לענף חדש',
				thinking: 'חושב...',
				separator: 'השיחה נדחסה',
				explored: 'נחקרו 4 קבצים',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
