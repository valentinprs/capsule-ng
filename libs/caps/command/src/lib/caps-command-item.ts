import { Directive, inject } from '@angular/core';
import { BrnCommandItem, injectBrnCommand } from '@spartan-ng/brain/command';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsCommandItem]',
	hostDirectives: [{ directive: BrnCommandItem, inputs: ['value', 'disabled', 'id'], outputs: ['selected'] }],
	host: {
		'data-slot': 'command-item',
		'[disabled]': '_command.disabledState() || _item.disabled',
		'[attr.data-disabled]': '_command.disabledState() || _item.disabled ? "" : null',
	},
})
export class CapsCommandItem {
	protected readonly _command = injectBrnCommand();
	protected readonly _item = inject(BrnCommandItem);
	constructor() {
		classes(
			() =>
				'caps-command-item group/command-item w-full data-disabled:pointer-events-none data-disabled:opacity-50 data-hidden:hidden [&>ng-icon]:pointer-events-none [&>ng-icon]:shrink-0',
		);
	}
}
