import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCheck,
	lucideClock,
	lucideFileText,
	lucideFileWarning,
	lucideRefreshCw,
	lucideX,
} from '@ng-icons/lucide';

@Component({
	selector: 'spartan-attachment-states-preview',
	imports: [CapsAttachmentImports, CapsSpinner, NgIcon],
	providers: [provideIcons({ lucideClock, lucideFileText, lucideFileWarning, lucideRefreshCw, lucideX, lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-2 py-12',
	},
	template: `
		<caps-attachment state="idle" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideClock" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>selected-file.pdf</caps-attachment-title>
				<caps-attachment-description>Ready to upload</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Remove selected-file.pdf">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>

		<caps-attachment state="uploading" class="w-full">
			<caps-attachment-media>
				<caps-spinner aria-hidden="true" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>design-system.zip</caps-attachment-title>
				<caps-attachment-description>Uploading · 64%</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Cancel upload">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>

		<caps-attachment state="processing" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideFileText" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>market-research.pdf</caps-attachment-title>
				<caps-attachment-description>Processing document</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Remove market-research.pdf">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>

		<caps-attachment state="error" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideFileWarning" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>financial-model.xlsx</caps-attachment-title>
				<caps-attachment-description>Upload failed. Try again.</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Retry upload">
					<ng-icon name="lucideRefreshCw" />
				</button>
				<button capsAttachmentAction aria-label="Remove financial-model.xlsx">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>

		<caps-attachment state="done" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideCheck" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>uploaded-report.pdf</caps-attachment-title>
				<caps-attachment-description>Uploaded · 1.8 MB</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Remove uploaded-report.pdf">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>
	`,
})
export class AttachmentStatesPreview {}
