import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';

@Component({
	selector: 'spartan-context-menu-sides',
	imports: [CapsContextMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="grid w-full max-w-sm grid-cols-2 gap-4">
			<div
				[capsContextMenuTrigger]="menu"
				align="start"
				side="top"
				class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
				tabindex="0"
			>
				<span class="hidden pointer-fine:inline-block">Right click (top)</span>
				<span class="hidden pointer-coarse:inline-block">Long press (top)</span>
			</div>
			<div
				[capsContextMenuTrigger]="menu"
				align="start"
				side="right"
				class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
				tabindex="0"
			>
				<span class="hidden pointer-fine:inline-block">Right click (right)</span>
				<span class="hidden pointer-coarse:inline-block">Long press (right)</span>
			</div>
			<div
				[capsContextMenuTrigger]="menu"
				align="start"
				side="bottom"
				class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
				tabindex="0"
			>
				<span class="hidden pointer-fine:inline-block">Right click (bottom)</span>
				<span class="hidden pointer-coarse:inline-block">Long press (bottom)</span>
			</div>
			<div
				[capsContextMenuTrigger]="menu"
				align="start"
				side="left"
				class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
				tabindex="0"
			>
				<span class="hidden pointer-fine:inline-block">Right click (left)</span>
				<span class="hidden pointer-coarse:inline-block">Long press (left)</span>
			</div>
		</div>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>Back</button>
					<button capsMenuItem disabled>Forward</button>
					<button capsMenuItem>Reload</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuSides {}
