import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-table-container',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'table-container', tabindex: '0' },
	template: '<ng-content />',
})
export class CapsTableContainer {
	constructor() {
		classes(() => 'caps-table-container');
	}
}

@Directive({
	selector: 'table[capsTable]',
	host: {
		'data-slot': 'table',
		'[attr.data-size]': 'size()',
		'[attr.data-striped]': 'striped() || null',
		'[attr.data-no-border]': 'noBorder() || null',
	},
})
export class CapsTable {
	/** Row size, adapted from Carbon Angular TableDirective. */
	public readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
	public readonly striped = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly noBorder = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-table');
	}
}
