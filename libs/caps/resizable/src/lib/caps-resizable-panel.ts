import { ChangeDetectionStrategy, Component, computed, forwardRef, input } from '@angular/core';
import { BrnResizablePanel } from '@spartan-ng/brain/resizable';
import { classes } from '@spartan-ng/helm/utils';
import { resizableId } from './caps-resizable-id';

/** Content panel. Sizes are percentages of the closest group. */
@Component({
	selector: 'caps-resizable-panel',
	exportAs: 'capsResizablePanel',
	providers: [{ provide: BrnResizablePanel, useExisting: forwardRef(() => CapsResizablePanel) }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'resizable-panel' },
	template: `
		<ng-content />
	`,
})
export class CapsResizablePanel extends BrnResizablePanel {
	/** @internal Read the same size used by Brain's flex style, including imperative setSize. */
	public readonly currentSize = computed(() => this._panelSize() ?? this.defaultSize());
	public override readonly id = input<string>(resizableId('caps-resizable-panel-'));
	constructor() {
		super();
		classes(() => 'caps-resizable-panel');
	}
}
