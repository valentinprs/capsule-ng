import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLinkImports } from '@capsule-ng/caps/link';

@Component({
	selector: 'spartan-breadcrumb-collapsed',
	imports: [CapsBreadcrumbImports, CapsLinkImports, RouterLink],
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/">Home</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<caps-breadcrumb-ellipsis />
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/components">Components</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
export class BreadcrumbCollapsed {}
