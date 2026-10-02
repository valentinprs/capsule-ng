import type { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { Code } from '@spartan-ng/app/app/shared/code/code';
import { MainSection } from '@spartan-ng/app/app/shared/layout/main-section';
import { PageBottomNav } from '@spartan-ng/app/app/shared/layout/page-bottom-nav/page-bottom-nav';
import { PageBottomNavLink } from '@spartan-ng/app/app/shared/layout/page-bottom-nav/page-bottom-nav-link';
import { PageNav } from '@spartan-ng/app/app/shared/layout/page-nav/page-nav';
import { SectionIntro } from '@spartan-ng/app/app/shared/layout/section-intro';
import { SectionSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-heading';
import { SectionSubSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-sub-heading';
import { metaWith } from '@spartan-ng/app/app/shared/meta/meta.util';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { hlmCode, hlmP } from '@spartan-ng/helm/typography';
import { CAPS_TOKENS_CSS } from '@spartan-ng/styles';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Theming' },
	meta: metaWith('Capsule — Theming', 'Customize colors with CSS variables'),
	title: 'Capsule — Theming',
};

@Component({
	selector: 'spartan-theming',
	imports: [
		MainSection,
		SectionIntro,
		PageBottomNav,
		PageBottomNavLink,
		PageNav,
		SectionSubHeading,
		Code,
		HlmAlertImports,
		SectionSubSubHeading,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Theming"
				lead="Customize your design system with CSS variables. No theming API required."
			/>

			<p class="${hlmP}">
				spartan/ui uses CSS variables for theming. Change colors across your entire application by updating values in
				your
				<code class="${hlmCode}">styles.css</code>
				file - no component props, no complex configuration.
			</p>

			<spartan-code class="mt-6" code='<div class="bg-background text-foreground">Themed content</div>' />

			<spartan-section-sub-heading id="how-it-works">How it works</spartan-section-sub-heading>

			<p class="${hlmP}">
				Colors are defined once as caps color tokens, such as
				<code class="${hlmCode}">--caps-primary</code>
				, aligned with the Figma design system. The shadcn variables referenced by Tailwind utility classes alias them (
				<code class="${hlmCode}">--primary: var(--caps-primary)</code>
				). Override a caps token in your
				<code class="${hlmCode}">styles.css</code>
				, and every component using that color updates automatically.
			</p>

			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=":root {
  --caps-primary: oklch(0.546 0.245 262.881);
  --caps-primary-foreground: oklch(0.97 0.014 254.604);
}"
			/>

			<p class="${hlmP}">Use the color in your markup with Tailwind classes:</p>

			<spartan-code class="mt-6" code='<button class="bg-primary text-primary-foreground">Click me</button>' />

			<spartan-section-sub-heading id="convention">Color naming convention</spartan-section-sub-heading>

			<p class="${hlmP}">
				spartan follows a
				<code class="${hlmCode}">background</code>
				and
				<code class="${hlmCode}">foreground</code>
				convention for semantic color pairs. Each background color has a corresponding foreground color for text that
				sits on top of it.
			</p>

			<div class="mt-6 grid gap-4 md:grid-cols-2">
				<div>
					<p class="mb-2 text-sm font-semibold">Background colors:</p>
					<ul class="space-y-1 text-sm">
						<li><code class="${hlmCode}">bg-primary</code></li>
						<li><code class="${hlmCode}">bg-secondary</code></li>
						<li><code class="${hlmCode}">bg-destructive</code></li>
						<li><code class="${hlmCode}">bg-muted</code></li>
					</ul>
				</div>
				<div>
					<p class="mb-2 text-sm font-semibold">Foreground colors:</p>
					<ul class="space-y-1 text-sm">
						<li><code class="${hlmCode}">text-primary-foreground</code></li>
						<li><code class="${hlmCode}">text-secondary-foreground</code></li>
						<li><code class="${hlmCode}">text-destructive-foreground</code></li>
						<li><code class="${hlmCode}">text-muted-foreground</code></li>
					</ul>
				</div>
			</div>

			<div class="mt-6" hlmAlert>
				<div hlmAlertDescription>
					<p>
						The
						<code class="${hlmCode}">-background</code>
						suffix is omitted from CSS variable names. The variable
						<code class="${hlmCode}">--primary</code>
						maps to the class
						<code class="${hlmCode}">bg-primary</code>
						.
					</p>
				</div>
			</div>

			<spartan-section-sub-heading id="available-variables">Available variables</spartan-section-sub-heading>

			<p class="${hlmP}">
				Here are all the caps color tokens you can customize, with the shadcn aliases and the Tailwind colors they
				register. Override them in
				<code class="${hlmCode}">:root</code>
				for light mode and
				<code class="${hlmCode}">.dark</code>
				for dark mode.
				<code class="${hlmCode}">--caps-ring-error</code>
				is the focus ring of invalid controls, available as
				<code class="${hlmCode}">ring-ring-error</code>
				.
			</p>

			<spartan-code class="mt-6" fileName="caps-tokens.css" [code]="_capsTokensCss" />

			<div class="mt-6 text-sm" hlmAlert>
				<div hlmAlertDescription>
					<p>
						<span class="font-semibold">Use OKLCH without the color space function.</span>
						Define variables as
						<code class="${hlmCode}">oklch(0.5 0.2 180)</code>
						, not
						<code class="${hlmCode}">oklch(0.5, 0.2, 180)</code>
						. See the
						<a
							class="font-medium underline"
							href="https://tailwindcss.com/docs/customizing-colors#using-css-variables"
							target="_blank"
						>
							Tailwind documentation
						</a>
						for details.
					</p>
				</div>
			</div>

			<spartan-section-sub-heading id="adding-colors">Adding custom colors</spartan-section-sub-heading>

			<p class="${hlmP}">Add new semantic colors by defining the CSS variable and registering it with Tailwind:</p>

			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=":root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}"
			/>

			<p class="${hlmP}">Use the new color with Tailwind classes:</p>

			<spartan-code class="mt-6" code='<div class="bg-warning text-warning-foreground">Warning message</div>' />

			<spartan-section-sub-heading id="base-colors">Base Colors</spartan-section-sub-heading>

			<p class="${hlmP}">The five base colors below share the chart colors listed above.</p>

			<h3 id="color-neutral" spartanH4>Neutral</h3>

			<p class="${hlmP}">
				Neutral is the default: the values of
				<code class="${hlmCode}">caps-tokens.css</code>
				above.
			</p>

			<h3 id="color-stone" spartanH4>Stone</h3>

			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=":root {
  --radius: 0.625rem;
  --caps-background: oklch(1 0 0);
  --caps-foreground: oklch(0.147 0.004 49.25);
  --caps-card: oklch(1 0 0);
  --caps-card-foreground: oklch(0.147 0.004 49.25);
  --caps-popover: oklch(1 0 0);
  --caps-popover-foreground: oklch(0.147 0.004 49.25);
  --caps-primary: oklch(0.216 0.006 56.043);
  --caps-primary-foreground: oklch(0.985 0.001 106.423);
  --caps-secondary: oklch(0.97 0.001 106.424);
  --caps-secondary-foreground: oklch(0.216 0.006 56.043);
  --caps-muted: oklch(0.97 0.001 106.424);
  --caps-muted-foreground: oklch(0.553 0.013 58.071);
  --caps-accent: oklch(0.97 0.001 106.424);
  --caps-accent-foreground: oklch(0.216 0.006 56.043);
  --caps-destructive: oklch(0.577 0.245 27.325);
  --caps-border: oklch(0.923 0.003 48.717);
  --caps-input: oklch(0.923 0.003 48.717);
  --caps-ring: oklch(0.709 0.01 56.259);
  --caps-sidebar: oklch(0.985 0.001 106.423);
  --caps-sidebar-foreground: oklch(0.147 0.004 49.25);
  --caps-sidebar-primary: oklch(0.216 0.006 56.043);
  --caps-sidebar-primary-foreground: oklch(0.985 0.001 106.423);
  --caps-sidebar-accent: oklch(0.97 0.001 106.424);
  --caps-sidebar-accent-foreground: oklch(0.216 0.006 56.043);
  --caps-sidebar-border: oklch(0.923 0.003 48.717);
  --caps-sidebar-ring: oklch(0.709 0.01 56.259);
}

.dark {
  --caps-background: oklch(0.147 0.004 49.25);
  --caps-foreground: oklch(0.985 0.001 106.423);
  --caps-card: oklch(0.216 0.006 56.043);
  --caps-card-foreground: oklch(0.985 0.001 106.423);
  --caps-popover: oklch(0.216 0.006 56.043);
  --caps-popover-foreground: oklch(0.985 0.001 106.423);
  --caps-primary: oklch(0.923 0.003 48.717);
  --caps-primary-foreground: oklch(0.216 0.006 56.043);
  --caps-secondary: oklch(0.268 0.007 34.298);
  --caps-secondary-foreground: oklch(0.985 0.001 106.423);
  --caps-muted: oklch(0.268 0.007 34.298);
  --caps-muted-foreground: oklch(0.709 0.01 56.259);
  --caps-accent: oklch(0.268 0.007 34.298);
  --caps-accent-foreground: oklch(0.985 0.001 106.423);
  --caps-destructive: oklch(0.704 0.191 22.216);
  --caps-border: oklch(1 0 0 / 10%);
  --caps-input: oklch(1 0 0 / 15%);
  --caps-ring: oklch(0.553 0.013 58.071);
  --caps-sidebar: oklch(0.216 0.006 56.043);
  --caps-sidebar-foreground: oklch(0.985 0.001 106.423);
  --caps-sidebar-primary: oklch(0.985 0.001 106.423);
  --caps-sidebar-primary-foreground: oklch(0.216 0.006 56.043);
  --caps-sidebar-accent: oklch(0.268 0.007 34.298);
  --caps-sidebar-accent-foreground: oklch(0.985 0.001 106.423);
  --caps-sidebar-border: oklch(1 0 0 / 10%);
  --caps-sidebar-ring: oklch(0.553 0.013 58.071);
}"
			/>

			<h3 id="color-zinc" spartanH4>Zinc</h3>

			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=":root {
  --radius: 0.625rem;
  --caps-background: oklch(1 0 0);
  --caps-foreground: oklch(0.141 0.005 285.823);
  --caps-card: oklch(1 0 0);
  --caps-card-foreground: oklch(0.141 0.005 285.823);
  --caps-popover: oklch(1 0 0);
  --caps-popover-foreground: oklch(0.141 0.005 285.823);
  --caps-primary: oklch(0.21 0.006 285.885);
  --caps-primary-foreground: oklch(0.985 0 0);
  --caps-secondary: oklch(0.967 0.001 286.375);
  --caps-secondary-foreground: oklch(0.21 0.006 285.885);
  --caps-muted: oklch(0.967 0.001 286.375);
  --caps-muted-foreground: oklch(0.552 0.016 285.938);
  --caps-accent: oklch(0.967 0.001 286.375);
  --caps-accent-foreground: oklch(0.21 0.006 285.885);
  --caps-destructive: oklch(0.577 0.245 27.325);
  --caps-border: oklch(0.92 0.004 286.32);
  --caps-input: oklch(0.92 0.004 286.32);
  --caps-ring: oklch(0.705 0.015 286.067);
  --caps-sidebar: oklch(0.985 0 0);
  --caps-sidebar-foreground: oklch(0.141 0.005 285.823);
  --caps-sidebar-primary: oklch(0.21 0.006 285.885);
  --caps-sidebar-primary-foreground: oklch(0.985 0 0);
  --caps-sidebar-accent: oklch(0.967 0.001 286.375);
  --caps-sidebar-accent-foreground: oklch(0.21 0.006 285.885);
  --caps-sidebar-border: oklch(0.92 0.004 286.32);
  --caps-sidebar-ring: oklch(0.705 0.015 286.067);
}

.dark {
  --caps-background: oklch(0.141 0.005 285.823);
  --caps-foreground: oklch(0.985 0 0);
  --caps-card: oklch(0.21 0.006 285.885);
  --caps-card-foreground: oklch(0.985 0 0);
  --caps-popover: oklch(0.21 0.006 285.885);
  --caps-popover-foreground: oklch(0.985 0 0);
  --caps-primary: oklch(0.92 0.004 286.32);
  --caps-primary-foreground: oklch(0.21 0.006 285.885);
  --caps-secondary: oklch(0.274 0.006 286.033);
  --caps-secondary-foreground: oklch(0.985 0 0);
  --caps-muted: oklch(0.274 0.006 286.033);
  --caps-muted-foreground: oklch(0.705 0.015 286.067);
  --caps-accent: oklch(0.274 0.006 286.033);
  --caps-accent-foreground: oklch(0.985 0 0);
  --caps-destructive: oklch(0.704 0.191 22.216);
  --caps-border: oklch(1 0 0 / 10%);
  --caps-input: oklch(1 0 0 / 15%);
  --caps-ring: oklch(0.552 0.016 285.938);
  --caps-sidebar: oklch(0.21 0.006 285.885);
  --caps-sidebar-foreground: oklch(0.985 0 0);
  --caps-sidebar-primary: oklch(0.985 0 0);
  --caps-sidebar-primary-foreground: oklch(0.21 0.006 285.885);
  --caps-sidebar-accent: oklch(0.274 0.006 286.033);
  --caps-sidebar-accent-foreground: oklch(0.985 0 0);
  --caps-sidebar-border: oklch(1 0 0 / 10%);
  --caps-sidebar-ring: oklch(0.552 0.016 285.938);
}"
			/>

			<h3 id="color-gray" spartanH4>Gray</h3>

			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=":root {
  --radius: 0.625rem;
  --caps-background: oklch(1 0 0);
  --caps-foreground: oklch(0.13 0.028 261.692);
  --caps-card: oklch(1 0 0);
  --caps-card-foreground: oklch(0.13 0.028 261.692);
  --caps-popover: oklch(1 0 0);
  --caps-popover-foreground: oklch(0.13 0.028 261.692);
  --caps-primary: oklch(0.21 0.034 264.665);
  --caps-primary-foreground: oklch(0.985 0.002 247.839);
  --caps-secondary: oklch(0.967 0.003 264.542);
  --caps-secondary-foreground: oklch(0.21 0.034 264.665);
  --caps-muted: oklch(0.967 0.003 264.542);
  --caps-muted-foreground: oklch(0.551 0.027 264.364);
  --caps-accent: oklch(0.967 0.003 264.542);
  --caps-accent-foreground: oklch(0.21 0.034 264.665);
  --caps-destructive: oklch(0.577 0.245 27.325);
  --caps-border: oklch(0.928 0.006 264.531);
  --caps-input: oklch(0.928 0.006 264.531);
  --caps-ring: oklch(0.707 0.022 261.325);
  --caps-sidebar: oklch(0.985 0.002 247.839);
  --caps-sidebar-foreground: oklch(0.13 0.028 261.692);
  --caps-sidebar-primary: oklch(0.21 0.034 264.665);
  --caps-sidebar-primary-foreground: oklch(0.985 0.002 247.839);
  --caps-sidebar-accent: oklch(0.967 0.003 264.542);
  --caps-sidebar-accent-foreground: oklch(0.21 0.034 264.665);
  --caps-sidebar-border: oklch(0.928 0.006 264.531);
  --caps-sidebar-ring: oklch(0.707 0.022 261.325);
}

.dark {
  --caps-background: oklch(0.13 0.028 261.692);
  --caps-foreground: oklch(0.985 0.002 247.839);
  --caps-card: oklch(0.21 0.034 264.665);
  --caps-card-foreground: oklch(0.985 0.002 247.839);
  --caps-popover: oklch(0.21 0.034 264.665);
  --caps-popover-foreground: oklch(0.985 0.002 247.839);
  --caps-primary: oklch(0.928 0.006 264.531);
  --caps-primary-foreground: oklch(0.21 0.034 264.665);
  --caps-secondary: oklch(0.278 0.033 256.848);
  --caps-secondary-foreground: oklch(0.985 0.002 247.839);
  --caps-muted: oklch(0.278 0.033 256.848);
  --caps-muted-foreground: oklch(0.707 0.022 261.325);
  --caps-accent: oklch(0.278 0.033 256.848);
  --caps-accent-foreground: oklch(0.985 0.002 247.839);
  --caps-destructive: oklch(0.704 0.191 22.216);
  --caps-border: oklch(1 0 0 / 10%);
  --caps-input: oklch(1 0 0 / 15%);
  --caps-ring: oklch(0.551 0.027 264.364);
  --caps-sidebar: oklch(0.21 0.034 264.665);
  --caps-sidebar-foreground: oklch(0.985 0.002 247.839);
  --caps-sidebar-primary: oklch(0.985 0.002 247.839);
  --caps-sidebar-primary-foreground: oklch(0.21 0.034 264.665);
  --caps-sidebar-accent: oklch(0.278 0.033 256.848);
  --caps-sidebar-accent-foreground: oklch(0.985 0.002 247.839);
  --caps-sidebar-border: oklch(1 0 0 / 10%);
  --caps-sidebar-ring: oklch(0.551 0.027 264.364);
}"
			/>

			<h3 id="color-slate" spartanH4>Slate</h3>

			<spartan-code
				class="mt-6"
				fileName="styles.css"
				code=":root {
  --radius: 0.625rem;
  --caps-background: oklch(1 0 0);
  --caps-foreground: oklch(0.129 0.042 264.695);
  --caps-card: oklch(1 0 0);
  --caps-card-foreground: oklch(0.129 0.042 264.695);
  --caps-popover: oklch(1 0 0);
  --caps-popover-foreground: oklch(0.129 0.042 264.695);
  --caps-primary: oklch(0.208 0.042 265.755);
  --caps-primary-foreground: oklch(0.984 0.003 247.858);
  --caps-secondary: oklch(0.968 0.007 247.896);
  --caps-secondary-foreground: oklch(0.208 0.042 265.755);
  --caps-muted: oklch(0.968 0.007 247.896);
  --caps-muted-foreground: oklch(0.554 0.046 257.417);
  --caps-accent: oklch(0.968 0.007 247.896);
  --caps-accent-foreground: oklch(0.208 0.042 265.755);
  --caps-destructive: oklch(0.577 0.245 27.325);
  --caps-border: oklch(0.929 0.013 255.508);
  --caps-input: oklch(0.929 0.013 255.508);
  --caps-ring: oklch(0.704 0.04 256.788);
  --caps-sidebar: oklch(0.984 0.003 247.858);
  --caps-sidebar-foreground: oklch(0.129 0.042 264.695);
  --caps-sidebar-primary: oklch(0.208 0.042 265.755);
  --caps-sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --caps-sidebar-accent: oklch(0.968 0.007 247.896);
  --caps-sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --caps-sidebar-border: oklch(0.929 0.013 255.508);
  --caps-sidebar-ring: oklch(0.704 0.04 256.788);
}

.dark {
  --caps-background: oklch(0.129 0.042 264.695);
  --caps-foreground: oklch(0.984 0.003 247.858);
  --caps-card: oklch(0.208 0.042 265.755);
  --caps-card-foreground: oklch(0.984 0.003 247.858);
  --caps-popover: oklch(0.208 0.042 265.755);
  --caps-popover-foreground: oklch(0.984 0.003 247.858);
  --caps-primary: oklch(0.929 0.013 255.508);
  --caps-primary-foreground: oklch(0.208 0.042 265.755);
  --caps-secondary: oklch(0.279 0.041 260.031);
  --caps-secondary-foreground: oklch(0.984 0.003 247.858);
  --caps-muted: oklch(0.279 0.041 260.031);
  --caps-muted-foreground: oklch(0.704 0.04 256.788);
  --caps-accent: oklch(0.279 0.041 260.031);
  --caps-accent-foreground: oklch(0.984 0.003 247.858);
  --caps-destructive: oklch(0.704 0.191 22.216);
  --caps-border: oklch(1 0 0 / 10%);
  --caps-input: oklch(1 0 0 / 15%);
  --caps-ring: oklch(0.551 0.027 264.364);
  --caps-sidebar: oklch(0.208 0.042 265.755);
  --caps-sidebar-foreground: oklch(0.984 0.003 247.858);
  --caps-sidebar-primary: oklch(0.984 0.003 247.858);
  --caps-sidebar-primary-foreground: oklch(0.208 0.042 265.755);
  --caps-sidebar-accent: oklch(0.279 0.041 260.031);
  --caps-sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --caps-sidebar-border: oklch(1 0 0 / 10%);
  --caps-sidebar-ring: oklch(0.551 0.027 264.364);
}"
			/>

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="styles" label="Styles" />
				<spartan-page-bottom-nav-link direction="previous" href="installation" label="Installation" />
			</spartan-page-bottom-nav>
		</section>

		<spartan-page-nav />
	`,
})
export default class ThemingPage {
	protected readonly _capsTokensCss = CAPS_TOKENS_CSS;
}
