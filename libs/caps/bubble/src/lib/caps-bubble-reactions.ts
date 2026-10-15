import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const bubbleReactionsVariants = cva(
	'caps-bubble-reactions absolute z-10 flex w-fit shrink-0 items-center justify-center has-[button]:p-0',
	{
		variants: {
			side: {
				top: 'top-0 -translate-y-3/4',
				bottom: 'bottom-0 translate-y-3/4',
			},
			align: {
				start: 'start-3',
				end: 'end-3',
			},
		},
		defaultVariants: {
			side: 'bottom',
			align: 'end',
		},
	},
);

export type CapsBubbleReactionsVariants = VariantProps<typeof bubbleReactionsVariants>;

@Component({
	selector: 'caps-bubble-reactions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'bubble-reactions',
		'[attr.data-align]': 'align()',
		'[attr.data-side]': 'side()',
		'[attr.align]': 'null',
	},
	template: `
		<ng-content />
	`,
})
export class CapsBubbleReactions {
	public readonly side = input<CapsBubbleReactionsVariants['side']>('bottom');
	public readonly align = input<CapsBubbleReactionsVariants['align']>('end');

	constructor() {
		classes(() => bubbleReactionsVariants({ side: this.side(), align: this.align() }));
	}
}
