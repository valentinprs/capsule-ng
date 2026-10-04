import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-input-group',
	imports: [CapsInputImports, CapsButtonGroupImports, CapsInputGroupImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucidePlus, lucideAudioLines })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-button-group aria-label="Actions" class="w-full [--radius:9999rem]">
			<button capsButton variant="outline" size="icon" aria-label="Add attachment" type="button">
				<ng-icon name="lucidePlus" />
			</button>

			<caps-input-group class="flex-1">
				<input capsInput placeholder="Send a message" aria-label="Message" />
				<caps-input-group-addon align="inline-end">
					<button
						capsButton
						aria-label="Voice mode"
						class="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
						size="icon-xs"
						[attr.data-active]="_enableVoiceMode()"
						[attr.aria-pressed]="_enableVoiceMode()"
						(click)="_enableVoiceMode.set(!_enableVoiceMode())"
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
	protected readonly _enableVoiceMode = signal(false);
}
