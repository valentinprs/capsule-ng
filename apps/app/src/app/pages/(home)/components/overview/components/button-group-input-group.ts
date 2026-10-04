import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [CapsButtonGroupImports, HlmInputGroupImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-button-group aria-label="Actions" class="w-full [--radius:9999rem]">
			<button capsButton variant="outline" size="icon" aria-label="Add attachment">
				<ng-icon name="lucidePlus" />
			</button>

			<div hlmInputGroup class="flex-1">
				<input hlmInputGroupInput placeholder="Send a message" aria-label="Message" />
				<div hlmInputGroupAddon align="inline-end">
					<button
						hlmInputGroupButton
						aria-label="Voice mode"
						class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
						size="icon-xs"
						[attr.data-active]="_enableVoiceMode()"
						[attr.aria-pressed]="_enableVoiceMode()"
						(click)="_enableVoiceMode.set(!_enableVoiceMode())"
					>
						<ng-icon name="lucideAudioLines" />
					</button>
				</div>
			</div>
		</caps-button-group>
	`,
})
export class ButtonGroupInputGroup {
	protected readonly _enableVoiceMode = signal(false);
}
