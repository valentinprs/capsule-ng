import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { CodeRtlPreview } from '@spartan-ng/app/app/shared/code/code-rtl-preview';
import { RtlHeader } from '@spartan-ng/app/app/shared/code/rtl-header';
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
import { CardDensityPreview } from './card--density.preview';
import { CardEdgeToEdge } from './card--edge-to-edge.preview';
import { CardImagePreview } from './card--image.preview';
import { CardMaxWidthPreview } from './card--max-width.preview';
import { CardRtl } from './card--rtl.preview';
import { CardSpacing } from './card--spacing.preview';
import { CardWidthPreview } from './card--width.preview';
import { CardPreview, defaultImports, defaultSkeleton } from './card.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Card', api: 'card' },
	meta: metaWith('Capsule — Card', 'Displays a card with header, content, and footer.'),
	title: 'Capsule — Card',
};

@Component({
	selector: 'spartan-card',
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
		SectionSubSubHeading,
		RtlHeader,
		CodeRtlPreview,
		CardPreview,
		CardDensityPreview,
		CardWidthPreview,
		CardMaxWidthPreview,
		CardSpacing,
		CardEdgeToEdge,
		CardImagePreview,
		CardRtl,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Card" lead="Displays a card with header, content, and footer." />

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-card-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>
			<h3 id="width" spartanH4>Width</h3>
			<p class="${hlmP}">
				Cards fill the available width by default. Use width="auto" to fit the content, including inside flex and grid
				containers.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab><spartan-card-width-preview /></div>
				<spartan-code secondTab [code]="_widthCode()" />
			</spartan-tabs>
			<h3 id="max-width" spartanH4>Maximum width</h3>
			<p class="${hlmP}">
				Use maxWidth="sm", "md", or "lg" to cap the width at the shared 24rem, 28rem, or 32rem container tokens. The
				default "none" has no nominal cap; every card still fits its parent.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab><spartan-card-max-width-preview /></div>
				<spartan-code secondTab [code]="_maxWidthCode()" />
			</spartan-tabs>
			<h3 id="density" spartanH4>Density</h3>

			<p class="${hlmP}">
				Use the
				<code class="${hlmCode}">density="compact"</code>
				prop for smaller spacing and title typography.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-card-density-preview />
				</div>
				<spartan-code secondTab [code]="_densityCode()" />
			</spartan-tabs>

			<h3 id="spacing" spartanH4>Spacing</h3>

			<p class="${hlmP}">
				In addition to the
				<code class="${hlmCode}">density</code>
				prop, you can use the
				<code class="${hlmCode}">--card-spacing</code>
				CSS variable to control the spacing between sections and the inset of card parts. Classes and inline styles
				remain available for specific dimensions, margins, and layout overrides. Width does not center the card; use a
				parent layout or mx-auto when needed.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-card-spacing />
				</div>
				<spartan-code secondTab [code]="_spacingCode()" />
			</spartan-tabs>

			<p class="${hlmP}">
				Use negative margins with
				<code class="${hlmCode}">-mx-(--card-spacing)</code>
				to make content go edge to edge while keeping it aligned with the card inset. When the edge-to-edge content sits
				above a footer, use
				<code class="${hlmCode}">-mb-(--card-spacing)</code>
				on
				<code class="${hlmCode}">caps-card-content</code>
				to remove the section gap.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-card-edge-to-edge />
				</div>
				<spartan-code secondTab [code]="_edgeToEdgeCode()" />
			</spartan-tabs>

			<h3 id="image" spartanH4>Image</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-card-image-preview />
				</div>
				<spartan-code secondTab [code]="_imageCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-card-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="carousel" label="Carousel" />
				<spartan-page-bottom-nav-link direction="previous" href="calendar" label="Calendar" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class CardPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('card');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _widthCode = computed(() => this._snippets()['width']);
	protected readonly _maxWidthCode = computed(() => this._snippets()['maxWidth']);
	protected readonly _densityCode = computed(() => this._snippets()['density']);
	protected readonly _spacingCode = computed(() => this._snippets()['spacing']);
	protected readonly _edgeToEdgeCode = computed(() => this._snippets()['edgeToEdge']);
	protected readonly _imageCode = computed(() => this._snippets()['image']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
