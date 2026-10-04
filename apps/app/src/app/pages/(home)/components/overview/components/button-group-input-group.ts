import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [CapsButtonImports, CapsInputImports, HlmButtonGroupImports, CapsInputGroupImports, HlmButton, NgIcon],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmButtonGroup class="w-full [--radius:9999rem]">
			<div hlmButtonGroup>
				<button hlmBtn variant="outline" size="icon" type="button" aria-label="Add attachment">
					<ng-icon name="lucidePlus" />
				</button>
			</div>
			<div hlmButtonGroup class="flex-1">
				<caps-input-group>
					<input capsInput placeholder="Send a message" aria-label="Send a message" />
					<caps-input-group-addon align="inline-end">
						<button
							capsButton
							class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
							size="icon-xs"
							[attr.data-active]="_enableVoiceMode()"
							(click)="_enableVoiceMode.set(!_enableVoiceMode())"
							variant="ghost"
							type="button"
							aria-label="Voice mode"
							[attr.aria-pressed]="_enableVoiceMode()"
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
	protected readonly _enableVoiceMode = signal(false);
}
