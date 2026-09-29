import { CapsBreadcrumb } from './lib/caps-breadcrumb';
import { CapsBreadcrumbItem } from './lib/caps-breadcrumb-item';

export * from './lib/caps-breadcrumb';
export * from './lib/caps-breadcrumb-item';

export const CapsBreadcrumbImports = [CapsBreadcrumb, CapsBreadcrumbItem] as const;
