import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
	'caps-button group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
	{
		variants: {
			variant: {
				default: 'caps-button-variant-default',
				ghost: 'caps-button-variant-ghost',
				outline: 'caps-button-variant-outline',
				secondary: 'caps-button-variant-secondary',
				destructive: 'caps-button-variant-destructive',
				link: 'caps-button-variant-link',
			},
			size: {
				default: 'caps-button-size-default',
				icon: 'caps-button-size-icon',
				xs: 'caps-button-size-xs',
				sm: 'caps-button-size-sm',
				lg: 'caps-button-size-lg',
				'icon-xs': 'caps-button-size-icon-xs',
				'icon-sm': 'caps-button-size-icon-sm',
				'icon-lg': 'caps-button-size-icon-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type CapsButtonVariant = NonNullable<ButtonVariants['variant']>;
export type CapsButtonSize = NonNullable<ButtonVariants['size']>;
