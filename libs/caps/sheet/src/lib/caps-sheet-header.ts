import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sheet-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sheet-header' },
	template: `
		<ng-content />
	`,
})
export class CapsSheetHeader {
	constructor() {
		classes(() => 'caps-sheet-header flex shrink-0 flex-col');
	}
}
