import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMessageImports } from '@capsule-ng/caps/message';

@Component({
	selector: 'spartan-message-group-preview',
	imports: [CapsMessageImports, CapsBubbleImports, CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-6 py-12',
	},
	template: `
		<caps-message-group>
			<caps-message>
				<caps-message-avatar></caps-message-avatar>
				<caps-message-content>
					<caps-bubble variant="muted">
						<caps-bubble-content>I checked the registry addresses.</caps-bubble-content>
					</caps-bubble>
				</caps-message-content>
			</caps-message>
			<caps-message>
				<caps-message-avatar>
					<caps-avatar>
						<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
						<caps-avatar-fallback>CN</caps-avatar-fallback>
					</caps-avatar>
				</caps-message-avatar>
				<caps-message-content>
					<caps-bubble variant="muted">
						<caps-bubble-content>The component and example JSON now live under the UI registry.</caps-bubble-content>
					</caps-bubble>
				</caps-message-content>
			</caps-message>
		</caps-message-group>
	`,
})
export class MessageGroupPreview {}
