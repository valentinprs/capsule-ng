import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileCode, lucideFileText, lucideTable, lucideX } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-attachment-group-preview',
	imports: [CapsAttachmentImports, NgIcon],
	providers: [provideIcons({ lucideFileText, lucideTable, lucideFileCode, lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full min-w-0',
	},
	template: `
		<div class="mx-auto w-full max-w-sm py-12">
			<caps-attachment-group class="w-full">
				@for (item of _items; track item.name) {
					<caps-attachment class="w-64">
						@if (item.src) {
							<caps-attachment-media variant="image">
								<img [src]="item.src" [alt]="item.name" />
							</caps-attachment-media>
						} @else if (item.icon) {
							<caps-attachment-media>
								<ng-icon [name]="item.icon" />
							</caps-attachment-media>
						}
						<caps-attachment-content>
							<caps-attachment-title>{{ item.name }}</caps-attachment-title>
							<caps-attachment-description>{{ item.meta }}</caps-attachment-description>
						</caps-attachment-content>
						<caps-attachment-actions>
							<button capsAttachmentAction [attr.aria-label]="'Remove ' + item.name">
								<ng-icon name="lucideX" />
							</button>
						</caps-attachment-actions>
					</caps-attachment>
				}
			</caps-attachment-group>
		</div>
	`,
})
export class AttachmentGroupPreview {
	protected readonly _items = [
		{ name: 'briefing-notes.pdf', meta: 'PDF · 1.4 MB', icon: 'lucideFileText' as const },
		{
			name: 'workspace.png',
			meta: 'PNG · 820 KB',
			src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80',
		},
		{ name: 'customers.csv', meta: 'CSV · 18 KB', icon: 'lucideTable' as const },
		{ name: 'renderer.tsx', meta: 'TSX · 12 KB', icon: 'lucideFileCode' as const },
	];
}
