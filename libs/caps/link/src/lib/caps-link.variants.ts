import { cva, type VariantProps } from 'class-variance-authority';

export const linkVariants = cva('caps-link', {
	variants: {
		variant: {
			default: 'caps-link-variant-default',
			breadcrumb: 'caps-link-variant-breadcrumb',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export type CapsLinkVariant = NonNullable<VariantProps<typeof linkVariants>['variant']>;
