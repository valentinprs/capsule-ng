import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideFileSearch, lucideX } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-attachment-trigger-preview',
	imports: [CapsAttachmentImports, CapsDialogImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideCopy, lucideFileSearch, lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-sm py-12',
	},
	template: `
		<caps-dialog>
			@if (_attached()) {
				<caps-attachment class="w-full">
					<caps-attachment-media>
						<ng-icon name="lucideFileSearch" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>research-summary.pdf</caps-attachment-title>
						<caps-attachment-description>Open preview dialog</caps-attachment-description>
					</caps-attachment-content>
					<caps-attachment-actions>
						<button capsAttachmentAction aria-label="Copy link" (click)="copyLink()">
							<ng-icon name="lucideCopy" />
						</button>
						<button capsAttachmentAction aria-label="Remove research-summary.pdf" (click)="_attached.set(false)">
							<ng-icon name="lucideX" />
						</button>
					</caps-attachment-actions>
					<button capsAttachmentTrigger capsDialogTrigger aria-label="Preview research-summary.pdf"></button>
				</caps-attachment>
			} @else {
				<button capsButton type="button" variant="outline" (click)="_attached.set(true)">Restore attachment</button>
			}
			<ng-template capsDialogContent let-ctx class="sm:max-w-md">
				<caps-dialog-header>
					<caps-dialog-title>research-summary.pdf</caps-dialog-title>
					<caps-dialog-description>
						The attachment trigger fills the card and opens the dialog, while the actions stay independently clickable
						above it.
					</caps-dialog-description>
				</caps-dialog-header>
			</ng-template>
		</caps-dialog>
		@if (_copyStatus()) {
			<p role="status">{{ _copyStatus() }}</p>
		}
	`,
})
export class AttachmentTriggerPreview {
	protected readonly _attached = signal(true);
	protected readonly _copyStatus = signal('');
	protected async copyLink(): Promise<void> {
		try {
			await navigator.clipboard.writeText(window.location.href);
			this._copyStatus.set('Link copied');
		} catch {
			this._copyStatus.set('Copy is unavailable');
		}
	}
}
