import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-site-header-sticky',
	imports: [
		CapsInputImports,
		HlmSidebarImports,
		CapsSeparatorImports,
		CapsBreadcrumbImports,
		CapsInputGroupImports,
		NgIcon,
	],
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

				<caps-input-group class="w-full sm:ml-auto sm:w-auto">
					<input capsInput placeholder="Type to search..." aria-label="Type to search" />
					<caps-input-group-addon>
						<ng-icon name="lucideSearch" />
					</caps-input-group-addon>
				</caps-input-group>
			</div>
		</header>
	`,
})
export class SiteHeader {}
