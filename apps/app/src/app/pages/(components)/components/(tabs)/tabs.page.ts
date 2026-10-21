import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { CapsAlert, CapsAlertDescription, CapsAlertMedia } from '@capsule-ng/caps/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert } from '@ng-icons/lucide';
import { hlmCode } from '@spartan-ng/helm/typography';
import { injectComponentDocs } from '../../../../core/services/component-docs';
import { PrimitiveSnippetsService } from '../../../../core/services/primitive-snippets.service';
import { Code } from '../../../../shared/code/code';
import { CodePreview } from '../../../../shared/code/code-preview';
import { CodeRtlPreview } from '../../../../shared/code/code-rtl-preview';
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
import { TabsBasicPreview } from './tabs--basic.preview';
import { TabsIconsOnlyPreview } from './tabs--icon-only.preview';
import { TabsInputButtonPreview } from './tabs--input-button.preview';
import { TabsLazyPreview } from './tabs--lazy.preview';
import { TabsLinePreview } from './tabs--line.preview';
import { TabsPaginatedPreview } from './tabs--paginated.preview';
import { TabsRtlPreview } from './tabs--rtl.example';
import { TabsVerticalPreview } from './tabs--vertical.preview';
import { TabsWithIconsPreview } from './tabs--with-icons.preview';
import { TabsPreview, defaultImports, defaultSkeleton } from './tabs.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Tabs', api: 'tabs' },
	meta: metaWith(
		'Capsule — Tabs',
		'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
	),
	title: 'Capsule — Tabs',
};
@Component({
	selector: 'spartan-tabs-page',
	imports: [
		UIApiDocs,
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,
		Tabs,

		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		TabsPreview,
		TabsVerticalPreview,
		TabsPaginatedPreview,
		TabsBasicPreview,
		TabsLinePreview,
		TabsWithIconsPreview,
		TabsIconsOnlyPreview,
		TabsInputButtonPreview,
		TabsLazyPreview,
		CapsAlertDescription,
		CapsAlertMedia,
		CapsAlert,
		NgIcon,
		SectionSubSubHeading,
		RtlHeader,
		CodeRtlPreview,
		TabsRtlPreview,
	],
	providers: [provideIcons({ lucideCircleAlert })],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Tabs"
				lead="A set of layered sections of content—known as tab panels—that are displayed one at a time."
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>
			<h3 id="examples__vertical" spartanH4>Vertical</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-vertical />
				</div>
				<spartan-code secondTab [code]="_verticalCode()" />
			</spartan-tabs>

			<h3 id="examples__basic" spartanH4>Basic</h3>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-basic />
				</div>
				<spartan-code secondTab [code]="_basicCode()" />
			</spartan-tabs>

			<h3 id="examples__line" spartanH4>Line</h3>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-line />
				</div>
				<spartan-code secondTab [code]="_lineCode()" />
			</spartan-tabs>

			<h3 id="examples__with_icons" spartanH4>With Icons</h3>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-with-icons />
				</div>
				<spartan-code secondTab [code]="_withIconsCode()" />
			</spartan-tabs>

			<h3 id="examples__icons_only" spartanH4>Icons Only</h3>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-icons-only />
				</div>
				<spartan-code secondTab [code]="_iconOnlyCode()" />
			</spartan-tabs>

			<h3 id="examples__input_button" spartanH4>With Input and Button</h3>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-input-button />
				</div>
				<spartan-code secondTab [code]="_inputButtonCode()" />
			</spartan-tabs>

			<h3 id="examples__lazy_loading" spartanH4>Lazy Loading</h3>

			<p class="py-2">
				Use
				<code class="${hlmCode}">capsTabsContentLazy</code>
				on an
				<code class="${hlmCode}">ng-template</code>
				inside a tab panel to keep its content out of the DOM until the user navigates to that tab. This is particularly
				useful when panels trigger network requests or render expensive component trees. The content is created once on
				first visit and remains alive for subsequent visits.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-lazy />
				</div>
				<spartan-code secondTab [code]="_lazyCode()" />
			</spartan-tabs>

			<h3 id="examples__paginated_tabs" spartanH4>Paginated Tabs</h3>

			<p class="pt-2">
				Use
				<code class="${hlmCode}">caps-tabs-paginated-list</code>
				instead of
				<code class="${hlmCode}">caps-tabs-list</code>
				for paginated tabs list with next and previous buttons.
			</p>
			<p class="py-2">
				Disable pagination with
				<code class="${hlmCode}">[disablePagination]="true"</code>
				. Hides the pagination buttons and active tab is not scrolled into view.
			</p>

			<caps-alert class="my-2">
				<caps-alert-media><ng-icon name="lucideCircleAlert" aria-hidden="true" /></caps-alert-media>
				<caps-alert-description>
					<p>
						<strong>Padding</strong>
						styles, applied to the tab list (
						<code class="${hlmCode} text-foreground">CapsTabsList</code>
						), are
						<strong>not</strong>
						taken into account during
						<strong>keyboard scrolling</strong>
						. This affects the active tab's scrolling position and next/previous button remain enabled even when the
						active tab is at the start or end of the tab list.
					</p>
				</caps-alert-description>
			</caps-alert>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-tabs-paginated />
				</div>
				<spartan-code secondTab [code]="_paginatedCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-tabs-rtl-preview />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="brn-api">Brain API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="brain" />

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="textarea" label="Textarea" />
				<spartan-page-bottom-nav-link direction="previous" href="table" label="Table" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class TabsPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('tabs');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _verticalCode = computed(() => this._snippets()['vertical']);
	protected readonly _basicCode = computed(() => this._snippets()['basic']);
	protected readonly _lineCode = computed(() => this._snippets()['line']);
	protected readonly _withIconsCode = computed(() => this._snippets()['withIcons']);
	protected readonly _iconOnlyCode = computed(() => this._snippets()['iconOnly']);
	protected readonly _inputButtonCode = computed(() => this._snippets()['inputButton']);
	protected readonly _lazyCode = computed(() => this._snippets()['lazy']);
	protected readonly _paginatedCode = computed(() => this._snippets()['paginated']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
