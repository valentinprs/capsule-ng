import { Directive } from '@angular/core';
import { BrnComboboxValueTemplate } from '@spartan-ng/brain/combobox';

@Directive({ selector: '[capsComboboxValueTemplate]', hostDirectives: [BrnComboboxValueTemplate] })
export class CapsComboboxValueTemplate {}
