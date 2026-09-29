import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLink } from '@capsule-ng/caps/link';

@Component({
	selector: 'spartan-breadcrumb-preview',
	imports: [CapsBreadcrumbImports, CapsLink, RouterLink],
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/">Home</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/components">Components</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
export class BreadcrumbPreview {}

export const defaultImports = `
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLink } from '@capsule-ng/caps/link';
`;

export const defaultSkeleton = `
<caps-breadcrumb>
  <caps-breadcrumb-item>
    <a capsLink routerLink="/">Home</a>
  </caps-breadcrumb-item>
  <caps-breadcrumb-item>
    <a capsLink routerLink="/components">Components</a>
  </caps-breadcrumb-item>
  <caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
</caps-breadcrumb>
`;
