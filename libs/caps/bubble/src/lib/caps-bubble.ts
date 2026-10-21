import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const bubbleVariants = cva(
	'caps-bubble group/bubble relative flex w-fit min-w-0 flex-col group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full',
	{
		variants: {
			variant: {
				default: 'caps-bubble-variant-default',
				secondary: 'caps-bubble-variant-secondary',
				muted: 'caps-bubble-variant-muted',
				tinted: 'caps-bubble-variant-tinted',
				outline: 'caps-bubble-variant-outline',
				ghost: 'caps-bubble-variant-ghost',
				destructive: 'caps-bubble-variant-destructive',
				suggestion: 'caps-bubble-variant-suggestion',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export type CapsBubbleVariants = VariantProps<typeof bubbleVariants>;
export type CapsBubbleVariant = NonNullable<CapsBubbleVariants['variant']>;
export type CapsBubbleAlign = 'start' | 'end';

@Component({
	selector: 'caps-bubble',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'bubble',
		'[attr.data-variant]': 'variant()',
		'[attr.data-align]': 'align()',
		// Prevent the legacy HTML `align` attribute (from `align="end"` bindings) from
		// forcing text-align on the bubble content.
		'[attr.align]': 'null',
	},
	template: `
		<ng-content />
	`,
})
export class CapsBubble {
	public readonly variant = input<CapsBubbleVariants['variant']>('default');
	public readonly align = input<CapsBubbleAlign>('start');

	constructor() {
		classes(() => bubbleVariants({ variant: this.variant() }));
	}
}
