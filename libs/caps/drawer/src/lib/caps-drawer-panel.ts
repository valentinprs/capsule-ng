import { ChangeDetectionStrategy, Component, Injector, inject, input } from '@angular/core';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { BrnDrawerHandle } from '@spartan-ng/brain/drawer';
import { classes } from '@spartan-ng/helm/utils';
/** @internal Surface owned by the deferred content. */
@Component({
	selector: 'caps-drawer-panel',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnDrawerHandle, inputs: ['closeThreshold'] }],
	host: {
		'data-slot': 'drawer-content',
		'[attr.data-state]': '_ref.state()',
		'[attr.data-side]': 'side()',
		'[attr.data-vaul-drawer-direction]': 'side()',
	},
	template: `
		<div class="caps-drawer-handle" data-slot="drawer-handle" aria-hidden="true"></div>
		<ng-content />
	`,
})
export class CapsDrawerPanel {
	public readonly injector = inject(Injector);
	protected readonly _ref = inject(BrnDialogRef);
	public readonly contentClass = input('');
	public readonly side = input<'top' | 'bottom' | 'left' | 'right'>('bottom');
	constructor() {
		classes(() => ['caps-drawer-content group/drawer-content fixed flex flex-col outline-none', this.contentClass()]);
	}
}
