import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerCircleCheck, tablerLoader } from '@ng-icons/tabler-icons';
import { type Row } from '@tanstack/angular-table';
import { type DashboardData } from './dashboard-data.model';
import { type DashboardFeatures } from './table-section';

@Component({
	selector: 'spartan-status-cell',
	imports: [CapsBadgeImports, NgIcon],
	providers: [provideIcons({ tablerCircleCheck, tablerLoader })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-badge
			id="{{ _data().id }}-status"
			variant="outline"
			class="text-muted-foreground rounded-full px-1.5 text-xs"
		>
			@if (_data().status === 'Done') {
				<ng-icon name="tablerCircleCheck" class="text-green-500 dark:text-green-400" />
			} @else {
				<ng-icon name="tablerLoader" />
			}
			{{ _data().status }}
		</caps-badge>
	`,
})
export class StatusCell {
	public readonly row = input.required<Row<DashboardFeatures, DashboardData>>();

	protected readonly _data = computed(() => this.row().original);
}
