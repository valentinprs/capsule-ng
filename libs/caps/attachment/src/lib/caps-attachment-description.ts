import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-attachment-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'attachment-description' },
	template: `
		<ng-content />
	`,
})
export class CapsAttachmentDescription {
	constructor() {
		classes(
			() => 'caps-attachment-description group-data-[state=error]/attachment:text-destructive block max-w-full min-w-0',
		);
	}
}
