import { Directive } from '@angular/core';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnInput } from '@spartan-ng/brain/input';
import { classes } from '@spartan-ng/helm/utils';

/**
 * Capsule styling for a native input. Brain supplies generated IDs, validation state and Field
 * descriptions; native attributes and Angular forms retain control of the value and disabled state.
 */
@Directive({
	selector: 'input[capsInput]',
	hostDirectives: [
		{ directive: BrnInput, inputs: ['id', 'forceInvalid'] },
		{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
	],
	host: { 'data-slot': 'input' },
})
export class CapsInput {
	constructor() {
		classes(
			() =>
				'caps-input file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
		);
	}
}
