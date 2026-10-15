import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { hlmP } from '@spartan-ng/helm/typography';
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
import { ProgressIndeterminatePreview } from './progress--indeterminate.preview';
import { ProgressRtlPreview } from './progress--rtl.example';
import { ProgressPreview, defaultImports, defaultSkeleton } from './progress.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Progress', api: 'progress' },
	meta: metaWith(
		'Capsule — Progress',
		'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
	),
	title: 'Capsule — Progress',
};
@Component({
	selector: 'spartan-progress',
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
		ProgressPreview,
		ProgressIndeterminatePreview,
		SectionSubSubHeading,
		RtlHeader,
		CodeRtlPreview,
		ProgressRtlPreview,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Progress"
				lead="Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
				showThemeToggle
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-progress-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="accessibility">Accessibility and motion</spartan-section-sub-heading>
			<p class="${hlmP}">
				Provide native aria-label or associate an external label with aria-labelledby and helper text with
				aria-describedby. The component owns the indicator and exposes the Spartan value, max and getValueLabel
				properties. Null or undefined is indeterminate: no current value is announced. Progress is not a live region.
				Import the Capsule preset; animation and transitions stop when reduced motion is requested.
			</p>
			<spartan-code code="@import '@capsule-ng/caps/caps-preset.css';" fileName="src/styles.css" />

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="examples__indeterminate" spartanH4>Indeterminate</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-progress-indeterminate />
				</div>
				<spartan-code secondTab [code]="_indeterminateCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-progress-rtl-preview />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="questionnaire" label="Questionnaire" />
				<spartan-page-bottom-nav-link direction="previous" href="popover" label="Popover" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class ProgressPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('progress');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _indeterminateCode = computed(() => this._snippets()['indeterminate']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
