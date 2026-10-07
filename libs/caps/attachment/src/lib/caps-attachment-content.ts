import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-attachment-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'attachment-content' },
	template: `
		<ng-content />
	`,
})
export class CapsAttachmentContent {
	constructor() {
		classes(() => 'caps-attachment-content max-w-full group-data-[orientation=vertical]/attachment:px-1');
	}
}
