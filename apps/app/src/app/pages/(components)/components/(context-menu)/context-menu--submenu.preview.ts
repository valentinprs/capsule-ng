import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';

@Component({
	selector: 'spartan-context-menu-submenu',
	imports: [CapsContextMenuImports],
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
					<button capsMenuItem>Copy</button>
					<button capsMenuItem disabled>Cut</button>
					<button [capsMenuSubTrigger]="moreTools" align="start" side="right">More Tools</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<ng-template #moreTools>
			<caps-menu class="w-44">
				<caps-menu-group>
					<button capsMenuItem>Save Page...</button>
					<button capsMenuItem>Create Shortcut...</button>
					<button capsMenuItem>Name Window...</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>Developer Tools</button>
				<caps-menu-separator />
				<button capsMenuItem danger>Delete</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuSubmenu {}
