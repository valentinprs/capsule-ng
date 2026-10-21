import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
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
	imports: [NgIcon],
	providers: [provideIcons({ lucideEllipsis })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'pagination-ellipsis' },
	template: '<ng-icon aria-hidden="true" name="lucideEllipsis" /><span class="sr-only">{{ srOnlyText() }}</span>',
})
export class CapsPaginationEllipsis {
	public readonly srOnlyText = input<string>('More pages');
	constructor() {
		classes(() => 'caps-pagination-ellipsis');
	}
}
