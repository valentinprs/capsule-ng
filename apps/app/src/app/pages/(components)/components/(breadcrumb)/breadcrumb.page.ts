import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { CodeRtlPreview } from '@spartan-ng/app/app/shared/code/code-rtl-preview';
import { RtlHeader } from '@spartan-ng/app/app/shared/code/rtl-header';
import { InstallTabs } from '@spartan-ng/app/app/shared/layout/install-tabs';
import { SectionSubSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-sub-heading';
import { hlmCode, hlmP } from '@spartan-ng/helm/typography';
import { Code } from '../../../../shared/code/code';
import { CodePreview } from '../../../../shared/code/code-preview';
import { MainSection } from '../../../../shared/layout/main-section';
import { PageBottomNav } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '../../../../shared/layout/page-nav/page-nav';
import { SectionIntro } from '../../../../shared/layout/section-intro';
import { SectionSubHeading } from '../../../../shared/layout/section-sub-heading';
import { Tabs } from '../../../../shared/layout/tabs';
import { UIApiDocs } from '../../../../shared/layout/ui-docs-section/ui-docs-section';
import { metaWith } from '../../../../shared/meta/meta.util';
import { BreadcrumbCollapsed } from './breadcrumb--collapsed.example';
import { BreadcrumbDropdown } from './breadcrumb--dropdown.example';
import { BreadcrumbRtl } from './breadcrumb--rtl.example';
import { BreadcrumbPreview, defaultImports, defaultSkeleton } from './breadcrumb.preview';

// Kept out of breadcrumb.preview.ts so they do not leak into the preview's Code tab snippet.
const routerImports = `
import { RouterLink } from '@angular/router';
import { CapsBreadcrumbImports } from '@capsule-ng/caps/breadcrumb';
import { CapsLinkImports } from '@capsule-ng/caps/link';
`;

const routerSkeleton = `
<caps-breadcrumb>
  <caps-breadcrumb-item>
    <a capsLink routerLink="/">Home</a>
  </caps-breadcrumb-item>
  <caps-breadcrumb-item>
    <a capsLink routerLink="/components">Components</a>
  </caps-breadcrumb-item>
  <caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
</caps-breadcrumb>
`;

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Breadcrumb', api: 'breadcrumb' },
	meta: metaWith('spartan/ui - Breadcrumb', 'Displays the path to the current resource using a hierarchy of links.'),
	title: 'spartan/ui - Breadcrumb',
};
@Component({
	selector: 'spartan-breadcrumb',

	imports: [
		UIApiDocs,
		MainSection,
		InstallTabs,
		Code,
		SectionIntro,
		SectionSubHeading,
		Tabs,
		CodePreview,

		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		RtlHeader,
		CodeRtlPreview,
		SectionSubSubHeading,
		BreadcrumbPreview,
		BreadcrumbDropdown,
		BreadcrumbCollapsed,
		BreadcrumbRtl,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Breadcrumb"
				lead="Displays the path to the current resource using a hierarchy of links."
				showThemeToggle
			/>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-breadcrumb-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-install-tabs primitive="breadcrumb" />

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>
			<p class="${hlmP}">
				Set
				<code class="${hlmCode} mr-0.5">href</code>
				on a
				<code class="${hlmCode} mr-0.5">caps-breadcrumb-item</code>
				to render its content as a native link. Without it, the item renders its content as is. The last item is the
				current page unless another item sets the
				<code class="${hlmCode} mr-0.5">current</code>
				input; the current item gets
				<code class="${hlmCode} mr-0.5">aria-current="page"</code>
				on its link when it has one, otherwise on the item itself.
			</p>
			<p class="${hlmP}">
				For navigation with the Angular router, leave
				<code class="${hlmCode} mr-0.5">href</code>
				unset and project an
				<code class="${hlmCode} mr-0.5">a capsLink routerLink</code>
				into the item: the item styles it as a breadcrumb link and marks it as the current page when needed.
			</p>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_routerImports" />
				<spartan-code [code]="_routerSkeleton" />
			</div>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>
			<h3 id="examples__dropdown" spartanH4>Dropdown</h3>
			<p class="${hlmP} mb-2">
				Place a
				<code class="${hlmCode} mr-0.5">caps-breadcrumb-ellipsis</code>
				inside a
				<code class="${hlmCode} mr-0.5">capsButton</code>
				that triggers a dropdown menu listing the collapsed items.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-breadcrumb-dropdown />
				</div>
				<spartan-code secondTab [code]="_dropdownCode()" />
			</spartan-tabs>

			<hr class="my-4 md:my-8" />

			<h3 id="examples__collapsed" spartanH4>Collapsed</h3>
			<p class="${hlmP} mb-2">
				We provide a
				<code class="${hlmCode} mr-0.5">caps-breadcrumb-ellipsis</code>
				component to show a collapsed state when the breadcrumb is too long.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-breadcrumb-collapsed />
				</div>
				<spartan-code secondTab [code]="_collapsedCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-breadcrumb-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="hlm-api">Helm API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="helm" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="bubble" label="Bubble" />
				<spartan-page-bottom-nav-link direction="previous" href="badge" label="Badge" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class BreadcrumbPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('breadcrumb');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _defaultImports = defaultImports;
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _routerImports = routerImports;
	protected readonly _routerSkeleton = routerSkeleton;

	protected readonly _dropdownCode = computed(() => this._snippets()['dropdown']);
	protected readonly _collapsedCode = computed(() => this._snippets()['collapsed']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
}
