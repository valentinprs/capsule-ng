import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card', '[attr.data-size]': 'size()' },
	template: `
		<ng-content />
	`,
})
export class CapsCard {
	public readonly size = input<'default' | 'sm'>('default');

	constructor() {
		classes(() => 'caps-card group/card flex flex-col');
	}
}
