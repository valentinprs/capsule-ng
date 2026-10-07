import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-attachment-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'attachment-group', role: 'group', tabindex: '0' },
	template: `
		<ng-content />
	`,
})
export class CapsAttachmentGroup {
	constructor() {
		classes(
			() =>
				'caps-attachment-group scroll-fade-x no-scrollbar flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
		);
	}
}
