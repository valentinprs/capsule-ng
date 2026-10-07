import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsPaginationLinkBehavior } from './caps-pagination-link-behavior';

@Component({
	selector: 'caps-pagination',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'navigation', 'aria-label': 'Pagination', 'data-slot': 'pagination' },
	template: '<ng-content />',
})
export class CapsPagination {
	constructor() {
		classes(() => 'caps-pagination');
	}
}

@Directive({
	selector: 'a[capsPaginationLink],button[capsPaginationLink]',
	hostDirectives: [{ directive: CapsPaginationLinkBehavior, inputs: ['disabled', 'isActive'] }],
})
export class CapsPaginationLink {}

@Directive({
	selector: 'a[capsPaginationPrevious],button[capsPaginationPrevious]',
	hostDirectives: [{ directive: CapsPaginationLinkBehavior, inputs: ['disabled', 'isActive'] }],
})
export class CapsPaginationPrevious {
	constructor() {
		classes(() => 'caps-pagination-previous');
	}
}
@Directive({
	selector: 'a[capsPaginationNext],button[capsPaginationNext]',
	hostDirectives: [{ directive: CapsPaginationLinkBehavior, inputs: ['disabled', 'isActive'] }],
})
export class CapsPaginationNext {
	constructor() {
		classes(() => 'caps-pagination-next');
	}
}

@Component({
	selector: 'caps-pagination-ellipsis',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'pagination-ellipsis' },
	template: '<span aria-hidden="true">…</span><span class="sr-only">{{ srOnlyText() }}</span>',
})
export class CapsPaginationEllipsis {
	public readonly srOnlyText = input<string>('More pages');
	constructor() {
		classes(() => 'caps-pagination-ellipsis');
	}
}
