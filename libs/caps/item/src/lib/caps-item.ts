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

/** Figma Item `Size`: Default, Small and Extra small. */
export type CapsItemSize = 'default' | 'sm' | 'xs';
/** Figma Item `Variant`. */
export type CapsItemVariant = 'default' | 'outline' | 'muted';

@Component({
	selector: 'caps-item',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'item',
		'[attr.role]': '_group ? "listitem" : null',
		'[attr.data-disabled]': 'disabled() || null',
		'[attr.data-size]': 'size()',
		'[attr.data-variant]': 'variant()',
	},
	template: '<ng-content />',
})
export class CapsItem {
	protected readonly _group = inject(CapsItemGroup, { optional: true });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly size = input<CapsItemSize>('default');
	public readonly variant = input<CapsItemVariant>('default');
	constructor() {
		classes(() => 'caps-item group/item flex w-full flex-wrap items-center');
	}
}

@Directive({
	selector: 'a[capsItem], button[capsItem]',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: {
		'data-slot': 'item',
		'[attr.aria-disabled]': '_isAnchor && _button.disabled() ? true : null',
		'[attr.data-size]': 'size()',
		'[attr.data-variant]': 'variant()',
	},
})
export class CapsItemDirective {
	public readonly size = input<CapsItemSize>('default');
	public readonly variant = input<CapsItemVariant>('default');
	protected readonly _isAnchor = inject(HOST_TAG_NAME) === 'a';
	protected readonly _button = inject(BrnButton);
	constructor() {
		classes(() => 'caps-item caps-item-interactive group/item flex w-full flex-wrap items-center text-start');
	}
}
