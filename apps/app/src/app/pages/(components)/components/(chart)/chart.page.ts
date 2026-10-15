import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { CapsLink } from '@capsule-ng/caps/link';
import { hlmCode, hlmP, hlmUl } from '@spartan-ng/helm/typography';
import { injectComponentDocs } from '../../../../core/services/component-docs';
import { PrimitiveSnippetsService } from '../../../../core/services/primitive-snippets.service';
import { Code } from '../../../../shared/code/code';
import { CodePreview } from '../../../../shared/code/code-preview';
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
import { ChartEmpty } from './chart--empty.example';
import { ChartLegend } from './chart--legend.example';
import { ChartLine } from './chart--line.example';
import { ChartPreview, defaultImports, defaultSkeleton } from './chart.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Chart', api: 'chart' },
	meta: metaWith('Capsule — Chart', 'Accessible charts powered by TanStack Charts.'),
	title: 'Capsule — Chart',
};

@Component({
	selector: 'spartan-chart',
	imports: [
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,
		SectionSubSubHeading,
		Tabs,
		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		CapsLink,
		ChartEmpty,
		ChartPreview,
		ChartLine,
		ChartLegend,
		CapsAlertImports,
		UIApiDocs,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Chart" lead="Accessible charts powered by TanStack Charts." showThemeToggle />

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-chart-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="about">About</spartan-section-sub-heading>
			<p class="${hlmP}">
				Chart integrates the official
				<a href="https://tanstack.com/charts/latest" target="_blank" rel="noreferrer" capsLink>TanStack Charts</a>
				Angular adapter. TanStack owns the chart grammar, rendering, interaction, focus, and accessibility; Capsule
				provides semantic colors, dark-mode integration, and tooltip styling.
			</p>

			<caps-alert class="mt-6">
				<caps-alert-description>
					<span class="font-semibold">Alpha.</span>
					This integration (and TanStack Charts itself) is in alpha. Its API can change between releases, so breaking
					changes may occur. Keep
					<code class="${hlmCode} text-foreground">&#64;tanstack/charts</code>
					and
					<code class="${hlmCode} text-foreground">&#64;tanstack/angular-charts</code>
					on matching versions supported by the
					<code class="${hlmCode} text-foreground">&#64;capsule-ng/caps</code>
					peer dependencies.
				</caps-alert-description>
			</caps-alert>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<p class="${hlmP}">
				Use
				<code class="${hlmCode}">caps-chart</code>
				with the official TanStack
				<code class="${hlmCode}">options</code>
				contract. Add
				<code class="${hlmCode}">CAPS_CHART_THEME</code>
				to the definition and enable tooltips with
				<code class="${hlmCode}">capsChartTooltip()</code>
				as shown in the complete example above.
			</p>

			<spartan-section-sub-heading id="theme">Theme</spartan-section-sub-heading>
			<p class="${hlmP}">
				The integration maps TanStack's foreground, muted, grid, palette, and tooltip surfaces to Capsule's semantic
				tokens. Override the categorical palette at any theme boundary:
			</p>
			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=".analytics-theme {
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}"
			/>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="examples__line" spartanH4>Line</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-chart-line />
				</div>
				<spartan-code secondTab [code]="_lineCode()" />
			</spartan-tabs>

			<h3 id="examples__legend" spartanH4>Multiple series and legend</h3>
			<p class="${hlmP}">
				TanStack's
				<code class="${hlmCode}">colorLegend</code>
				uses the same resolved palette and typography as the chart.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-chart-legend />
				</div>
				<spartan-code secondTab [code]="_legendCode()" />
			</spartan-tabs>

			<h3 id="examples__empty" spartanH4>No data</h3>
			<p class="${hlmP}">
				Choose a meaningful empty message before rendering the chart. Restore the data to see the same public options
				contract.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab><spartan-chart-empty /></div>
				<spartan-code secondTab [code]="_emptyCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="accessibility">Accessibility and SSR</spartan-section-sub-heading>
			<ul class="${hlmUl}">
				<li>
					Always provide a meaningful
					<code class="${hlmCode}">ariaLabel</code>
					.
				</li>
				<li>
					Use
					<code class="${hlmCode}">ariaDescription</code>
					for a concise summary of the current data.
				</li>
				<li>Provide an adjacent table or text summary when readers need exact values.</li>
				<li>Do not use color as the only way to communicate meaning.</li>
			</ul>
			<p class="${hlmP}">
				The chart component renders a static SVG on the server and mounts an interactive chart on the client. TanStack
				does not yet guarantee Angular hydration in its documented public contract.
			</p>

			<p class="${hlmP}">
				For chart composition and scale APIs, see TanStack's
				<a
					href="https://tanstack.com/charts/latest/docs/concepts/grammar-of-graphics"
					target="_blank"
					rel="noreferrer"
					capsLink
				>
					grammar of graphics
				</a>
				and
				<a
					href="https://tanstack.com/charts/latest/docs/framework/angular/adapter"
					target="_blank"
					rel="noreferrer"
					capsLink
				>
					Angular adapter
				</a>
				documentation.
			</p>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="checkbox" label="Checkbox" />
				<spartan-page-bottom-nav-link direction="previous" href="carousel" label="Carousel" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class ChartPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('chart');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _lineCode = computed(() => this._snippets()['line']);
	protected readonly _emptyCode = computed(() => this._snippets()['empty']);
	protected readonly _legendCode = computed(() => this._snippets()['legend']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
