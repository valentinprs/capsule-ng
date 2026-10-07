import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode, lucideX } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-attachment-preview',
	imports: [CapsAttachmentImports, CapsSpinner, NgIcon],
	providers: [provideIcons({ lucideFileCode, lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-3 py-12',
	},
	template: `
		<caps-attachment-group>
			@for (image of _images; track image.name) {
				<caps-attachment orientation="vertical">
					<caps-attachment-media variant="image">
						<img [src]="image.src" [alt]="image.alt" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>{{ image.name }}</caps-attachment-title>
						<caps-attachment-description>{{ image.meta }}</caps-attachment-description>
					</caps-attachment-content>
				</caps-attachment>
			}
		</caps-attachment-group>

		<caps-attachment state="uploading" class="w-full">
			<caps-attachment-media>
				<caps-spinner aria-hidden="true" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>sales-dashboard.pdf</caps-attachment-title>
				<caps-attachment-description>Uploading · 64%</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Cancel upload">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>

		<caps-attachment class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideFileCode" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>message-renderer.tsx</caps-attachment-title>
				<caps-attachment-description>TypeScript · 12 KB</caps-attachment-description>
			</caps-attachment-content>
			<caps-attachment-actions>
				<button capsAttachmentAction aria-label="Remove message-renderer.tsx">
					<ng-icon name="lucideX" />
				</button>
			</caps-attachment-actions>
		</caps-attachment>
	`,
})
export class AttachmentPreview {
	protected readonly _images = [
		{
			name: 'workspace.png',
			meta: 'PNG · 820 KB',
			src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80',
			alt: 'Workspace',
		},
		{
			name: 'desk-reference.jpg',
			meta: 'JPG · 1.1 MB',
			src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80',
			alt: 'Desk',
		},
		{
			name: 'office-reference.jpg',
			meta: 'JPG · 940 KB',
			src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80',
			alt: 'Office',
		},
	];
}

export const defaultImports = `
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
`;

export const defaultSkeleton = `
<caps-attachment>
  <caps-attachment-media>
    <ng-icon name="lucideFileCode" />
  </caps-attachment-media>
  <caps-attachment-content>
    <caps-attachment-title>report.pdf</caps-attachment-title>
    <caps-attachment-description>PDF · 1.2 MB</caps-attachment-description>
  </caps-attachment-content>
</caps-attachment>
`;
