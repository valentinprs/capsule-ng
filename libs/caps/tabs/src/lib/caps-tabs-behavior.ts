import type { BooleanInput } from '@angular/cdk/coercion';
import { Directive, booleanAttribute, forwardRef, input } from '@angular/core';
import { BrnTabs, type BrnActivationMode } from '@spartan-ng/brain/tabs';

/** @internal Carbon input adaptation; selection and registration remain inherited from Brain. */
@Directive({
	providers: [{ provide: BrnTabs, useExisting: forwardRef(() => CapsTabsBehavior) }],
})
export class CapsTabsBehavior extends BrnTabs {
	// Brain fixes the inherited input's write brand to its enum. Only this private adapter widens
	// that brand; the transform and public Capsule input still accept BooleanInput.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override readonly activationMode = input<BrnActivationMode, any>('automatic', {
		alias: 'followFocus',
		transform: (value: BooleanInput): BrnActivationMode => (booleanAttribute(value) ? 'automatic' : 'manual'),
	});
	public override $activationMode = this.activationMode;
}
