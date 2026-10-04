import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-select-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'group', '[attr.aria-label]': 'label()', 'data-slot': 'select-group' },
	template: `
		@if (label()) {
			<div class="caps-select-group-label" aria-hidden="true">{{ label() }}</div>
		}
		<ng-content />
	`,
})
export class CapsSelectGroup {
	public readonly label = input<string>();
	constructor() {
		classes(() => 'block');
	}
}
