import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';

@Component({
	selector: 'spartan-context-menu-with-state',
	imports: [CapsContextMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			align="start"
			side="right"
			[capsContextMenuTriggerData]="{ $implicit: { data: 'Changes Saved' } }"
			[capsContextMenuTrigger]="menu"
			class="flex aspect-video w-full min-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
			tabindex="0"
		>
			<span class="hidden pointer-fine:inline-block">Right click here</span>
			<span class="hidden pointer-coarse:inline-block">Long press here</span>
		</div>
		<div class="mt-2 text-center font-mono text-xs">{{ _pastedContent() }}</div>

		<ng-template #menu let-ctx>
			<caps-menu class="w-64">
				<button (itemClick)="_pastedContent.set(ctx.data)" capsMenuItem>
					Save
					<caps-menu-shortcut>⌘S</caps-menu-shortcut>
				</button>
				<button (itemClick)="_pastedContent.set('Unsaved Changes')" capsMenuItem>
					Back
					<caps-menu-shortcut>⌘[</caps-menu-shortcut>
				</button>

				<button disabled capsMenuItem>
					Forward
					<caps-menu-shortcut>⌘]</caps-menu-shortcut>
				</button>

				<button disabled capsMenuItem>
					Reload
					<caps-menu-shortcut>⌘R</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuPreviewWithState {
	protected readonly _pastedContent = signal('Unsaved Changes');
}
