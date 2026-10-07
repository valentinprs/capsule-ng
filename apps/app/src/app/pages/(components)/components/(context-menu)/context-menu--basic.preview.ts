import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';

@Component({
	selector: 'spartan-context-menu-basic',
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
					<button capsMenuItem>Back</button>
					<button capsMenuItem disabled>Forward</button>
					<button capsMenuItem>Reload</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class ContextMenuBasic {}
