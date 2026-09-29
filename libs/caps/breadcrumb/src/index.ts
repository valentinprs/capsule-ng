import { CapsBreadcrumb } from './lib/caps-breadcrumb';
import { CapsBreadcrumbEllipsis } from './lib/caps-breadcrumb-ellipsis';
import { CapsBreadcrumbItem } from './lib/caps-breadcrumb-item';

export * from './lib/caps-breadcrumb';
export * from './lib/caps-breadcrumb-ellipsis';
export * from './lib/caps-breadcrumb-item';

export const CapsBreadcrumbImports = [CapsBreadcrumb, CapsBreadcrumbItem, CapsBreadcrumbEllipsis] as const;
