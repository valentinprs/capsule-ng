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
import { CheckboxForm } from './checkbox--form.example';
import { CheckboxRtlPreview } from './checkbox--rtl.example';
import { CheckboxPreview, defaultImports, defaultSkeleton } from './checkbox.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Checkbox', api: 'checkbox' },
	meta: metaWith('Capsule — Checkbox', 'A control that allows the user to toggle between checked and not checked.'),
	title: 'Capsule — Checkbox',
};
@Component({
	selector: 'spartan-checkbox',
	imports: [
		UIApiDocs,
		CheckboxForm,
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,
		Tabs,

		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		CheckboxPreview,
		RtlHeader,
		CodeRtlPreview,
		CheckboxRtlPreview,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Checkbox"
				lead="A control that allows the user to toggle between checked and not checked."
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-checkbox-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="reactive-form">Reactive Form</spartan-section-sub-heading>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab><spartan-checkbox-form /></div>
				<spartan-code secondTab [code]="_formCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-checkbox-rtl-preview />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>
			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="collapsible" label="Collapsible" />
				<spartan-page-bottom-nav-link direction="previous" href="chart" label="Chart" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class CheckboxPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('checkbox');
	protected readonly _formCode = computed(() => this._snippets()['form']);
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
