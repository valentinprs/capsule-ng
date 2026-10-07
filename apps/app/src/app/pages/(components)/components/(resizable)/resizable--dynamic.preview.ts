import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';

@Component({
	selector: 'spartan-resizable-dynamic-preview',
	imports: [CapsResizableImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-col gap-4">
			<button
				capsButton
				type="button"
				class="self-start"
				variant="outline"
				(click)="showPanel.update((visible) => !visible)"
			>
				{{ showPanel() ? 'Remove panel' : 'Add panel' }}
			</button>

			<caps-resizable-group class="h-[200px] w-full max-w-md rounded-lg border" [(layout)]="layout">
				<caps-resizable-panel defaultSize="40">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-semibold">One</span>
					</div>
				</caps-resizable-panel>
				<caps-resizable-handle aria-label="One width" withHandle />
				@if (showPanel()) {
					<caps-resizable-panel defaultSize="25">
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">Dynamic</span>
						</div>
					</caps-resizable-panel>
					<caps-resizable-handle aria-label="Dynamic width" withHandle />
				}
				<caps-resizable-panel defaultSize="60">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-semibold">Two</span>
					</div>
				</caps-resizable-panel>
			</caps-resizable-group>
		</div>
	`,
})
export class ResizableDynamicPreview {
	public readonly showPanel = signal(false);
	public readonly layout = signal([40, 60]);
}
