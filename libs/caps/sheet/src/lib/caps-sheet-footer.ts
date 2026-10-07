import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sheet-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sheet-footer' },
	template: `
		<ng-content />
	`,
})
export class CapsSheetFooter {
	constructor() {
		classes(() => 'caps-sheet-footer mt-auto flex shrink-0 flex-col');
	}
}
