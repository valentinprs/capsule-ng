import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { CapsCarousel } from './caps-carousel';
/** Announces scroll positions; this may differ from item count when slidesToScroll groups items. */
@Component({
	selector: 'caps-carousel-slide-display',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'carousel-slide-display',
		'[attr.aria-live]': '_carousel.autoplayPlaying() ? "off" : "polite"',
		'aria-atomic': 'true',
	},
	template: `
		@if (_carousel.slideCount()) {
			<span class="sr-only">{{ _labelContent() }}</span>
			<span aria-hidden="true" [class]="_slideClass()">{{ _currentSlide() }} / {{ _carousel.slideCount() }}</span>
		}
	`,
})
export class CapsCarouselSlideDisplay {
	protected readonly _carousel = inject(CapsCarousel);
	protected readonly _currentSlide = computed(() =>
		this._carousel.slideCount() ? this._carousel.currentSlide() + 1 : 0,
	);
	public readonly slideClass = input<ClassValue>('text-muted-foreground text-sm');
	protected readonly _slideClass = computed(() => hlm(this.slideClass()));
	public readonly label = input<string>('Slide');
	protected readonly _labelContent = computed(
		() => `${this.label()} ${this._currentSlide()} of ${this._carousel.slideCount()} is displayed`,
	);
}
