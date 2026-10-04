import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-input-group-tooltip-preview',
	imports: [HlmInputGroupImports, CapsTooltipImports, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<hlm-input-group>
			<input hlmInputGroupInput placeholder="Enter password" type="password" />
			<hlm-input-group-addon align="inline-end">
				<button
					hlmInputGroupButton
					[capsTooltip]="'Password must be at least 8 characters'"
					variant="ghost"
					aria-label="Info"
					size="icon-xs"
				>
					<ng-icon name="lucideInfo" />
				</button>
			</hlm-input-group-addon>
		</hlm-input-group>
		<hlm-input-group>
			<input hlmInputGroupInput placeholder="Your email address" />
			<hlm-input-group-addon align="inline-end">
				<button hlmInputGroupButton [capsTooltip]="tooltip" variant="ghost" aria-label="Info" size="icon-xs">
					<ng-icon name="lucideInfo" />
				</button>
				<ng-template #tooltip>We'll use this to send you notifications</ng-template>
			</hlm-input-group-addon>
		</hlm-input-group>
		<hlm-input-group>
			<input hlmInputGroupInput placeholder="Enter API key" />
			<hlm-input-group-addon>
				<button
					hlmInputGroupButton
					[capsTooltip]="'Click for help with API keys'"
					placement="left"
					variant="ghost"
					aria-label="Info"
					size="icon-xs"
				>
					<ng-icon name="lucideInfo" />
				</button>
			</hlm-input-group-addon>
		</hlm-input-group>
	`,
})
export class InputGroupTooltipPreview {}
