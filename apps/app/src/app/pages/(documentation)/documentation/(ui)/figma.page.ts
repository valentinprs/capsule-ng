import type { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { MainSection } from '@spartan-ng/app/app/shared/layout/main-section';
import { PageBottomNav } from '@spartan-ng/app/app/shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '@spartan-ng/app/app/shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '@spartan-ng/app/app/shared/layout/page-nav/page-nav';
import { SectionIntro } from '@spartan-ng/app/app/shared/layout/section-intro';
import { SectionSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-heading';
import { metaWith } from '@spartan-ng/app/app/shared/meta/meta.util';
import { HlmAspectRatioImports } from '@spartan-ng/helm/aspect-ratio';
import { hlmP } from '@spartan-ng/helm/typography';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Figma' },
	meta: metaWith('Capsule — Figma', 'Design with the same components you build. Figma UI kit for spartan components.'),
	title: 'Capsule — Figma',
};

@Component({
	selector: 'spartan-figma',
	imports: [
		MainSection,
		SectionIntro,
		PageBottomNav,
		PageBottomNavLink,
		PageNav,
		SectionSubHeading,
		HlmAspectRatioImports,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Figma" lead="Community design references." />

			<p class="${hlmP}">
				Because spartan adapts shadcn/ui patterns for Angular, you can use shadcn design resources for prototyping. This
				includes Figma UI kits created by the community.
			</p>

			<p class="${hlmP}">
				<a class="font-medium hover:underline" href="https://twitter.com/skirano" target="_blank">Pietro Schirano</a>
				created a Figma UI kit for shadcn components. The original community resource is linked below:
			</p>

			<div class="mt-6" hlmAspectRatio="16/9"></div>

			<spartan-section-sub-heading id="get-started">Get the Figma Kit</spartan-section-sub-heading>

			<p class="${hlmP}">Duplicate the file to your Figma account:</p>

			<a
				class="mt-2 block text-lg font-medium underline"
				target="_blank"
				href="https://www.figma.com/community/file/1203061493325953101"
			>
				Get Figma UI Kit →
			</a>

			<p class="${hlmP} mt-6">
				This third-party shadcn kit is a design reference, not a Capsule component library. Capsule does not currently
				publish an equivalent Figma kit.
			</p>

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link direction="next" href="version-support" label="Version Support" />
				<spartan-page-bottom-nav-link direction="previous" href="typography" label="Typography" />
			</spartan-page-bottom-nav>
		</section>

		<spartan-page-nav />
	`,
})
export default class FigmaPage {}
