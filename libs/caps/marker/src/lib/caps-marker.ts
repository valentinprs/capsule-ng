import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
const markerVariants = cva(
	'caps-marker group/marker relative flex min-h-4 w-full items-center text-start text-sm wrap-break-word [&_ng-icon:not([class*="text-"])]:text-[length:--spacing(4)]',
	{
		variants: {
			variant: {
				default: 'caps-marker-variant-default',
				separator: 'caps-marker-variant-separator',
				border: 'caps-marker-variant-border',
			},
		},
		defaultVariants: { variant: 'default' },
	},
);
export type CapsMarkerVariants = VariantProps<typeof markerVariants>;
export type CapsMarkerVariant = NonNullable<CapsMarkerVariants['variant']>;

/** Styling shared by structural and native interactive markers. */
@Directive({
	selector: 'button[capsMarker], a[capsMarker]',
	host: { 'data-slot': 'marker', '[attr.data-variant]': 'variant()' },
})
export class CapsMarkerDirective {
	public readonly variant = input<CapsMarkerVariants['variant']>('default');
	constructor() {
		classes(() => markerVariants({ variant: this.variant() }));
	}
}

/** Readable conversation context; live status is explicitly application-owned. */
@Component({
	selector: 'caps-marker',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: CapsMarkerDirective, inputs: ['variant'] }],
	template: `
		<ng-content />
	`,
})
export class CapsMarker {}
