import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFullscreen, lucideMonitor, lucideSmartphone, lucideTablet } from '@ng-icons/lucide';
import { ToggleValue } from '@spartan-ng/brain/toggle-group';
import { BlockLink } from './block-link';
import { BlockPreview } from './block-preview';
import { OpenInButton } from './open-in-button';

@Component({
	selector: 'spartan-block-viewer',
	imports: [
		CapsResizableImports,
		CapsToggleGroupImports,
		CapsSeparatorImports,
		CapsButtonImports,
		OpenInButton,
		BlockLink,
		BlockPreview,
		NgIcon,
	],
	providers: [provideIcons({ lucideMonitor, lucideTablet, lucideSmartphone, lucideFullscreen })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[id]': 'id()',
		class: 'flex flex-col gap-4 pt-(--header-height)',
	},
	template: `
		<!-- toolbar -->
		<div class="flex items-center justify-between gap-4 px-2 md:pr-6">
			<spartan-block-link [fragment]="id()">{{ title() }}</spartan-block-link>
			<div class="ml-auto hidden h-8 items-center gap-1.5 rounded-md border p-1 shadow-none md:flex">
				<caps-toggle-group
					aria-label="Preview viewport"
					type="single"
					[(value)]="_size"
					(valueChange)="changeSize($event)"
					class="gap-1 *:data-[slot=toggle-group-item]:size-6! *:data-[slot=toggle-group-item]:rounded-sm!"
				>
					<button capsToggleItem [value]="100" title="Desktop">
						<ng-icon name="lucideMonitor" />
					</button>
					<button capsToggleItem [value]="60" title="Tablet">
						<ng-icon name="lucideTablet" />
					</button>
					<button capsToggleItem [value]="30" title="Smartphone">
						<ng-icon name="lucideSmartphone" />
					</button>
				</caps-toggle-group>
				<caps-separator orientation="vertical" />
				<a capsButton size="icon" variant="ghost" title="Open in New Tab" [href]="_previewUrl()" target="_blank">
					<span class="sr-only">Open in New Tab</span>
					<ng-icon name="lucideFullscreen" />
				</a>
			</div>

			<spartan-open-in-button [block]="block()" />
		</div>

		<!-- description -->
		<div data-slot="block-description" class="[&_code]:text-foreground contents">
			<ng-content />
		</div>

		<!-- resizable preview -->
		<caps-resizable-group [(layout)]="_layout">
			<caps-resizable-panel defaultSize="100">
				<spartan-block-preview [name]="block()" />
			</caps-resizable-panel>
			<caps-resizable-handle
				aria-label="Preview width"
				class="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-1.5 after:translate-x-px after:-translate-y-1/2 after:rounded-full after:transition-[height] after:hover:h-10 md:block"
			/>
			<caps-resizable-panel defaultSize="0" minSize="0" />
		</caps-resizable-group>
	`,
})
export class BlockViewer {
	public readonly block = input.required<string>();
	protected readonly _previewUrl = computed(() => `/blocks-preview/${this.block()}`);

	public readonly title = input.required<string>();
	public readonly id = input.required<string>();

	protected readonly _size = signal(100);
	protected readonly _layout = signal([100, 0]);

	public changeSize(size: ToggleValue<number>) {
		if (typeof size === 'number') {
			this._layout.set([size, 100 - size]);
		}
	}
}
