import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCalendar,
	lucideEllipsis,
	lucideHouse,
	lucideInbox,
	lucideMenu,
	lucideSearch,
	lucideSettings,
} from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<object> = {
	title: 'Sidebar',
	tags: ['autodocs'],

	decorators: [
		moduleMetadata({
			imports: [FormsModule, ReactiveFormsModule, CapsSidebarImports],
		}),
	],
};

export default meta;
type Story = StoryObj<object>;

@Component({
	selector: 'sidebar',
	imports: [CapsSidebarImports, NgIcon],
	providers: [
		provideIcons({
			lucideHouse,
			lucideInbox,
			lucideCalendar,
			lucideSearch,
			lucideSettings,
			lucideMenu,
			lucideEllipsis,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar side="left">
				<caps-sidebar-header>
					<h1 class="text-2xl font-bold">My app</h1>
					<caps-sidebar-group>
						<caps-sidebar-group-content class="relative">
							<input capsSidebarInput aria-label="Search navigation" placeholder="Search" class="pl-8" />
							<ng-icon
								aria-hidden="true"
								name="lucideSearch"
								class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-(--caps-opacity-50) select-none"
							></ng-icon>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
				</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Application</caps-sidebar-group-label>
						<button capsSidebarGroupAction aria-label="Application actions">
							<ng-icon aria-hidden="true" name="lucideEllipsis" />
						</button>

						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton [isActive]="true">
										<ng-icon aria-hidden="true" name="lucideHouse" />
										<span>Home</span>
									</button>
									<caps-sidebar-menu-sub>
										<caps-sidebar-menu-sub-item>
											<a capsSidebarMenuSubButton href="#home">
												<ng-icon aria-hidden="true" name="lucideHouse" />
												<span>Home</span>
											</a>
										</caps-sidebar-menu-sub-item>
										<caps-sidebar-menu-sub-item>
											<a capsSidebarMenuSubButton href="#home">
												<ng-icon aria-hidden="true" name="lucideHouse" />
												<span>Home</span>
											</a>
										</caps-sidebar-menu-sub-item>
									</caps-sidebar-menu-sub>
								</caps-sidebar-menu-item>

								<!-- Home -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton>
										<ng-icon aria-hidden="true" name="lucideHouse" />
										<span>Home</span>
									</button>
									<button capsSidebarMenuAction aria-label="Home actions">
										<ng-icon aria-hidden="true" name="lucideEllipsis" />
									</button>
								</caps-sidebar-menu-item>

								<!-- Inbox -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Inbox">
										<ng-icon aria-hidden="true" name="lucideInbox" />
										<span>Inbox</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Calendar -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Calendar">
										<ng-icon aria-hidden="true" name="lucideCalendar" />
										<span>Calendar</span>
									</button>
								</caps-sidebar-menu-item>
								<caps-sidebar-menu-item><caps-sidebar-separator /></caps-sidebar-menu-item>

								<!-- Search -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Search">
										<ng-icon aria-hidden="true" name="lucideSearch" />
										<span>Search</span>
										<caps-sidebar-menu-badge>10</caps-sidebar-menu-badge>
									</button>
								</caps-sidebar-menu-item>

								<!-- Settings -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Settings">
										<ng-icon aria-hidden="true" name="lucideSettings" />
										<span>Settings</span>
									</button>
								</caps-sidebar-menu-item>
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Application1</caps-sidebar-group-label>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								<!-- Home -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Home">
										<ng-icon aria-hidden="true" name="lucideHouse" />
										<span>Home</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Inbox -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Inbox">
										<ng-icon aria-hidden="true" name="lucideInbox" />
										<span>Inbox</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Calendar -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Calendar">
										<ng-icon aria-hidden="true" name="lucideCalendar" />
										<span>Calendar</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Search -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Search">
										<ng-icon aria-hidden="true" name="lucideSearch" />
										<span>Search</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Settings -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Settings">
										<ng-icon aria-hidden="true" name="lucideSettings" />
										<span>Settings</span>
									</button>
								</caps-sidebar-menu-item>
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
				</caps-sidebar-content>

				<caps-sidebar-footer>
					<button capsSidebarMenuButton tooltip="Settings">
						<ng-icon aria-hidden="true" name="lucideSettings" />
						<span>Settings</span>
					</button>
				</caps-sidebar-footer>

				<!-- Rail for resizing -->
				<button capsSidebarRail></button>
			</caps-sidebar>
			<caps-sidebar-inset>
				<main class="flex min-w-0 flex-1 flex-col">
					<div class="flex h-screen w-full flex-col items-center justify-center">
						<button capsSidebarTrigger></button>
						<h1 class="text-2xl font-bold">Hello World</h1>
					</div>
				</main>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
	`,
})
class Sidebar {}

export const Default: Story = {
	decorators: [
		moduleMetadata({
			imports: [Sidebar],
		}),
	],
	render: () => ({
		template: '<sidebar/>',
	}),
};

@Component({
	selector: 'sidebar',
	imports: [CapsSidebarImports, NgIcon],
	providers: [
		provideIcons({
			lucideHouse,
			lucideInbox,
			lucideCalendar,
			lucideSearch,
			lucideSettings,
			lucideMenu,
			lucideEllipsis,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar-inset>
				<main class="flex min-w-0 flex-1 flex-col">
					<div class="flex h-screen w-full flex-col items-center justify-center">
						<button capsSidebarTrigger></button>
						<h1 class="text-2xl font-bold">Hello World</h1>
					</div>
				</main>
			</caps-sidebar-inset>
			<caps-sidebar side="right">
				<caps-sidebar-header>
					<h1 class="text-2xl font-bold">My app</h1>
					<caps-sidebar-group>
						<caps-sidebar-group-content class="relative">
							<input capsSidebarInput aria-label="Search navigation" placeholder="Search" class="pl-8" />
							<ng-icon
								aria-hidden="true"
								name="lucideSearch"
								class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-(--caps-opacity-50) select-none"
							></ng-icon>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
				</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Application</caps-sidebar-group-label>
						<button capsSidebarGroupAction aria-label="Application actions">
							<ng-icon aria-hidden="true" name="lucideEllipsis" />
						</button>

						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton [isActive]="true">
										<ng-icon aria-hidden="true" name="lucideHouse" />
										<span>Home</span>
									</button>
									<caps-sidebar-menu-sub>
										<caps-sidebar-menu-sub-item>
											<a capsSidebarMenuSubButton href="#home">
												<ng-icon aria-hidden="true" name="lucideHouse" />
												<span>Home</span>
											</a>
										</caps-sidebar-menu-sub-item>
										<caps-sidebar-menu-sub-item>
											<a capsSidebarMenuSubButton href="#home">
												<ng-icon aria-hidden="true" name="lucideHouse" />
												<span>Home</span>
											</a>
										</caps-sidebar-menu-sub-item>
									</caps-sidebar-menu-sub>
								</caps-sidebar-menu-item>

								<!-- Home -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton>
										<ng-icon aria-hidden="true" name="lucideHouse" />
										<span>Home</span>
									</button>
									<button capsSidebarMenuAction aria-label="Home actions">
										<ng-icon aria-hidden="true" name="lucideEllipsis" />
									</button>
								</caps-sidebar-menu-item>

								<!-- Inbox -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Inbox">
										<ng-icon aria-hidden="true" name="lucideInbox" />
										<span>Inbox</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Calendar -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Calendar">
										<ng-icon aria-hidden="true" name="lucideCalendar" />
										<span>Calendar</span>
									</button>
								</caps-sidebar-menu-item>
								<caps-sidebar-menu-item><caps-sidebar-separator /></caps-sidebar-menu-item>

								<!-- Search -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Search">
										<ng-icon aria-hidden="true" name="lucideSearch" />
										<span>Search</span>
										<caps-sidebar-menu-badge>10</caps-sidebar-menu-badge>
									</button>
								</caps-sidebar-menu-item>

								<!-- Settings -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Settings">
										<ng-icon aria-hidden="true" name="lucideSettings" />
										<span>Settings</span>
									</button>
								</caps-sidebar-menu-item>
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Application1</caps-sidebar-group-label>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								<!-- Home -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Home">
										<ng-icon aria-hidden="true" name="lucideHouse" />
										<span>Home</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Inbox -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Inbox">
										<ng-icon aria-hidden="true" name="lucideInbox" />
										<span>Inbox</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Calendar -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Calendar">
										<ng-icon aria-hidden="true" name="lucideCalendar" />
										<span>Calendar</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Search -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Search">
										<ng-icon aria-hidden="true" name="lucideSearch" />
										<span>Search</span>
									</button>
								</caps-sidebar-menu-item>

								<!-- Settings -->
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton tooltip="Settings">
										<ng-icon aria-hidden="true" name="lucideSettings" />
										<span>Settings</span>
									</button>
								</caps-sidebar-menu-item>
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
				</caps-sidebar-content>

				<caps-sidebar-footer>
					<button capsSidebarMenuButton tooltip="Settings">
						<ng-icon aria-hidden="true" name="lucideSettings" />
						<span>Settings</span>
					</button>
				</caps-sidebar-footer>

				<!-- Rail for resizing -->
				<button capsSidebarRail></button>
			</caps-sidebar>
		</caps-sidebar-wrapper>
	`,
})
class SidebarRight {}

export const RightSide: Story = {
	decorators: [
		moduleMetadata({
			imports: [SidebarRight],
		}),
	],
	render: () => ({
		template: '<sidebar/>',
	}),
};

@Component({
	selector: 'sidebar-configured-widths',
	imports: [CapsSidebarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-wrapper sidebarWidth="17rem" sidebarWidthIcon="4rem">
			<caps-sidebar side="right" collapsible="icon" sidebarWidthMobile="32rem" aria-label="Workspace">
				<caps-sidebar-header>Workspace</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<a capsSidebarMenuButton href="#projects" tooltip="Projects">
								<span aria-hidden="true">▣</span>
								<span>Projects</span>
							</a>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
				</caps-sidebar-content>
			</caps-sidebar>
			<caps-sidebar-inset>
				<main>
					<button capsSidebarTrigger></button>
					<h1>Projects</h1>
				</main>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
	`,
})
class SidebarConfiguredWidths {}
export const ConfiguredWidths: Story = {
	decorators: [moduleMetadata({ imports: [SidebarConfiguredWidths] })],
	render: () => ({ template: '<sidebar-configured-widths />' }),
};
