import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';

@Component({
	selector: 'spartan-resizable-vertical-preview',
	imports: [CapsResizableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full min-w-0' },
	template: `
		<caps-resizable-group class="h-[200px] max-w-sm rounded-lg border" direction="vertical">
			<caps-resizable-panel defaultSize="25">
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Header</span>
				</div>
			</caps-resizable-panel>
			<caps-resizable-handle aria-label="Header height" />
			<caps-resizable-panel defaultSize="75">
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Content</span>
				</div>
			</caps-resizable-panel>
		</caps-resizable-group>
	`,
})
export class ResizableVerticalPreview {}
