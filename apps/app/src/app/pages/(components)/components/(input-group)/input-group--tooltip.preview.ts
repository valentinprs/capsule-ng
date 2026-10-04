import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-input-group-tooltip-preview',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, CapsTooltipImports, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<input capsInput placeholder="Enter password" type="password" aria-label="Enter password" />
			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					[capsTooltip]="'Password must be at least 8 characters'"
					variant="ghost"
					aria-label="Info"
					size="icon-xs"
					type="button"
				>
					<ng-icon name="lucideInfo" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="Your email address" aria-label="Your email address" />
			<caps-input-group-addon align="inline-end">
				<button capsButton [capsTooltip]="tooltip" variant="ghost" aria-label="Info" size="icon-xs" type="button">
					<ng-icon name="lucideInfo" />
				</button>
				<ng-template #tooltip>We'll use this to send you notifications</ng-template>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="Enter API key" aria-label="Enter API key" />
			<caps-input-group-addon>
				<button
					capsButton
					[capsTooltip]="'Click for help with API keys'"
					placement="left"
					variant="ghost"
					aria-label="Info"
					size="icon-xs"
					type="button"
				>
					<ng-icon name="lucideInfo" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupTooltipPreview {}
