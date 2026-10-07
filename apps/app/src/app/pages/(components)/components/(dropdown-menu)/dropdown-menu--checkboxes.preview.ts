import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-dropdown-checkboxes',
	imports: [CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Open</button>

		<ng-template #menu>
			<caps-menu class="w-40">
				<caps-menu-group label="Appearance">
					<button capsMenuCheckboxItem [(checked)]="statusBar">Status Bar</button>

					<button capsMenuCheckboxItem disabled [(checked)]="activityBar">Activity Bar</button>

					<button capsMenuCheckboxItem [(checked)]="panel">Panel</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownCheckboxes {
	public readonly statusBar = signal(true);
	public readonly activityBar = signal(false);
	public readonly panel = signal(false);
}
