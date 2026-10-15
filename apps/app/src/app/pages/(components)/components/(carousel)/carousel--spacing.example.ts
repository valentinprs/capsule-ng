import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCarouselImports } from '@capsule-ng/caps/carousel';

@Component({
	selector: 'spartan-carousel-spacing',
	imports: [CapsCarouselImports, CapsCardImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full items-center justify-center p-4' },
	template: `
		<caps-carousel aria-label="Closely spaced resources" class="w-full max-w-48 sm:max-w-xs md:max-w-sm">
			<caps-carousel-content class="-ms-1">
				@for (item of items; track item) {
					<caps-carousel-item class="basis-1/2 ps-1 lg:basis-1/3">
						<div class="p-1">
							<caps-card>
								<caps-card-content class="flex aspect-square items-center justify-center p-6">
									<span class="text-2xl font-semibold">{{ item }}</span>
								</caps-card-content>
							</caps-card>
						</div>
					</caps-carousel-item>
				}
			</caps-carousel-content>
			<div class="mt-3 flex justify-center gap-2">
				<button capsButton capsCarouselPrevious variant="outline">Previous</button>
				<button capsButton capsCarouselNext variant="outline">Next</button>
			</div>
		</caps-carousel>
	`,
})
export class CarouselSpacing {
	public items = Array.from({ length: 5 }, (_, i) => i + 1);
}
