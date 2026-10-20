import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** The brand logo, provided by the app (an `img` or an inline `svg`), at the end of the header. */
@Component({
	selector: 'caps-header-logo',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-logo' },
	template: `
		<ng-content />
	`,
})
export class CapsHeaderLogo {
	constructor() {
		classes(() => 'caps-header-logo');
	}
}
