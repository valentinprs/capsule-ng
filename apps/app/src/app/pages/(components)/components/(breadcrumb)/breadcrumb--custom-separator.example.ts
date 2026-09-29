import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSlash } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-breadcrumb-custom-separator',
	imports: [CapsBreadcrumbImports, CapsLinkImports, RouterLink, NgIcon],
	providers: [provideIcons({ lucideSlash })],
	template: `
		<caps-breadcrumb>
			<ng-template capsBreadcrumbSeparator>
				<ng-icon name="lucideSlash" />
			</ng-template>
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
export class BreadcrumbCustomSeparator {}
