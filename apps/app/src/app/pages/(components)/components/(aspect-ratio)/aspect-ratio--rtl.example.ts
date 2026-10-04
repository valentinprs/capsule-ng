import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CapsAspectRatioImports } from '@capsule-ng/caps/aspect-ratio';
import { TranslateService, Translations } from '@spartan-ng/app/app/shared/translate.service';

@Component({
	selector: 'spartan-aspect-ratio-rtl',
	imports: [CapsAspectRatioImports, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex items-center justify-center h-72 w-full',
		'[dir]': '_dir()',
	},
	template: `
		<figure class="w-full max-w-sm">
			<caps-aspect-ratio [ratio]="16 / 9" class="overflow-hidden">
				<img ngSrc="/assets/mountains.jpg" fill alt="Mountain views" class="rounded-lg object-cover" />
			</caps-aspect-ratio>
			<figcaption class="text-muted-foreground mt-2 text-start text-sm">
				{{ _t()['caption'] }}
			</figcaption>
		</figure>
	`,
})
export class AspectRatioRtl {
	private readonly _language = inject(TranslateService).language;

	private readonly _translations: Translations = {
		en: {
			dir: 'ltr',
			values: {
				caption: 'Beautiful landscape',
			},
		},
		ar: {
			dir: 'rtl',
			values: {
				caption: 'منظر طبيعي جميل',
			},
		},
		he: {
			dir: 'rtl',
			values: {
				caption: 'נוף יפה',
			},
		},
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);
}
