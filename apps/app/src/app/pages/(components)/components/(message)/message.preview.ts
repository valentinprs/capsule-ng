import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { HlmBubbleImports } from '@spartan-ng/helm/bubble';
import { HlmMarkerImports } from '@spartan-ng/helm/marker';
import { HlmMessageImports } from '@spartan-ng/helm/message';

@Component({
	selector: 'spartan-message-preview',
	imports: [HlmMessageImports, HlmBubbleImports, CapsAvatarImports, HlmMarkerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-6 py-12',
	},
	template: `
		<div hlmMessage align="end">
			<div hlmMessageAvatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="@me" class="grayscale" />
					<caps-avatar-fallback>ME</caps-avatar-fallback>
				</caps-avatar>
			</div>
			<div hlmMessageContent>
				<div hlmBubble>
					<div hlmBubbleContent>Deploying to prod real quick.</div>
				</div>
			</div>
		</div>

		<div hlmMessage>
			<div hlmMessageAvatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
					<caps-avatar-fallback>R</caps-avatar-fallback>
				</caps-avatar>
			</div>
			<div hlmMessageContent>
				<div hlmBubble variant="muted">
					<div hlmBubbleContent>It's 4:55 PM. On a Friday.</div>
				</div>
			</div>
		</div>

		<div hlmMessage align="end">
			<div hlmMessageAvatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="@me" class="grayscale" />
					<caps-avatar-fallback>ME</caps-avatar-fallback>
				</caps-avatar>
			</div>
			<div hlmMessageContent>
				<div hlmBubble>
					<div hlmBubbleContent>It's a one-line change.</div>
				</div>
				<div hlmMessageFooter>Delivered</div>
			</div>
		</div>

		<div hlmMessage>
			<div hlmMessageAvatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
					<caps-avatar-fallback>R</caps-avatar-fallback>
				</caps-avatar>
			</div>
			<div hlmMessageContent>
				<div hlmBubbleGroup>
					<div hlmBubble variant="muted">
						<div hlmBubbleContent>It's always a one-line change 😭.</div>
					</div>
					<div hlmBubble variant="muted">
						<div hlmBubbleContent>Alright, let me take a look.</div>
						<div hlmBubbleReactions aria-label="Reactions: thumbs up">
							<span>👍</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div hlmMarker role="status">
			<span hlmMarkerContent class="shimmer">
				<span class="font-medium">Spartan</span>
				is typing...
			</span>
		</div>
	`,
})
export class MessagePreview {}

export const defaultImports = `
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { HlmBubbleImports } from '@spartan-ng/helm/bubble';
import { HlmMarkerImports } from '@spartan-ng/helm/marker';
import { HlmMessageImports } from '@spartan-ng/helm/message';
`;

export const defaultSkeleton = `
<div hlmMessage>
  <div hlmMessageAvatar>
    <caps-avatar>
      <img capsAvatarImage src="/assets/avatar.png" alt="@spartan" />
      <caps-avatar-fallback>SP</caps-avatar-fallback>
    </caps-avatar>
  </div>
  <div hlmMessageContent>
    <div hlmBubble>
      <div hlmBubbleContent>How can I help you today?</div>
    </div>
  </div>
</div>
`;
