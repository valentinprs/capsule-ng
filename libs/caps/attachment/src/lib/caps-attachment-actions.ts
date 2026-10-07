import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-attachment-actions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'attachment-actions' },
	template: `
		<ng-content />
	`,
})
export class CapsAttachmentActions {
	constructor() {
		classes(
			() =>
				'caps-attachment-actions relative z-20 flex group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:end-3 group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:gap-1',
		);
	}
}
