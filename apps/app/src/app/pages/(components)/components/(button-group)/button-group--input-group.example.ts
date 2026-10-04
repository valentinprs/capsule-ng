import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';

import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [
		CapsInputImports,
		CapsButtonImports,
		CapsButtonGroupImports,
		CapsInputGroupImports,
		CapsTooltipImports,
		NgIcon,
	],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	template: `
		<caps-button-group aria-label="Actions" class="[--radius:9999rem]">
			<button capsButton variant="outline" size="icon" aria-label="Add attachment" type="button">
				<ng-icon name="lucidePlus" />
			</button>

			<caps-input-group>
				<input
					capsInput
					aria-label="Message"
					[placeholder]="voiceEnabled() ? 'Record and send audio...' : 'Send a message...'"
					[disabled]="voiceEnabled()"
				/>
				<caps-input-group-addon align="inline-end">
					<button
						capsButton
						aria-label="Voice mode"
						[capsTooltip]="'Voice Mode'"
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
		</caps-button-group>
	`,
})
export class ButtonGroupInputGroup {
	public readonly voiceEnabled = signal(false);
}
