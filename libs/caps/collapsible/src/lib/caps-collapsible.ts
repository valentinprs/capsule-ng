import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrnCollapsible } from '@spartan-ng/brain/collapsible';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-collapsible',
	exportAs: 'capsCollapsible',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnCollapsible, inputs: ['expanded', 'disabled'], outputs: ['expandedChange'] }],
	host: { 'data-slot': 'collapsible' },
	template: `
		<ng-content />
	`,
})
export class CapsCollapsible {
	private readonly _brain = inject(BrnCollapsible);
	public readonly expanded = this._brain.expanded;
	public readonly disabled = this._brain.disabled;
	public readonly state = this._brain.state;
	public toggle(): void {
		this._brain.toggle();
	}
	constructor() {
		classes(() => 'caps-collapsible block');
	}
}
