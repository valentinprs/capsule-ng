import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const alertVariants = cva('caps-alert', {
	variants: { variant: { default: 'caps-alert-variant-default', destructive: 'caps-alert-variant-destructive' } },
	defaultVariants: { variant: 'default' },
});
export type CapsAlertVariants = VariantProps<typeof alertVariants>;

@Component({
	selector: 'caps-alert',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'alert', 'data-slot': 'alert', '[attr.data-variant]': 'variant()' },
	template: `
		<ng-content />
	`,
})
export class CapsAlert {
	/** Spartan visual variant; native role and live attributes remain overridable. */
	public readonly variant = input<CapsAlertVariants['variant']>('default');
	constructor() {
		classes(() => alertVariants({ variant: this.variant() }));
	}
}
