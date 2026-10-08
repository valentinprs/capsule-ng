import { Component, computed, input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { type Row } from '@tanstack/angular-table';
import type { Task } from '../services/tasks.models';
import { type TaskFeatures } from '../tasks';

@Component({
	selector: 'spartan-action-dropdown-tasks',
	imports: [CapsButton, NgIcon, CapsDropdownMenuImports],
	providers: [provideIcons({ lucideEllipsis })],
	template: `
		<button
			capsButton
			size="icon-sm"
			variant="ghost"
			[attr.aria-label]="'Open menu for row ' + row().id"
			[capsDropdownMenuTrigger]="menu"
			placement="bottom-end"
		>
			<ng-icon name="lucideEllipsis" />
		</button>
		<ng-template #menu>
			<caps-menu>
				<caps-menu-label>Actions</caps-menu-label>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuItem>Edit</button>
					<button capsMenuItem>Make a copy</button>
					<button capsMenuItem>Favorite</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button [capsMenuSubTrigger]="labels" side="left" align="end">Labels</button>
				<caps-menu-separator />
				<button capsMenuItem>
					Delete
					<span class="ml-auto text-xs tracking-widest opacity-(--caps-opacity-60)">⌘⌫</span>
				</button>
			</caps-menu>
		</ng-template>
		<ng-template #labels>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuCheckboxItem [checked]="_data().type === 'Bug'">
						<span>Bug</span>
					</button>
					<button capsMenuCheckboxItem [checked]="_data().type === 'Feature'">
						<span>Feature</span>
					</button>
					<button capsMenuCheckboxItem [checked]="_data().type === 'Documentation'">
						<span>Documentation</span>
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class ActionDropdown {
	public readonly row = input.required<Row<TaskFeatures, Task>>();

	protected readonly _data = computed(() => this.row().original);
}
