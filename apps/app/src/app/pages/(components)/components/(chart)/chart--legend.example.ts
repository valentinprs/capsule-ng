import { Component } from '@angular/core';
import { CAPS_CHART_THEME, CapsChartImports, capsChartTooltip } from '@capsule-ng/caps/chart';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { colorLegend, defineChart, lineY } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';

const visitors = [
	{ month: 'Jan', channel: 'Desktop', visitors: 186 },
	{ month: 'Feb', channel: 'Desktop', visitors: 305 },
	{ month: 'Mar', channel: 'Desktop', visitors: 237 },
	{ month: 'Apr', channel: 'Desktop', visitors: 273 },
	{ month: 'Jan', channel: 'Mobile', visitors: 80 },
	{ month: 'Feb', channel: 'Mobile', visitors: 200 },
	{ month: 'Mar', channel: 'Mobile', visitors: 120 },
	{ month: 'Apr', channel: 'Mobile', visitors: 190 },
];

@Component({
	selector: 'spartan-chart-legend',
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
					<caption>Visitors by device</caption>
					<thead>
						<tr>
							<th scope="col">Month</th>
							<th scope="col">Device</th>
							<th scope="col">Visitors</th>
						</tr>
					</thead>
					<tbody>
						@for (row of _data; track row.month + row.channel) {
							<tr>
								<th scope="row">{{ row.month }}</th>
								<td>{{ row.channel }}</td>
								<td>{{ row.visitors }}</td>
							</tr>
						}
					</tbody>
				</table>
			</caps-table-container>
		</details>
	`,
})
export class ChartLegend {
	protected readonly _data = visitors;
	protected readonly _chartOptions = {
		definition: defineChart(
			{
				marks: [lineY(visitors, { x: 'month', y: 'visitors', z: 'channel', points: true, strokeWidth: 2.5 })],
				scales: {
					x: { scale: () => scalePoint<string>().padding(0.2) },
					y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Visitors' } },
				},
				color: {
					domain: ['Desktop', 'Mobile'],
					legend: colorLegend({ label: 'Device' }),
				},
				theme: CAPS_CHART_THEME,
			},
			{ focus: 'group-x', tooltip: capsChartTooltip() },
		),
		ariaLabel: 'Visitors by device',
		ariaDescription:
			'Line chart comparing desktop and mobile visitors from January through April. Exact values are in the adjacent table.',
		aspectRatio: 16 / 9,
	};
}
