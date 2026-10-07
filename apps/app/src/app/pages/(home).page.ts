import type { RouteMeta } from '@analogjs/router';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideStar } from '@ng-icons/lucide';
import { REPOSITORY_URL } from '../../site.config';
import { metaWith } from '../shared/meta/meta.util';
import { AuthenticationExample } from './(home)/components/authentication/authentication';
import { DashboardExample } from './(home)/components/dashboard/dashboard';
import { OverviewExample } from './(home)/components/overview/overview';
import { PlaygroundExample } from './(home)/components/playground/playground';
import { TasksExample } from './(home)/components/tasks/tasks';

export const routeMeta: RouteMeta = {
	meta: metaWith(
		'Capsule — Cutting-edge tools powering Angular full-stack development',
		'Build next-level, full-stack applications with AnalogJs and the spartan/stack. Make them accessible and look incredible with spartan/ui.',
	),
	title: 'Capsule — Cutting-edge tools powering Angular full-stack development',
};

const container = 'mx-auto flex flex-col items-center gap-4 text-center';
const lead = 'text-foreground max-w-3xl text-base text-balance sm:text-lg';

@Component({
	selector: 'spartan-home',
	imports: [
		CapsButton,
		RouterLink,
		NgIcon,
		CapsTabsImports,
		OverviewExample,
		DashboardExample,
		TasksExample,
		AuthenticationExample,
		PlaygroundExample,
	],
	providers: [provideIcons({ lucideStar })],
	host: {
		class: 'block px-2',
	},
	template: `
		<section class="flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
			<div class="${container} max-w-[64rem]">
				<h1
					class="text-primary leading-tighter max-w-4xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter"
				>
					Stop fighting your component library.
				</h1>
				<p class="${lead} max-w-[42rem]">
					Accessible UI primitives for Angular - built with signals, SSR compatible, zoneless ready. Install the
					behavior. Copy the styles. Customize without limits.
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a capsButton size="sm" routerLink="/documentation">Get Started</a>
					<a capsButton size="sm" variant="ghost" routerLink="/components">View Components</a>
					<a capsButton size="sm" variant="ghost" target="_blank" rel="noreferrer" href="${REPOSITORY_URL}">
						<ng-icon class="mr-0.5" name="lucideStar" />
						View on GitHub
					</a>
				</div>
			</div>
		</section>

		<section class="container px-6">
			<caps-tabs [value]="_activeTab()" class="w-full">
				<div
					class="w-full scrollbar-none overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] [&::-webkit-scrollbar]:hidden"
				>
					<caps-tabs-list
						aria-label="tabs example"
						class="bg-background dark:[&>button]:bg-background [&>button]:text-muted-foreground [&>button]:data-[state=active]:text-primary [&>button]:hover:text-primary dark:[&>button]:data-[state=active]:bg-background w-max [&>button]:shrink-0 [&>button]:cursor-pointer [&>button]:data-[state=active]:shadow-none dark:[&>button]:data-[state=active]:border-none"
					>
						<button type="button" capsTabsTrigger value="examples" routerLink=".">Examples</button>
						<button type="button" capsTabsTrigger value="dashboard" routerLink="." fragment="dashboard">
							Dashboard
						</button>
						<button type="button" capsTabsTrigger value="tasks" routerLink="." fragment="tasks">Tasks</button>
						<button type="button" capsTabsTrigger value="playground" routerLink="." fragment="playground">
							Playground
						</button>
						<button type="button" capsTabsTrigger value="authentication" routerLink="." fragment="authentication">
							Authentication
						</button>
					</caps-tabs-list>
				</div>
				<caps-tabs-content value="examples" class="mt-0">
					<ng-template capsTabsContentLazy>
						<spartan-overview-example />
					</ng-template>
				</caps-tabs-content>
				<caps-tabs-content value="dashboard" class="mt-0">
					<ng-template capsTabsContentLazy>
						<spartan-dashboard-example />
					</ng-template>
				</caps-tabs-content>
				<caps-tabs-content value="tasks" class="mt-0">
					<ng-template capsTabsContentLazy>
						<spartan-tasks-example />
					</ng-template>
				</caps-tabs-content>
				<caps-tabs-content value="playground" class="mt-0">
					<ng-template capsTabsContentLazy>
						<spartan-playground-example />
					</ng-template>
				</caps-tabs-content>
				<caps-tabs-content value="authentication" class="mt-0">
					<ng-template capsTabsContentLazy>
						<spartan-authentication-example />
					</ng-template>
				</caps-tabs-content>
			</caps-tabs>
		</section>
	`,
})
export default class HomePage {
	protected readonly _route = inject(ActivatedRoute);
	protected readonly _activeTab = signal<string>(this._route.snapshot.fragment || 'examples');
}
