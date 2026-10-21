import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { CapsLink } from '@capsule-ng/caps/link';
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
import { ButtonAnchor } from './button--anchor.example';
import { ButtonDestructive } from './button--destructive.example';
import { ButtonGhost } from './button--ghost.example';
import { ButtonRtlPreview } from './button--rtl.example';
import { cursorCode } from './button-cursor';

import { ButtonLink } from './button--link.example';
import { ButtonOutline } from './button--outline.example';
import { ButtonSecondary } from './button--secondary.example';
import { ButtonSpinner } from './button--spinner.example';
import { ButtonWithIcon } from './button--with-icon.example';

import { ButtonDefault } from './button--default-variant.example';
import { ButtonIcon } from './button--icon.example';
import { ButtonRoundedPreview } from './button--rounded.example';
import { ButtonSizePreview } from './button--size.example';
import { ButtonPreview, defaultImports, defaultSkeleton } from './button.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Button', api: 'button' },
	meta: metaWith('Capsule - Button', 'Displays a button or a component that looks like a button.'),
	title: 'Capsule - Button',
};

@Component({
	selector: 'spartan-button',
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
		ButtonPreview,
		ButtonDestructive,
		ButtonOutline,
		ButtonSecondary,
		ButtonGhost,
		ButtonLink,
		ButtonWithIcon,
		ButtonSpinner,
		ButtonAnchor,
		SectionSubSubHeading,
		CodePreview,
		CodeRtlPreview,
		ButtonRtlPreview,
		CapsLink,
		RtlHeader,
		ButtonIcon,
		ButtonSizePreview,
		ButtonDefault,
		ButtonRoundedPreview,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Button" lead="Displays a button or a link styled as a button." />

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<spartan-section-sub-heading id="cursor">Cursor</spartan-section-sub-heading>

			<p class="leading-7">
				Tailwind v4
				<a
					href="https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor"
					target="_blank"
					rel="noreferrer"
					capsLink
				>
					switched
				</a>
				from
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">cursor: pointer</code>
				to
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">cursor: default</code>
				for the button component.
				<br />
				If you want to keep the
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">cursor: pointer</code>
				behavior, add the following code to your CSS file:
			</p>

			<spartan-code class="mt-6" fileName="src/styles.css" [code]="_cursorCode" />

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="examples__sizes" spartanH4>Size</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-size-preview />
				</div>
				<spartan-code secondTab [code]="_sizeCode()" />
			</spartan-tabs>

			<h3 id="examples__default" spartanH4>Default</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-default />
				</div>
				<spartan-code secondTab [code]="_defaultVariantCode()" />
			</spartan-tabs>

			<h3 id="examples__outline" spartanH4>Outline</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-outline />
				</div>
				<spartan-code secondTab [code]="_outlineCode()" />
			</spartan-tabs>

			<h3 id="examples__secondary" spartanH4>Secondary</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-secondary />
				</div>
				<spartan-code secondTab [code]="_secondaryCode()" />
			</spartan-tabs>

			<h3 id="examples__ghost" spartanH4>Ghost</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-ghost />
				</div>
				<spartan-code secondTab [code]="_ghostCode()" />
			</spartan-tabs>

			<h3 id="examples__destructive" spartanH4>Destructive</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-destructive />
				</div>
				<spartan-code secondTab [code]="_destructiveCode()" />
			</spartan-tabs>
			<h3 id="examples__link" spartanH4>Link</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-link />
				</div>
				<spartan-code secondTab [code]="_linkCode()" />
			</spartan-tabs>
			<h3 id="examples__icon" spartanH4>Icon</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-icon />
				</div>
				<spartan-code secondTab [code]="_iconCode()" />
			</spartan-tabs>
			<h3 id="examples__with_icon" spartanH4>With Icon</h3>

			<p class="leading-7">
				Remember to add the
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">data-icon="inline-start"</code>
				or
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">data-icon="inline-end"</code>
				attribute to the icon for the correct spacing.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-with-icon />
				</div>
				<spartan-code secondTab [code]="_withIconCode()" />
			</spartan-tabs>

			<h3 id="examples__rounded" spartanH4>Rounded</h3>
			<p class="leading-7">
				Use the
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">rounded-full</code>
				class to make the button rounded.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-rounded-preview />
				</div>
				<spartan-code secondTab [code]="_roundedCode()" />
			</spartan-tabs>

			<h3 id="examples__spinner" spartanH4>Spinner</h3>
			<p class="leading-7">
				Render an animated, decorative span inside the button to show a loading state. The button text provides the
				accessible name. Remember to add the
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">data-icon="inline-start"</code>
				or
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">data-icon="inline-end"</code>
				attribute to the spinner for the correct spacing.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-spinner />
				</div>
				<spartan-code secondTab [code]="_spinnerCode()" />
			</spartan-tabs>
			<h3 id="examples__as_anchor" spartanH4>As Anchor</h3>
			<p class="leading-7">
				Use
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">capsButton</code>
				on an anchor when a navigation link needs button styling. It retains native link semantics. For ordinary text
				links, use
				<code class="bg-muted rounded px-1 py-0.5 font-mono text-sm">capsLink</code>
				.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-button-anchor />
				</div>
				<spartan-code secondTab [code]="_anchorCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-button-rtl-preview />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="button-group" label="Button Group" />
				<spartan-page-bottom-nav-link direction="previous" href="bubble" label="Bubble" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class ButtonPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('button');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _defaultVariantCode = computed(() => this._snippets()['defaultVariant']);
	protected readonly _secondaryCode = computed(() => this._snippets()['secondary']);
	protected readonly _outlineCode = computed(() => this._snippets()['outline']);
	protected readonly _destructiveCode = computed(() => this._snippets()['destructive']);
	protected readonly _ghostCode = computed(() => this._snippets()['ghost']);
	protected readonly _linkCode = computed(() => this._snippets()['link']);
	protected readonly _iconCode = computed(() => this._snippets()['icon']);
	protected readonly _withIconCode = computed(() => this._snippets()['withIcon']);
	protected readonly _sizeCode = computed(() => this._snippets()['size']);
	protected readonly _spinnerCode = computed(() => this._snippets()['spinner']);
	protected readonly _roundedCode = computed(() => this._snippets()['rounded']);
	protected readonly _anchorCode = computed(() => this._snippets()['anchor']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _styleCode = computed(() => this._snippets()['style']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;

	protected readonly _cursorCode = cursorCode;
}
