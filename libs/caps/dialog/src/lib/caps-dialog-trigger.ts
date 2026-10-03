import { computed, Directive, inject, input } from '@angular/core';
import { BrnDialog } from '@spartan-ng/brain/dialog';
import { CapsDialog } from './caps-dialog';

@Directive({
	selector:
		'button[capsDialogTrigger],button[capsDialogTriggerFor],button[capsAlertDialogTrigger],button[capsAlertDialogTriggerFor]',
	host: {
		type: 'button',
		'aria-haspopup': 'dialog',
		'[attr.aria-expanded]': '_external()?.open() ?? (_parent?.stateComputed() === "open")',
		'[attr.aria-controls]': '_external()?.dialogId() ?? _parent?.id()',
		'(click)': '_show()',
	},
})
export class CapsDialogTrigger {
	public readonly capsDialogTriggerFor = input<CapsDialog>();
	public readonly capsAlertDialogTriggerFor = input<CapsDialog>();
	protected readonly _parent = inject(BrnDialog, { optional: true });
	protected readonly _external = computed(() => this.capsDialogTriggerFor() ?? this.capsAlertDialogTriggerFor());
	protected _show(): void {
		const external = this._external();
		if (external) external.show();
		else this._parent?.open();
	}
}
