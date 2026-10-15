import { InjectionToken, type Signal } from '@angular/core';
export interface CapsAutocompleteContext {
	dir: Signal<'ltr' | 'rtl' | 'auto'>;
}
export const CAPS_AUTOCOMPLETE_CONTEXT = new InjectionToken<CapsAutocompleteContext>('CapsAutocompleteContext');
