import type { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { injectComponentDocs } from '@spartan-ng/app/app/core/services/component-docs';
import { PrimitiveSnippetsService } from '@spartan-ng/app/app/core/services/primitive-snippets.service';
import { CodeRtlPreview } from '@spartan-ng/app/app/shared/code/code-rtl-preview';
import { RtlHeader } from '@spartan-ng/app/app/shared/code/rtl-header';
import { SectionSubSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-sub-heading';
import { UIApiDocs } from '@spartan-ng/app/app/shared/layout/ui-docs-section/ui-docs-section';
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
import { metaWith } from '../../../../shared/meta/meta.util';
import { InputOtpDisabled } from './input-otp--disabled.preview';
import { InputOtpFormExample } from './input-otp--form.example';
import { InputOtpInvalid } from './input-otp--invalid.preview';
import { InputOtpRtl } from './input-otp--rtl.preview';
import { InputOtpSeparator } from './input-otp--separator.preview';
import { defaultImports, defaultSkeleton, InputOtpPreview } from './input-otp.preview';

export const routeMeta: RouteMeta = {
	data: { breadcrumb: 'Input OTP', api: 'input-otp' },
	meta: metaWith('Capsule — Input OTP', 'Accessible one-time password component.'),
	title: 'Capsule — Input OTP',
};
@Component({
	selector: 'spartan-input-otp',

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
		RtlHeader,
		CodeRtlPreview,
		InputOtpPreview,
		InputOtpSeparator,
		InputOtpDisabled,
		InputOtpInvalid,
		InputOtpFormExample,
		InputOtpRtl,
	],
	template: `
		<section spartanMainSection>
			<spartan-section-intro name="Input OTP" lead="Accessible one-time password component." showThemeToggle />

			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-input-otp-preview />
				</div>
				<spartan-code secondTab [code]="_defaultCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="usage">Usage</spartan-section-sub-heading>
			<div class="mt-6 space-y-4">
				<spartan-code [code]="_defaultImports" />
				<spartan-code [code]="_defaultSkeleton" />
			</div>

			<p class="${hlmP}">
				One native input handles keyboard editing, selection and paste. Project slots and separators to choose the
				layout. The default numeric keyboard hint does not validate digits; use Angular form validators for that policy.
				Capsule foundations supply the caret animation and respect reduced motion.
			</p>

			<spartan-section-sub-heading id="examples">Examples</spartan-section-sub-heading>

			<h3 id="separator" spartanH4>Separator</h3>
			<p class="${hlmP} mb-6">
				Use the
				<code class="${hlmCode}">caps-input-otp-separator</code>
				component to add a separator between input groups.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-input-otp-separator />
				</div>
				<spartan-code secondTab [code]="_separatorCode()" />
			</spartan-tabs>

			<h3 id="disabled" spartanH4>Disabled</h3>
			<p class="${hlmP} mb-6">
				Use the
				<code class="${hlmCode}">disabled</code>
				prop to disable the input.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-input-otp-disabled />
				</div>
				<spartan-code secondTab [code]="_disabledCode()" />
			</spartan-tabs>

			<h3 id="invalid" spartanH4>Invalid</h3>
			<p class="${hlmP} mb-6">
				Use the
				<code class="${hlmCode}">forceInvalid</code>
				prop to mark the slots as invalid.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-input-otp-invalid />
				</div>
				<spartan-code secondTab [code]="_invalidCode()" />
			</spartan-tabs>

			<h3 id="form" spartanH4>Form</h3>
			<p class="${hlmP} mb-6">
				Bind the OTP to Reactive Forms or Signal Forms. This example uses
				<code class="${hlmCode}">formField</code>
				to
				<code class="${hlmCode}">caps-input-otp</code>
				.
			</p>
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanCodePreview firstTab>
					<spartan-input-otp-form />
				</div>
				<spartan-code secondTab [code]="_formCode()" />
			</spartan-tabs>

			<spartan-header-rtl />
			<spartan-tabs firstTab="Preview" secondTab="Code">
				<div spartanRtlCodePreview firstTab>
					<spartan-input-otp-rtl />
				</div>
				<spartan-code secondTab [code]="_rtlCode()" />
			</spartan-tabs>

			<spartan-section-sub-heading id="caps-api">Capsule API</spartan-section-sub-heading>
			<spartan-ui-api-docs docType="caps" />

			<spartan-page-bottom-nav>
				<spartan-page-bottom-nav-link href="input" label="Input" />
				<spartan-page-bottom-nav-link direction="previous" href="input-group" label="Input Group" />
			</spartan-page-bottom-nav>
		</section>
		<spartan-page-nav />
	`,
})
export default class InputOtpPage {
	constructor() {
		injectComponentDocs();
	}

	private readonly _snippets = inject(PrimitiveSnippetsService).getSnippets('input-otp');
	protected readonly _defaultCode = computed(() => this._snippets()['default']);
	protected readonly _separatorCode = computed(() => this._snippets()['separator']);
	protected readonly _disabledCode = computed(() => this._snippets()['disabled']);
	protected readonly _invalidCode = computed(() => this._snippets()['invalid']);
	protected readonly _formCode = computed(() => this._snippets()['form']);
	protected readonly _rtlCode = computed(() => this._snippets()['rtl']);
	protected readonly _defaultSkeleton = defaultSkeleton;
	protected readonly _defaultImports = defaultImports;
}
