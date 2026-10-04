import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-site-header-sticky',
	imports: [HlmSidebarImports, CapsSeparatorImports, CapsBreadcrumbImports, HlmInputGroupImports, NgIcon],
	providers: [provideIcons({ lucideSearch })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<header class="bg-background sticky top-0 z-(--caps-z-50) flex w-full items-center border-b">
			<div class="flex h-(--header-height) w-full items-center gap-2 px-4">
				<button hlmSidebarTrigger></button>
				<caps-separator orientation="vertical" class="mr-2" />
				<caps-breadcrumb class="hidden sm:block">
					<caps-breadcrumb-item href="/">Building Your Application</caps-breadcrumb-item>
					<caps-breadcrumb-item>Data Fetching</caps-breadcrumb-item>
				</caps-breadcrumb>

				<div hlmInputGroup class="w-full sm:ml-auto sm:w-auto">
					<input hlmInputGroupInput placeholder="Type to search..." />
					<div hlmInputGroupAddon>
						<ng-icon name="lucideSearch" />
					</div>
				</div>
			</div>
		</header>
	`,
})
export class SiteHeader {}
