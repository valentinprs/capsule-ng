import { Dir } from '@angular/cdk/bidi';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCarousel, CapsCarouselImports } from '@capsule-ng/caps/carousel';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideChevronLeft, lucideChevronRight, lucideChevronUp } from '@ng-icons/lucide';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import Autoplay from 'embla-carousel-autoplay';

const meta: Meta<CapsCarousel> = {
	title: 'Carousel',
	component: CapsCarousel,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsCarouselImports, CapsCardImports, CapsButtonImports, Dir, NgIcon],
			providers: [provideIcons({ lucideChevronLeft, lucideChevronRight, lucideChevronUp, lucideChevronDown })],
		}),
	],
};
export default meta;
type Story = StoryObj<CapsCarousel>;

function slides(itemClass = '', vertical = false) {
	return Array.from(
		{ length: 5 },
		(_, i) => `
 <caps-carousel-item class="${itemClass}">
  <div class="p-1"><caps-card><caps-card-content class="flex items-center justify-center p-6 ${vertical ? '' : 'aspect-square'}">
   <span class="text-4xl font-semibold">${i + 1}</span>
  </caps-card-content></caps-card></div>
 </caps-carousel-item>`,
	).join('');
}
/** Figma Carousel: outline icon buttons on either side of the slides, 16px away. */
function navigation(vertical: boolean) {
	const [previous, next] = vertical
		? ['lucideChevronUp', 'lucideChevronDown']
		: ['lucideChevronLeft', 'lucideChevronRight'];
	const [previousPlace, nextPlace] = vertical
		? ['-top-12 left-1/2 -translate-x-1/2', '-bottom-12 left-1/2 -translate-x-1/2']
		: ['-start-12 top-1/2 -translate-y-1/2', '-end-12 top-1/2 -translate-y-1/2'];
	const flip = vertical ? '' : ' class="rtl:rotate-180"';
	return `<button capsButton capsCarouselPrevious variant="outline" size="icon" class="absolute ${previousPlace}" aria-label="Previous slide"><ng-icon name="${previous}"${flip} /></button>
 <button capsButton capsCarouselNext variant="outline" size="icon" class="absolute ${nextPlace}" aria-label="Next slide"><ng-icon name="${next}"${flip} /></button>`;
}
function example(content = slides(), trackClass = '', attributes = '', after = '', before = '') {
	const vertical = attributes.includes('orientation="vertical"');
	return `<div class="flex w-full items-center justify-center ${vertical ? 'py-16' : 'px-16 py-4'}">
 <caps-carousel #carousel="capsCarousel" aria-label="Example slides" class="w-full max-w-48 sm:max-w-xs" ${attributes}>
 ${before}<caps-carousel-content class="${trackClass}">${content}</caps-carousel-content>
 ${navigation(vertical)}${after}
 </caps-carousel></div>`;
}
export const Default: Story = { render: () => ({ template: example() }) };
export const Sizes: Story = { render: () => ({ template: example(slides('md:basis-1/2 lg:basis-1/3')) }) };
export const Spacing: Story = {
	render: () => ({ template: example(slides('ps-1 md:basis-1/2 lg:basis-1/3'), '-ms-1') }),
};
export const Orientation: Story = {
	render: () => ({ template: example(slides('basis-1/2 pt-1', true), '-mt-1 h-[270px]', 'orientation="vertical"') }),
};
export const Plugins: Story = {
	args: {
		plugins: [
			Autoplay({
				delay: 3000,
				stopOnFocusIn: true,
				stopOnMouseEnter: true,
				stopOnInteraction: true,
				breakpoints: { '(prefers-reduced-motion: reduce)': { active: false } },
			}),
		],
	},
	render: (args) => ({
		props: args,
		template: example(
			slides(),
			'',
			argsToTemplate(args),
			'',
			`<button capsButton capsCarouselAutoplay variant="outline" class="mb-3" [disabled]="carousel.reducedMotion()">{{ carousel.autoplayPlaying() ? 'Pause rotation' : 'Start rotation' }}</button>`,
		),
	}),
};
export const SlideCount: Story = {
	render: () => ({
		template: example(slides(), '', '', '<caps-carousel-slide-display class="mt-1 flex justify-end" />'),
	}),
};
export const Rtl: Story = {
	render: () => ({
		template: `<div dir="rtl" data-lang="ar">${example().replace('Example slides', 'الموارد').replace('"Previous slide"', '"الشريحة السابقة"').replace('"Next slide"', '"الشريحة التالية"')}</div>`,
	}),
};
