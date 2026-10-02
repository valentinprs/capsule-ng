import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Decorative divider; projected content remains readable when provided. */
@Component({
	selector: 'caps-field-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'field-separator' },
	template: `
		<span aria-hidden="true" class="caps-field-separator-line absolute inset-x-0 top-1/2 border-t"></span>
		<span class="caps-field-separator-content bg-background relative mx-auto block w-fit"><ng-content /></span>
	`,
})
export class CapsFieldSeparator {
	constructor() {
		classes(() => 'caps-field-separator relative block');
	}
}
