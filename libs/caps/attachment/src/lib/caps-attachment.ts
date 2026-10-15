import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const attachmentVariants = cva(
	'caps-attachment group/attachment focus-within:ring-ring/50 has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap transition-colors focus-within:ring-1 data-[state=idle]:border-dashed',
	{
		variants: {
			size: {
				default:
					'caps-attachment-size-default gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2',
				sm: 'caps-attachment-size-sm gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5',
				xs: 'caps-attachment-size-xs gap-1.5 text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1',
			},
			orientation: {
				horizontal: 'caps-attachment-orientation-horizontal min-w-40 items-center',
				vertical: 'caps-attachment-orientation-vertical w-24 flex-col has-data-[slot=attachment-content]:w-30',
			},
		},
		defaultVariants: {
			size: 'default',
			orientation: 'horizontal',
		},
	},
);

export type CapsAttachmentVariants = VariantProps<typeof attachmentVariants>;
export type CapsAttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done';

@Component({
	selector: 'caps-attachment',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'attachment',
		'[attr.aria-busy]': 'state() === "uploading" || state() === "processing" ? true : null',
		'[attr.data-state]': 'state()',
		'[attr.data-size]': 'size()',
		'[attr.data-orientation]': 'orientation()',
	},
	template: `
		<ng-content />
	`,
})
export class CapsAttachment {
	public readonly state = input<CapsAttachmentState>('done');
	public readonly size = input<CapsAttachmentVariants['size']>('default');
	public readonly orientation = input<CapsAttachmentVariants['orientation']>('horizontal');

	constructor() {
		classes(() => attachmentVariants({ size: this.size(), orientation: this.orientation() }));
	}
}
