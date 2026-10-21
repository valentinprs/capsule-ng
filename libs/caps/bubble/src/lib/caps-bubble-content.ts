import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-bubble-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'bubble-content' },
	template: `
		<ng-content />
	`,
})
export class CapsBubbleContent {
	constructor() {
		classes(
			() => 'caps-bubble-content w-fit max-w-full min-w-0 wrap-break-word group-data-[align=end]/bubble:self-end',
		);
	}
}

/** Whole-content native actions; projected structural content remains a component. */
@Directive({
	selector: 'button[capsBubbleContent], a[capsBubbleContent]',
	host: { 'data-slot': 'bubble-content' },
})
export class CapsBubbleContentDirective {
	constructor() {
		classes(
			() =>
				'caps-bubble-content focus-visible:border-ring focus-visible:ring-ring/50 w-fit max-w-full min-w-0 text-start wrap-break-word transition-colors outline-none focus-visible:ring-[length:var(--caps-focus-ring-width)]',
		);
	}
}
