import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub } from '@ng-icons/lucide';
import { DocsDialog } from '@spartan-ng/app/app/shared/header/docs-dialog';
import { HeaderLayoutMode } from '@spartan-ng/app/app/shared/header/header-layout-mode';
import { REPOSITORY_URL } from '../../../site.config';
import { SpartanLogo } from '../spartan-logo';
import { NavLink } from '../spartan-nav-link';
import { HeaderDarkMode } from './header-dark-mode';
import { HeaderMobileNav } from './header-mobile-nav';

@Component({
	selector: 'spartan-header',
	imports: [
		CapsButton,
		RouterLink,
		NgIcon,
		NavLink,
		HeaderMobileNav,
		HeaderDarkMode,
		SpartanLogo,
		CapsSeparatorImports,
		HeaderLayoutMode,

		DocsDialog,
	],
	providers: [provideIcons({ lucideGithub })],
	host: {
		role: 'banner',
		class: 'backdrop-blur-sm sticky top-0 z-(--caps-z-50) w-full',
	},
	template: `
		<div class="container-wrapper 3xl:fixed:px-0 px-6">
			<div
				class="3xl:fixed:container A composable, themeable and customizable sidebar component. flex h-(--header-height) items-center gap-2"
			>
				<a capsButton variant="ghost" class="hidden h-fit p-1.5 lg:flex" routerLink="/" align="start" side="bottom">
					<spartan-logo class="w-10" aria-hidden="true" />
					<span class="sr-only">Capsule</span>
				</a>

				<spartan-mobile-nav class="lg:hidden" />

				<div class="hidden sm:space-x-2 lg:flex">
					<a spartanNavLink="/documentation">Docs</a>
					<a spartanNavLink="/components">Components</a>
					<a spartanNavLink="/blocks">Blocks</a>
					<a spartanNavLink="/colors">Colors</a>
					<a spartanNavLink="/stack">Stack</a>
				</div>

				<div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
					<spartan-docs-dialog class="hidden w-full flex-1 md:flex md:w-auto md:flex-none" />
					<caps-separator orientation="vertical" class="!h-4 !self-center" />
					<a href="${REPOSITORY_URL}" target="_blank" rel="noopener noreferrer" size="sm" variant="ghost" capsButton>
						<ng-icon name="lucideGithub" />
						<span class="sr-only">Capsule GitHub repository</span>
					</a>
					<caps-separator orientation="vertical" class="!h-4 !self-center" />
					<spartan-layout-mode class="3xl:flex hidden" />
					<spartan-dark-mode />
				</div>
			</div>
		</div>
	`,
})
export class Header {}
