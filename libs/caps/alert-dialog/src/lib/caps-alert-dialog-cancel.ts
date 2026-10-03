import { Directive } from '@angular/core';
import { BrnDialogClose } from '@spartan-ng/brain/dialog';
@Directive({
	selector: 'button[capsAlertDialogCancel]',
	hostDirectives: [BrnDialogClose],
	host: { type: 'button', cdkFocusInitial: '' },
})
export class CapsAlertDialogCancel {}
