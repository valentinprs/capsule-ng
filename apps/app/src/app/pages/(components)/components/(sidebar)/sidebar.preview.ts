import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideHouse, lucideInbox, lucideSearch, lucideSettings } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-sidebar',
	imports: [CapsSidebarImports, NgIcon],
	providers: [
		provideIcons({
			lucideHouse,
			lucideInbox,
			lucideCalendar,
			lucideSearch,
			lucideSettings,
		}),
	],
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Application</caps-sidebar-group-label>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								@for (item of _items; track item.title) {
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
			</caps-sidebar>
			<ng-content />
		</caps-sidebar-wrapper>
	`,
})
export class SidebarComponent {
	protected readonly _items = [
		{
			title: 'Home',
			url: '#',
			icon: 'lucideHouse',
		},
		{
			title: 'Inbox',
			url: '#',
			icon: 'lucideInbox',
		},
		{
			title: 'Calendar',
			url: '#',
			icon: 'lucideCalendar',
		},
		{
			title: 'Search',
			url: '#',
			icon: 'lucideSearch',
		},
		{
			title: 'Settings',
			url: '#',
			icon: 'lucideSettings',
		},
	];
}

@Component({
	selector: 'spartan-sidebar-preview',
	imports: [SidebarComponent, CapsSidebarImports],
	template: `
		<spartan-sidebar>
			<caps-sidebar-inset>
				<main class="flex min-w-0 flex-1 flex-col">
					<header class="flex h-12 items-center justify-between px-4">
						<button capsSidebarTrigger></button>
					</header>
				</main>
			</caps-sidebar-inset>
		</spartan-sidebar>
	`,
})
export class SidebarPreviewComponent {}

export const cssCode = `
@import '@capsule-ng/caps/foundations.css';
`;

export const usageLayout = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [
    CapsSidebarImports,
  ],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-header></caps-sidebar-header>
        <caps-sidebar-content>
          <caps-sidebar-group></caps-sidebar-group>
          <caps-sidebar-group></caps-sidebar-group>
        </caps-sidebar-content>
        <caps-sidebar-footer></caps-sidebar-footer>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
})
export class AppSidebar {}
`;

export const usageApp = `
import { Component } from '@angular/core';
import { AppSidebar } from './app-sidebar';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
  imports: [AppSidebar, CapsSidebarImports],
  selector: 'app-root',
  template: \`<app-sidebar>
    <main>
      <button capsSidebarTrigger></button>
    </main>
  </app-sidebar>\`,
})
export class App {}

`;

export const firstSidebarApp = `
import { Component } from '@angular/core';
import { AppSidebar } from './app-sidebar';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [AppSidebar, CapsSidebarImports, RouterOutlet],
  selector: 'app-root',
  template: \`<app-sidebar>
    <caps-sidebar-inset><main class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-12 items-center justify-between px-4">
        <button capsSidebarTrigger></button>
        <router-outlet/>
      </header>
    </main></caps-sidebar-inset>
  </app-sidebar>\`,
})
export class App {}
`;

export const firstSidebarInitial = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [CapsSidebarImports],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content></caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
})
export class AppSidebar {}
`;

export const firstSidebar = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { lucideCalendar, lucideHouse, lucideInbox, lucideSearch, lucideSettings } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';


@Component({
  selector: 'app-sidebar',
  imports: [
    CapsSidebarImports,
    NgIcon,

  ],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-sidebar-group>
            <caps-sidebar-group-label>Application</caps-sidebar-group-label>
            <caps-sidebar-group-content>
              <caps-sidebar-menu>
                @for(item of _items; track item.title){
                <caps-sidebar-menu-item>
                  <a capsSidebarMenuButton href="#">
                    <ng-icon aria-hidden="true"  [name]="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </caps-sidebar-menu-item>
                }
              </caps-sidebar-menu>
            </caps-sidebar-group-content>
          </caps-sidebar-group>
        </caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
  providers: [
    provideIcons({
      lucideHouse,
      lucideInbox,
      lucideCalendar,
      lucideSearch,
      lucideSettings,
    }),
  ],
})
export class AppSidebar {
  protected readonly _items = [
    {
      title: 'Home',
      url: '#',
      icon: 'lucideHouse',
    },
    {
      title: 'Inbox',
      url: '#',
      icon: 'lucideInbox',
    },
    {
      title: 'Calendar',
      url: '#',
      icon: 'lucideCalendar',
    },
    {
      title: 'Search',
      url: '#',
      icon: 'lucideSearch',
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'lucideSettings',
    },
  ];
}
`;

export const provider = `
import { ApplicationConfig } from '@angular/core';
import { provideCapsSidebarConfig } from '@capsule-ng/caps/sidebar';

export const appConfig: ApplicationConfig = {
    providers: [
        provideCapsSidebarConfig({
            defaultOpen: true,
            sidebarWidth: '16rem',
            sidebarWidthMobile: '18rem',
            sidebarWidthIcon: '3rem',
            sidebarCookieName: 'sidebar_state',
            sidebarCookieMaxAge: 60 * 60 * 24 * 7,
            sidebarKeyboardShortcut: 'b',
            mobileBreakpoint: '768px',
        }),
    ],
};
`;

export const header = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-sidebar',
  imports: [
    CapsSidebarImports,
    CapsDropdownMenuImports,
    NgIcon,

  ],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-header>
          <caps-sidebar-menu>
            <caps-sidebar-menu-item>
              <button capsSidebarMenuButton [capsDropdownMenuTrigger]="menu" placement="right-start">
                Select Workspace
                <ng-icon aria-hidden="true"  name="lucideChevronDown" class="ml-auto" />
              </button>
              <ng-template #menu>
                <caps-menu class="w-60">
                  <caps-menu-label>Acme Inc</caps-menu-label>
                  <caps-menu-label>Acme Corp.</caps-menu-label>
                </caps-menu>
              </ng-template>
            </caps-sidebar-menu-item>
          </caps-sidebar-menu>
        </caps-sidebar-header>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
  providers: [
    provideIcons({
      lucideChevronDown,
    }),
  ],
})
export class AppSidebar {}
`;

export const footer = `
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';


import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
    selector: 'app-sidebar',
    imports: [CapsSidebarImports, CapsDropdownMenuImports, NgIcon],
    template: \`
        <caps-sidebar-wrapper>
            <caps-sidebar>
                <caps-sidebar-header></caps-sidebar-header>
                <caps-sidebar-content></caps-sidebar-content>
                <caps-sidebar-footer>
                    <caps-sidebar-menu>
                        <caps-sidebar-menu-item>
                            <button capsSidebarMenuButton [capsDropdownMenuTrigger]="menu">
                                Select Workspace
                                <ng-icon aria-hidden="true"  name="lucideChevronUp" class="ml-auto" />
                            </button>
                            <ng-template #menu>
                                <caps-menu class="w-60">
                                    <button capsMenuItem>Account</button>
                                    <button capsMenuItem>Billing</button>
                                    <button capsMenuItem>Sign out</button>
                                </caps-menu>
                            </ng-template>
                        </caps-sidebar-menu-item>
                    </caps-sidebar-menu>
                </caps-sidebar-footer>
            </caps-sidebar>
            <ng-content />
        </caps-sidebar-wrapper>
    \`,
    providers: [
        provideIcons({
            lucideChevronUp,
        }),
    ],
})
export class AppSidebar {}

`;

export const content = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [CapsSidebarImports],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-sidebar-group></caps-sidebar-group>
          <caps-sidebar-group></caps-sidebar-group>
        </caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
})
export class AppSidebar {}`;

export const group = `
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLifeBuoy, lucideSend } from '@ng-icons/lucide';

import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
    selector: 'app-sidebar',
    imports: [CapsSidebarImports, NgIcon, ],
    template: \`
        <caps-sidebar-wrapper>
            <caps-sidebar>
                <caps-sidebar-content>
                    <caps-sidebar-group>
                        <caps-sidebar-group-label>Help</caps-sidebar-group-label>
                        <caps-sidebar-group-content>
                            <caps-sidebar-menu>
                                <caps-sidebar-menu-item>
                                    <a capsSidebarMenuButton href="#">
                                        <ng-icon aria-hidden="true"  name="lucideLifeBuoy" />
                                        <span>Support</span>
                                    </a>
                                </caps-sidebar-menu-item>
                                <caps-sidebar-menu-item>
                                    <a capsSidebarMenuButton href="#">
                                        <ng-icon aria-hidden="true"  name="lucideSend" />
                                        <span>Feedback</span>
                                    </a>
                                </caps-sidebar-menu-item>
                            </caps-sidebar-menu>
                        </caps-sidebar-group-content>
                    </caps-sidebar-group>
                </caps-sidebar-content>
            </caps-sidebar>
            <ng-content />
        </caps-sidebar-wrapper>
    \`,
    providers: [
        provideIcons({
            lucideLifeBuoy,
            lucideSend,
        }),
    ],
})
export class AppSidebar {}

`;

export const collapsable = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  lucideChevronDown,
  lucideLifeBuoy,
  lucideSend,
} from '@ng-icons/lucide';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';

@Component({
  selector: 'app-sidebar',
  imports: [ NgIcon, CapsCollapsibleImports, CapsSidebarImports],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-collapsible [expanded]="true" class="group/collapsible">
            <caps-sidebar-group>
              <button
                capsCollapsibleTrigger
                capsSidebarGroupLabel
                class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                Help
                <ng-icon aria-hidden="true"

                  name="lucideChevronDown"
                  class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                />
              </button>
              <caps-collapsible-content>
                <caps-sidebar-group-content>
                  <caps-sidebar-menu>
                    <caps-sidebar-menu-item>
                      <a capsSidebarMenuButton href="#">
                        <ng-icon aria-hidden="true"  name="lucideLifeBuoy" />
                        <span>Support</span>
                      </a>
                    </caps-sidebar-menu-item>
                    <caps-sidebar-menu-item>
                      <a capsSidebarMenuButton href="#">
                        <ng-icon aria-hidden="true"  name="lucideSend" />
                        <span>Feedback</span>
                      </a>
                    </caps-sidebar-menu-item>
                  </caps-sidebar-menu>
                </caps-sidebar-group-content>
              </caps-collapsible-content>
            </caps-sidebar-group>
          </caps-collapsible>
        </caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
  providers: [
    provideIcons({
      lucideLifeBuoy,
      lucideSend,
      lucideChevronDown,
    }),
  ],
})
export class AppSidebar {}
`;

export const groupAction = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  lucideChartPie,
  lucideFrame,
  lucideMap,
  lucidePlus,
} from '@ng-icons/lucide';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';

@Component({
  selector: 'app-sidebar',
  imports: [CapsSidebarImports, NgIcon,  HlmToasterImports],
  template: \`
    <hlm-toaster />
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-sidebar-group>
            <caps-sidebar-group-label>Projects</caps-sidebar-group-label>
            <button
              capsSidebarGroupAction
              title="Add Project"
              (click)="_onAddProject()"
            >
              <ng-icon aria-hidden="true"  name="lucidePlus" />
              <span class="sr-only">Add Project</span>
            </button>
            <caps-sidebar-group-content>
              <caps-sidebar-menu>
                <caps-sidebar-menu-item>
                  <a capsSidebarMenuButton href="#">
                    <ng-icon aria-hidden="true"  name="lucideFrame" />
                    <span>Design Engineering</span>
                  </a>
                </caps-sidebar-menu-item>
                <caps-sidebar-menu-item>
                  <a capsSidebarMenuButton href="#">
                    <ng-icon aria-hidden="true"  name="lucideChartPie" />
                    <span>Sales & Marketing</span>
                  </a>
                </caps-sidebar-menu-item>
                <caps-sidebar-menu-item>
                  <a capsSidebarMenuButton href="#">
                    <ng-icon aria-hidden="true"  name="lucideMap" />
                    <span>Travel</span>
                  </a>
                </caps-sidebar-menu-item>
              </caps-sidebar-menu>
            </caps-sidebar-group-content>
          </caps-sidebar-group>
        </caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
  providers: [
    provideIcons({
      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucidePlus,
    }),
  ],
})
export class AppSidebar {
  protected _onAddProject(): void {
    toast.info('You clicked the group action!');
  }
}
`;

export const menu = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  lucideChartPie,
  lucideFrame,
  lucideLifeBuoy,
  lucideMap,
  lucideSend,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-sidebar',
  imports: [CapsSidebarImports, NgIcon, ],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-sidebar-group>
            <caps-sidebar-group-label>Projects</caps-sidebar-group-label>
            <caps-sidebar-group-content>
              <caps-sidebar-menu>
                @for (project of _projects; track project){
                    <caps-sidebar-menu-item>
                      <a capsSidebarMenuButton [href]="project.url">
                        <ng-icon aria-hidden="true"  [name]="project.icon" />
                        <span>{{ project.name }}</span>
                      </a>
                    </caps-sidebar-menu-item>
                }
              </caps-sidebar-menu>
            </caps-sidebar-group-content>
          </caps-sidebar-group>
        </caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
  providers: [
    provideIcons({
      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideLifeBuoy,
      lucideSend,
    }),
  ],
})
export class AppSidebar {
  protected readonly _projects = [
    { name: 'Design Engineering', url: '#', icon: 'lucideFrame' },
    { name: 'Sales & Marketing', url: '#', icon: 'lucideChartPie' },
    { name: 'Travel', url: '#', icon: 'lucideMap' },
    { name: 'Support', url: '#', icon: 'lucideLifeBuoy' },
    { name: 'Feedback', url: '#', icon: 'lucideSend' },
  ];
}
`;

export const link = `
<caps-sidebar-menu-item>
  <a capsSidebarMenuButton href="#">
    Home
  </a>
</caps-sidebar-menu-item>
`;
export const linkWithIcon = `
<caps-sidebar-menu-item>
  <a capsSidebarMenuButton href="#">
    <ng-icon aria-hidden="true"  name="lucideHouse" />
    <span>Home</span>
  </a>
</caps-sidebar-menu-item>
`;
export const linkActive = `
<caps-sidebar-menu-item>
  <a capsSidebarMenuButton href="#" isActive>
    Home
  </a>
</caps-sidebar-menu-item>
`;

export const button = `
<caps-sidebar-menu-item>
  <button capsSidebarMenuButton>
    Send
  </button>
</caps-sidebar-menu-item>
`;

export const menuAction = `
<caps-sidebar-menu-item>
  <a capsSidebarMenuButton href="#">
    <ng-icon aria-hidden="true"  name="lucideHouse" />
    <span>Home</span>
  </a>
  <button capsSidebarMenuAction>
    <ng-icon aria-hidden="true"  name="lucidePlus" />
    <span class="sr-only">Add Project</span>
  </button>
</caps-sidebar-menu-item>
`;

export const menuActionExample = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  lucideChartPie,
  lucideEllipsis,
  lucideFrame,
  lucideLifeBuoy,
  lucideMap,
  lucideSend,
} from '@ng-icons/lucide';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
  selector: 'app-sidebar',
  imports: [CapsSidebarImports, NgIcon,  CapsDropdownMenuImports],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-sidebar-group>
            <caps-sidebar-group-label>Projects</caps-sidebar-group-label>
            <caps-sidebar-group-content>
              <caps-sidebar-menu>
                @for (project of projects; track project){
                <caps-sidebar-menu-item>
                  <a capsSidebarMenuButton [href]="project.url">
                    <ng-icon aria-hidden="true"  [name]="project.icon" />
                    <span>{{ project.name }}</span>
                  </a>
                  <button capsSidebarMenuAction [capsDropdownMenuTrigger]="menu">
                    <ng-icon aria-hidden="true"  name="lucideEllipsis" />
                    <span class="sr-only">More</span>
                  </button>

                  <ng-template #menu>
                    <caps-menu>
                      <button capsMenuItem>Edit Project</button>
                      <button capsMenuItem>Delete Project</button>
                    </caps-menu>
                  </ng-template>
                </caps-sidebar-menu-item>
                }
              </caps-sidebar-menu>
            </caps-sidebar-group-content>
          </caps-sidebar-group>
        </caps-sidebar-content>
      </caps-sidebar>
      <ng-content />
    </caps-sidebar-wrapper>
  \`,
  providers: [
    provideIcons({
      lucideFrame,
      lucideChartPie,
      lucideMap,
      lucideLifeBuoy,
      lucideSend,
      lucideEllipsis,
    }),
  ],
})
export class AppSidebar {
  projects = [
    { name: 'Design Engineering', url: '#', icon: 'lucideFrame' },
    { name: 'Sales & Marketing', url: '#', icon: 'lucideChartPie' },
    { name: 'Travel', url: '#', icon: 'lucideMap' },
    { name: 'Support', url: '#', icon: 'lucideLifeBuoy' },
    { name: 'Feedback', url: '#', icon: 'lucideSend' },
  ];
}
`;
export const menuSubExample = `
import { Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [CapsSidebarImports],
  template: \`
    <caps-sidebar-wrapper>
      <caps-sidebar>
        <caps-sidebar-content>
          <caps-sidebar-group>
            <caps-sidebar-group-content>
              <caps-sidebar-menu>
                @for (item of _items; track item.title) {
                  <caps-sidebar-menu-item>
                    <button capsSidebarMenuButton>
                      <span>{{ item.title }}</span>
                    </button>
                    <caps-sidebar-menu-sub>
                      @for (subItem of item.items; track subItem.title) {
                        <caps-sidebar-menu-sub-item>
                          <button capsSidebarMenuSubButton class="w-full">
                            <span>{{ subItem.title }}</span>
                          </button>
                        </caps-sidebar-menu-sub-item>
                      }
                    </caps-sidebar-menu-sub>
                  </caps-sidebar-menu-item>
                }
              </caps-sidebar-menu>
            </caps-sidebar-group-content>
          </caps-sidebar-group>
        </caps-sidebar-content>
      </caps-sidebar>
      <caps-sidebar-inset><main class="flex min-w-0 flex-1 flex-col">
        <header class="flex h-12 items-center justify-between px-4">
          <button capsSidebarTrigger></button>
        </header>
      </main></caps-sidebar-inset>
    </caps-sidebar-wrapper>
  \`,
})
export default class AppSidebar {
  protected readonly _items = [
    {
      title: 'Getting Started',
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Building Your Application',
      items: [
        { title: 'Routing' },
        { title: 'Data Fetching', isActive: true },
        { title: 'Rendering' },
        { title: 'Caching' },
        { title: 'Styling' },
        { title: 'Optimizing' },
        { title: 'Configuring' },
        { title: 'Testing' },
        { title: 'Authentication' },
        { title: 'Deploying' },
        { title: 'Upgrading' },
        { title: 'Examples' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Components' },
        { title: 'File Conventions' },
        { title: 'Functions' },
        { title: 'next.config.js Options' },
        { title: 'CLI' },
        { title: 'Edge Runtime' },
      ],
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Accessibility' },
        { title: 'Fast Refresh' },
        { title: 'Next.js Compiler' },
        { title: 'Supported Browsers' },
        { title: 'Turbopack' },
      ],
    },
  ];
}

`;

export const menuSubCollapsableExample = `
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';

import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
  selector: 'app-sidebar',
    imports: [CapsSidebarImports, CapsCollapsibleImports, NgIcon, ],
  template: \`
    <caps-sidebar-wrapper>
            <caps-sidebar>
                <caps-sidebar-content>
                    <caps-sidebar-group>
                        <caps-sidebar-group-content>
                            <caps-sidebar-menu>
                                @for (item of _items; track item.title) {
                                    <caps-sidebar-menu-item>
                                        <caps-collapsible [expanded]="item.defaultOpen" class="group/collapsible">
                                            <button
                                                capsCollapsibleTrigger
                                                capsSidebarMenuButton
                                                class="flex w-full items-center justify-between"
                                            >
                                                <span>{{ item.title }}</span>
                                                <ng-icon aria-hidden="true"
                                                    name="lucideChevronRight"
                                                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"

                                                />
                                            </button>
                                            <caps-collapsible-content>
                                                <caps-sidebar-menu-sub>
                                                    @for (subItem of item.items; track subItem.title) {
                                                        <caps-sidebar-menu-sub-item>
                                                            <button capsSidebarMenuSubButton class="w-full">
                                                                <span>{{ subItem.title }}</span>
                                                            </button>
                                                        </caps-sidebar-menu-sub-item>
                                                    }
                                                </caps-sidebar-menu-sub>
                                            </caps-collapsible-content>
                                        </caps-collapsible>
                                    </caps-sidebar-menu-item>
                                }
                            </caps-sidebar-menu>
                        </caps-sidebar-group-content>
                    </caps-sidebar-group>
                </caps-sidebar-content>
            </caps-sidebar>
      <caps-sidebar-inset><main class="flex min-w-0 flex-1 flex-col">
        <header class="flex h-12 items-center justify-between px-4">
          <button capsSidebarTrigger></button>
        </header>
      </main></caps-sidebar-inset>
    </caps-sidebar-wrapper>
  \`,
  providers: [provideIcons({ lucideChevronRight })],
})
export default class AppSidebar {
  protected readonly _items = [
    {
      title: 'Getting Started',
      defaultOpen: true,
      items: [{ title: 'Installation' }, { title: 'Project Structure' }],
    },
    {
      title: 'Building Your Application',
      defaultOpen: false,
      items: [
        { title: 'Routing' },
        { title: 'Data Fetching', isActive: true },
        { title: 'Rendering' },
        { title: 'Caching' },
        { title: 'Styling' },
        { title: 'Optimizing' },
        { title: 'Configuring' },
        { title: 'Testing' },
        { title: 'Authentication' },
        { title: 'Deploying' },
        { title: 'Upgrading' },
        { title: 'Examples' },
      ],
    },
    {
      title: 'API Reference',
      defaultOpen: false,
      items: [
        { title: 'Components' },
        { title: 'File Conventions' },
        { title: 'Functions' },
        { title: 'next.config.js Options' },
        { title: 'CLI' },
        { title: 'Edge Runtime' },
      ],
    },
    {
      title: 'Architecture',
      defaultOpen: false,
      items: [
        { title: 'Accessibility' },
        { title: 'Fast Refresh' },
        { title: 'Next.js Compiler' },
        { title: 'Supported Browsers' },
        { title: 'Turbopack' },
      ],
    },
  ];
}
`;

export const menuBadge = `
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChartPie, lucideFrame, lucideLifeBuoy, lucideMap, lucideSend } from '@ng-icons/lucide';

import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
    selector: 'app-sidebar',
    imports: [CapsSidebarImports, NgIcon, ],
    template: \`
        <caps-sidebar-wrapper>
            <caps-sidebar>
                <caps-sidebar-content>
                    <caps-sidebar-group>
                        <caps-sidebar-group-label>Projects</caps-sidebar-group-label>
                        <caps-sidebar-group-content>
                            <caps-sidebar-menu>
                                @for (project of _projects; track project) {
                                    <caps-sidebar-menu-item>
                                        <button capsSidebarMenuButton>
                                            <ng-icon aria-hidden="true"  [name]="project.icon" />
                                            <span>{{ project.name }}</span>
                                        </button>
                                        <caps-sidebar-menu-badge>{{ project.info }}</caps-sidebar-menu-badge>
                                    </caps-sidebar-menu-item>
                                }
                            </caps-sidebar-menu>
                        </caps-sidebar-group-content>
                    </caps-sidebar-group>
                </caps-sidebar-content>
            </caps-sidebar>
            <ng-content />
        </caps-sidebar-wrapper>
    \`,
    providers: [
        provideIcons({
            lucideFrame,
            lucideChartPie,
            lucideMap,
            lucideLifeBuoy,
            lucideSend,
        }),
    ],
})
export class AppSidebar {
    protected readonly _projects = [
        { info: 24, name: 'Design Engineering', url: '#', icon: 'lucideFrame' },
        { info: 12, name: 'Sales & Marketing', url: '#', icon: 'lucideChartPie' },
        { info: 3, name: 'Travel', url: '#', icon: 'lucideMap' },
        { info: 21, name: 'Support', url: '#', icon: 'lucideLifeBuoy' },
        { info: 8, name: 'Feedback', url: '#', icon: 'lucideSend' },
    ];
}

`;

export const skeleton = `
<caps-sidebar-menu>
    @for (project of _projects; track project) {
        <caps-sidebar-menu-item>
            <caps-sidebar-menu-skeleton></caps-sidebar-menu-skeleton>
        </caps-sidebar-menu-item>
    }
</caps-sidebar-menu>
`;

export const separator = `
<caps-sidebar>
  <caps-sidebar-content>
    <caps-sidebar-group></caps-sidebar-group>
        <caps-sidebar-separator></caps-sidebar-separator>
    <caps-sidebar-group></caps-sidebar-group>
  </caps-sidebar-content>
</caps-sidebar>
`;
