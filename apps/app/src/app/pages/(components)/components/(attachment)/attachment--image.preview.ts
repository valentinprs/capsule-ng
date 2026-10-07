import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-attachment-image-preview',
	imports: [CapsAttachmentImports, NgIcon],
	providers: [provideIcons({ lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full min-w-0',
	},
	template: `
		<div class="mx-auto w-full max-w-sm py-12">
			<caps-attachment-group class="w-full">
				@for (image of _images; track image.name) {
					<caps-attachment orientation="vertical">
						<caps-attachment-media variant="image">
							<img [src]="image.src" [alt]="image.alt" />
						</caps-attachment-media>
						<caps-attachment-content>
							<caps-attachment-title>{{ image.name }}</caps-attachment-title>
							<caps-attachment-description>{{ image.meta }}</caps-attachment-description>
						</caps-attachment-content>
						<caps-attachment-actions>
							<button capsAttachmentAction [attr.aria-label]="'Remove ' + image.name">
								<ng-icon name="lucideX" />
							</button>
						</caps-attachment-actions>
						<a
							capsAttachmentTrigger
							[type]="null"
							[href]="image.src"
							target="_blank"
							rel="noreferrer"
							[attr.aria-label]="'Open ' + image.name"
						></a>
					</caps-attachment>
				}
			</caps-attachment-group>
		</div>
	`,
})
export class AttachmentImagePreview {
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
