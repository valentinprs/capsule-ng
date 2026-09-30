import { Directive } from '@angular/core';
import { BrnFieldA11yService, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { classes } from '@spartan-ng/helm/utils';

/** Keeps native legend naming and fieldset disabled semantics. */
@Directive({
	selector: 'fieldset[capsFieldSet]',
	providers: [BrnFieldA11yService],
	hostDirectives: [{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] }],
	host: { 'data-slot': 'field-set' },
})
export class CapsFieldSet {
	constructor() {
		classes(() => 'caps-field-set flex min-w-0 flex-col');
	}
}
