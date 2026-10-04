import { Directive, ElementRef, inject } from '@angular/core';
import { BrnOverlay } from '@spartan-ng/brain/overlay';
import { BrnPopoverTrigger } from '@spartan-ng/brain/popover';
@Directive({
	selector: 'button[capsPopoverTrigger]',
	hostDirectives: [{ directive: BrnPopoverTrigger, inputs: ['id', 'type'] }],
})
export class CapsPopoverTrigger {
	constructor() {
		inject(BrnOverlay).setOrigin(inject(ElementRef<HTMLElement>).nativeElement);
	}
}
@Directive({ selector: 'button[capsPopoverClose]', host: { '(click)': '_overlay.close()', type: 'button' } })
export class CapsPopoverClose {
	protected readonly _overlay = inject(BrnOverlay);
}
