import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsLink } from '@capsule-ng/caps/link';
import { SectionSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-heading';
import { HlmP } from '@spartan-ng/helm/typography';

@Component({
	selector: 'spartan-header-rtl',
	imports: [SectionSubHeading, HlmP, RouterLink, CapsLink],
	template: `
		<spartan-section-sub-heading id="rtl">RTL</spartan-section-sub-heading>
		<p hlmP>
			To enable RTL support in spartan-ng, see the
			<a routerLink="/documentation/rtl" capsLink>RTL configuration guide.</a>
		</p>
	`,
})
export class RtlHeader {}
