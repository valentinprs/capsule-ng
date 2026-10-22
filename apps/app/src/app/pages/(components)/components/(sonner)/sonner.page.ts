import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
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
import { SonnerDescriptionExample } from './sonner--description.example';
import { SonnerPositionExample } from './sonner--position.example';
import { SonnerTypesExample } from './sonner--types.example';
import { appConfigCode, defaultTemplate } from './sonner-template';
import { SonnerPreview, defaultImports, defaultSkeleton } from './sonner.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Sonner', api: 'sonner' },
	meta: metaWith('Capsule — Sonner', 'An opinionated toast component for Angular.'),
	title: 'Capsule — Sonner',
};
@Component({
	selector: 'spartan-sonner',
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
		SonnerPreview,
		SonnerTypesExample,
		SonnerDescriptionExample,
		SonnerPositionExample,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Sonner" lead="An opinionated toast component for Angular." />

			<p class="${hlmP}" data-sonner-accessibility-limits>
				Known accessibility limits: the unchanged Brain notification list has a native list-child mismatch and its list
				item uses the status role. These can affect list and announcement semantics. Tests report both findings with
				targeted exceptions; this is not a claim of complete accessibility conformance. Keep essential messages and
				actions available in the application.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-sonner-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<p class="${hlmP}">
				Add the
				<code class="${hlmCode}">CapsToaster</code>
				component to your root component.
			</p>

			<spartan-code class="mt-6" fileName="src/app/app.ts" [code]="_defaultTemplate" />

			<spartan-section-sub-heading id="angular-21-compatibility">Angular 21 Compatibility</spartan-section-sub-heading>
			<p class="${hlmP}">
				If you are using Angular 21+, the CDK overlay now defaults to using the
				<code class="${hlmCode}">popover</code>
				attribute, which causes overlay-based components (sheets, dialogs, etc.) to always render above
				<code class="${hlmCode}">&lt;caps-toaster&gt;</code>
				. To fix this, add
				<code class="${hlmCode}">provideSpartanHlm()</code>
				to your application config:
			</p>

			<spartan-code class="mt-6" fileName="src/app/app.config.ts" [code]="_appConfigCode" />

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>
			<h3 id="types" spartanH4>Types</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-sonner-types-example />
				</div>
				<spartan-code secondTab [code]="_typesCode()" />
			</spartan-tabs>

			<h3 id="description" spartanH4>Description</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-sonner-description-example />
				</div>
				<spartan-code secondTab [code]="_descriptionCode()" />
			</spartan-tabs>
			<h3 id="position" spartanH4>Position</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-sonner-position-example />
				</div>
				<spartan-code secondTab [code]="_positionCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<h3 id="caps-api-components" class="mt-6 text-xl font-semibold tracking-tight">Components</h3>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="spinner" label="Spinner" />
				<spartan-page-bottom-nav-link direction="previous" href="slider" label="Slider" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class SonnerPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('sonner');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _typesCode = computed(() => this._snippets()['types']);
	protected readonly _descriptionCode = computed(() => this._snippets()['description']);
	protected readonly _positionCode = computed(() => this._snippets()['position']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
	protected readonly _defaultTemplate = defaultTemplate;
	protected readonly _appConfigCode = appConfigCode;
}
