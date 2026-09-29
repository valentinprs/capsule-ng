import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-breadcrumb-dropdown',
	imports: [CapsBreadcrumbImports, CapsButtonImports, CapsLinkImports, HlmDropdownMenuImports, RouterLink],
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/">Home</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<button capsButton variant="ghost" size="icon" [hlmDropdownMenuTrigger]="breadcrumbDropdown">
					<caps-breadcrumb-ellipsis />
				</button>
				<ng-template #breadcrumbDropdown>
					<hlm-dropdown-menu>
						<button hlmDropdownMenuItem id="document">
							<span>Documentation</span>
						</button>
						<button hlmDropdownMenuItem id="themes">
							<span>Themes</span>
						</button>
						<button hlmDropdownMenuItem id="github">
							<span>Github</span>
						</button>
					</hlm-dropdown-menu>
				</ng-template>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/components">Components</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
		</caps-breadcrumb>
	`,
})
export class BreadcrumbDropdown {}
