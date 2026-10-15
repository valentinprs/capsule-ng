import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogDescription } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sheet-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogDescription],
	host: { 'data-slot': 'sheet-description' },
	template: `
		<ng-content />
	`,
})
export class CapsSheetDescription {
	constructor() {
		classes(() => 'caps-sheet-description');
	}
}
