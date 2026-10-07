import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BrnTabsContent } from '@spartan-ng/brain/tabs';
import { classes } from '@spartan-ng/helm/utils';
import { CapsTabs } from './caps-tabs';

/** Inactive panels remain mounted and hidden, preserving forms and local state. */
@Component({
	selector: 'caps-tabs-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnTabsContent, inputs: ['brnTabsContent: value'] }],
	host: {
		'data-slot': 'tabs-content',
		'[id]': '_root.contentId(value())',
		'[attr.aria-labelledby]': '_root.triggerId(value())',
	},
	template: `
		<ng-content />
	`,
})
export class CapsTabsContent {
	public readonly value = input.required<string>();
	protected readonly _root = inject(CapsTabs);
	constructor() {
		classes(() => 'caps-tabs-content flex-1 text-sm');
	}
}
