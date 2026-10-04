import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { HlmBubbleImports } from '@spartan-ng/helm/bubble';
import { HlmMessageImports } from '@spartan-ng/helm/message';

@Component({
	selector: 'spartan-message-avatar-preview',
	imports: [HlmMessageImports, HlmBubbleImports, CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-6 py-12',
	},
	template: `
		<div hlmMessage>
			<div hlmMessageAvatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" class="grayscale" />
					<caps-avatar-fallback>R</caps-avatar-fallback>
				</caps-avatar>
			</div>
			<div hlmMessageContent>
				<div hlmBubble variant="muted">
					<div hlmBubbleContent>The build failed during dependency installation.</div>
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
					<div hlmBubbleContent>Can you share the exact error?</div>
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
				<div hlmBubbleGroup>
					<div hlmBubble variant="muted">
						<div hlmBubbleContent>Here's the error from the logs</div>
					</div>
					<div hlmBubble variant="muted">
						<div hlmBubbleContent>
							Something went wrong with the build. The libraries are not installed correctly. Try running the build
							again.
						</div>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class MessageAvatarPreview {}
