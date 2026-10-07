import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCarouselImports } from '@capsule-ng/caps/carousel';

@Component({
	selector: 'spartan-carousel-orientation',
	imports: [CapsCarouselImports, CapsCardImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full items-center justify-center p-4' },
	template: `
		<caps-carousel aria-label="Vertical resources" class="w-full max-w-xs" orientation="vertical">
			<caps-carousel-content class="-mt-1 h-[270px]">
				@for (item of items; track item) {
					<caps-carousel-item class="basis-1/2 pt-1">
						<div class="p-1">
							<caps-card>
								<caps-card-content class="flex items-center justify-center p-6">
									<span class="text-3xl font-semibold">{{ item }}</span>
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
export class CarouselOrientation {
	public items = Array.from({ length: 5 }, (_, i) => i + 1);
}
