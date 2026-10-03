import { Directive } from '@angular/core';
import { BrnDialogClose } from '@spartan-ng/brain/dialog';
@Directive({ selector: 'button[capsDialogClose]', hostDirectives: [BrnDialogClose], host: { type: 'button' } })
export class CapsDialogClose {}
