import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';

@Component({
	selector: 'spartan-resizable-handle-preview',
	imports: [CapsResizableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-resizable-group class="h-[200px] w-full max-w-md rounded-lg border">
			<caps-resizable-panel defaultSize="25" minSize="20" maxSize="50">
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Sidebar</span>
				</div>
			</caps-resizable-panel>
			<caps-resizable-handle aria-label="Sidebar width" withHandle />
			<caps-resizable-panel defaultSize="75" minSize="50" maxSize="80">
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">Content</span>
				</div>
			</caps-resizable-panel>
		</caps-resizable-group>
	`,
})
export class ResizableHandlePreview {}
