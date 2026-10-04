import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [CapsButtonImports, HlmButtonGroupImports, HlmInputGroupImports, CapsTooltipImports, NgIcon],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	template: `
		<div hlmButtonGroup class="[--radius:9999rem]">
			<div hlmButtonGroup>
				<button capsButton variant="outline" size="icon">
					<ng-icon name="lucidePlus" />
				</button>
			</div>
			<div hlmButtonGroup>
				<div hlmInputGroup>
					<input
						hlmInputGroupInput
						[placeholder]="voiceEnabled() ? 'Record and send audio...' : 'Send a message...'"
						[disabled]="voiceEnabled()"
					/>
					<div hlmInputGroupAddon align="inline-end">
						<button
							hlmInputGroupButton
							[capsTooltip]="'Voice Mode'"
							size="icon-xs"
							[attr.data-active]="voiceEnabled()"
							[attr.aria-pressed]="voiceEnabled()"
							class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
							(click)="voiceEnabled.set(!voiceEnabled())"
						>
							<ng-icon name="lucideAudioLines" />
						</button>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class ButtonGroupInputGroup {
	public readonly voiceEnabled = signal(false);
}
