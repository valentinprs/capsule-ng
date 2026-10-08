import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Directive({ selector: 'kbd[capsKbd]', host: { 'data-slot': 'kbd' } })
export class CapsKbd {
	constructor() {
		classes(() => 'caps-kbd pointer-events-none inline-flex items-center justify-center select-none');
	}
}
@Component({
	selector: 'caps-kbd-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'kbd-group', role: 'group' },
	template: `
		<ng-content />
	`,
})
export class CapsKbdGroup {
	constructor() {
		classes(() => 'caps-kbd-group inline-flex items-center');
	}
}
