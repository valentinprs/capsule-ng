import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { type Row } from '@tanstack/angular-table';
import { type DashboardData } from './dashboard-data.model';
import { type DashboardFeatures } from './table-section';

@Component({
	selector: 'spartan-type-cell',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-badge id="{{ _data().id }}-type" variant="outline" class="text-muted-foreground rounded-full px-1.5 text-xs">
			{{ _data().type }}
		</caps-badge>
	`,
})
export class TypeCell {
	public readonly row = input.required<Row<DashboardFeatures, DashboardData>>();

	protected readonly _data = computed(() => this.row().original);
}
