import { Directive } from '@angular/core';
import { buttonVariants } from '@capsule-ng/caps/button';
import { BrnComboboxChipRemove } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsComboboxChipRemove]',
	hostDirectives: [BrnComboboxChipRemove],
	host: { 'data-slot': 'combobox-chip-remove' },
})
export class CapsComboboxChipRemove {
	constructor() {
		classes(() => ['caps-combobox-chip-remove', buttonVariants({ variant: 'ghost', size: 'icon-xs' })]);
	}
}
