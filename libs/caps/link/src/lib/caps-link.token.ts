import { InjectionToken, type Signal } from '@angular/core';
import type { CapsLinkVariant } from './caps-link.variants';

/**
 * Optional context a parent component (e.g. `CapsBreadcrumbItem`) provides to the `capsLink` inside it,
 * so the link picks up a contextual variant and `aria-current`.
 */
export interface CapsLinkContext {
	readonly variant: Exclude<CapsLinkVariant, 'default'>;
	/** Whether the link points to the current page. */
	readonly isCurrent: Signal<boolean>;
}

export const CAPS_LINK_CONTEXT = new InjectionToken<CapsLinkContext>('CapsLinkContext');
