import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { BrnMessageScrollerItem } from '@spartan-ng/brain/message-scroller';
import { classes } from '@spartan-ng/helm/utils';

const itemClasses = 'min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]';

/** Register a custom row host directly in the closest conversation content. */
@Directive({
	selector: '[capsMessageScrollerItem]',
	host: { 'data-slot': 'message-scroller-item' },
})
export class CapsMessageScrollerItemDirective extends BrnMessageScrollerItem {
	constructor() {
		super();
		classes(() => itemClasses);
	}
}

/** A structural row; messageId is local to its scroller, separate from the HTML id. */
@Component({
	selector: 'caps-message-scroller-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnMessageScrollerItem, inputs: ['messageId', 'scrollAnchor'] }],
	host: { 'data-slot': 'message-scroller-item' },
	template: `
		<ng-content />
	`,
})
export class CapsMessageScrollerItem {
	constructor() {
		classes(() => itemClasses);
	}
}
