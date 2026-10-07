import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CAPS_CHART_THEME, CapsChartImports } from '@capsule-ng/caps/chart';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';

@Component({
	selector: 'spartan-chart-empty',
	imports: [CapsButtonImports, CapsChartImports, CapsTableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-3xl' },
	template: `
		<button capsButton type="button" variant="outline" (click)="_showData.set(!_showData())">
			{{ _showData() ? 'Clear data' : 'Show sample data' }}
		</button>
		@if (_showData()) {
			<caps-chart [options]="_options" />
			<caps-table-container>
				<table capsTable>
					<caption>Monthly visits</caption>
					<thead>
						<tr>
							<th scope="col">Month</th>
							<th scope="col">Visits</th>
						</tr>
					</thead>
					<tbody>
						@for (row of _rows; track row.month) {
							<tr>
								<th scope="row">{{ row.month }}</th>
								<td>{{ row.visits }}</td>
							</tr>
						}
					</tbody>
				</table>
			</caps-table-container>
		} @else {
			<p class="text-muted-foreground py-12 text-center" role="status">No visitor data for this period.</p>
		}
	`,
})
export class ChartEmpty {
	protected readonly _showData = signal(false);
	protected readonly _rows = [
		{ month: 'Jan', visits: 120 },
		{ month: 'Feb', visits: 160 },
		{ month: 'Mar', visits: 140 },
	];
	protected readonly _options = {
		definition: defineChart({
			marks: [barY(this._rows, { x: 'month', y: 'visits', fill: 'var(--chart-2)' })],
			scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
			theme: CAPS_CHART_THEME,
		}),
		ariaLabel: 'Monthly visits',
		ariaDescription: 'Visits from January through March. Exact values are in the adjacent table.',
		height: 250,
	};
}
