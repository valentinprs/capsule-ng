import { Component } from '@angular/core';
import { CAPS_CHART_THEME, CapsChartImports, capsChartTooltip } from '@capsule-ng/caps/chart';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';

const downloads = [
	{ month: 'Jan', downloads: 42 },
	{ month: 'Feb', downloads: 58 },
	{ month: 'Mar', downloads: 51 },
	{ month: 'Apr', downloads: 73 },
	{ month: 'May', downloads: 81 },
	{ month: 'Jun', downloads: 96 },
];

@Component({
	selector: 'spartan-chart-line',
	imports: [CapsChartImports, CapsTableImports],
	host: { class: 'block w-full max-w-3xl' },
	template: `
		<caps-chart [options]="_chartOptions" />
		<details class="mt-4 text-sm">
			<summary class="focus-visible:outline-ring cursor-pointer rounded-sm focus-visible:outline-2">
				View chart data
			</summary>
			<caps-table-container class="mt-2">
				<table capsTable>
					<caption>Monthly downloads (thousands)</caption>
					<thead>
						<tr>
							<th scope="col">Month</th>
							<th scope="col">Downloads (thousands)</th>
						</tr>
					</thead>
					<tbody>
						@for (row of _data; track row.month) {
							<tr>
								<th scope="row">{{ row.month }}</th>
								<td>{{ row.downloads }}</td>
							</tr>
						}
					</tbody>
				</table>
			</caps-table-container>
		</details>
	`,
})
export class ChartLine {
	protected readonly _data = downloads;
	protected readonly _chartOptions = {
		definition: defineChart(
			{
				marks: [
					lineY(downloads, {
						x: 'month',
						y: 'downloads',
						points: true,
						stroke: 'var(--chart-2)',
						strokeWidth: 2.5,
					}),
				],
				scales: {
					x: { scale: () => scalePoint<string>().padding(0.2) },
					y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Downloads (thousands)' } },
				},
				theme: CAPS_CHART_THEME,
			},
			{ focus: 'nearest-x', tooltip: capsChartTooltip() },
		),
		ariaLabel: 'Monthly downloads',
		ariaDescription: 'Line chart showing downloads from January through June. Exact values are in the adjacent table.',
		aspectRatio: 16 / 9,
	};
}
