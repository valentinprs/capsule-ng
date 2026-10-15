import { Directive } from '@angular/core';
import { BrnComboboxValues } from '@spartan-ng/brain/combobox';

@Directive({ selector: '[capsComboboxValues]', hostDirectives: [BrnComboboxValues] })
export class CapsComboboxValues {}
