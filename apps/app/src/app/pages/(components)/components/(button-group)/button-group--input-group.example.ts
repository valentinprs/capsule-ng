import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';

import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [CapsButtonImports, CapsButtonGroupImports, HlmInputGroupImports, HlmTooltipImports, NgIcon],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	template: `
		<caps-button-group aria-label="Actions" class="[--radius:9999rem]">
			<button capsButton variant="outline" size="icon" aria-label="Add attachment">
				<ng-icon name="lucidePlus" />
			</button>

			<div hlmInputGroup>
				<input
					hlmInputGroupInput
					aria-label="Message"
					[placeholder]="voiceEnabled() ? 'Record and send audio...' : 'Send a message...'"
					[disabled]="voiceEnabled()"
				/>
				<div hlmInputGroupAddon align="inline-end">
					<button
						hlmInputGroupButton
						aria-label="Voice mode"
						[hlmTooltip]="'Voice Mode'"
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
		</caps-button-group>
	`,
})
export class ButtonGroupInputGroup {
	public readonly voiceEnabled = signal(false);
}
