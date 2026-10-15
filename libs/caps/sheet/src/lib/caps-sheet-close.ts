import { Directive } from '@angular/core';
import { BrnDialogClose } from '@spartan-ng/brain/dialog';
@Directive({ selector: 'button[capsSheetClose]', hostDirectives: [BrnDialogClose], host: { type: 'button' } })
export class CapsSheetClose {}
