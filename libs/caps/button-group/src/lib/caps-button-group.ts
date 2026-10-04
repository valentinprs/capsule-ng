import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Carbon ButtonSet layout; projected controls retain their own native behavior. */
@Component({
	selector: 'caps-button-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'button-group',
		role: 'group',
		'[attr.data-fluid]': 'fluid()',
		'[attr.data-stacked]': 'stacked() && !fluid()',
	},
	template: `
		<ng-content />
	`,
})
export class CapsButtonGroup {
	public readonly fluid = input(false, { transform: booleanAttribute });
	public readonly stacked = input(false, { transform: booleanAttribute });
	constructor() {
		classes(
			() =>
				'caps-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*="w-"])]:w-fit [&>input]:flex-1',
		);
	}
}
