import type { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsLink } from '@capsule-ng/caps/link';
import { metaWith } from '../../shared/meta/meta.util';

export const routeMeta: RouteMeta = {
	meta: metaWith('spartan/blocks - Blocks', 'Blocks built with the spartan/ui'),
	title: 'spartan/blocks - Blocks',
};

@Component({
	selector: 'spartan-blocks',
	imports: [RouterOutlet, CapsButton, RouterLink, RouterLinkActive, CapsLink],
	host: {
		class: 'block',
	},
	template: `
		<div class="container flex flex-col items-center gap-2 py-8 md:py-16 lg:py-20 xl:gap-4">
			<h1
				class="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter"
			>
				Building Blocks with spartan/ui
			</h1>
			<p class="text-foreground max-w-3xl text-base text-balance sm:text-lg">
				Clean, modern building blocks for your Angular applications.
			</p>
			<div class="flex gap-2 pt-2">
				<a capsButton size="sm" routerLink="/documentation">Get Started</a>
				<a capsButton size="sm" variant="outline" routerLink="/components">Components</a>
			</div>
		</div>

		<section class="container-wrapper px-6">
			<nav aria-label="Block categories" class="mb-4 flex flex-wrap gap-4">
				<a capsLink routerLink="/blocks/sidebar" routerLinkActive="font-semibold" ariaCurrentWhenActive="page">
					Sidebar
				</a>
				<a capsLink routerLink="/blocks/login" routerLinkActive="font-semibold" ariaCurrentWhenActive="page">Login</a>
				<a capsLink routerLink="/blocks/signup" routerLinkActive="font-semibold" ariaCurrentWhenActive="page">Signup</a>
				<a capsLink routerLink="/blocks/calendar" routerLinkActive="font-semibold" ariaCurrentWhenActive="page">
					Calendar
				</a>
				<a capsLink routerLink="/blocks/stepper" routerLinkActive="font-semibold" ariaCurrentWhenActive="page">
					Stepper
				</a>
			</nav>

			<router-outlet />
		</section>
	`,
})
export default class BlocksPage {}
