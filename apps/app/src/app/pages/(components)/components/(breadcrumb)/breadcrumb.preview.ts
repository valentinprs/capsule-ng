import { Component } from '@angular/core';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';

@Component({
	selector: 'spartan-breadcrumb-preview',
	imports: [CapsBreadcrumbImports],
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item href="/">Home</caps-breadcrumb-item>
			<caps-breadcrumb-item href="/components">Components</caps-breadcrumb-item>
			<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
export class BreadcrumbPreview {}

export const defaultImports = `
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
`;

export const defaultSkeleton = `
<caps-breadcrumb>
  <caps-breadcrumb-item href="/">Home</caps-breadcrumb-item>
  <caps-breadcrumb-item href="/components">Components</caps-breadcrumb-item>
  <caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
</caps-breadcrumb>
`;
