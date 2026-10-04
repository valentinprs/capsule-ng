import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-site-header-inset',
	imports: [HlmSidebarImports, CapsSeparatorImports, CapsBreadcrumbImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<header class="flex h-16 shrink-0 items-center gap-2">
			<div class="flex items-center gap-2 px-4">
				<button hlmSidebarTrigger></button>
				<caps-separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<caps-breadcrumb>
					<caps-breadcrumb-item href="/" class="hidden sm:flex">Building Your Application</caps-breadcrumb-item>
					<caps-breadcrumb-item class="max-sm:[&>[data-slot=breadcrumb-separator]]:hidden">
						Data Fetching
					</caps-breadcrumb-item>
				</caps-breadcrumb>
			</div>
		</header>
	`,
})
export class SiteHeader {}
