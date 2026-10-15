import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCheck,
	lucideChevronDown,
	lucideChevronLeft,
	lucideChevronsUp,
	lucideChevronUp,
	lucideCircle,
	lucideCircleCheckBig,
	lucideCircleDashed,
	lucideCircleDot,
	lucideCircleHelp,
	lucideCircleOff,
	lucideCirclePlus,
	lucideGlobe,
	lucideMicVocal,
	lucideSearch,
	lucideSettings2,
	lucideX,
} from '@ng-icons/lucide';
import { PriorityIconPipe } from '../pipes/priority-icon.pipe';
import { StatusIconPipe } from '../pipes/status-icon.pipe';
import type { TaskPriority, TaskStatus } from '../services/tasks.models';
import { TasksExample } from '../tasks';

@Component({
	selector: 'spartan-table-actions',
	imports: [
		CapsButton,
		FormsModule,
		CapsInput,
		NgIcon,
		CapsDropdownMenuImports,
		CapsCommandImports,
		CapsPopoverImports,
		PriorityIconPipe,
		StatusIconPipe,
	],
	providers: [
		provideIcons({
			lucideCheck,
			lucideChevronDown,
			lucideChevronLeft,
			lucideChevronUp,
			lucideChevronsUp,
			lucideCircle,
			lucideCircleCheckBig,
			lucideCircleDashed,
			lucideCircleDot,
			lucideCircleHelp,
			lucideCircleOff,
			lucideCirclePlus,
			lucideGlobe,
			lucideMicVocal,
			lucideSearch,
			lucideSettings2,
			lucideX,
		}),
	],
	host: {
		class: 'block',
	},
	template: `
		<div class="wip-table-search flex flex-col justify-between gap-4 sm:flex-row">
			<div class="flex flex-col justify-between gap-4 sm:flex-row">
				<!-- TASK TITLE FILTER -->
				<input
					capsInput
					class="h-8 w-full md:w-80"
					aria-label="Filter tasks"
					placeholder="Filter tasks..."
					(input)="taskFilterChange($event)"
				/>

				<!-- STATUS FILTER -->
				<caps-popover [(open)]="_statusState" placement="bottom-start">
					<button capsButton capsPopoverTrigger variant="outline" size="sm" class="border-dashed">
						<ng-icon name="lucideCirclePlus" class="mr-2" />
						Status
						@if (_statusFilter().length) {
							<div data-orientation="vertical" role="none" class="bg-border mx-2 h-4 w-[1px] shrink-0"></div>

							<div class="flex gap-1">
								@for (status of _statusFilter(); track status) {
									<span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
										{{ status }}
									</span>
								}
							</div>
						}
					</button>
					<ng-template capsPopoverContent [class]="'w-[200px] p-0'">
						<caps-command>
							<caps-command-input placeholder="Search Status" />
							<caps-command-list>
								<caps-command-empty>No results found.</caps-command-empty>
								<caps-command-group>
									@for (status of _statuses(); track status) {
										<button capsCommandItem [value]="status" (selected)="statusSelected(status)">
											<ng-icon
												name="lucideCheck"
												aria-hidden="true"
												class="mr-2 size-4 shrink-0"
												[class.opacity-0]="!isStatusSelected(status)"
											/>
											<span class="sr-only">
												{{ isStatusSelected(status) ? 'Filter active:' : 'Filter inactive:' }}
											</span>

											<ng-icon [name]="status | statusIcon" class="text-muted-foreground mx-2" />
											{{ status }}
										</button>
									}
								</caps-command-group>
							</caps-command-list>
						</caps-command>
					</ng-template>
				</caps-popover>

				<!-- PRIORITY FILTER -->
				<caps-popover [(open)]="_priorityState" placement="bottom-start">
					<button capsButton capsPopoverTrigger variant="outline" size="sm" class="border-dashed">
						<ng-icon name="lucideCirclePlus" class="mr-2" />
						Priority
						@if (_priorityFilter().length) {
							<div data-orientation="vertical" role="none" class="bg-border mx-2 h-4 w-[1px] shrink-0"></div>

							<div class="flex gap-1">
								@for (priority of _priorityFilter(); track priority) {
									<span class="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs">
										{{ priority }}
									</span>
								}
							</div>
						}
					</button>
					<ng-template capsPopoverContent [class]="'w-[200px] p-0'">
						<caps-command>
							<caps-command-input placeholder="Search Priority" />
							<caps-command-list>
								<caps-command-empty>No results found.</caps-command-empty>
								<caps-command-group>
									@for (priority of _priorities(); track priority) {
										<button capsCommandItem [value]="priority" (selected)="prioritySelected(priority)">
											<ng-icon
												name="lucideCheck"
												aria-hidden="true"
												class="mr-2 size-4 shrink-0"
												[class.opacity-0]="!isPrioritySelected(priority)"
											/>
											<span class="sr-only">
												{{ isPrioritySelected(priority) ? 'Filter active:' : 'Filter inactive:' }}
											</span>

											<ng-icon [name]="priority | priorityIcon" class="text-muted-foreground mx-2" />
											{{ priority }}
										</button>
									}
								</caps-command-group>
							</caps-command-list>
						</caps-command>
					</ng-template>
				</caps-popover>

				@if (_statusFilter().length || _priorityFilter().length) {
					<button capsButton variant="ghost" size="sm" align="end" (click)="resetFilters()">
						Reset
						<ng-icon name="lucideX" class="ml-2" />
					</button>
				}
			</div>

			<!-- Column visibility -->
			<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
				Columns
				<ng-icon name="lucideChevronDown" class="ml-2" />
			</button>
			<ng-template #menu>
				<caps-menu class="w-32">
					@for (column of _hidableColumns; track column.id) {
						<button
							capsMenuCheckboxItem
							class="capitalize"
							[checked]="column.getIsVisible()"
							(itemClick)="column.toggleVisibility()"
						>
							{{ column.columnDef.id }}
						</button>
					}
				</caps-menu>
			</ng-template>
		</div>
	`,
})
export class TableActions {
	private readonly _tableComponent = inject(TasksExample);

	protected readonly _table = this._tableComponent.table;

	protected readonly _hidableColumns = this._table.getAllColumns().filter((column) => column.getCanHide());
	protected readonly _statusFilter = signal<TaskStatus[]>([]);
	protected readonly _statuses = signal(['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'] satisfies TaskStatus[]);
	protected readonly _statusState = signal(false);

	protected readonly _priorityFilter = signal<TaskPriority[]>([]);
	protected readonly _priorities = signal(['Low', 'Medium', 'High', 'Critical'] satisfies TaskPriority[]);
	protected readonly _priorityState = signal(false);

	protected taskFilterChange(event: Event) {
		this._table.getColumn('title')?.setFilterValue((event.target as HTMLInputElement).value);
	}

	isStatusSelected(status: TaskStatus): boolean {
		return this._statusFilter().some((s) => s === status);
	}

	statusSelected(status: TaskStatus): void {
		const current = this._statusFilter();
		const index = current.indexOf(status);
		if (index === -1) {
			this._statusFilter.set([...current, status]);
		} else {
			this._statusFilter.set(current.filter((s) => s !== status));
		}
		this._table.getColumn('status')?.setFilterValue(this._statusFilter());
	}

	isPrioritySelected(priority: TaskPriority): boolean {
		return this._priorityFilter().some((p) => p === priority);
	}

	prioritySelected(priority: TaskPriority): void {
		const current = this._priorityFilter();
		const index = current.indexOf(priority);
		if (index === -1) {
			this._priorityFilter.set([...current, priority]);
		} else {
			this._priorityFilter.set(current.filter((p) => p !== priority));
		}
		this._table.getColumn('priority')?.setFilterValue(this._priorityFilter());
	}

	resetFilters(): void {
		this._priorityFilter.set([]);
		this._statusFilter.set([]);
		this._table.resetColumnFilters();
	}
}
