import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsMessageImports } from '@capsule-ng/caps/message';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload, lucideFileText } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-message-attachment-preview',
	imports: [CapsMessageImports, CapsBubbleImports, CapsAttachmentImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideFileText, lucideDownload })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-message align="end">
			<caps-message-content>
				<caps-attachment orientation="vertical">
					<caps-attachment-media variant="image">
						<img
							src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
							alt="Workspace"
						/>
					</caps-attachment-media>
				</caps-attachment>
				<caps-bubble>
					<caps-bubble-content>
						Here's the image. Can you add it to the PDF? Use it for the cover page.
					</caps-bubble-content>
				</caps-bubble>
			</caps-message-content>
		</caps-message>

		<caps-message>
			<caps-message-content>
				<caps-bubble variant="muted">
					<caps-bubble-content>Done. Here's the PDF with the image added as the cover page.</caps-bubble-content>
				</caps-bubble>
				<caps-attachment>
					<caps-attachment-media>
						<ng-icon name="lucideFileText" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>capsule.svg</caps-attachment-title>
						<caps-attachment-description>SVG · Capsule logo</caps-attachment-description>
					</caps-attachment-content>
					<caps-attachment-actions>
						<a
							capsButton
							href="/assets/capsule.svg"
							download="capsule.svg"
							title="Download"
							aria-label="Download"
							size="icon-sm"
							variant="secondary"
						>
							<ng-icon name="lucideDownload" />
						</a>
					</caps-attachment-actions>
				</caps-attachment>
			</caps-message-content>
		</caps-message>

		<caps-message align="end">
			<caps-message-content>
				<caps-bubble>
					<caps-bubble-content>Thanks. Looks good.</caps-bubble-content>
				</caps-bubble>
			</caps-message-content>
		</caps-message>
	`,
})
export class MessageAttachmentPreview {}
