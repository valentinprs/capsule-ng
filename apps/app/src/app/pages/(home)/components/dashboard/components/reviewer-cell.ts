import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { type Row } from '@tanstack/angular-table';
import { type DashboardData } from './dashboard-data.model';
import { type DashboardFeatures } from './table-section';
@Component({
	selector: 'spartan-reviewer-cell',
	imports: [CapsSelectImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (_data().reviewer !== 'Assign reviewer') {
			{{ _data().reviewer }}
		} @else {
			<caps-select
				id="{{ _data().id }}-reviewer"
				placeholder="Assign reviewer"
				size="sm"
				class="w-38"
				aria-label="Reviewer"
			>
				<caps-select-option value="Eddie Lake">Eddie Lake</caps-select-option>
				<caps-select-option value="Jamik Tashpulatov">Jamik Tashpulatov</caps-select-option>
			</caps-select>
		}
	`,
})
export class ReviewerCell {
	public readonly row = input.required<Row<DashboardFeatures, DashboardData>>();

	protected readonly _data = computed(() => this.row().original);
}
