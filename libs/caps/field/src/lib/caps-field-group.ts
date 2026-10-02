import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Layout for several fields; its container width drives responsive field orientation. */
@Component({
	selector: 'caps-field-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'field-group' },
	template: `
		<ng-content />
	`,
})
export class CapsFieldGroup {
	constructor() {
		classes(() => 'caps-field-group group/field-group @container/field-group flex w-full flex-col');
	}
}
