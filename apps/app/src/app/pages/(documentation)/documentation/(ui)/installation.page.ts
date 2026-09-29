import { type RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PackageInstallerTabs } from '@spartan-ng/app/app/shared/layout/package-installer-tabs';
import { SectionSubSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-sub-heading';
import { HlmAlert, HlmAlertDescription, HlmAlertTitle } from '@spartan-ng/helm/alert';

import { hlmCode, hlmP } from '@spartan-ng/helm/typography';
import { Code } from '../../../../shared/code/code';
import { MainSection } from '../../../../shared/layout/main-section';
import { PageBottomNav } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '../../../../shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '../../../../shared/layout/page-nav/page-nav';
import { SectionIntro } from '../../../../shared/layout/section-intro';
import { SectionSubHeading } from '../../../../shared/layout/section-sub-heading';
import { metaWith } from '../../../../shared/meta/meta.util';
import {
	cssVariables,
	spartanPresetImport,
	tailwindAutocompletion,
	tailwindImports,
	tailwindPrettierSorting,
} from './installation-snippets';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Installation' },
	meta: metaWith('spartan - Installation', 'Install spartan/ui in your Angular project'),
	title: 'spartan - Installation',
};

@Component({
	selector: 'spartan-installation',
	imports: [
		MainSection,
		SectionIntro,
		PageBottomNav,
		PageBottomNavLink,
		PageNav,
		SectionSubHeading,
		Code,

		RouterLink,
		SectionSubSubHeading,
		HlmAlert,
		HlmAlertDescription,
		HlmAlertTitle,
		PackageInstallerTabs,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Installation" lead="Install behavior. Add styles. Start building." />

			<p class="${hlmP}">
				spartan/ui uses a two-layer architecture:
				<code class="${hlmCode}">&#64;spartan-ng/brain</code>
				provides accessible primitives from npm, and
				<code class="${hlmCode}">helm</code>
				styles them with Tailwind CSS.
			</p>

			<spartan-section-sub-heading id="prerequisites">Prerequisites</spartan-section-sub-heading>

			<p class="${hlmP}">
				spartan/ui requires Tailwind CSS. If you haven't set it up yet, follow the
				<a
					class="${hlmCode} underline"
					href="https://tailwindcss.com/docs/installation/framework-guides/angular"
					target="_blank"
				>
					official Angular installation guide
				</a>
				before continuing.
			</p>

			<spartan-section-sub-heading id="setup">Setup</spartan-section-sub-heading>
			<h3 spartanH4 id="install-dependencies">1. Install Dependencies</h3>

			<p class="${hlmP}">Install the brain (accessible primitives):</p>
			<spartan-package-installer-tab class="mt-4" package="brn" />

			<p class="${hlmP}">Install Angular CDK (required for overlays and accessibility):</p>
			<spartan-package-installer-tab class="mt-4" package="cdk" />

			<h3 spartanH4 id="configure-tailwind-css">2. Configure Tailwind CSS</h3>

			<p class="${hlmP}">spartan/ui requires Tailwind CSS v4.</p>

			<h4 spartanH4 id="configure-layers">2.1 Configure CSS Layers</h4>
			<p class="${hlmP}">
				Add these layers to your
				<code class="${hlmCode}">styles.css</code>
				to ensure ng-icons styles load correctly:
			</p>
			<spartan-code class="mt-4" [code]="_tailwindImports" fileName="src/styles.css" />

			<h4 spartanH4 id="import-preset" class="mt-8">2.2 Import spartan/ui preset</h4>
			<p class="${hlmP}">Add the spartan preset to your CSS file:</p>
			<spartan-code class="mt-4" [code]="_spartanPresetImport" fileName="src/styles.css" />

			<div hlmAlert class="mt-6">
				<h4 hlmAlertTitle>spartan/ui preset</h4>
				<div hlmAlertDescription>
					<p class="${hlmP}">Our preset already includes tw-animate-css and &#64;angular/cdk/overlay-prebuilt.css</p>
				</div>
			</div>

			<h4 spartanH4 id="add-theme-variables" class="mt-8">2.3 Add Theme Variables</h4>
			<p class="${hlmP}">
				Copy these CSS variables to your
				<code class="${hlmCode}">styles.css</code>
				:
			</p>

			<spartan-code class="mt-6" fileName="styles.css" [code]="_cssVariables" />

			<p class="${hlmP}">
				Learn how to customize these variables in the
				<a routerLink="/documentation/theming" class="${hlmCode} underline">theming documentation</a>
				.
			</p>

			<spartan-section-sub-heading id="editor-setup">Editor Setup (Optional)</spartan-section-sub-heading>

			<h3 spartanH4 id="tailwind-autocompletion">Tailwind autocompletion</h3>
			<p class="${hlmP}">
				Enable Tailwind autocompletion in
				<code class="${hlmCode}">hlm</code>
				,
				<code class="${hlmCode}">cva</code>
				and
				<code class="${hlmCode}">classes</code>
				functions:
			</p>

			<h4 spartanH4>Intellisense (VSCode)</h4>

			<ol class="my-6 ml-6 list-decimal [&>li]:mt-2">
				<li>
					Install the
					<a
						class="${hlmCode} underline"
						href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss"
						target="_blank"
						rel="noopener noreferrer"
					>
						Tailwind CSS IntelliSense
					</a>
					extension
				</li>
				<li>
					Add this to your
					<code class="${hlmCode}">settings.json</code>
					:
				</li>
			</ol>

			<spartan-code class="mt-4" [code]="_tailwindAutocompletion" />

			<h4 spartanH4>Tailwind CSS plugin (Jetbrains)</h4>

			<ol class="my-6 ml-6 list-decimal [&>li]:mt-2">
				<li>
					Open Tailwind configuration (
					<code>Settings > Language & Frameworks > Style sheets > Tailwind CSS</code>
					)
				</li>
				<li>Add this to the configuration:</li>
			</ol>

			<spartan-code class="mt-4" [code]="_tailwindAutocompletion" />

			<h3 spartanH4 id="sorting-classes" class="mt-8">Class Sorting</h3>
			<p class="${hlmP}">Automatically sort Tailwind classes with Prettier:</p>

			<ol class="my-6 ml-6 list-decimal [&>li]:mt-2">
				<li>
					Install
					<a
						class="${hlmCode} underline"
						href="https://github.com/tailwindlabs/prettier-plugin-tailwindcss"
						target="_blank"
						rel="noopener noreferrer"
					>
						prettier-plugin-tailwindcss
					</a>
				</li>
				<li>
					(Optional) For Jetbrains-based IDEs: configure Prettier. Go to
					<code>Settings > Language & Frameworks > JavaScript > Prettier</code>
					, check "Automatic Prettier configuration" and add
					<code>html</code>
					in the "Run for files" pattern.
				</li>
				<li>
					Add this to your
					<code class="${hlmCode}">.prettierrc</code>
					:
				</li>
			</ol>

			<spartan-code class="mt-4" [code]="_tailwindPrettierSorting" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="theming" label="Theming" />
				<spartan-page-bottom-nav-link direction="previous" href="about" label="About" />
			</spartan-page-bottom-nav>
		</section>

		<spartan-page-nav />
	`,
})
export default class InstallationPage {
	protected readonly _tailwindImports = tailwindImports;
	protected readonly _spartanPresetImport = spartanPresetImport;
	protected readonly _cssVariables = cssVariables;
	protected readonly _tailwindAutocompletion = tailwindAutocompletion;
	protected readonly _tailwindPrettierSorting = tailwindPrettierSorting;
}
