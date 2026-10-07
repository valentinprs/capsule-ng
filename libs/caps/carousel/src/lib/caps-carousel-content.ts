import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsCarousel } from './caps-carousel';
@Component({
	selector: 'caps-carousel-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'carousel-content' },
	template: `
		<ng-content />
	`,
})
export class CapsCarouselContent {
	private readonly _carousel = inject(CapsCarousel);
	constructor() {
		classes(() => [
			'caps-carousel-content flex',
			this._carousel.orientation() === 'horizontal' ? '-ms-4' : '-mt-4 flex-col',
		]);
	}
}
