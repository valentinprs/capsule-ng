import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CAPS_CHART_THEME, CapsChart, CapsChartImports, capsChartTooltip } from '@capsule-ng/caps/chart';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { barY, colorLegend, defineChart, lineY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';

const data = [
	{ month: 'Jan', desktop: 186, mobile: 80, downloads: 42 },
	{ month: 'Feb', desktop: 305, mobile: 200, downloads: 58 },
	{ month: 'Mar', desktop: 237, mobile: 120, downloads: 51 },
	{ month: 'Apr', desktop: 273, mobile: 190, downloads: 73 },
	{ month: 'May', desktop: 209, mobile: 130, downloads: 81 },
	{ month: 'Jun', desktop: 314, mobile: 140, downloads: 96 },
];
type Composition = 'interactive' | 'line' | 'legend' | 'empty';

@Component({
	selector: 'caps-chart-story',
	imports: [CapsButtonImports, CapsCardImports, CapsChartImports, CapsTableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full max-w-3xl' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="2">{{ _title() }}</caps-card-title>
				<caps-card-description>Monthly data from January through June</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				@if (composition() === 'interactive') {
					<div class="mb-4 flex gap-2">
						<button
							capsButton
							type="button"
							variant="outline"
							[attr.aria-pressed]="_metric() === 'desktop'"
							(click)="_metric.set('desktop')"
						>
							Desktop
						</button>
						<button
							capsButton
							type="button"
							variant="outline"
							[attr.aria-pressed]="_metric() === 'mobile'"
							(click)="_metric.set('mobile')"
						>
							Mobile
						</button>
					</div>
				}
				@if (composition() === 'empty') {
					<button capsButton type="button" variant="outline" (click)="_showData.set(!_showData())">
						{{ _showData() ? 'Clear data' : 'Show sample data' }}
					</button>
				}
				@if (composition() !== 'empty' || _showData()) {
					<caps-chart [options]="_options()" />
					<details class="mt-4 text-sm">
						<summary class="focus-visible:outline-ring cursor-pointer rounded-sm focus-visible:outline-2">
							View chart data
						</summary>
						<caps-table-container class="mt-2">
							<table capsTable>
								<caption>{{ _title() }}</caption>
								<thead>
									<tr>
										<th scope="col">Month</th>
										@if (composition() === 'line') {
											<th scope="col">Downloads (thousands)</th>
										} @else {
											<th scope="col">Desktop</th>
											<th scope="col">Mobile</th>
										}
									</tr>
								</thead>
								<tbody>
									@for (row of _data; track row.month) {
										<tr>
											<th scope="row">{{ row.month }}</th>
											@if (composition() === 'line') {
												<td>{{ row.downloads }}</td>
											} @else {
												<td>{{ row.desktop }}</td>
												<td>{{ row.mobile }}</td>
											}
										</tr>
									}
								</tbody>
							</table>
						</caps-table-container>
					</details>
				} @else {
					<p role="status" class="text-muted-foreground py-12 text-center">No visitor data for this period.</p>
				}
			</caps-card-content>
		</caps-card>
	`,
})
class ChartStory {
	public readonly composition = input<Composition>('interactive');
	protected readonly _data = data;
	protected readonly _metric = signal<'desktop' | 'mobile'>('desktop');
	protected readonly _showData = signal(false);
	protected readonly _title = computed(() =>
		this.composition() === 'line' ? 'Monthly downloads (thousands)' : 'Visitors by device',
	);
	protected readonly _options = computed(() => {
		const kind = this.composition();
		const metric = this._metric();
		const grouped = data.flatMap((row) => [
			{ ...row, channel: 'Desktop', visitors: row.desktop },
			{ ...row, channel: 'Mobile', visitors: row.mobile },
		]);
		const marks =
			kind === 'legend'
				? [lineY(grouped, { x: 'month', y: 'visitors', z: 'channel', points: true, strokeWidth: 2.5 })]
				: kind === 'line'
					? [lineY(data, { x: 'month', y: 'downloads', points: true, stroke: 'var(--chart-2)', strokeWidth: 2.5 })]
					: [barY(data, { x: 'month', y: metric, fill: metric === 'desktop' ? 'var(--chart-2)' : 'var(--chart-1)' })];
		return {
			definition: defineChart(
				{
					marks,
					scales: {
						x: {
							scale:
								kind === 'interactive' || kind === 'empty'
									? () => scaleBand<string>().padding(0.2)
									: () => scalePoint<string>().padding(0.2),
						},
						y: {
							scale: scaleLinear,
							grid: true,
							nice: true,
							axis: { label: kind === 'line' ? 'Downloads (thousands)' : 'Visitors' },
						},
					},
					color:
						kind === 'legend' ? { domain: ['Desktop', 'Mobile'], legend: colorLegend({ label: 'Device' }) } : undefined,
					theme: CAPS_CHART_THEME,
				},
				{ focus: kind === 'line' ? 'nearest-x' : 'group-x', tooltip: capsChartTooltip() },
			),
			ariaLabel:
				kind === 'interactive' || kind === 'empty'
					? `${metric === 'desktop' ? 'Desktop' : 'Mobile'} visitors by month`
					: this._title(),
			ariaDescription: 'Monthly data from January through June. Exact values are in the adjacent table.',
			height: 250,
		};
	});
}

const meta: Meta<CapsChart> = {
	title: 'Chart',
	component: CapsChart,
	tags: ['autodocs'],
	argTypes: {
		options: {
			control: false,
			description: 'Complete TanStack options with accessible name, definition and dimensions.',
		},
	},
	decorators: [moduleMetadata({ imports: [ChartStory] })],
};
export default meta;
type Story = StoryObj<CapsChart>;
export const Interactive: Story = { render: () => ({ template: '<caps-chart-story composition="interactive" />' }) };
export const Line: Story = { render: () => ({ template: '<caps-chart-story composition="line" />' }) };
export const Legend: Story = { render: () => ({ template: '<caps-chart-story composition="legend" />' }) };
export const Empty: Story = { render: () => ({ template: '<caps-chart-story composition="empty" />' }) };
