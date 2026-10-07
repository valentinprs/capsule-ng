import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, effect, inject, untracked } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCarouselImports } from '@capsule-ng/caps/carousel';
import { TranslateService, Translations } from '../../../../shared/translate.service';

@Component({
	selector: 'spartan-carousel-rtl-preview',
	imports: [CapsCarouselImports, CapsCardImports, CapsButtonImports],
	providers: [Directionality],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full items-center justify-center p-4',
		'[dir]': '_dir()',
		'[attr.data-lang]': '_language()',
	},
	template: `
		<caps-carousel [aria-label]="_t()['resources']" class="w-full max-w-48 sm:max-w-xs">
			<caps-carousel-content>
				@for (item of items; track item) {
					<caps-carousel-item [aria-label]="_t()['slide'] + ' ' + item">
						<div class="p-1">
							<caps-card>
								<caps-card-content class="flex aspect-square items-center justify-center p-6">
									<span class="text-4xl font-semibold">{{ _t()['slide'] }} {{ item }}</span>
								</caps-card-content>
							</caps-card>
						</div>
					</caps-carousel-item>
				}
			</caps-carousel-content>
			<div class="mt-3 flex justify-center gap-2">
				<button capsButton capsCarouselPrevious variant="outline">{{ _t()['previous'] }}</button>
				<button capsButton capsCarouselNext variant="outline">{{ _t()['next'] }}</button>
			</div>
		</caps-carousel>
	`,
})
export class CarouselRtlPreview {
	private readonly _directionality = inject(Directionality);
	protected readonly _language = inject(TranslateService).language;
	public items = Array.from({ length: 5 }, (_, i) => i + 1);

	private readonly _translations: Translations = {
		en: { dir: 'ltr', values: { slide: 'Slide', resources: 'Resources', previous: 'Previous', next: 'Next' } },
		ar: { dir: 'rtl', values: { slide: 'شريحة', resources: 'الموارد', previous: 'السابق', next: 'التالي' } },
		he: { dir: 'rtl', values: { slide: 'שקופית', resources: 'משאבים', previous: 'הקודם', next: 'הבא' } },
	};

	private readonly _translation = computed(() => this._translations[this._language()]);
	protected readonly _t = computed(() => this._translation().values);
	protected readonly _dir = computed(() => this._translation().dir);

	constructor() {
		effect(() => {
			const dir = this._dir();
			untracked(() => this._directionality.valueSignal.set(dir));
		});
	}
}
