import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** A composition of native Capsule inputs, text, icons and actions. */
@Component({
	selector: 'caps-input-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'input-group', role: 'group' },
	template: '<ng-content />',
})
export class CapsInputGroup {
	constructor() {
		classes(() => 'caps-input-group relative flex w-full min-w-0 items-center outline-none');
	}
}

export type CapsInputGroupAlignment = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

@Component({
	selector: 'caps-input-group-addon',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'input-group-addon', '[attr.data-align]': 'align()' },
	template: '<ng-content />',
})
export class CapsInputGroupAddon {
	public readonly align = input<CapsInputGroupAlignment>('inline-start');
	constructor() {
		classes(() => 'caps-input-group-addon flex shrink-0 items-center select-none');
	}
}

@Component({
	selector: 'caps-input-group-text',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'input-group-text' },
	template: '<ng-content />',
})
export class CapsInputGroupText {
	constructor() {
		classes(() => 'caps-input-group-text flex items-center');
	}
}
