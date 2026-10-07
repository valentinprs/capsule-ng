import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-attachment-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'attachment-title' },
	template: `
		<ng-content />
	`,
})
export class CapsAttachmentTitle {
	constructor() {
		classes(
			() =>
				'caps-attachment-title group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer block max-w-full min-w-0',
		);
	}
}
