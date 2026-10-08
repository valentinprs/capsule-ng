import { InjectionToken, type Signal } from '@angular/core';
export interface CapsComboboxContext {
	dir: Signal<'ltr' | 'rtl' | 'auto'>;
	multiple?: boolean;
}
export const CAPS_COMBOBOX_CONTEXT = new InjectionToken<CapsComboboxContext>('CapsComboboxContext');
