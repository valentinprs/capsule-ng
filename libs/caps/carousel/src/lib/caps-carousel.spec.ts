import { Dir } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import type { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { CapsCarousel, CapsCarouselImports } from '../index';

// Browser fixture geometry is separate from component styling.
let geometry: HTMLStyleElement;
beforeAll(() => {
	geometry = document.createElement('style');
	geometry.textContent = `
		caps-carousel {
			display: block;
			width: 300px;
		}
		caps-carousel > div {
			overflow: hidden;
		}
		caps-carousel-content {
			display: flex;
		}
		caps-carousel-item {
			flex: 0 0 100%;
			min-width: 0;
			height: 100px;
		}
		[dir='rtl'] caps-carousel-content {
			direction: rtl;
		}
		caps-carousel[data-orientation='vertical'] caps-carousel-content {
			flex-direction: column;
			height: 100px;
		}
	`;
	document.head.append(geometry);
});
afterAll(() => geometry.remove());

@Component({
	imports: [CapsCarouselImports, CapsButtonImports, Dir],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form (submit)="submits = submits + 1; $event.preventDefault()">
			<div [dir]="direction()">
				<caps-carousel aria-label="Resources" [orientation]="orientation()" [options]="options()" [plugins]="plugins">
					<button capsButton capsCarouselAutoplay>Start rotation</button>
					<caps-carousel-content>
						@for (item of items(); track item) {
							<caps-carousel-item>
								<input [attr.aria-label]="'Resource ' + item" />
								<a href="#resources">Read resource</a>
								<button type="button">Resource action</button>
							</caps-carousel-item>
						}
					</caps-carousel-content>
					<button capsButton capsCarouselPrevious [disabled]="disabled()">Previous</button>
					<button capsButton capsCarouselNext [disabled]="disabled()">Next</button>
					<caps-carousel-slide-display />
				</caps-carousel>
			</div>
		</form>
	`,
})
class Host {
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
	public readonly options = signal<Omit<EmblaOptionsType, 'axis'>>({ duration: 0, align: 'start' });
	public readonly disabled = signal(false);
	public readonly items = signal([1, 2, 3]);
	public readonly autoplay = Autoplay({ delay: 1000, playOnInit: false, stopOnInteraction: true });
	public readonly plugins = [this.autoplay];
	public submits = 0;
}
async function setup() {
	const f = TestBed.createComponent(Host);
	f.detectChanges();
	const carousel = f.debugElement.query(By.directive(CapsCarousel)).componentInstance as CapsCarousel;
	await expect.poll(() => carousel.slideCount()).toBe(3);
	f.detectChanges();
	const root: HTMLElement = f.nativeElement;
	const previous = root.querySelector<HTMLButtonElement>('[capsCarouselPrevious]')!;
	const next = root.querySelector<HTMLButtonElement>('[capsCarouselNext]')!;
	return { f, root, carousel, previous, next };
}
it('exposes named projected regions/slides, edge states and native form-safe activation', async () => {
	const { f, root, carousel, previous, next } = await setup();
	expect(root.querySelector('caps-carousel')?.getAttribute('aria-label')).toBe('Resources');
	const items = root.querySelectorAll('caps-carousel-item');
	expect(items[0].getAttribute('role')).toBe('group');
	expect(items[0].getAttribute('aria-label')).toBe('1 of 3');
	expect(items[2].getAttribute('aria-label')).toBe('3 of 3');
	expect(previous.disabled).toBe(true);
	expect(previous.getAttribute('data-disabled')).toBe('true');
	expect(next.disabled).toBe(false);
	expect(next.hasAttribute('data-disabled')).toBe(false);
	await userEvent.click(next);
	f.detectChanges();
	await expect.poll(() => carousel.currentSlide()).toBe(1);
	expect(document.activeElement).toBe(next);
	expect(f.componentInstance.submits).toBe(0);
	await userEvent.keyboard('{Enter}');
	f.detectChanges();
	await expect.poll(() => carousel.currentSlide()).toBe(2);
	expect(next.disabled).toBe(true);
	expect(previous.disabled).toBe(false);
	f.componentInstance.disabled.set(true);
	f.detectChanges();
	f.componentInstance.disabled.set(false);
	f.detectChanges();
	await expect.poll(() => next.disabled).toBe(true);
	expect(next.getAttribute('data-disabled')).toBe('true');
	expect(previous.disabled).toBe(false);
	expect(previous.hasAttribute('data-disabled')).toBe(false);
	await userEvent.click(previous);
	f.detectChanges();
	await expect.poll(() => carousel.currentSlide()).toBe(1);
	f.componentInstance.disabled.set(true);
	f.detectChanges();
	expect(previous.disabled).toBe(true);
	expect(next.disabled).toBe(true);
	expect((await axe.run(root)).violations).toEqual([]);
});
it('keeps offscreen inputs inert, preserves input arrow keys and counts dynamic items', async () => {
	const { f, root, carousel, next } = await setup();
	const items = root.querySelectorAll<HTMLElement>('caps-carousel-item');
	await expect.poll(() => items[2].inert).toBe(true);
	const first = items[0].querySelector('input')!;
	first.focus();
	await userEvent.keyboard('{ArrowRight}');
	expect(carousel.currentSlide()).toBe(0);
	expect(document.activeElement).toBe(first);
	const link = items[0].querySelector('a')!;
	link.focus();
	await userEvent.keyboard('{ArrowRight}');
	expect(carousel.currentSlide()).toBe(0);
	expect(document.activeElement).toBe(link);
	const action = items[0].querySelector('button')!;
	action.focus();
	await userEvent.keyboard('{ArrowRight}');
	expect(carousel.currentSlide()).toBe(0);
	expect(document.activeElement).toBe(action);
	await userEvent.tab();
	expect(document.activeElement).toBe(next);
	f.componentInstance.items.set([3, 2, 1, 4]);
	f.detectChanges();
	await expect.poll(() => carousel.slideCount()).toBe(4);
	f.detectChanges();
	expect(root.querySelector('caps-carousel-item')?.getAttribute('aria-label')).toBe('1 of 4');
});
it('uses horizontal LTR/RTL arrows and allows explicit direction override', async () => {
	const { f, carousel, previous, next } = await setup();
	next.focus();
	await userEvent.keyboard('{ArrowRight}');
	await expect.poll(() => carousel.currentSlide()).toBe(1);
	f.componentInstance.direction.set('rtl');
	f.detectChanges();
	await userEvent.keyboard('{ArrowRight}');
	await expect.poll(() => carousel.currentSlide()).toBe(0);
	previous.focus();
	await userEvent.keyboard('{ArrowLeft}');
	await expect.poll(() => carousel.currentSlide()).toBe(1);
	f.componentInstance.options.set({ duration: 0, align: 'start', direction: 'ltr' });
	f.detectChanges();
	await userEvent.keyboard('{ArrowRight}');
	await expect.poll(() => carousel.currentSlide()).toBe(2);
});
it('uses vertical Up/Down without consuming horizontal keys', async () => {
	const { f, carousel, next } = await setup();
	f.componentInstance.orientation.set('vertical');
	f.detectChanges();
	await new Promise((resolve) => setTimeout(resolve, 50));
	next.focus();
	await userEvent.keyboard('{ArrowRight}');
	expect(carousel.currentSlide()).toBe(0);
	await userEvent.keyboard('{ArrowDown}');
	await expect.poll(() => carousel.currentSlide()).toBe(1);
	await userEvent.keyboard('{ArrowUp}');
	await expect.poll(() => carousel.currentSlide()).toBe(0);
});
it('supports arbitrary autoplay plugins with persistent focus/hover/manual pause and explicit restart', async () => {
	const { f, root, carousel, next } = await setup();
	carousel.playAutoplay();
	expect(carousel.autoplayPlaying()).toBe(true);
	root.querySelector('input')!.focus();
	expect(carousel.autoplayPlaying()).toBe(false);
	root.querySelector('input')!.blur();
	expect(carousel.autoplayPlaying()).toBe(false);
	carousel.playAutoplay();
	expect(carousel.autoplayPlaying()).toBe(true);
	root.querySelector('caps-carousel')!.dispatchEvent(new MouseEvent('mouseenter'));
	expect(carousel.autoplayPlaying()).toBe(false);
	root.querySelector('caps-carousel')!.dispatchEvent(new MouseEvent('mouseleave'));
	expect(carousel.autoplayPlaying()).toBe(false);
	carousel.playAutoplay();
	carousel.scrollNext();
	expect(carousel.autoplayPlaying()).toBe(false);
	await expect.poll(() => carousel.currentSlide()).toBe(1);
	f.detectChanges();
	const rotation = root.querySelector<HTMLButtonElement>('[capsCarouselAutoplay]')!;
	carousel.playAutoplay();
	rotation.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' }));
	rotation.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	expect(carousel.autoplayPlaying()).toBe(false);
	expect(
		rotation.compareDocumentPosition(root.querySelector('caps-carousel-content')!) & Node.DOCUMENT_POSITION_FOLLOWING,
	).toBeTruthy();
	await userEvent.click(rotation);
	f.detectChanges();
	expect(carousel.autoplayPlaying()).toBe(true);
	expect(root.querySelector('caps-carousel-slide-display')?.getAttribute('aria-live')).toBe('off');
	await userEvent.click(next);
	f.detectChanges();
	expect(carousel.autoplayPlaying()).toBe(false);
	expect(root.querySelector('caps-carousel-slide-display')?.getAttribute('aria-live')).toBe('polite');
});
it('honors live reduced-motion preference and does not automatically restart', async () => {
	const original = window.matchMedia;
	const media = new EventTarget() as MediaQueryList;
	Object.defineProperty(media, 'matches', { value: true, writable: true });
	window.matchMedia = (query) => (query === '(prefers-reduced-motion: reduce)' ? media : original.call(window, query));
	try {
		const { carousel } = await setup();
		expect(carousel.reducedMotion()).toBe(true);
		carousel.playAutoplay();
		expect(carousel.autoplayPlaying()).toBe(false);
		Object.defineProperty(media, 'matches', { value: false });
		media.dispatchEvent(new Event('change'));
		expect(carousel.reducedMotion()).toBe(false);
		expect(carousel.autoplayPlaying()).toBe(false);
		carousel.playAutoplay();
		expect(carousel.autoplayPlaying()).toBe(true);
	} finally {
		window.matchMedia = original;
	}
});

it('retains loop and grouped-scroll options without confusing item numbering with snap counts', async () => {
	const { f, root, carousel } = await setup();
	carousel.scrollNext();
	carousel.scrollNext();
	expect(carousel.currentSlide()).toBe(2);
	carousel.scrollPrev();
	carousel.scrollPrev();
	expect(carousel.currentSlide()).toBe(0);
	f.componentInstance.options.set({ duration: 0, loop: true });
	f.detectChanges();
	await expect.poll(() => carousel.canScrollPrev()).toBe(true);
	carousel.scrollPrev();
	await expect.poll(() => carousel.currentSlide()).toBe(2);
	carousel.scrollNext();
	await expect.poll(() => carousel.currentSlide()).toBe(0);
	f.componentInstance.options.set({ duration: 0, slidesToScroll: 2, align: 'start' });
	f.detectChanges();
	await expect.poll(() => carousel.slideCount()).toBe(2);
	f.detectChanges();
	expect(root.querySelectorAll('caps-carousel-item')[2].getAttribute('aria-label')).toBe('3 of 3');
	expect(root.querySelector('caps-carousel-slide-display')?.textContent).toContain('1 / 2');
});
