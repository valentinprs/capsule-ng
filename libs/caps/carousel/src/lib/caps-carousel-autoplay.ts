import { Directive, inject } from '@angular/core';
import { CapsCarousel } from './caps-carousel';
/** Project the pause/restart name. This control is placed before the viewport. */
@Directive({
	selector: 'button[capsCarouselAutoplay]',
	host: {
		'data-slot': 'carousel-autoplay',
		type: 'button',
		'(pointerdown)': 'rememberPlayback()',
		'(pointercancel)': 'cancelPointer()',
		'(click)': 'togglePlayback()',
	},
})
export class CapsCarouselAutoplay {
	private readonly _carousel = inject(CapsCarousel);
	private _playingOnPointerDown: boolean | undefined;
	protected rememberPlayback() {
		this._playingOnPointerDown = this._carousel.autoplayPlaying();
	}
	protected cancelPointer() {
		this._playingOnPointerDown = undefined;
	}
	protected togglePlayback() {
		// Root focus/pointer handlers pause before click. Preserve the action chosen at pointer-down.
		if (this._playingOnPointerDown === true) this._carousel.pauseAutoplay();
		else if (this._playingOnPointerDown === false) this._carousel.playAutoplay();
		else this._carousel.toggleAutoplay();
		this._playingOnPointerDown = undefined;
	}
}
