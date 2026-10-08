import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { CapsDropdownMenuImports, type CapsMenuPlacement } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideBadgeCheck,
	lucideBell,
	lucideBookOpen,
	lucideBot,
	lucideChartPie,
	lucideChevronRight,
	lucideChevronsUpDown,
	lucideCreditCard,
	lucideEllipsis,
	lucideFolder,
	lucideFrame,
	lucideGalleryVerticalEnd,
	lucideLifeBuoy,
	lucideLogOut,
	lucideMap,
	lucideSend,
	lucideSettings2,
	lucideShare,
	lucideSparkles,
	lucideSquareTerminal,
	lucideTrash2,
} from '@ng-icons/lucide';

import { CapsSidebarImports, CapsSidebarService } from '@capsule-ng/caps/sidebar';

@Component({
	selector: 'spartan-sidebar-collapsable-icons',
	imports: [CapsSidebarImports, CapsCollapsibleImports, RouterLink, CapsAvatarImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideFrame,
			lucideChartPie,
			lucideMap,
			lucideLifeBuoy,
			lucideSend,
			lucideGalleryVerticalEnd,
			lucideChevronsUpDown,
			lucideSquareTerminal,
			lucideBot,
			lucideBookOpen,
			lucideSettings2,
			lucideChevronRight,
			lucideSparkles,
			lucideBadgeCheck,
			lucideCreditCard,
			lucideBell,
			lucideLogOut,
			lucideEllipsis,
			lucideFolder,
			lucideShare,
			lucideTrash2,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar collapsible="icon">
				<caps-sidebar-header>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button capsSidebarMenuButton size="lg">
								<div
									class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<ng-icon aria-hidden="true" name="lucideGalleryVerticalEnd" />
								</div>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-medium">Acme Inc</span>
									<span class="truncate text-xs">Enterprise</span>
								</div>
								<ng-icon aria-hidden="true" name="lucideChevronsUpDown" class="ml-auto" />
							</button>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
				</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Platform</caps-sidebar-group-label>
						<caps-sidebar-menu>
							@for (item of _platforms; track $index) {
								<caps-sidebar-menu-item>
									<caps-collapsible [expanded]="item.isActive ?? false" class="group/collapsible">
										<button capsSidebarMenuButton capsCollapsibleTrigger>
											<ng-icon aria-hidden="true" [name]="item.icon" />
											{{ item.title }}
											<ng-icon
												aria-hidden="true"
												name="lucideChevronRight"
												class="ml-auto transition-transform duration-(--caps-duration-200) group-data-[state=open]/collapsible:rotate-90"
											/>
										</button>

										<caps-collapsible-content>
											<caps-sidebar-menu-sub>
												@for (subItem of item.items; track $index) {
													<caps-sidebar-menu-sub-item>
														<a capsSidebarMenuSubButton [routerLink]="subItem.url">{{ subItem.title }}</a>
													</caps-sidebar-menu-sub-item>
												}
											</caps-sidebar-menu-sub>
										</caps-collapsible-content>
									</caps-collapsible>
								</caps-sidebar-menu-item>
							}
						</caps-sidebar-menu>
					</caps-sidebar-group>
					<caps-sidebar-group class="group-data-[collapsible=icon]:hidden">
						<caps-sidebar-group-label>Projects</caps-sidebar-group-label>
						<caps-sidebar-menu>
							@for (project of _projects; track $index) {
								<caps-sidebar-menu-item>
									<a capsSidebarMenuButton [routerLink]="project.url">
										<ng-icon aria-hidden="true" [name]="project.icon" />
										{{ project.name }}
									</a>
									<button
										capsSidebarMenuAction
										showOnHover
										[capsDropdownMenuTrigger]="projectMenu"
										[capsDropdownMenuTriggerData]="{ $implicit: { project } }"
										[placement]="_menuPlacement()"
									>
										<ng-icon aria-hidden="true" name="lucideEllipsis" />
										<span class="sr-only">More</span>
									</button>
								</caps-sidebar-menu-item>
							}
							<caps-sidebar-menu-item>
								<button capsSidebarMenuButton>
									<ng-icon aria-hidden="true" name="lucideEllipsis" />
									More
								</button>
							</caps-sidebar-menu-item>
						</caps-sidebar-menu>
					</caps-sidebar-group>

					<ng-template #projectMenu let-ctx>
						<caps-menu class="w-48">
							<caps-menu-label>{{ ctx.project.name }}</caps-menu-label>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideFolder" />
								View Project
							</button>
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideShare" />
								Share Project
							</button>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideTrash2" />
								Delete Project
							</button>
						</caps-menu>
					</ng-template>
				</caps-sidebar-content>
				<caps-sidebar-footer>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button
								capsSidebarMenuButton
								size="lg"
								[capsDropdownMenuTrigger]="avatarMenu"
								[placement]="_avatarPlacement()"
							>
								<caps-avatar class="rounded-lg">
									<img src="/assets/avatar.png" alt="spartan" capsAvatarImage />
									<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">RG</caps-avatar-fallback>
								</caps-avatar>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-medium">spartan</span>
									<span class="truncate text-xs">hello@spartan.com</span>
								</div>
								<ng-icon aria-hidden="true" name="lucideChevronsUpDown" class="ml-auto text-base" />
							</button>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>

					<ng-template #avatarMenu>
						<caps-menu class="min-w-56 rounded-lg">
							<caps-menu-label>
								<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<caps-avatar class="rounded-lg">
										<img src="/assets/avatar.png" alt="spartan" capsAvatarImage />
										<caps-avatar-fallback class="rounded-lg bg-[#D6004C] text-white">RG</caps-avatar-fallback>
									</caps-avatar>
									<div class="grid flex-1 text-left text-sm leading-tight">
										<span class="truncate font-medium">spartan</span>
										<span class="truncate text-xs">hello@spartan.com</span>
									</div>
								</div>
							</caps-menu-label>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideSparkles" />
								Upgrade to Pro
							</button>
							<caps-menu-separator />
							<caps-menu-group>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="lucideBadgeCheck" />
									Account
								</button>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="lucideCreditCard" />
									Billing
								</button>
								<button capsMenuItem>
									<ng-icon aria-hidden="true" name="lucideBell" />
									Notifications
								</button>
							</caps-menu-group>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon aria-hidden="true" name="lucideLogOut" />
								Log out
							</button>
						</caps-menu>
					</ng-template>
				</caps-sidebar-footer>
			</caps-sidebar>
			<caps-sidebar-inset>
				<div class="flex min-w-0 flex-1 flex-col">
					<header class="flex h-12 items-center justify-between px-4">
						<button capsSidebarTrigger></button>
					</header>
					<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
						<div class="grid auto-rows-min gap-4 md:grid-cols-3">
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
							<div class="bg-muted/50 aspect-video rounded-xl"></div>
						</div>
						<div class="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min"></div>
					</div>
				</div>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
	`,
})
export default class SidebarCollapsableIconsPage {
	protected readonly _avatarPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-end`);
	protected readonly _menuPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-${this._menuAlign()}`);
	private readonly _sidebarService = inject(CapsSidebarService);
	protected readonly _menuSide = computed(() => (this._sidebarService.isMobile() ? 'top' : 'right'));
	protected readonly _menuAlign = computed(() => (this._sidebarService.isMobile() ? 'end' : 'start'));
	protected readonly _platforms = [
		{
			title: 'Playground',
			url: '.',
			icon: 'lucideSquareTerminal',
			isActive: true,
			items: [
				{
					title: 'History',
					url: '.',
				},
				{
					title: 'Starred',
					url: '.',
				},
				{
					title: 'Settings',
					url: '.',
				},
			],
		},
		{
			title: 'Models',
			url: '.',
			icon: 'lucideBot',
			items: [
				{
					title: 'Genesis',
					url: '.',
				},
				{
					title: 'Explorer',
					url: '.',
				},
				{
					title: 'Quantum',
					url: '.',
				},
			],
		},
		{
			title: 'Documentation',
			url: '.',
			icon: 'lucideBookOpen',
			items: [
				{
					title: 'Introduction',
					url: '.',
				},
				{
					title: 'Get Started',
					url: '.',
				},
				{
					title: 'Tutorials',
					url: '.',
				},
				{
					title: 'Changelog',
					url: '.',
				},
			],
		},
		{
			title: 'Settings',
			url: '.',
			icon: 'lucideSettings2',
			items: [
				{
					title: 'General',
					url: '.',
				},
				{
					title: 'Team',
					url: '.',
				},
				{
					title: 'Billing',
					url: '.',
				},
				{
					title: 'Limits',
					url: '.',
				},
			],
		},
	];

	protected readonly _projects = [
		{
			name: 'Design Engineering',
			url: '.',
			icon: 'lucideFrame',
		},
		{
			name: 'Sales & Marketing',
			url: '.',
			icon: 'lucideChartPie',
		},
		{
			name: 'Travel',
			url: '.',
			icon: 'lucideMap',
		},
	];
}
