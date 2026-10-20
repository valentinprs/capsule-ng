import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { UIApiDocs } from '@spartan-ng/app/app/shared/layout/ui-docs-section/ui-docs-section';
import { HlmTypographyImports } from '@spartan-ng/helm/typography';
import { Code } from '../../../../shared/code/code';
import { CodePreview } from '../../../../shared/code/code-preview';
import { MainSection } from '../../../../shared/layout/main-section';
import { PageBottomNav } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '../../../../shared/layout/page-nav/page-nav';
import { SectionIntro } from '../../../../shared/layout/section-intro';
import { SectionSubHeading } from '../../../../shared/layout/section-sub-heading';
import { Tabs } from '../../../../shared/layout/tabs';
import { metaWith } from '../../../../shared/meta/meta.util';
import { HeaderMinimalPreview } from './header--minimal.preview';
import { defaultImports, defaultSkeleton, HeaderPreview } from './header.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Header', api: 'header' },
	meta: metaWith('Capsule — Header', 'The application bar shown at the top of every page.'),
	title: 'Capsule — Header',
};

@Component({
	selector: 'spartan-header-page',
	imports: [
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,
		Tabs,
		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		UIApiDocs,
		HlmTypographyImports,
		HeaderPreview,
		HeaderMinimalPreview,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Header"
				lead="The application bar shown at the top of every page: app name, primary navigation, actions and the brand logo."
				showThemeToggle
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-header-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_imports" />
				<spartan-code [code]="_codeSkeleton" />
			</div>

			<p hlmP>
				<span hlmCode>caps-header</span>
				places its parts in a fixed order, whatever their order in the template.
				<span hlmCode>caps-header-logo</span>
				goes at the end and holds the brand logo, which the app provides. The visual identifier is 40 × 40 px. Below the
				<span hlmCode>md</span>
				breakpoint,
				<span hlmCode>caps-header-nav</span>
				is hidden and
				<span hlmCode>caps-header-menu</span>
				shows a menu button that opens its projected navigation in a left sheet.
			</p>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="examples_minimal" spartanH4>Minimal</h3>
			<p hlmP>Every part except the title is optional, for applications with a single page.</p>
			<spartan-tabs firstTab="Preview" secondTab="Code" class="mt-6">
				<div spartanCodePreview firstTab>
					<spartan-header-minimal-preview />
				</div>
				<spartan-code secondTab [code]="_minimalCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="hover-card" label="Hover Card" />
				<spartan-page-bottom-nav-link direction="previous" href="field" label="Field" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class HeaderPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('header');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _minimalCode = computed(() => this._snippets()['minimal']);
	protected readonly _imports = defaultImports;
	protected readonly _codeSkeleton = defaultSkeleton;
}
