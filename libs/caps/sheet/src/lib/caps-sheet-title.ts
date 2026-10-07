import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogTitle } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sheet-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogTitle],
	host: { 'data-slot': 'sheet-title', role: 'heading', 'aria-level': '2' },
	template: `
		<ng-content />
	`,
})
export class CapsSheetTitle {
	constructor() {
		classes(() => 'caps-sheet-title');
	}
}
