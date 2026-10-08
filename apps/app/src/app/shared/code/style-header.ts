import { Component } from '@angular/core';
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert } from '@ng-icons/lucide';
import { SectionSubHeading } from '@spartan-ng/app/app/shared/layout/section-sub-heading';

@Component({
	selector: 'spartan-header-style',
	imports: [SectionSubHeading, NgIcon, CapsAlertImports],
	providers: [provideIcons({ lucideCircleAlert })],
	template: `
		<spartan-section-sub-heading id="style">Styles</spartan-section-sub-heading>
		<caps-alert variant="destructive" class="mt-6">
			<caps-alert-media><ng-icon name="lucideCircleAlert" aria-hidden="true" /></caps-alert-media>
			<caps-alert-title>This is currently work in progress.</caps-alert-title>
			<caps-alert-description>
				<p>
					We will provide this feature when we adjust the styles for all components. All Components will be shipped with
					the Vega style!
				</p>
			</caps-alert-description>
		</caps-alert>
	`,
})
export class StyleHeader {}
