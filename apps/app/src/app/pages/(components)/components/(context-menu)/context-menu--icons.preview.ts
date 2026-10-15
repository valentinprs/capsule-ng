import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideClipboardPaste, lucideCopy, lucideScissors, lucideTrash } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-context-menu-icons',
	imports: [CapsContextMenuImports, NgIcon],
	providers: [provideIcons({ lucideCopy, lucideClipboardPaste, lucideScissors, lucideTrash })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			[capsContextMenuTrigger]="menu"
			align="start"
			side="right"
			class="flex aspect-video w-full min-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
			tabindex="0"
		>
			<span class="hidden pointer-fine:inline-block">Right click here</span>
			<span class="hidden pointer-coarse:inline-block">Long press here</span>
		</div>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideCopy" />
						Copy
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideScissors" />
						Cut
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideClipboardPaste" />
						Paste
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash" />
					Delete
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuIcons {}
