import type { RouteMeta } from '@analogjs/router';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';

import { hlmCode, hlmP } from '@spartan-ng/helm/typography';
import { MainSection } from '../../../shared/layout/main-section';
import { PageBottomNavPlaceholder } from '../../../shared/layout/page-bottom-nav-placeholder';
import { PageBottomNav } from '../../../shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '../../../shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '../../../shared/layout/page-nav/page-nav';
import { SectionIntro } from '../../../shared/layout/section-intro';
import { SectionSubHeading } from '../../../shared/layout/section-sub-heading';
import { metaWith } from '../../../shared/meta/meta.util';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Introduction' },
	meta: metaWith(
		'Capsule — Introduction',
		'spartan is a collection of tools to superpower your Angular full-stack development.',
	),
	title: 'Capsule — Introduction',
};

@Component({
	selector: 'spartan-docs-intro',
	imports: [
		MainSection,
		SectionIntro,
		SectionSubHeading,
		PageNav,
		CapsAccordionImports,
		RouterLink,
		PageNav,
		PageBottomNavLink,
		PageBottomNav,
		PageBottomNavPlaceholder,
		CapsButtonImports,
		NgIcon,
	],
	providers: [provideIcons({ lucideChevronRight })],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Introduction"
				lead="Accessible UI primitives for Angular. Install the behavior. Copy the styles."
			/>

			<p class="${hlmP}">
				<code class="${hlmCode}">spartan/ui</code>
				gives you accessible, customizable components for Angular applications. Built with signals, SSR compatible, and
				zoneless ready - no full-stack setup required, just add to any Angular project.
			</p>

			<spartan-section-sub-heading id="how-it-works">How it works</spartan-section-sub-heading>
			<p class="${hlmP}">
				spartan uses a two-layer architecture that gives you both maintained accessibility and complete style ownership:
			</p>

			<div class="my-6 grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border p-4">
					<div class="mb-2 flex items-center gap-2">
						<span class="text-2xl">🧠</span>
						<code class="${hlmCode}">spartan/ui/brain</code>
					</div>
					<p class="text-muted-foreground mb-6 text-sm">
						Unstyled, accessible primitives installed via npm. Handles ARIA attributes, keyboard navigation, and focus
						management.
					</p>
					<p class="text-muted-foreground text-xs">
						<strong>You install it:</strong>
						Regular dependency with updates and maintenance included.
					</p>
				</div>

				<div class="rounded-lg border p-4">
					<div class="mb-2 flex items-center gap-2">
						<span class="text-2xl">⚡</span>
						<code class="${hlmCode}">spartan/ui/helm</code>
					</div>
					<p class="text-muted-foreground mb-6 text-sm">
						Styled components with a shadcn-inspired design system. Built with Tailwind CSS classes you can edit
						directly.
					</p>
					<p class="text-muted-foreground text-xs">
						<strong>You copy it:</strong>
						Lives in your codebase. Customize without fighting a theming API.
					</p>
				</div>
			</div>

			<p class="${hlmP}">
				This hybrid approach means you get the best of both worlds: we maintain the complex accessibility logic, while
				you own and control every aspect of the styling.
			</p>

			<div class="mt-6 flex items-center justify-end">
				<a routerLink="/documentation/installation" variant="secondary" size="sm" capsButton outline="">
					Get started with spartan/ui
					<ng-icon name="lucideChevronRight" class="ml-2" />
				</a>
			</div>

			<spartan-section-sub-heading id="spartan-stack">Full-stack development (optional)</spartan-section-sub-heading>
			<p class="${hlmP}">
				Need more than UI components? The
				<code class="${hlmCode}">spartan/stack</code>
				provides an opinionated full-stack setup with AnalogJs for end-to-end type-safe development.
			</p>
			<p class="${hlmP}">
				Built on:
				<code class="${hlmCode}">Supabase</code>
				,
				<code class="${hlmCode}">Angular</code>
				,
				<code class="${hlmCode}">tRPC</code>
				,
				<code class="${hlmCode}">Tailwind</code>
				,
				<code class="${hlmCode}">AnalogJs</code>
				,
				<code class="${hlmCode}">Nx</code>
				, and
				<code class="${hlmCode}">Drizzle</code>
			</p>
			<div class="mt-6 flex items-center justify-end">
				<a routerLink="/stack" variant="secondary" size="sm" capsButton outline="">
					Explore spartan/stack
					<ng-icon name="lucideChevronRight" class="ml-2" />
				</a>
			</div>

			<spartan-section-sub-heading id="faq">FAQ</spartan-section-sub-heading>
			<caps-accordion>
				<caps-accordion-item
					title="What is spartan/ui?"
					id="introduction-page-1"
					[expanded]="_activeItem() === 'introduction-page-1'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					A collection of accessible UI primitives for Angular. You install behavior via npm and copy styles into your
					codebase for complete customization.
				</caps-accordion-item>

				<caps-accordion-item
					title="Do I need AnalogJs or a full-stack setup?"
					id="introduction-page-2"
					[expanded]="_activeItem() === 'introduction-page-2'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					No. spartan/ui works with any Angular application. The spartan/stack is optional for full-stack development.
				</caps-accordion-item>

				<caps-accordion-item
					title="What's the difference between Brain and Helm?"
					id="introduction-page-3"
					[expanded]="_activeItem() === 'introduction-page-3'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					Brain (brn) is the unstyled, accessible primitive you install from npm - we maintain it with updates. Helm
					(hlm) is the styled layer you copy into your project - you own and customize it.
				</caps-accordion-item>

				<caps-accordion-item
					title="Why copy components instead of installing them?"
					id="introduction-page-4"
					[expanded]="_activeItem() === 'introduction-page-4'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					Copying styles gives you complete control. No theming API to learn, no version conflicts, no waiting for
					maintainers to add features. Edit Tailwind classes directly and ship.
				</caps-accordion-item>

				<caps-accordion-item
					title="Why are there so few unit tests in the codebase?"
					id="introduction-page-5"
					[expanded]="_activeItem() === 'introduction-page-5'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					We run comprehensive end-to-end tests in real browsers instead of JSDOM. UI components need to test behavior
					(focus management, keyboard navigation, ARIA announcements) that only works properly in actual browser
					environments. We found ourselves duplicating tests just to satisfy coverage metrics when the e2e tests already
					proved the components work.
				</caps-accordion-item>

				<caps-accordion-item
					title="Is spartan/ui inspired by shadcn/ui?"
					id="introduction-page-6"
					[expanded]="_activeItem() === 'introduction-page-6'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					Yes. We adapted the copy-paste philosophy and design patterns from shadcn/ui (React) and Radix UI for Angular,
					using signals, standalone components, and Angular-native APIs.
				</caps-accordion-item>

				<caps-accordion-item
					title="What is spartan/stack?"
					id="introduction-page-7"
					[expanded]="_activeItem() === 'introduction-page-7'"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					An optional collection of full-stack technologies for end-to-end type-safe Angular development with AnalogJs.
					Not required for using spartan/ui.
				</caps-accordion-item>
			</caps-accordion>

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="changelog" label="Changelog" />
				<spartan-page-bottom-nav-placeholder />
			</spartan-page-bottom-nav>
		</section>

		<spartan-page-nav />
	`,
})
export default class DocsIntroPage {
	protected readonly _activeItem = signal<string | null>(null);
}
