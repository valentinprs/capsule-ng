import { InjectionToken, type Signal, type TemplateRef } from '@angular/core';
import type { CapsBreadcrumbItem } from './caps-breadcrumb-item';

/** A custom breadcrumb separator: plain text, or a template rendered between every pair of items. */
export type CapsBreadcrumbSeparatorContent = string | TemplateRef<void>;

export interface CapsBreadcrumbContext {
	/** The items of the breadcrumb, in document order. */
	readonly items: Signal<readonly CapsBreadcrumbItem[]>;
	/** The custom separator, or `null` to render the default chevron. */
	readonly separatorContent: Signal<CapsBreadcrumbSeparatorContent | null>;
}

export const CAPS_BREADCRUMB = new InjectionToken<CapsBreadcrumbContext>('CapsBreadcrumb');
