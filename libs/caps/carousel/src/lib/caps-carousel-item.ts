import { ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsCarousel } from './caps-carousel';
@Component({
	selector: 'caps-carousel-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'carousel-item',
		role: 'group',
		'aria-roledescription': 'slide',
		'[attr.aria-label]': '_label()',
		'[attr.aria-labelledby]': 'ariaLabelledby()',
		'[inert]': '_inert()',
	},
	template: `
		<ng-content />
	`,
})
export class CapsCarouselItem {
	private readonly _carousel = inject(CapsCarousel);
	private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	protected readonly _label = () =>
		this.ariaLabelledby() ? null : (this.ariaLabel() ?? this._carousel.slideLabel(this._element));
	protected readonly _inert = computed(() => this._carousel.slideInert(this._element));
	constructor() {
		inject(DestroyRef).onDestroy(this._carousel.registerSlide(this._element));
		classes(() => [
			'caps-carousel-item min-w-0 shrink-0 grow-0 basis-full',
			this._carousel.orientation() === 'horizontal' ? 'ps-4' : 'pt-4',
		]);
	}
}
