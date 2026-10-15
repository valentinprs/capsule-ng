import { Directive, inject, input } from '@angular/core';
import { CapsSheet } from './caps-sheet';
@Directive({
	selector: 'button[capsSheetTrigger],button[capsSheetTriggerFor]',
	host: {
		type: 'button',
		'aria-haspopup': 'dialog',
		'[attr.aria-expanded]': '_target()?.open()',
		'[attr.aria-controls]': '_target()?.dialogId()',
		'(click)': '_show()',
	},
})
export class CapsSheetTrigger {
	public readonly capsSheetTriggerFor = input<CapsSheet>();
	public readonly side = input<'top' | 'bottom' | 'left' | 'right'>();
	private readonly _parent = inject(CapsSheet, { optional: true });
	protected _target(): CapsSheet | undefined {
		return this.capsSheetTriggerFor() ?? this._parent ?? undefined;
	}
	protected _show(): void {
		this._target()?.show(this.side());
	}
}
