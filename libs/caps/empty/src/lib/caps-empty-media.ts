import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const emptyMediaVariants = cva('caps-empty-media', {
	variants: { variant: { default: 'caps-empty-media-default', icon: 'caps-empty-media-icon' } },
	defaultVariants: { variant: 'default' },
});
export type CapsEmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;

@Component({
	selector: 'caps-empty-media',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty-media', '[attr.data-variant]': 'variant()' },
	template: `
		<ng-content />
	`,
})
export class CapsEmptyMedia {
	/** As in Spartan, an omitted input uses the default media style. */
	public readonly variant = input<CapsEmptyMediaVariants['variant']>();
	constructor() {
		classes(() => emptyMediaVariants({ variant: this.variant() }));
	}
}
