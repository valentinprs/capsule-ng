import { Directive } from '@angular/core';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnTextarea } from '@spartan-ng/brain/textarea';
import { classes } from '@spartan-ng/helm/utils';

/**
 * Styles a native textarea and composes Brain's field, label and validation behavior.
 * Value bindings, multiline editing, native attributes and resizing stay on the textarea.
 */
@Directive({
	selector: 'textarea[capsTextarea]',
	hostDirectives: [
		{ directive: BrnTextarea, inputs: ['id', 'forceInvalid'] },
		{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
	],
	host: { 'data-slot': 'textarea' },
})
export class CapsTextarea {
	constructor() {
		classes(
			() =>
				'caps-textarea placeholder:text-muted-foreground flex field-sizing-content min-h-(--caps-textarea-min-height) w-full outline-none disabled:cursor-not-allowed disabled:opacity-(--caps-opacity-disabled)',
		);
	}
}
