import { type RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsAlert, CapsAlertDescription, CapsAlertTitle } from '@capsule-ng/caps/alert';
import { PackageInstallerTabs } from '@spartan-ng/app/app/shared/layout/package-installer-tabs';
import { SectionSubSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-sub-heading';

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
	meta: metaWith('Capsule — Installation', 'Install spartan/ui in your Angular project'),
	title: 'Capsule — Installation',
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
		CapsAlert,
		CapsAlertDescription,
		CapsAlertTitle,
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

			<p class="${hlmP}">
				Capsule is currently distributed as a private local package. Before importing its stylesheet, install the built
				Capsule archive and its peer dependencies, including the matching local Helm package. Follow the
				<a class="underline" href="https://github.com/valentinprs/capsule-ng/blob/main/libs/caps/README.md">
					Capsule package setup
				</a>
				. The shared font stylesheet requires
				<code class="${hlmCode}">&#64;fontsource/inter</code>
				,
				<code class="${hlmCode}">&#64;fontsource/geist-mono</code>
				,
				<code class="${hlmCode}">&#64;fontsource-variable/noto-sans-arabic</code>
				and
				<code class="${hlmCode}">&#64;fontsource-variable/noto-sans-hebrew</code>
				.
			</p>

			<p class="${hlmP}">Install the brain (accessible primitives):</p>
			<spartan-package-installer-tab class="mt-4" package="brn" />

			<p class="${hlmP}">Install Angular CDK (required for overlays and accessibility):</p>
			<spartan-package-installer-tab class="mt-4" package="cdk" />

			<h3 spartanH4 id="configure-tailwind-css">2. Configure Tailwind CSS</h3>

			<p class="${hlmP}">spartan/ui requires Tailwind CSS v4.</p>

			<h4 spartanH4 id="configure-layers">2.1 Import Capsule foundations</h4>
			<p class="${hlmP}">
				Add this shared entry point to your
				<code class="${hlmCode}">styles.css</code>
				to ensure ng-icons styles load correctly:
			</p>
			<spartan-code class="mt-4" [code]="_tailwindImports" fileName="src/styles.css" />

			<h4 spartanH4 id="import-preset" class="mt-8">2.2 Included presets</h4>
			<p class="${hlmP}">
				The entry point already includes Brain, the compatibility skins, Capsule and the Inter / Geist Mono font faces.
			</p>
			<spartan-code class="mt-4" [code]="_spartanPresetImport" fileName="src/styles.css" />

			<caps-alert class="mt-6">
				<caps-alert-title>spartan/ui preset</caps-alert-title>
				<caps-alert-description>
					<p class="${hlmP}">Our preset already includes tw-animate-css and &#64;angular/cdk/overlay-prebuilt.css</p>
				</caps-alert-description>
			</caps-alert>

			<h4 spartanH4 id="add-theme-variables" class="mt-8">2.3 Optional theme overrides</h4>
			<p class="${hlmP}">
				Override only the Capsule tokens you want to customize in your
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
