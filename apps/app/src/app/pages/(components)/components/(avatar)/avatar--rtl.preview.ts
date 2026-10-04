import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-avatar-rtl-preview',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[dir]': '_dir()',
	},
	template: `
		<div class="flex flex-row flex-wrap items-center gap-6 md:gap-12">
			<caps-avatar>
				<img
					capsAvatarImage
					src="/assets/avatar.png"
					alt="spartan logo. Resembling a spartanic shield"
					class="grayscale"
				/>
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img
					capsAvatarImage
					src="/assets/avatar.png"
					alt="spartan logo. Resembling a spartanic shield"
					class="grayscale"
				/>
				<caps-avatar-fallback>RG</caps-avatar-fallback>
				<caps-avatar-badge class="bg-red-600 dark:bg-red-800" />
			</caps-avatar>
			<caps-avatar-group class="grayscale">
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" />
					<caps-avatar-fallback>RG</caps-avatar-fallback>
				</caps-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" />
					<caps-avatar-fallback>RG</caps-avatar-fallback>
				</caps-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" />
					<caps-avatar-fallback>RG</caps-avatar-fallback>
				</caps-avatar>
				<caps-avatar-group-count>{{ _t()['moreUsers'] }}</caps-avatar-group-count>
			</caps-avatar-group>
		</div>
	`,
})
export class AvatarRtlPreview {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				moreUsers: '+3',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				moreUsers: '+٣',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				moreUsers: '+3',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
