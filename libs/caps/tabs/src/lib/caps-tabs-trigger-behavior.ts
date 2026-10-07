import { Directive, forwardRef } from '@angular/core';
import { BrnTabsTrigger } from '@spartan-ng/brain/tabs';

/** @internal Guard Brain's imperative focus/activation, including pagination. */
@Directive({ providers: [{ provide: BrnTabsTrigger, useExisting: forwardRef(() => CapsTabsTriggerBehavior) }] })
export class CapsTabsTriggerBehavior extends BrnTabsTrigger {
	public override activate() {
		if (!this.disabled) super.activate();
	}
	public override focus() {
		if (!this.disabled) super.focus();
	}
}
