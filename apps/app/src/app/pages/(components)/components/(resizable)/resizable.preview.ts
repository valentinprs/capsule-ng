import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';

@Component({
	selector: 'spartan-resizable-example',
	imports: [CapsResizableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full min-w-0' },
	template: `
		<caps-resizable-group class="h-[200px] max-w-md rounded-lg border">
			<caps-resizable-panel defaultSize="50">
				<div class="flex h-[200px] items-center justify-center p-6">
					<span class="font-semibold">One</span>
				</div>
			</caps-resizable-panel>
			<caps-resizable-handle aria-label="One width" withHandle />
			<caps-resizable-panel defaultSize="50">
				<caps-resizable-group direction="vertical">
					<caps-resizable-panel defaultSize="25">
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">Two</span>
						</div>
					</caps-resizable-panel>
					<caps-resizable-handle aria-label="Two height" withHandle />
					<caps-resizable-panel defaultSize="75">
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">Three</span>
						</div>
					</caps-resizable-panel>
				</caps-resizable-group>
			</caps-resizable-panel>
		</caps-resizable-group>
	`,
})
export class ResizablePreviewComponent {}

export const defaultImports = `
import { CapsResizableImports } from '@capsule-ng/caps/resizable';
`;

export const defaultSkeleton = `
<caps-resizable-group class="h-[200px] w-full max-w-md rounded-lg border">
  <caps-resizable-panel>
    <div class="flex h-full items-center justify-center p-6">One</div>
  </caps-resizable-panel>
  <caps-resizable-handle aria-label="One width" />
  <caps-resizable-panel>
    <caps-resizable-group direction="vertical">
      <caps-resizable-panel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </caps-resizable-panel>
      <caps-resizable-handle aria-label="Two height" />
      <caps-resizable-panel>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </caps-resizable-panel>
    </caps-resizable-group>
  </caps-resizable-panel>
</caps-resizable-group>
`;
