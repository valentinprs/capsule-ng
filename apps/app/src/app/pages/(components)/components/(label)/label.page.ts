import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { CodeRtlPreview } from '@spartan-ng/app/app/shared/code/code-rtl-preview';
import { RtlHeader } from '@spartan-ng/app/app/shared/code/rtl-header';
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
import { LabelRtl } from './label--rtl.preview';
import { LabelPreview, defaultImports, defaultSkeleton } from './label.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Label', api: 'label' },
	meta: metaWith('Capsule — Label', 'Gives the label a distinct look.'),
	title: 'Capsule — Label',
};
@Component({
	selector: 'spartan-label',
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
		RtlHeader,
		CodeRtlPreview,
		LabelPreview,
		LabelRtl,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Label" lead="Gives the label a distinct look." />

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-label-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>
			<p class="mt-4 text-sm leading-relaxed">
				Apply capsLabel to a native label and set for to the associated control's id. Clicking the label keeps native
				focus and checkbox activation. Inside caps-field, the associated control is inferred when for is omitted; an
				explicit, non-empty for value takes precedence. The id input defaults to a generated label id. Disabled
				appearance follows an ancestor group with data-disabled="true" or a preceding disabled peer control; the
				control's native disabled state determines activation.
			</p>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-label-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Caps API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="marker" label="Marker" />
				<spartan-page-bottom-nav-link direction="previous" href="kbd" label="Kbd" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class LabelPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('label');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
