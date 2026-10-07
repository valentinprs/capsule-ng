import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMessageImports } from '@capsule-ng/caps/message';

@Component({
	selector: 'spartan-message-avatar-preview',
	imports: [CapsMessageImports, CapsBubbleImports, CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-6 py-12',
	},
	template: `
		<caps-message>
			<caps-message-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
					<caps-avatar-fallback>R</caps-avatar-fallback>
				</caps-avatar>
			</caps-message-avatar>
			<caps-message-content>
				<caps-bubble variant="muted">
					<caps-bubble-content>The build failed during dependency installation.</caps-bubble-content>
				</caps-bubble>
			</caps-message-content>
		</caps-message>

		<caps-message align="end">
			<caps-message-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="@me" class="grayscale" />
					<caps-avatar-fallback>ME</caps-avatar-fallback>
				</caps-avatar>
			</caps-message-avatar>
			<caps-message-content>
				<caps-bubble>
					<caps-bubble-content>Can you share the exact error?</caps-bubble-content>
				</caps-bubble>
			</caps-message-content>
		</caps-message>

		<caps-message>
			<caps-message-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
					<caps-avatar-fallback>R</caps-avatar-fallback>
				</caps-avatar>
			</caps-message-avatar>
			<caps-message-content>
				<caps-bubble-group>
					<caps-bubble variant="muted">
						<caps-bubble-content>Here's the error from the logs</caps-bubble-content>
					</caps-bubble>
					<caps-bubble variant="muted">
						<caps-bubble-content>
							Something went wrong with the build. The libraries are not installed correctly. Try running the build
							again.
						</caps-bubble-content>
					</caps-bubble>
				</caps-bubble-group>
			</caps-message-content>
		</caps-message>
	`,
})
export class MessageAvatarPreview {}
