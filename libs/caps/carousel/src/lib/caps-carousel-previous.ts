import { afterRenderEffect, booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsCarousel } from './caps-carousel';
/** Native navigation. Compose CapsButton for styling and project a meaningful name. */
@Directive({
	selector: 'button[capsCarouselPrevious]',
	host: {
		'data-slot': 'carousel-previous',
		type: 'button',
		'[attr.data-disabled]': 'disabled() || !_carousel.canScrollPrev() ? true : null',
		'[disabled]': 'disabled() || !_carousel.canScrollPrev()',
		'(click)': '_carousel.scrollPrev()',
	},
})
export class CapsCarouselPrevious {
	protected readonly _carousel = inject(CapsCarousel);
	public readonly disabled = input(false, { transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-carousel-previous');
		const element = inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
		// CapsButton also composes Brain's disabled attribute. Apply the combined state after
		// host bindings, including when user-disabled changes but the edge state stays true.
		afterRenderEffect({
			write: () => {
				const disabled = this.disabled() || !this._carousel.canScrollPrev();
				element.disabled = disabled;
				if (disabled) element.setAttribute('data-disabled', 'true');
				else element.removeAttribute('data-disabled');
			},
		});
	}
}
