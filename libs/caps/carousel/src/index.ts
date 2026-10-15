import { CapsCarousel } from './lib/caps-carousel';
import { CapsCarouselAutoplay } from './lib/caps-carousel-autoplay';
import { CapsCarouselContent } from './lib/caps-carousel-content';
import { CapsCarouselItem } from './lib/caps-carousel-item';
import { CapsCarouselNext } from './lib/caps-carousel-next';
import { CapsCarouselPrevious } from './lib/caps-carousel-previous';
import { CapsCarouselSlideDisplay } from './lib/caps-carousel-slide-display';

export * from './lib/caps-carousel';
export * from './lib/caps-carousel-autoplay';
export * from './lib/caps-carousel-content';
export * from './lib/caps-carousel-item';
export * from './lib/caps-carousel-next';
export * from './lib/caps-carousel-previous';
export * from './lib/caps-carousel-slide-display';

export const CapsCarouselImports = [
	CapsCarousel,
	CapsCarouselContent,
	CapsCarouselItem,
	CapsCarouselPrevious,
	CapsCarouselNext,
	CapsCarouselAutoplay,
	CapsCarouselSlideDisplay,
] as const;
