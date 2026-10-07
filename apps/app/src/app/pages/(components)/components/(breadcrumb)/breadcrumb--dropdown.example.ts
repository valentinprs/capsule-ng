import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsLinkImports } from '@capsule-ng/caps/link';

@Component({
	selector: 'spartan-breadcrumb-dropdown',
	imports: [CapsBreadcrumbImports, CapsButtonImports, CapsLinkImports, CapsDropdownMenuImports, RouterLink],
	template: `
		<caps-breadcrumb>
			<caps-breadcrumb-item>
				<a capsLink routerLink="/">Home</a>
			</caps-breadcrumb-item>
			<caps-breadcrumb-item>
				<button capsButton variant="ghost" size="icon" [capsDropdownMenuTrigger]="breadcrumbDropdown">
					<caps-breadcrumb-ellipsis />
				</button>
				<ng-template #breadcrumbDropdown>
					<caps-menu>
						<button capsMenuItem id="document">
							<span>Documentation</span>
						</button>
						<button capsMenuItem id="themes">
							<span>Themes</span>
						</button>
						<button capsMenuItem id="github">
							<span>Github</span>
						</button>
					</caps-menu>
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
