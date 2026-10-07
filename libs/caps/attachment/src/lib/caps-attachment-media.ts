import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const attachmentMediaVariants = cva(
	"caps-attachment-media group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:w-8 group-data-[size=xs]/attachment:w-7 [&_ng-icon]:pointer-events-none [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(4)] group-data-[orientation=vertical]/attachment:[&_ng-icon:not([class*='text-'])]:text-[length:--spacing(6)] group-data-[size=xs]/attachment:[&_ng-icon:not([class*='text-'])]:text-[length:--spacing(3.5)]",
	{
		variants: {
			variant: {
				icon: 'caps-attachment-media-variant-icon',
				image: 'caps-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover',
			},
		},
		defaultVariants: {
			variant: 'icon',
		},
	},
);

export type CapsAttachmentMediaVariants = VariantProps<typeof attachmentMediaVariants>;

@Component({
	selector: 'caps-attachment-media',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'attachment-media',
		'[attr.data-variant]': 'variant()',
	},
	template: `
		<ng-content />
	`,
})
export class CapsAttachmentMedia {
	public readonly variant = input<CapsAttachmentMediaVariants['variant']>('icon');

	constructor() {
		classes(() => attachmentMediaVariants({ variant: this.variant() }));
	}
}
