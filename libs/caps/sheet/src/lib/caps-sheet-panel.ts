import { ChangeDetectionStrategy, Component, Injector, inject, input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
/** @internal Surface owned by the deferred content. */
@Component({
	selector: 'caps-sheet-panel',
	imports: [CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sheet-content', '[attr.data-state]': '_ref.state()', '[attr.data-side]': 'side()' },
	template: `
		<ng-content />
		@if (showCloseButton()) {
			<button
				capsButton
				type="button"
				variant="ghost"
				size="icon-sm"
				class="caps-sheet-close"
				data-slot="sheet-close"
				(click)="_ref.close()"
				[attr.aria-label]="closeLabel()"
			>
				<span aria-hidden="true">✕</span>
			</button>
		}
	`,
})
export class CapsSheetPanel {
	public readonly injector = inject(Injector);
	protected readonly _ref = inject(BrnDialogRef);
	public readonly contentClass = input('');
	public readonly side = input<'top' | 'bottom' | 'left' | 'right'>('right');
	public readonly showCloseButton = input(true);
	public readonly closeLabel = input('Close');
	constructor() {
		classes(() => ['caps-sheet-content fixed flex flex-col outline-none', this.contentClass()]);
	}
}
