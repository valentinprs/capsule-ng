import { Directive, input } from '@angular/core';
import { BrnToggle } from '@spartan-ng/brain/toggle';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const capsToggleVariants = cva(
	'caps-toggle group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
	{
		variants: {
			variant: {
				default: 'caps-toggle-variant-default',
				outline: 'caps-toggle-variant-outline',
			},
			size: {
				default: 'caps-toggle-size-default',
				sm: 'caps-toggle-size-sm',
				lg: 'caps-toggle-size-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);
export type CapsToggleVariants = VariantProps<typeof capsToggleVariants>;

@Directive({
	selector: 'button[capsToggle]',
	hostDirectives: [
		{
			directive: BrnToggle,
			inputs: ['id', 'value', 'disabled', 'state', 'aria-label', 'type'],
			outputs: ['stateChange'],
		},
	],
	host: {
		'data-slot': 'toggle',
	},
})
export class CapsToggle {
	public readonly variant = input<CapsToggleVariants['variant']>('default');
	public readonly size = input<CapsToggleVariants['size']>('default');
	constructor() {
		classes(() =>
			capsToggleVariants({
				variant: this.variant(),
				size: this.size(),
			}),
		);
	}
}
