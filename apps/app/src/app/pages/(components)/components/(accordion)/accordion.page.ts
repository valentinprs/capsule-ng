import type { RouteMeta } from '@analogjs/router';
import { injectComponentDocs } from '../../../../core/services/component-docs';

import { Component, computed, inject } from '@angular/core';
import { hlmCode, hlmP } from '@spartan-ng/helm/typography';
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
import { AccordionBorders } from './accordion--borders.example';
import { AccordionCard } from './accordion--card.example';
import { AccordionDisabled } from './accordion--disabled.example';
import { AccordionDynamic } from './accordion--dynamic.example';
import { AccordionMultiple } from './accordion--multiple.example';
import { AccordionRtl } from './accordion--rtl.example';
import { AccordionPreview, defaultImports, defaultSkeleton } from './accordion.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Accordion', api: 'accordion' },
	meta: metaWith(
		'Capsule — Accordion',
		'A vertically stacked set of interactive headings that each reveal a section of content.',
	),
	title: 'Capsule — Accordion',
};

@Component({
	selector: 'spartan-accordion',
	imports: [
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,
		Tabs,

		AccordionPreview,
		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		UIApiDocs,
		SectionSubSubHeading,
		RtlHeader,
		CodeRtlPreview,
		AccordionMultiple,
		AccordionBorders,
		AccordionCard,
		AccordionDisabled,
		AccordionDynamic,
		AccordionRtl,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Accordion"
				lead="A vertically stacked set of interactive headings that each reveal a section of content."
				showThemeToggle
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-accordion-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_imports" />
				<spartan-code [code]="_skeleton" />
			</div>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>
			<h3 id="examples__multiple" spartanH4>Multiple</h3>
			<p class="${hlmP}">
				Each item expands independently. To keep one section open, bind each item’s
				<code class="${hlmCode}">expanded</code>
				input and coordinate the
				<code class="${hlmCode}">selected</code>
				events, as in the main preview.
			</p>
			<p class="${hlmP}">
				The
				<code class="${hlmCode}">expanded</code>
				input sets an item’s expanded state. User activation emits selected with its id and expanded state.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-accordion-multiple />
				</div>
				<spartan-code secondTab [code]="_multipleCode()" />
			</spartan-tabs>

			<h3 id="examples__disabled" spartanH4>Disabled</h3>
			<p class="${hlmP}">
				Use the
				<code class="${hlmCode}">disabled</code>
				prop on the
				<code class="${hlmCode}">caps-accordion-item</code>
				to disable an item.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-accordion-disabled />
				</div>
				<spartan-code secondTab [code]="_disabledCode()" />
			</spartan-tabs>

			<h3 id="examples__borders" spartanH4>Borders</h3>
			<p class="${hlmP}">
				Add
				<code class="${hlmCode}">border</code>
				to the
				<code class="${hlmCode}">caps-accordion</code>
				and
				<code class="${hlmCode}">border-b last:border-b-0</code>
				to the
				<code class="${hlmCode}">caps-accordion-item</code>
				to customize the default item separators.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-accordion-borders />
				</div>
				<spartan-code secondTab [code]="_bordersCode()" />
			</spartan-tabs>

			<h3 id="examples__dynamic" spartanH4>Dynamic content</h3>
			<p class="${hlmP}">
				Content added or removed with
				<code class="${hlmCode}">&#64;if</code>
				(or any async data) is measured as it changes, so the panel animates to fit its new height while it stays open.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-accordion-dynamic />
				</div>
				<spartan-code secondTab [code]="_dynamicCode()" />
			</spartan-tabs>

			<h3 id="examples__card" spartanH4>Card</h3>
			<p class="${hlmP}">
				Wrap the
				<code class="${hlmCode}">caps-accordion</code>
				inside a
				<code class="${hlmCode}">caps-card</code>
				component.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-accordion-card />
				</div>
				<spartan-code secondTab [code]="_cardCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-accordion-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="brn-api">Brain API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="brain" />

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="alert" label="Alert" />
				<spartan-page-bottom-nav-link direction="previous" href="/components" label="Components" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class AccordionPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('accordion');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _multipleCode = computed(() => this._snippets()['multiple']);
	protected readonly _disabledCode = computed(() => this._snippets()['disabled']);
	protected readonly _bordersCode = computed(() => this._snippets()['borders']);
	protected readonly _cardCode = computed(() => this._snippets()['card']);
	protected readonly _dynamicCode = computed(() => this._snippets()['dynamic']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _imports = defaultImports;
	protected readonly _skeleton = defaultSkeleton;
}
