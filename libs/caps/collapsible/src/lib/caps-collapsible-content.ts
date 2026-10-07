import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnCollapsibleContent } from '@spartan-ng/brain/collapsible';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-collapsible-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnCollapsibleContent, inputs: ['id'] }],
	host: { 'data-slot': 'collapsible-content' },
	template: `
		<ng-content />
	`,
})
export class CapsCollapsibleContent {
	constructor() {
		classes(() => 'caps-collapsible-content block data-[state=closed]:hidden');
	}
}
