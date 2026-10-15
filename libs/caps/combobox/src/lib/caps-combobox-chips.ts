import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { BrnComboboxAnchor, BrnComboboxPopoverTrigger, injectBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-chips',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxAnchor, BrnComboboxPopoverTrigger],
	host: {
		'data-slot': 'combobox-chips',
		'[attr.data-matches-spartan-invalid]': '_spartanInvalid() ? "true" : null',
	},
	template: '<ng-content />',
})
export class CapsComboboxChips {
	private readonly _combobox = injectBrnComboboxBase();

	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected readonly _spartanInvalid = computed(
		() => this.forceInvalid() || this._combobox.controlState?.()?.spartanInvalid,
	);

	constructor() {
		classes(() => 'caps-combobox-chips');
	}
}
