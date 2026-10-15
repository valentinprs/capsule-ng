import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { BrnResizableGroup } from '@spartan-ng/brain/resizable';
import { classes } from '@spartan-ng/helm/utils';
import { resizableId } from './caps-resizable-id';

/** A percentage layout; directly projected panels and handles can contain nested groups. */
@Component({
	selector: 'caps-resizable-group',
	providers: [{ provide: BrnResizableGroup, useExisting: forwardRef(() => CapsResizableGroup) }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'resizable-group', role: 'group' },
	template: `
		<ng-content />
	`,
})
export class CapsResizableGroup extends BrnResizableGroup {
	public override readonly id = input<string>(resizableId('caps-resizable-group-'));
	constructor() {
		super();
		classes(() => 'caps-resizable-group');
	}
}
