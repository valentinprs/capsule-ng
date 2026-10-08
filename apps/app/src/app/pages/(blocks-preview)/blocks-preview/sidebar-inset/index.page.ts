import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { AppSidebarInset } from './sidebar-inset/app-sidebar';
import { SiteHeader } from './sidebar-inset/site-header';

@Component({
	selector: 'spartan-sidebar-inset',
	imports: [CapsSidebarImports, SiteHeader, AppSidebarInset],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block',
	},
	styleUrl: '../../blocks-preview-default.css',
	template: `
		<spartan-app-sidebar-inset>
			<caps-sidebar-inset>
				<div class="flex min-w-0 flex-1 flex-col">
					<spartan-site-header-inset />
					<div class="flex flex-1 flex-col gap-4 p-4">
						<div class="grid auto-rows-min gap-4 md:grid-cols-3">
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
						</div>
						<div class="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min"></div>
					</div>
				</div>
			</caps-sidebar-inset>
		</spartan-app-sidebar-inset>
	`,
})
export default class SidebarInsetPage {}
