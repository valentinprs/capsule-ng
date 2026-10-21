import type { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideExternalLink } from '@ng-icons/lucide';
import { HlmCode, HlmP } from '@spartan-ng/helm/typography';
import { injectComponentDocs } from '../../../../core/services/component-docs';
import { Code } from '../../../../shared/code/code';
import { RtlHeader } from '../../../../shared/code/rtl-header';
import { MainSection } from '../../../../shared/layout/main-section';
import { PageBottomNav } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '../../../../shared/layout/page-nav/page-nav';
import { SectionIntro } from '../../../../shared/layout/section-intro';
import { SectionSubHeading } from '../../../../shared/layout/section-sub-heading';
import { SectionSubSubHeading } from '../../../../shared/layout/section-sub-sub-heading';
import { Tabs } from '../../../../shared/layout/tabs';
import { UIApiDocs } from '../../../../shared/layout/ui-docs-section/ui-docs-section';
import { metaWith } from '../../../../shared/meta/meta.util';
import { SidebarPreview } from '../../../../shared/sidebar-preview/sidebar-preview';
import { link } from '../../../../shared/typography/link';
import {
	button,
	collapsable,
	content,
	cssCode,
	firstSidebar,
	firstSidebarApp,
	firstSidebarInitial,
	footer,
	group,
	groupAction,
	header,
	linkActive,
	linkWithIcon,
	menu,
	menuAction,
	menuActionExample,
	menuBadge,
	menuSubCollapsableExample,
	menuSubExample,
	provider,
	separator,
	skeleton,
	usageApp,
	usageLayout,
} from './sidebar.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'sidebar', api: 'sidebar' },
	meta: metaWith('Capsule — sidebar', 'A composable, themeable and customizable sidebar component.'),
	title: 'Capsule — Sidebar',
};

@Component({
	selector: 'spartan-sidebar',
	imports: [
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,

		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		HlmP,
		HlmCode,

		UIApiDocs,
		RouterLink,
		SectionSubSubHeading,
		SidebarPreview,
		Tabs,
		RtlHeader,
		CapsButton,
		NgIcon,
	],
	providers: [provideIcons({ lucideExternalLink })],
	template: `
		<section spartanMainSection class="space-y-4">
			<spartan-section-intro name="Sidebar" lead="A composable, themeable and customizable sidebar component." />

			<spartan-sidebar-preview name="sidebar-collapsable-icons" caption="A sidebar that collapses to icons." />

			<div>
				<spartan-section-sub-heading id="add-colors">Use the shared Capsule preset</spartan-section-sub-heading>
				<p hlmP class="mb-6">
					Import the shared Capsule foundations and component preset after your Tailwind setup.
					<br />
					We'll go over the colors later in the
					<a class="${link}" routerLink="." fragment="theming">theming section</a>
					.
				</p>

				<spartan-code [code]="_cssCode" />
			</div>
			<spartan-section-sub-heading id="structure">Structure</spartan-section-sub-heading>

			<div class="leading-relaxed not-first:mt-2" hlmP>
				A
				<span hlmCode>Sidebar</span>
				component is composed of the following parts:
			</div>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>CapsSidebarService</span>
					- Handles collapsible state.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebar</span>
					- The sidebar container.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarHeader</span>
					and
					<span hlmCode>CapsSidebarFooter</span>
					- Sticky at the top and bottom of the sidebar.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarContent</span>
					- Scrollable content.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarGroup</span>
					- Section within the
					<span hlmCode>CapsSidebarContent</span>
					.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarTrigger</span>
					- Trigger for the
					<span hlmCode>CapsSidebar</span>
					.
				</li>
			</ul>

			<figure class="border-border rounded-lg border p-4">
				<figcaption class="mb-3 text-sm font-medium">Sidebar anatomy</figcaption>
				<div class="bg-sidebar text-sidebar-foreground flex max-w-sm flex-col gap-2 rounded-md p-2 text-sm">
					<code>&lt;caps-sidebar&gt;</code>
					<div class="border-sidebar-border rounded border p-3">
						<code>caps-sidebar-header</code>
						— fixed at the top
					</div>
					<div class="border-sidebar-border space-y-2 rounded border p-3">
						<code>caps-sidebar-content</code>
						— scrollable
						<div class="border-sidebar-border rounded border p-2"><code>caps-sidebar-group</code></div>
						<div class="border-sidebar-border rounded border p-2"><code>caps-sidebar-group</code></div>
					</div>
					<div class="border-sidebar-border rounded border p-3">
						<code>caps-sidebar-footer</code>
						— fixed at the bottom
					</div>
				</div>
			</figure>

			<div class="mt-6 space-y-4">
				<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
				<spartan-code fileName="src/app/app.ts" [code]="_usageApp" />
				<spartan-code fileName="src/app/app-sidebar.ts" [code]="_usageLayout" />
			</div>

			<div class="mt-6 space-y-4">
				<spartan-section-sub-heading id="first-sidebar">Your First Sidebar</spartan-section-sub-heading>

				<p hlmP>Let's start with the most basic sidebar. A collapsible sidebar with a menu.</p>

				<h3 spartanH4>
					Add a
					<span hlmCode>CapsSidebarTrigger</span>
					at the root of your application.
				</h3>
				<spartan-code fileName="src/app/app.ts" [code]="_firstSidebarApp" />
				<h3 spartanH4>
					Create a new sidebar component at
					<span hlmCode>src/app/app-sidebar.ts</span>
				</h3>

				<spartan-code fileName="src/app/app-sidebar.ts" [code]="_firstSidebarInitial" />

				<h3 spartanH4>
					Now, let's add a
					<span hlmCode>CapsSidebarMenu</span>
					to the sidebar.
				</h3>
				<p hlmP>
					We'll use the
					<span hlmCode>CapsSidebarMenu</span>
					component in a
					<span hlmCode>CapsSidebarGroup</span>
					.
				</p>
				<spartan-code fileName="src/app/app-sidebar.ts" [code]="_firstSidebar" />
				<h3 spartanH4>You've created your first sidebar.</h3>
				<p>You should see something like this:</p>

				<spartan-sidebar-preview name="first-sidebar" caption="Your first sidebar." />
			</div>

			<spartan-section-sub-heading id="sidebar-service">SidebarService</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarService</span>
				manages the state, persistence, and responsive behavior of the sidebar. It ensures the sidebar works
				consistently across devices, remembers user preferences, and provides developer APIs for customization.
			</p>

			<h3 spartanH4 id="core_responsibilities">Core Responsibilities</h3>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>State Management</span>
					– Tracks whether the sidebar is expanded or collapsed.
				</li>
				<li class="mt-2">
					<span hlmCode>Mobile Responsiveness</span>
					– Detects screen size and manages a separate mobile overlay state.
				</li>
				<li class="mt-2">
					<span hlmCode>Persistence</span>
					– Stores sidebar state in cookies for 7 days.
				</li>
				<li class="mt-2">
					<span hlmCode>Variants</span>
					– Supports
					<span hlmCode>sidebar</span>
					,
					<span hlmCode>floating</span>
					, and
					<span hlmCode>inset</span>
					display styles.
				</li>
				<li class="mt-2">
					<span hlmCode>Keyboard Shortcuts</span>
					– Toggle with
					<span hlmCode>Ctrl / ⌘ + B</span>
					.
				</li>
				<li class="mt-2">
					<span hlmCode>Cleanup</span>
					– Removes event listeners on destroy.
				</li>
			</ul>

			<h3 spartanH4 id="signals_and_computed">Signals & Computed</h3>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>open</span>
					– Whether the desktop sidebar is open.
				</li>
				<li class="mt-2">
					<span hlmCode>openMobile</span>
					– Whether the mobile sidebar is open.
				</li>
				<li class="mt-2">
					<span hlmCode>isMobile</span>
					– Whether the viewport is below 768px.
				</li>
				<li class="mt-2">
					<span hlmCode>variant</span>
					– Current sidebar style (
					<span hlmCode>sidebar</span>
					,
					<span hlmCode>floating</span>
					, or
					<span hlmCode>inset</span>
					).
				</li>
				<li class="mt-2">
					<span hlmCode>state</span>
					– Computed:
					<span hlmCode>'expanded'</span>
					or
					<span hlmCode>'collapsed'</span>
					.
				</li>
			</ul>

			<h3 spartanH4 id="public_api">Public API</h3>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>setOpen(open: boolean)</span>
					– Opens or closes the desktop sidebar (persists state in a cookie).
				</li>
				<li class="mt-2">
					<span hlmCode>setOpenMobile(open: boolean)</span>
					– Opens/closes the mobile sidebar.
				</li>
				<li class="mt-2">
					<span hlmCode>setVariant(variant)</span>
					– Sets the sidebar style.
				</li>
				<li class="mt-2">
					<span hlmCode>toggleSidebar()</span>
					– Toggles the sidebar depending on desktop/mobile mode.
				</li>
			</ul>

			<h3 spartanH4 id="keyboard_shortcut">Keyboard Shortcut</h3>
			<p hlmP>
				The
				<span hlmCode>sidebarKeyboardShortcut</span>
				configuration property defines the keyboard shortcut used to open and close the sidebar.
			</p>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					On macOS, use
					<span hlmCode>⌘ + B</span>
					to toggle the sidebar.
				</li>
				<li class="mt-2">
					On Windows/Linux, use
					<span hlmCode>Ctrl + B</span>
					to toggle the sidebar.
				</li>
			</ul>
			<p hlmP>
				To change the shortcut, configure the value of
				<span hlmCode>sidebarKeyboardShortcut</span>
				in the
				<span hlmCode>CapsSidebarService</span>
				source. By default it is set to
				<span hlmCode>'b'</span>
				.
			</p>

			<spartan-section-sub-heading id="sidebar-width">Width</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarWrapper</span>
				directive controls the
				<strong>width</strong>
				of the sidebar and its
				<strong>icon-only collapsed state</strong>
				. It applies styles, sets CSS variables, and ensures consistent layout across different sidebar variants.
			</p>

			<h3 spartanH4 id="inputs">Inputs</h3>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>[class]</span>
					– Pass custom classes to extend styling.
				</li>
				<li class="mt-2">
					<span hlmCode>[sidebarWidth]</span>
					– Override default sidebar width (e.g.
					<span hlmCode>280px</span>
					).
				</li>
				<li class="mt-2">
					<span hlmCode>[sidebarWidthIcon]</span>
					– Override collapsed width (e.g.
					<span hlmCode>72px</span>
					).
				</li>
			</ul>

			<h3 spartanH4 id="defaults">Defaults</h3>
			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>defaultOpen</span>
					–
					<span hlmCode>true</span>
				</li>
				<li class="mt-2">
					<span hlmCode>sidebarWidth</span>
					–
					<span hlmCode>16rem</span>
				</li>
				<li class="mt-2">
					<span hlmCode>sidebarWidthMobile</span>
					–
					<span hlmCode>18rem</span>
				</li>
				<li class="mt-2">
					<span hlmCode>sidebarWidthIcon</span>
					–
					<span hlmCode>3rem</span>
				</li>
				<li class="mt-2">
					<span hlmCode>sidebarCookieName</span>
					–
					<span hlmCode>sidebar_state</span>
				</li>
				<li class="mt-2">
					<span hlmCode>sidebarCookieMaxAge</span>
					–
					<span hlmCode>60 * 60 * 24 * 7</span>
				</li>
				<li class="mt-2">
					<span hlmCode>sidebarKeyboardShortcut</span>
					–
					<span hlmCode>b</span>
				</li>
				<li class="mt-2">
					<span hlmCode>mobileBreakpoint</span>
					–
					<span hlmCode>768px</span>
				</li>
			</ul>

			<h3 spartanH4 id="config">Config</h3>
			<p hlmP>
				To override defaults, provide a custom configuration in your application config using
				<span hlmCode>provideCapsSidebarConfig</span>
				.
			</p>

			<spartan-code fileName="src/app/app.config.ts" [code]="_provider" />

			<spartan-section-sub-heading id="sidebar-header">CapsSidebarHeader</spartan-section-sub-heading>
			<p hlmP>
				Use the
				<span hlmCode>CapsSidebarHeader</span>
				component to add a
				<strong>sticky header</strong>
				at the top of your sidebar. This is useful for branding, application titles, or quick-access navigation.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-header" />
				</div>

				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_header" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-footer">CapsSidebarFooter</spartan-section-sub-heading>
			<p hlmP>
				Use the
				<span hlmCode>CapsSidebarFooter</span>
				component to add a
				<strong>sticky footer</strong>
				at the bottom of your sidebar. This is useful for secondary actions, user profile information, or app settings.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-footer" />
				</div>

				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_footer" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-content">CapsSidebarContent</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarContent</span>
				component is used to wrap the
				<strong>main content</strong>
				of the sidebar. This is where you add your
				<span hlmCode>CapsSidebarGroup</span>
				components, navigation links, or menus. The content inside is
				<strong>scrollable</strong>
				, while the header and footer remain sticky.
			</p>
			<spartan-code fileName="src/app/app-sidebar.ts" [code]="_content" />

			<spartan-section-sub-heading id="sidebar-group">CapsSidebarGroup</spartan-section-sub-heading>
			<p hlmP>
				Use the
				<span hlmCode>CapsSidebarGroup</span>
				component to create a
				<strong>section</strong>
				within the sidebar. A
				<span hlmCode>SidebarGroup</span>
				is composed of:
			</p>

			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>CapsSidebarGroupLabel</span>
					– the section label or title.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarGroupContent</span>
					– the main body of the group, usually containing links or menu items.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarGroupAction</span>
					(optional) – a button or action element associated with the group, e.g. "Add" or "Settings".
				</li>
			</ul>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-group" />
				</div>

				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_group" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-collapsable">Collapsable CapsSidebarGroup</spartan-section-sub-heading>
			<p hlmP>
				To make a
				<span hlmCode>CapsSidebarGroup</span>
				collapsible, wrap it in a
				<span hlmCode>CapsCollapsible</span>
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-collapsable" />
				</div>

				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_collapsable" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-group-action">CapsSidebarGroupAction</spartan-section-sub-heading>
			<p hlmP>
				Use the
				<span hlmCode>CapsSidebarGroupAction</span>
				component to add an action button to the
				<span hlmCode>CapsSidebarGroup</span>
				.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-group-action" />
				</div>

				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_groupAction" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-menu">CapsSidebarMenu</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarMenu</span>
				component is used for building a menu inside a
				<span hlmCode>CapsSidebarGroup</span>
				. It is composed of the following parts:
			</p>

			<ul class="list-inside list-disc pl-4 text-sm">
				<li class="mt-2">
					<span hlmCode>CapsSidebarMenuItem</span>
					– A single menu entry within the menu.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarMenuButton</span>
					– A clickable button or link inside a menu item.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarMenuAction</span>
					– An optional action (e.g., context menu, settings) for the menu item.
				</li>
				<li class="mt-2">
					<span hlmCode>CapsSidebarMenuSub</span>
					– A nested submenu within a menu item.
				</li>
			</ul>

			<img
				src="/assets/sidebar-page/sidebar-menu-structure.png"
				alt="Sidebar menu"
				class="border-border rounded border dark:hidden"
			/>

			<img
				src="/assets/sidebar-page/sidebar-menu-structure-dark.png"
				alt="Sidebar menu"
				class="border-border rounded border not-dark:hidden"
			/>

			<p hlmP>
				Here's an example of a
				<span hlmCode>CapsSidebarMenu</span>
				component rendering a list of projects.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-menu" />
				</div>
				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_menu" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-menu-button">CapsSidebarMenuButton</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarMenuButton</span>
				component is used to render a menu button within a
				<span hlmCode>CapsSidebarMenuItem</span>
				.
			</p>

			<h3 spartanH4 id="link_or_anchor">Link or Anchor</h3>
			<spartan-code [code]="_link" />

			<h3 spartanH4 id="button">Button</h3>
			<spartan-code [code]="_button" />
			<h3 spartanH4 id="icon_and_label">Icon and Label</h3>
			<spartan-code [code]="_linkWithIcon" />
			<p hlmP>
				You can render an icon and a truncated label inside the button. Remember to wrap the label in a
				<span hlmCode [innerHTML]="'<span>'"></span>
				.
			</p>
			<h3 spartanH4 id="is-active">isActive</h3>
			<p hlmP>
				Use the
				<span hlmCode>isActive</span>
				prop to mark a menu item as active.
			</p>
			<spartan-code [code]="_linkActive" />

			<spartan-section-sub-heading id="sidebar-menu-action">CapsSidebarMenuAction</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarMenuAction</span>
				component is used to render a menu action within a
				<span hlmCode>CapsSidebarMenuItem</span>
				.
			</p>

			<p hlmP>
				This button works independently of the
				<span hlmCode>CapsSidebarMenuButton</span>
				. For example, you can have a
				<span hlmCode>SidebarMenuButton</span>
				as a clickable link, while the
				<span hlmCode>SidebarMenuAction</span>
				provides a secondary action, such as editing, deleting, or opening a context menu.
			</p>

			<spartan-code [code]="_menuAction" />

			<h3 spartanH4 id="dropdown-menu">DropdownMenu</h3>
			<p hlmP>
				Here's an example of a
				<span hlmCode>CapsSidebarMenuAction</span>
				component rendering a
				<span hlmCode>CapsMenu</span>
				.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-dropdown-menu" />
				</div>
				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_menuActionExample" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-menu-sub">CapsSidebarMenuSub</spartan-section-sub-heading>

			<p hlmP>
				The
				<span hlmCode>CapsSidebarMenuSub</span>
				component is used to render a submenu within a
				<span hlmCode>CapsSidebarMenu</span>
				.
			</p>

			<p hlmP>
				Use
				<span hlmCode>CapsSidebarMenuSubItem</span>
				and
				<span hlmCode>CapsSidebarMenuSubButton</span>
				to render a submenu item.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-menu-sub" />
				</div>
				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_menuSubExample" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-menu-sub-collapsable">
				Collapsable CapsSidebarSubMenu
			</spartan-section-sub-heading>
			<p hlmP>
				To make a
				<span hlmCode>CapsSidebarMenu</span>
				component collapsible, wrap it and the
				<span>CapsSidebarMenuSub</span>
				components in a
				<span hlmCode>CapsCollapsible</span>
				.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-menu-sub-collapsable" />
				</div>
				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_menuSubCollapsableExample" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-menu-badge">CapsSidebarMenuBadge</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarMenuBadge</span>
				component is used to render a badge within a
				<span hlmCode>CapsSidebarMenuItem</span>
				.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div firstTab>
					<spartan-sidebar-preview name="sidebar-menu-badge" />
				</div>
				<spartan-code secondTab fileName="src/app/app-sidebar.ts" [code]="_menuBadge" />
			</spartan-tabs>

			<spartan-section-sub-heading id="sidebar-menu-skeleton">CapsSidebarMenuSkeleton</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarMenuSkeleton</span>
				component is used to render a skeleton for a SidebarMenu. You can use this to show a loading state while
				fetching data.
			</p>
			<spartan-code [code]="_skeleton" />

			<spartan-section-sub-heading id="sidebar-menu-separator">CapsSidebarSeparator</spartan-section-sub-heading>
			<p hlmP>
				The
				<span hlmCode>CapsSidebarSeparator</span>
				component is used to render a separator within a
				<span hlmCode>Sidebar</span>
				.
			</p>
			<spartan-code [code]="_separator" />

			<div>
				<spartan-section-sub-heading id="theming">Theming</spartan-section-sub-heading>
				<p hlmP>Sidebar uses the shared Capsule foundation tokens and component preset.</p>
				<spartan-code [code]="_cssCode" />
				<p hlmP>
					<strong class="font-medium">
						We intentionally use different variables for the sidebar and the rest of the application
					</strong>
					to make it easy to have a sidebar that is styled differently from the rest of the application. Think a sidebar
					with a darker shade from the main application.
				</p>

				<spartan-section-sub-heading id="responsive-behavior">Responsive behavior</spartan-section-sub-heading>
				<p hlmP>
					The sidebar is responsive by default. It collapses to a minimal state on smaller screens and expands on larger
					screens. Configure mobileBreakpoint through provideCapsSidebarConfig. Desktop reduction and the mobile Sheet
					have separate service state.
				</p>

				<spartan-section-sub-heading id="accessibility">Accessibility</spartan-section-sub-heading>
				<p hlmP>
					The sidebar and its components follow WAI-ARIA best practices. Ensure you provide appropriate labels for
					buttons and landmarks to improve screen reader support.
				</p>

				<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
				<spartan-ui-api-docs docType="caps" />

				<spartan-header-rtl />
				<a capsButton routerLink="/sidebar-preview/sidebar-rtl">
					View RTL sidebar
					<ng-icon aria-hidden="true" name="lucideExternalLink" />
				</a>

				<spartan-page-bottom-nav>
					<spartan-page-bottom-nav-link href="skeleton" label="Skeleton" />
					<spartan-page-bottom-nav-link direction="previous" href="sheet" label="Sheet" />
				</spartan-page-bottom-nav>
			</div>
		</section>
		<spartan-page-nav />
	`,
})
export default class SidebarPageComponent {
	constructor() {
		injectComponentDocs();
	}

	protected readonly _cssCode = cssCode;

	protected readonly _usageLayout = usageLayout;
	protected readonly _usageApp = usageApp;
	protected readonly _firstSidebarApp = firstSidebarApp;
	protected readonly _firstSidebar = firstSidebar;
	protected readonly _firstSidebarInitial = firstSidebarInitial;
	protected readonly _provider = provider;
	protected readonly _header = header;
	protected readonly _footer = footer;
	protected readonly _content = content;
	protected readonly _group = group;
	protected readonly _collapsable = collapsable;
	protected readonly _groupAction = groupAction;
	protected readonly _menu = menu;
	protected readonly _link = link;
	protected readonly _linkWithIcon = linkWithIcon;
	protected readonly _linkActive = linkActive;
	protected readonly _button = button;
	protected readonly _menuAction = menuAction;
	protected readonly _menuActionExample = menuActionExample;
	protected readonly _menuSubExample = menuSubExample;
	protected readonly _menuSubCollapsableExample = menuSubCollapsableExample;
	protected readonly _menuBadge = menuBadge;
	protected readonly _skeleton = skeleton;
	protected readonly _separator = separator;
}
