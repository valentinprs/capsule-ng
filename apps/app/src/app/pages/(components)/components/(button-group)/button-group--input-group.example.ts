import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [
		CapsInputImports,
		CapsButtonImports,
		HlmButtonGroupImports,
		CapsInputGroupImports,
		CapsTooltipImports,
		NgIcon,
	],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	template: `
		<div hlmButtonGroup class="[--radius:9999rem]">
			<div hlmButtonGroup>
				<button capsButton variant="outline" size="icon" aria-label="Add attachment">
					<ng-icon name="lucidePlus" />
				</button>
			</div>
			<div hlmButtonGroup>
				<caps-input-group>
					<input
						capsInput
						[placeholder]="voiceEnabled() ? 'Record and send audio...' : 'Send a message...'"
						[disabled]="voiceEnabled()"
						[attr.aria-label]="voiceEnabled() ? 'Record and send audio...' : 'Send a message...'"
					/>
					<caps-input-group-addon align="inline-end">
						<button
							capsButton
							[capsTooltip]="'Voice Mode'"
							aria-label="Voice mode"
							size="icon-xs"
							[attr.data-active]="voiceEnabled()"
							[attr.aria-pressed]="voiceEnabled()"
							class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
							(click)="voiceEnabled.set(!voiceEnabled())"
							variant="ghost"
							type="button"
						>
							<ng-icon name="lucideAudioLines" />
						</button>
					</caps-input-group-addon>
				</caps-input-group>
			</div>
		</div>
	`,
})
export class ButtonGroupInputGroup {
	public readonly voiceEnabled = signal(false);
}
