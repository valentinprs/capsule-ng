import { Component, ViewEncapsulation } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	tablerCamera,
	tablerChartBar,
	tablerCirclePlus,
	tablerCreditCard,
	tablerDashboard,
	tablerDatabase,
	tablerDots,
	tablerDotsVertical,
	tablerFileAi,
	tablerFileDescription,
	tablerFileWord,
	tablerFolder,
	tablerFolders,
	tablerHelp,
	tablerInnerShadowTop,
	tablerListDetails,
	tablerLogout,
	tablerNotification,
	tablerReport,
	tablerSearch,
	tablerSettings,
	tablerShare3,
	tablerTrash,
	tablerUserCircle,
	tablerUsers,
} from '@ng-icons/tabler-icons';
import { DashboardCardSection } from '../../(home)/components/dashboard/components/card-section';
import { DashboardTableSection } from '../../(home)/components/dashboard/components/table-section';

@Component({
	selector: 'spartan-dashboard-layout',
	imports: [
		CapsSidebarImports,
		NgIcon,
		CapsDropdownMenuImports,
		CapsAvatarImports,
		CapsButton,
		DashboardCardSection,
		DashboardTableSection,
	],
	providers: [
		provideIcons({
			tablerInnerShadowTop,
			tablerDashboard,
			tablerListDetails,
			tablerChartBar,
			tablerFolder,
			tablerUsers,
			tablerCamera,
			tablerFileDescription,
			tablerFileAi,
			tablerSettings,
			tablerHelp,
			tablerSearch,
			tablerDatabase,
			tablerReport,
			tablerFileWord,
			tablerDots,
			tablerFolders,
			tablerShare3,
			tablerTrash,
			tablerDotsVertical,
			tablerUserCircle,
			tablerCreditCard,
			tablerNotification,
			tablerLogout,
			tablerCirclePlus,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styles: [
		`
			caps-sidebar-wrapper {
				--sidebar-width: calc(var(--spacing) * 64);
				--header-height: calc(var(--spacing) * 12 + 1px);
			}
		`,
	],
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-header class="border-b">
					<caps-sidebar-menu>
						<a capsSidebarMenuButton class="!p-1.5" href="#">
							<ng-icon aria-hidden="true" name="tablerInnerShadowTop" />
							<span class="text-base font-semibold">Acme Inc.</span>
						</a>
					</caps-sidebar-menu>
				</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Home</caps-sidebar-group-label>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								@for (item of _items.navMain; track item.title) {
									<caps-sidebar-menu-item>
										<a capsSidebarMenuButton href="#">
											<ng-icon aria-hidden="true" [name]="item.icon" />
											<span>{{ item.title }}</span>
										</a>
									</caps-sidebar-menu-item>
								}
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Home</caps-sidebar-group-label>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								@for (item of _items.documents; track item.name) {
									<caps-sidebar-menu-item>
										<a capsSidebarMenuButton href="#">
											<ng-icon aria-hidden="true" [name]="item.icon" />
											<span>{{ item.name }}</span>
										</a>
										<button capsSidebarMenuAction [showOnHover]="true" [capsDropdownMenuTrigger]="menu">
											<ng-icon aria-hidden="true" name="tablerDots" />
											<span class="sr-only">More</span>
										</button>
									</caps-sidebar-menu-item>
								}
								<caps-sidebar-menu-item>
									<a capsSidebarMenuButton class="text-sidebar-foreground/70" href="#">
										<ng-icon aria-hidden="true" name="tablerDots" class="text-sidebar-foreground/70" />
										<span>More</span>
									</a>
								</caps-sidebar-menu-item>
								<ng-template #menu>
									<caps-menu class="w-24 rounded-lg">
										<button capsMenuItem>
											<ng-icon aria-hidden="true" name="tablerFolder" />
											<span>Open</span>
										</button>

										<button capsMenuItem>
											<ng-icon aria-hidden="true" name="tablerShare3" />
											<span>Share</span>
										</button>
										<caps-menu-separator />
										<button capsMenuItem danger>
											<ng-icon aria-hidden="true" name="tablerTrash" />
											<span>Delete</span>
										</button>
									</caps-menu>
								</ng-template>
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
					<caps-sidebar-group class="mt-auto">
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								@for (item of _items.navSecondary; track item.title) {
									<caps-sidebar-menu-item>
										<a capsSidebarMenuButton href="#">
											<ng-icon aria-hidden="true" [name]="item.icon" />
											<span>{{ item.title }}</span>
										</a>
									</caps-sidebar-menu-item>
								}
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
				</caps-sidebar-content>
				<caps-sidebar-footer>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button
								capsSidebarMenuButton
								size="lg"
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								[capsDropdownMenuTrigger]="userMenu"
							>
								<caps-avatar class="size-8 rounded-lg grayscale">
									<img [src]="_items.user.avatar" alt="spartan logo. Resembling a spartanic shield" capsAvatarImage />
									<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">SP</caps-avatar-fallback>
								</caps-avatar>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-medium">{{ _items.user.name }}</span>
									<span class="text-muted-foreground truncate text-xs">
										{{ _items.user.email }}
									</span>
								</div>
								<ng-icon aria-hidden="true" name="tablerDotsVertical" class="ml-auto" />
							</button>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
					<ng-template #userMenu>
						<caps-menu class="min-w-56 rounded-lg">
							<caps-menu-label class="p-0 font-normal">
								<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<caps-avatar class="size-8 rounded-lg">
										<img [src]="_items.user.avatar" alt="spartan logo. Resembling a spartanic shield" capsAvatarImage />
										<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">SP</caps-avatar-fallback>
									</caps-avatar>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-medium">{{ _items.user.name }}</span>
										<span class="text-muted-foreground truncate text-xs">
											{{ _items.user.email }}
										</span>
									</div>
								</div>
							</caps-menu-label>
							<caps-menu-separator />
							<caps-menu-group>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="tablerUserCircle" />
									<span>Account</span>
								</button>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="tablerCreditCard" />
									<span>Billing</span>
								</button>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="tablerNotification" />
									<span>Notifications</span>
								</button>
							</caps-menu-group>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="tablerLogout" />
								<span>Logout</span>
							</button>
						</caps-menu>
					</ng-template>
				</caps-sidebar-footer>
			</caps-sidebar>
			<caps-sidebar-inset>
				<div class="flex min-w-0 flex-1 flex-col">
					<header
						class="bg-background/90 sticky top-0 z-(--caps-z-10) flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
					>
						<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
							<h1 class="text-base font-medium">Documents</h1>
							<div class="ml-auto flex items-center gap-2">
								<button capsButton size="sm" class="hidden h-7 sm:flex">
									<ng-icon aria-hidden="true" name="tablerCirclePlus" />
									<span>Quick Create</span>
								</button>
							</div>
						</div>
					</header>
					<div class="flex flex-1 flex-col">
						<div class="@container/main flex flex-1 flex-col gap-2">
							<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
								<h2 class="sr-only">Document overview</h2>
								<spartan-dashboard-card-section />
								<spartan-dashboard-table-section />
							</div>
						</div>
					</div>
				</div>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
	`,
})
export default class DashboardLayoutPage {
	protected readonly _items = {
		user: {
			name: 'spartan',
			email: 'demo@example.com',
			avatar: '/assets/avatar.png',
		},
		navMain: [
			{
				title: 'Dashboard',
				url: '#',
				icon: 'tablerDashboard',
			},
			{
				title: 'Lifecycle',
				url: '#',
				icon: 'tablerListDetails',
			},
			{
				title: 'Analytics',
				url: '#',
				icon: 'tablerChartBar',
			},
			{
				title: 'Projects',
				url: '#',
				icon: 'tablerFolder',
			},
			{
				title: 'Team',
				url: '#',
				icon: 'tablerUsers',
			},
		],
		navClouds: [
			{
				title: 'Capture',
				icon: 'tablerCamera',
				isActive: true,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#',
					},
					{
						title: 'Archived',
						url: '#',
					},
				],
			},
			{
				title: 'Proposal',
				icon: 'tablerFileDescription',
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#',
					},
					{
						title: 'Archived',
						url: '#',
					},
				],
			},
			{
				title: 'Prompts',
				icon: 'tablerFileAi',
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#',
					},
					{
						title: 'Archived',
						url: '#',
					},
				],
			},
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '#',
				icon: 'tablerSettings',
			},
			{
				title: 'Get Help',
				url: '#',
				icon: 'tablerHelp',
			},
			{
				title: 'Search',
				url: '#',
				icon: 'tablerSearch',
			},
		],
		documents: [
			{
				name: 'Data Library',
				url: '#',
				icon: 'tablerDatabase',
			},
			{
				name: 'Reports',
				url: '#',
				icon: 'tablerReport',
			},
			{
				name: 'Word Assistant',
				url: '#',
				icon: 'tablerFileWord',
			},
		],
	};
}
