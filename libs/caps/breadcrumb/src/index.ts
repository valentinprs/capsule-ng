import { CapsBreadcrumb } from './lib/caps-breadcrumb';
import { CapsBreadcrumbEllipsis } from './lib/caps-breadcrumb-ellipsis';
import { CapsBreadcrumbItem } from './lib/caps-breadcrumb-item';
import { CapsBreadcrumbSeparator } from './lib/caps-breadcrumb-separator';

export * from './lib/caps-breadcrumb';
export * from './lib/caps-breadcrumb-ellipsis';
export * from './lib/caps-breadcrumb-item';
export * from './lib/caps-breadcrumb-separator';
export type { CapsBreadcrumbSeparatorContent } from './lib/caps-breadcrumb.token';

export const CapsBreadcrumbImports = [
	CapsBreadcrumb,
	CapsBreadcrumbItem,
	CapsBreadcrumbSeparator,
	CapsBreadcrumbEllipsis,
] as const;
