import { InjectionToken, type Signal } from '@angular/core';
import type { CapsBreadcrumbItem } from './caps-breadcrumb-item';

export interface CapsBreadcrumbContext {
	/** The items of the breadcrumb, in document order. */
	readonly items: Signal<readonly CapsBreadcrumbItem[]>;
}

export const CAPS_BREADCRUMB = new InjectionToken<CapsBreadcrumbContext>('CapsBreadcrumb');
