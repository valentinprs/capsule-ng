import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { hlmCode, hlmP } from '@spartan-ng/helm/typography';
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
import { link } from '../../../../shared/typography/link';
import { SpartanSpinnerBadgePreview } from './spinner--badge.preview';
import { SpartanSpinnerButtonPreview } from './spinner--button.preview';
import { SpartanSpinnerColorPreview } from './spinner--color.preview';
import { SpartanSpinnerCustomPreview } from './spinner--custom.preview';
import { SpartanSpinnerEmptyPreview } from './spinner--empty.preview';
import { SpartanSpinnerInputGroupPreview } from './spinner--input-group.preview';
import { SpartanSpinnerItemPreview } from './spinner--item.preview';
import { SpartanSpinnerRtlPreview } from './spinner--rtl.preview';
import { SpartanSpinnerSizePreview } from './spinner--size.preview';
import { SpinnerPreview, defaultImports, defaultSkeleton } from './spinner.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Spinner', api: 'spinner' },
	meta: metaWith(
		'Capsule — Spinner',
		'Shows a Loading spinner to indicate that the app is busy or the page is still loading.',
	),
	title: 'Capsule — Spinner',
};
@Component({
	selector: 'spartan-spinner',
	imports: [
		UIApiDocs,
		MainSection,
		Code,
		SectionIntro,
		SectionSubHeading,
		SectionSubSubHeading,
		Tabs,

		CodePreview,
		PageNav,
		PageBottomNav,
		PageBottomNavLink,
		RtlHeader,
		CodeRtlPreview,
		SpinnerPreview,
		SpartanSpinnerSizePreview,
		SpartanSpinnerColorPreview,
		SpartanSpinnerCustomPreview,
		SpartanSpinnerButtonPreview,
		SpartanSpinnerBadgePreview,
		SpartanSpinnerInputGroupPreview,
		SpartanSpinnerEmptyPreview,
		SpartanSpinnerItemPreview,
		SpartanSpinnerRtlPreview,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro
				name="Spinner"
				lead="Shows a Loading spinner to indicate that the app is busy or the page is still loading."
			/>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="about">About</spartan-section-sub-heading>
			<p class="${hlmP}">
				Spinner is built on top of
				<a href="https://ng-icons.github.io/ng-icons" target="_blank" rel="noreferrer" class="${link}">ng-icons</a>
				by
				<a href="https://github.com/ashley-hunter" target="_blank" rel="noreferrer" class="${link}">
					&#64;ashley-hunter
				</a>
				.
			</p>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<p class="${hlmP}">
				Use title or aria-label for a standalone loading status. Inside a button, badge or a region that already
				describes loading, use aria-hidden="true" to keep the icon decorative. Set isActive to false to stop loading;
				reduced motion stops rotation.
			</p>
			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="examples__custom_icon" spartanH4>Custom Icon</h3>
			<p class="${hlmP}">
				Register the desired icon and pass its name to the
				<code class="${hlmCode}">CapsSpinner</code>
				component.
			</p>
			<p class="${hlmP}">
				If you only need to change the icon once, set the icon input to your desired icon
				<code class="${hlmCode}">icon="lucideLoader"</code>
				and add
				<code class="${hlmCode}">provideIcons(&lbrace; lucideLoader &rbrace;)</code>
				to load your custom icon.
			</p>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-custom-preview />
				</div>
				<spartan-code secondTab [code]="_customCode()" />
			</spartan-tabs>

			<h3 id="examples__size" spartanH4>Size</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-size-preview />
				</div>
				<spartan-code secondTab [code]="_sizeCode()" />
			</spartan-tabs>

			<h3 id="examples__color" spartanH4>Color</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-color-preview />
				</div>
				<spartan-code secondTab [code]="_colorCode()" />
			</spartan-tabs>

			<h3 id="examples__button" spartanH4>Button</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-button-preview />
				</div>
				<spartan-code secondTab [code]="_buttonCode()" />
			</spartan-tabs>

			<h3 id="examples__badge" spartanH4>Badge</h3>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-badge-preview />
				</div>
				<spartan-code secondTab [code]="_badgeCode()" />
			</spartan-tabs>

			<h3 id="examples__input_group" spartanH4>Input Group</h3>

			<p class="${hlmP}">
				Input Group can have spinners inside
				<code class="${hlmCode}">CapsInputGroupAddon</code>
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-input-group-preview />
				</div>
				<spartan-code secondTab [code]="_inputGroupCode()" />
			</spartan-tabs>

			<h3 id="examples__empty" spartanH4>Empty</h3>

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-empty-preview />
				</div>
				<spartan-code secondTab [code]="_emptyCode()" />
			</spartan-tabs>

			<h3 id="examples__item" spartanH4>Item</h3>

			<p class="${hlmP}">
				Use the spinner inside
				<code class="${hlmCode}">caps-item-media</code>
				to indicate a loading state.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-spinner-item-preview />
				</div>
				<spartan-code secondTab [code]="_itemCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-spinner-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="switch" label="Switch" />
				<spartan-page-bottom-nav-link direction="previous" href="sonner" label="Sonner" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class SpinnerPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('spinner');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _customCode = computed(() => this._snippets()['custom']);
	protected readonly _sizeCode = computed(() => this._snippets()['size']);
	protected readonly _colorCode = computed(() => this._snippets()['color']);
	protected readonly _buttonCode = computed(() => this._snippets()['button']);
	protected readonly _badgeCode = computed(() => this._snippets()['badge']);
	protected readonly _inputGroupCode = computed(() => this._snippets()['inputGroup']);
	protected readonly _emptyCode = computed(() => this._snippets()['empty']);
	protected readonly _itemCode = computed(() => this._snippets()['item']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
