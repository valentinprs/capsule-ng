import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Figma Decorative Icon `Size`: 32, 40, 48 and 56px. */
export type CapsDecorativeIconSize = 'sm' | 'default' | 'lg' | 'xl';
/** Figma Decorative Icon `Variant`. */
export type CapsDecorativeIconVariant = 'muted' | 'primary' | 'destructive';

/** A decorative icon in a tinted square or round box. Project an `ng-icon` with `aria-hidden`. */
@Component({
	selector: 'caps-decorative-icon',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'decorative-icon',
		'[attr.data-size]': 'size()',
		'[attr.data-variant]': 'variant()',
		'[attr.data-round]': 'round() || null',
	},
	template: '<ng-content />',
})
export class CapsDecorativeIcon {
	public readonly size = input<CapsDecorativeIconSize>('default');
	public readonly variant = input<CapsDecorativeIconVariant>('muted');
	/** Figma `Roundness=Round`. */
	public readonly round = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-decorative-icon inline-flex shrink-0 items-center justify-center');
	}
}
