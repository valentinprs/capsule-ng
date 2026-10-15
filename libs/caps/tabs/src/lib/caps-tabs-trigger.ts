import { Directive, inject, input } from '@angular/core';
import { BrnTabsTrigger } from '@spartan-ng/brain/tabs';
import { classes } from '@spartan-ng/helm/utils';
import { CapsTabs } from './caps-tabs';
import { CapsTabsTriggerBehavior } from './caps-tabs-trigger-behavior';

/** A native tab button. Value associates it with the matching content. */
@Directive({
	selector: 'button[capsTabsTrigger]',
	hostDirectives: [{ directive: CapsTabsTriggerBehavior, inputs: ['brnTabsTrigger: value', 'disabled'] }],
	host: {
		'data-slot': 'tabs-trigger',
		'(focus)': '_root.focusedValue.set(value())',
		'[tabindex]':
			'_brain.disabled ? -1 : ((_root.focusedValue() ?? (_brain.selected() ? value() : undefined)) === value() ? 0 : -1)',
		'[id]': '_root.triggerId(value())',
		'[attr.aria-controls]': '_root.contentId(value())',
	},
})
export class CapsTabsTrigger {
	public readonly value = input.required<string>();
	protected readonly _brain = inject(BrnTabsTrigger);
	protected readonly _root = inject(CapsTabs);
	constructor() {
		classes(
			() =>
				'caps-tabs-trigger relative inline-flex flex-1 items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-(--caps-disabled-opacity) [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
		);
	}
}
