import { CapsNumberedPagination } from './lib/caps-numbered-pagination';
import {
	CapsPagination,
	CapsPaginationEllipsis,
	CapsPaginationLink,
	CapsPaginationNext,
	CapsPaginationPrevious,
} from './lib/caps-pagination';
export * from './lib/caps-numbered-pagination';
export * from './lib/caps-pagination';
export const CapsPaginationImports = [
	CapsPagination,
	CapsPaginationLink,
	CapsPaginationPrevious,
	CapsPaginationNext,
	CapsPaginationEllipsis,
	CapsNumberedPagination,
] as const;

export { createPageArray, outOfBoundCorrection } from './lib/page-array';

/** @internal Required by Angular packaging; consumers use the public pagination directives. */
export { CapsPaginationLinkBehavior as ɵCapsPaginationLinkBehavior } from './lib/caps-pagination-link-behavior';
