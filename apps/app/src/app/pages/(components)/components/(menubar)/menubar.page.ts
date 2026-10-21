import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsLink } from '@capsule-ng/caps/link';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { MenubarRtl } from '@spartan-ng/app/app/pages/(components)/components/(menubar)/menubar--rtl.preview';
import { CodeRtlPreview } from '@spartan-ng/app/app/shared/code/code-rtl-preview';
import { RtlHeader } from '@spartan-ng/app/app/shared/code/rtl-header';
import { link } from '@spartan-ng/app/app/shared/typography/link';
import { hlmP } from '@spartan-ng/helm/typography';
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
import { MenubarIcons } from './menubar--icons.preview';
import { defaultImports, defaultSkeleton, MenubarPreview } from './menubar.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Menubar', api: 'menubar' },
	meta: metaWith(
		'Capsule — Menubar',
		'A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.',
	),
	title: 'Capsule — Menubar',
};
@Component({
	selector: 'spartan-menubar',
	imports: [
		CapsLink,
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
		RouterLink,
		RtlHeader,
		CodeRtlPreview,
		MenubarPreview,
		MenubarIcons,
		MenubarRtl,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Menubar"
				lead="A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands."
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-menubar-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="about">About</spartan-section-sub-heading>
			<p class="${hlmP}">
				Menubar is built with the help of
				<a href="https://material.angular.dev/cdk/menu/overview" target="_blank" rel="noreferrer" class="${link}">
					Menu
				</a>
				from Material CDK and
				<a routerLink="/components/dropdown-menu" capsLink class="${link}">Dropdown Menu</a>
				.
			</p>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>
			<h3 id="icons" spartanH4>Icons</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-menubar-icons />
				</div>
				<spartan-code secondTab [code]="_iconsCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-menubar-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="message" label="Message" />
				<spartan-page-bottom-nav-link direction="previous" href="marker" label="Marker" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class MenubarPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('menubar');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _iconsCode = computed(() => this._snippets()['icons']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
