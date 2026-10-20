import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** The 40 × 40 px visual identifier of the application: a product icon, a logo or a monogram. */
@Component({
	selector: 'caps-header-visual',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-visual' },
	template: `
		<ng-content />
	`,
})
export class CapsHeaderVisual {
	constructor() {
		classes(() => 'caps-header-visual');
	}
}
