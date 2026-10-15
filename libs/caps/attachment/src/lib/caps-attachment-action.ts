import { Directive, input } from '@angular/core';
import { buttonVariants, type CapsButtonSize, type CapsButtonVariant } from '@capsule-ng/caps/button';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';

/** An independent native action, never nested inside the attachment trigger. */
@Directive({
	selector: 'button[capsAttachmentAction]',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: { 'data-slot': 'attachment-action', '[type]': 'type()' },
})
export class CapsAttachmentAction {
	public readonly type = input<'button' | 'submit' | 'reset'>('button');
	public readonly variant = input<CapsButtonVariant | null | undefined>('ghost');
	public readonly size = input<CapsButtonSize | null | undefined>('icon-xs');
	constructor() {
		classes(() => buttonVariants({ variant: this.variant(), size: this.size() }));
	}
}
