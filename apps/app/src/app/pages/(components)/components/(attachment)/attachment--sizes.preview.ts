import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileText } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-attachment-sizes-preview',
	imports: [CapsAttachmentImports, NgIcon],
	providers: [provideIcons({ lucideFileText })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-3 py-12',
	},
	template: `
		<caps-attachment size="default" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideFileText" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>Default attachment</caps-attachment-title>
				<caps-attachment-description>PDF · 2.4 MB</caps-attachment-description>
			</caps-attachment-content>
		</caps-attachment>
		<caps-attachment size="sm" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideFileText" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>Small attachment</caps-attachment-title>
				<caps-attachment-description>PDF · 2.4 MB</caps-attachment-description>
			</caps-attachment-content>
		</caps-attachment>
		<caps-attachment size="xs" class="w-full">
			<caps-attachment-media>
				<ng-icon name="lucideFileText" />
			</caps-attachment-media>
			<caps-attachment-content>
				<caps-attachment-title>Extra small attachment</caps-attachment-title>
			</caps-attachment-content>
		</caps-attachment>
	`,
})
export class AttachmentSizesPreview {}
