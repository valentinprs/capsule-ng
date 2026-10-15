import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUndo2 } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-dropdown-with-context',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideUndo2 })],
	template: `
		<div class="flex w-full items-center justify-center pt-[20%]">
			<button
				capsButton
				variant="outline"
				[capsDropdownMenuTrigger]="menu"
				[capsDropdownMenuTriggerData]="{ $implicit: { data: 'Context Window Full' } }"
				placement="bottom"
			>
				Open
			</button>
		</div>
		<ng-template #menu let-ctx>
			<caps-menu class="w-56">
				<caps-menu-group label="Context">
					<button capsMenuItem>{{ ctx.data }}</button>
				</caps-menu-group>
				<caps-menu-group label="Appearance">
					<button capsMenuCheckboxItem [(checked)]="statusBar">
						<span>Status Bar</span>
					</button>

					<button capsMenuCheckboxItem disabled [(checked)]="activityBar">
						<span>Activity Bar</span>
					</button>

					<button capsMenuCheckboxItem [(checked)]="panel">
						<span>Panel</span>
					</button>
				</caps-menu-group>

				<caps-menu-separator />

				<caps-menu-label>Panel Position</caps-menu-label>

				<caps-menu-group type="radio" [(value)]="selectedPosition">
					@for (size of panelPositions; track size) {
						<button capsMenuRadioItem [value]="size">
							<span>{{ size }}</span>
						</button>
					}
				</caps-menu-group>

				<caps-menu-separator />

				<button capsMenuItem (itemClick)="reset()">
					<ng-icon name="lucideUndo2" />
					Reset
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownWithContextPreview {
	public readonly statusBar = signal(true);
	public readonly activityBar = signal(false);
	public readonly panel = signal(false);

	public panelPositions = ['Top', 'Bottom', 'Right', 'Left'] as const;
	public selectedPosition: string | string[] = 'Bottom';

	reset() {
		this.statusBar.set(false);
		this.panel.set(false);
		this.activityBar.set(false);
		this.selectedPosition = 'Bottom';
	}
}
