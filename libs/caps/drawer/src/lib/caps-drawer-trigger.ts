import { Directive, inject, input } from '@angular/core';
import { CapsDrawer } from './caps-drawer';
@Directive({
	selector: 'button[capsDrawerTrigger],button[capsDrawerTriggerFor]',
	host: {
		type: 'button',
		'aria-haspopup': 'dialog',
		'[attr.aria-expanded]': '_target()?.open()',
		'[attr.aria-controls]': '_target()?.dialogId()',
		'(click)': '_show()',
	},
})
export class CapsDrawerTrigger {
	public readonly capsDrawerTriggerFor = input<CapsDrawer>();
	public readonly side = input<'top' | 'bottom' | 'left' | 'right'>();
	private readonly _parent = inject(CapsDrawer, { optional: true });
	protected _target(): CapsDrawer | undefined {
		return this.capsDrawerTriggerFor() ?? this._parent ?? undefined;
	}
	protected _show(): void {
		this._target()?.show(this.side());
	}
}
