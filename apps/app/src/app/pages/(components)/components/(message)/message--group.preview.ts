import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { HlmBubbleImports } from '@spartan-ng/helm/bubble';
import { HlmMessageImports } from '@spartan-ng/helm/message';

@Component({
	selector: 'spartan-message-group-preview',
	imports: [HlmMessageImports, HlmBubbleImports, CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-6 py-12',
	},
	template: `
		<div hlmMessageGroup>
			<div hlmMessage>
				<div hlmMessageAvatar></div>
				<div hlmMessageContent>
					<div hlmBubble variant="muted">
						<div hlmBubbleContent>I checked the registry addresses.</div>
					</div>
				</div>
			</div>
			<div hlmMessage>
				<div hlmMessageAvatar>
					<caps-avatar>
						<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
						<caps-avatar-fallback>CN</caps-avatar-fallback>
					</caps-avatar>
				</div>
				<div hlmMessageContent>
					<div hlmBubble variant="muted">
						<div hlmBubbleContent>The component and example JSON now live under the UI registry.</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class MessageGroupPreview {}
