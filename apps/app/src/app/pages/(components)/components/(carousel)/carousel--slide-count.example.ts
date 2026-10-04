import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';

@Component({
	selector: 'spartan-carousel-slide-count',
	imports: [HlmCarouselImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full items-center justify-center p-4' },
	template: `
		<hlm-carousel class="w-full max-w-48 sm:max-w-xs">
			<hlm-carousel-content>
				@for (item of items; track item) {
					<hlm-carousel-item>
						<div class="p-1">
							<caps-card>
								<caps-card-content class="flex aspect-square items-center justify-center p-6">
									<span class="text-4xl font-semibold">{{ item }}</span>
								</caps-card-content>
							</caps-card>
						</div>
					</hlm-carousel-item>
				}
			</hlm-carousel-content>
			<button hlm-carousel-previous></button>
			<button hlm-carousel-next></button>
			<hlm-carousel-slide-display class="mt-1 flex justify-end" />
		</hlm-carousel>
	`,
})
export class CarouselSlideCount {
	public items = Array.from({ length: 5 }, (_, i) => i + 1);
}
