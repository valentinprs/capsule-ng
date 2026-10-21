import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnComboboxAnchor, BrnComboboxPopoverTrigger, injectBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-chips',
	imports: [NgIcon],
	providers: [provideIcons({ lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxAnchor, BrnComboboxPopoverTrigger],
	host: {
		'data-slot': 'combobox-chips',
		'[attr.data-matches-spartan-invalid]': '_spartanInvalid() ? "true" : null',
	},
	template: `
		<ng-content />
		<ng-icon aria-hidden="true" name="lucideChevronDown" class="caps-combobox-chips-icon" />
	`,
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
