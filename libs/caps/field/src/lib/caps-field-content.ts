import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { provideCapsFieldFormContext } from './caps-field-form-context';

/** Groups a label and help/error text for horizontal and responsive fields. */
@Component({
	selector: 'caps-field-content',
	providers: [provideCapsFieldFormContext()],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'field-content' },
	template: `
		<ng-content />
	`,
})
export class CapsFieldContent {
	constructor() {
		classes(() => 'caps-field-content flex min-w-0 flex-1 flex-col leading-snug');
	}
}
