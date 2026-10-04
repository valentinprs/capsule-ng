import type { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	Directive,
	HOST_TAG_NAME,
	inject,
	input,
} from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import { CapsItemGroup } from './caps-item-group';

@Component({
	selector: 'caps-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'item',
		'[attr.role]': '_group ? "listitem" : null',
		'[attr.data-disabled]': 'disabled() || null',
	},
	template: '<ng-content />',
})
export class CapsItem {
	protected readonly _group = inject(CapsItemGroup, { optional: true });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-item group/item flex w-full flex-wrap items-center');
	}
}

@Directive({
	selector: 'a[capsItem], button[capsItem]',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: { 'data-slot': 'item', '[attr.aria-disabled]': '_isAnchor && _button.disabled() ? true : null' },
})
export class CapsItemDirective {
	protected readonly _isAnchor = inject(HOST_TAG_NAME) === 'a';
	protected readonly _button = inject(BrnButton);
	constructor() {
		classes(() => 'caps-item caps-item-interactive group/item flex w-full flex-wrap items-center text-start');
	}
}
