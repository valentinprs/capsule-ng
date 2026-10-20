import { Directionality } from '@angular/cdk/bidi';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	ElementRef,
	inject,
	input,
	type InputSignal,
	signal,
	type Signal,
	viewChild,
} from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import type { EmblaEventType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import { EmblaCarouselDirective } from 'embla-carousel-angular';

type Playback = { play: (jump?: boolean) => void; stop: () => void; isPlaying: () => boolean };

/** Named, projected slides with an internal Embla viewport. No autoplay is created by default. */
@Component({
	selector: 'caps-carousel',
	exportAs: 'capsCarousel',
	imports: [EmblaCarouselDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'carousel',
		'[attr.data-orientation]': 'orientation()',
		role: 'region',
		'aria-roledescription': 'carousel',
		'[attr.aria-label]': 'ariaLabel()',
		'(keydown)': 'onKeydown($event)',
		'(focusin)': 'pauseAutoplay()',
		'(mouseenter)': 'pauseAutoplay()',
		'(pointerdown)': 'pauseAutoplay()',
	},
	template: `
		<ng-content select="[capsCarouselAutoplay]" />
		<div
			emblaCarousel
			class="overflow-hidden"
			[attr.dir]="_emblaOptions().direction"
			[plugins]="plugins()"
			[options]="_emblaOptions()"
			[subscribeToEvents]="_events"
			[eventsThrottleTime]="0"
			(emblaChange)="onEmblaEvent()"
		>
			<ng-content select="caps-carousel-content" />
		</div>
		<ng-content />
	`,
})
export class CapsCarousel {
	private readonly _embla = viewChild.required(EmblaCarouselDirective);
	private readonly _dir = inject(Directionality);
	private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly _destroyRef = inject(DestroyRef);
	public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
	public readonly options: InputSignal<Omit<EmblaOptionsType, 'axis'> | undefined> =
		input<Omit<EmblaOptionsType, 'axis'>>();
	public readonly plugins: InputSignal<EmblaPluginType[]> = input<EmblaPluginType[]>([]);
	public readonly ariaLabel = input('Slides', { alias: 'aria-label' });
	private readonly _reducedMotion = signal(false);
	public readonly reducedMotion = this._reducedMotion.asReadonly();
	protected readonly _emblaOptions: Signal<EmblaOptionsType> = computed<EmblaOptionsType>(() => ({
		direction: this._dir.valueSignal(),
		...this.options(),
		axis: this.orientation() === 'horizontal' ? 'x' : 'y',
		...(this.reducedMotion() ? { duration: 0 } : {}),
	}));
	// Custom plugin events are supported by Embla; avoid requiring an autoplay dependency.
	protected readonly _events = [
		'init',
		'select',
		'reInit',
		'slidesInView',
		'settle',
		'autoplay:play',
		'autoplay:stop',
	] as EmblaEventType[];
	private readonly _canScrollPrev = signal(false);
	public readonly canScrollPrev = this._canScrollPrev.asReadonly();
	private readonly _canScrollNext = signal(false);
	public readonly canScrollNext = this._canScrollNext.asReadonly();
	private readonly _currentSlide = signal(0);
	public readonly currentSlide = this._currentSlide.asReadonly();
	private readonly _slideCount = signal(0);
	public readonly slideCount = this._slideCount.asReadonly();
	private readonly _autoplayPlaying = signal(false);
	public readonly autoplayPlaying = this._autoplayPlaying.asReadonly();
	private readonly _initialized = signal(false);
	private readonly _visibleSlides = signal<HTMLElement[]>([]);
	private readonly _slides = signal<HTMLElement[]>([]);
	private _paused = false;
	constructor() {
		classes(() => 'caps-carousel relative block');
		afterNextRender(() => {
			const media = this._element.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)');
			if (!media) return;
			const update = () => {
				this._reducedMotion.set(media.matches);
				if (media.matches) this.pauseAutoplay();
			};
			update();
			media.addEventListener('change', update);
			this._destroyRef.onDestroy(() => media.removeEventListener('change', update));
		});
	}
	/** @internal Registers projected slides also during SSR, without querying browser geometry. */
	public registerSlide(element: HTMLElement) {
		this._slides.update((slides) => [...slides, element]);
		return () => this._slides.update((slides) => slides.filter((slide) => slide !== element));
	}
	/** @internal Item numbering counts items; slideCount counts Embla scroll snaps. */
	public slideLabel(element: HTMLElement) {
		const registered = this._slides();
		const ordered = Array.from(this._element.querySelectorAll<HTMLElement>('caps-carousel-item')).filter((slide) =>
			registered.includes(slide),
		);
		const index = ordered.indexOf(element);
		return `${(index >= 0 ? index : registered.indexOf(element)) + 1} of ${registered.length}`;
	}
	/** @internal Only browser-initialized offscreen items become inert. */
	public slideInert(element: HTMLElement) {
		return (
			this._initialized() &&
			this._visibleSlides().length > 0 &&
			!this._visibleSlides().some((slide) => slide === element || slide.contains(element) || element.contains(slide))
		);
	}
	protected onEmblaEvent() {
		const api = this._embla().emblaApi;
		if (!api) return;
		this._canScrollPrev.set(api.canScrollPrev());
		this._canScrollNext.set(api.canScrollNext());
		this._currentSlide.set(api.selectedScrollSnap());
		this._slideCount.set(api.scrollSnapList().length);
		// Visibility comes from geometry, not from Embla's IntersectionObserver (`slidesInView`): the
		// observer can stay silent (e.g. in a throttled frame) and also reports edge-touching slides.
		// The `slidesInView` and `settle` events still trigger this update while and after scrolling.
		const viewport = api.rootNode().getBoundingClientRect();
		this._visibleSlides.set(
			api.slideNodes().filter((slide) => {
				const bounds = slide.getBoundingClientRect();
				return (
					Math.min(bounds.right, viewport.right) > Math.max(bounds.left, viewport.left) &&
					Math.min(bounds.bottom, viewport.bottom) > Math.max(bounds.top, viewport.top)
				);
			}),
		);
		this._initialized.set(true);
		const autoplay = this.autoplay();
		if (this._paused || this.reducedMotion()) autoplay?.stop();
		this._autoplayPlaying.set(autoplay?.isPlaying() ?? false);
	}
	private autoplay(): Playback | undefined {
		const plugin = this._embla().emblaApi?.plugins()['autoplay'];
		if (
			plugin &&
			typeof plugin['play'] === 'function' &&
			typeof plugin['stop'] === 'function' &&
			typeof plugin['isPlaying'] === 'function'
		)
			return plugin as unknown as Playback;
		return undefined;
	}
	protected onKeydown(event: KeyboardEvent) {
		const target = event.target;
		if (
			event.defaultPrevented ||
			event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			event.shiftKey ||
			!(target instanceof HTMLElement)
		)
			return;
		// Do not take editing keys, nested carousels or arrow-based widgets from their owners.
		if (
			target.closest('caps-carousel') !== this._element ||
			(target.closest('caps-carousel-item') && target.closest('a, button, [tabindex]')) ||
			target.closest(
				'input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=slider], [role=tablist], [role=listbox], [role=menu], [role=tree], [role=grid], [role=combobox], [role=radio], [role=radiogroup], [role=spinbutton], [aria-haspopup]',
			)
		)
			return;
		const vertical = this.orientation() === 'vertical';
		const previous = vertical ? 'ArrowUp' : this._emblaOptions().direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
		const next = vertical ? 'ArrowDown' : this._emblaOptions().direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
		if (event.key === previous) {
			event.preventDefault();
			this.scrollPrev();
		}
		if (event.key === next) {
			event.preventDefault();
			this.scrollNext();
		}
	}
	public scrollPrev() {
		this.pauseAutoplay();
		this._embla().scrollPrev(this.reducedMotion());
		this.onEmblaEvent();
	}
	public scrollNext() {
		this.pauseAutoplay();
		this._embla().scrollNext(this.reducedMotion());
		this.onEmblaEvent();
	}
	/** Stop persists through focus/pointer leave and reinitialization; restart requires playAutoplay. */
	public pauseAutoplay() {
		this._paused = true;
		this.autoplay()?.stop();
		this._autoplayPlaying.set(false);
	}
	public playAutoplay() {
		if (this.reducedMotion()) return;
		this._paused = false;
		const autoplay = this.autoplay();
		autoplay?.play();
		this._autoplayPlaying.set(autoplay?.isPlaying() ?? false);
	}
	public toggleAutoplay() {
		if (this.autoplayPlaying()) this.pauseAutoplay();
		else this.playAutoplay();
	}
}
