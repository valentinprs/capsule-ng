import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsMessageImports } from '@capsule-ng/caps/message';

@Component({
	selector: 'spartan-message-preview',
	imports: [CapsMessageImports, CapsBubbleImports, CapsAvatarImports, CapsMarkerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-6 py-12',
	},
	template: `
		<caps-message align="end">
			<caps-message-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="@me" class="grayscale" />
					<caps-avatar-fallback>ME</caps-avatar-fallback>
				</caps-avatar>
			</caps-message-avatar>
			<caps-message-content>
				<caps-bubble>
					<caps-bubble-content>Deploying to prod real quick.</caps-bubble-content>
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
				<caps-bubble variant="muted">
					<caps-bubble-content>It's 4:55 PM. On a Friday.</caps-bubble-content>
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
					<caps-bubble-content>It's a one-line change.</caps-bubble-content>
				</caps-bubble>
				<caps-message-footer>Delivered</caps-message-footer>
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
						<caps-bubble-content>It's always a one-line change 😭.</caps-bubble-content>
					</caps-bubble>
					<caps-bubble variant="muted">
						<caps-bubble-content>Alright, let me take a look.</caps-bubble-content>
						<caps-bubble-reactions aria-label="Reactions: thumbs up">
							<span>👍</span>
						</caps-bubble-reactions>
					</caps-bubble>
				</caps-bubble-group>
			</caps-message-content>
		</caps-message>

		<caps-marker role="status">
			<caps-marker-content class="shimmer">
				<span class="font-medium">Spartan</span>
				is typing...
			</caps-marker-content>
		</caps-marker>
	`,
})
export class MessagePreview {}

export const defaultImports = `
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsMessageImports } from '@capsule-ng/caps/message';
`;

export const defaultSkeleton = `
<caps-message>
  <caps-message-avatar>
    <caps-avatar>
      <img capsAvatarImage src="/assets/avatar.png" alt="@spartan" />
      <caps-avatar-fallback>SP</caps-avatar-fallback>
    </caps-avatar>
  </caps-message-avatar>
  <caps-message-content>
    <caps-bubble>
      <caps-bubble-content>How can I help you today?</caps-bubble-content>
    </caps-bubble>
  </caps-message-content>
</caps-message>
`;
