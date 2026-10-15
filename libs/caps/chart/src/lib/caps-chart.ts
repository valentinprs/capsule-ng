import { ChangeDetectionStrategy, Component, afterRenderEffect, contentChild, input, viewChild } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { Chart, ChartTooltipBodyDirective, type ChartOptions } from '@tanstack/angular-charts';
import type { ChartValue } from '@tanstack/charts';

/** A Capsule surface for the existing TanStack chart grammar and interactions. */
@Component({
	selector: 'caps-chart',
	imports: [Chart],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'chart',
		style: `
			--ts-chart-1: var(--chart-1);
			--ts-chart-2: var(--chart-2);
			--ts-chart-3: var(--chart-3);
			--ts-chart-4: var(--chart-4);
			--ts-chart-5: var(--chart-5);
			--ts-chart-focus-fill: var(--background);
			--ts-chart-crosshair-label-halo: var(--background);
			--ts-chart-crosshair-marker-fill: var(--background);
			--ts-chart-tooltip-background: var(--popover);
			--ts-chart-tooltip-color: var(--popover-foreground);
			--ts-chart-tooltip-border: var(--caps-border-width) solid var(--border);
		`,
	},
	template: `
		<tanstack-chart [options]="options()">
			<ng-content select="ng-template[tanstackChartTooltipBody]" />
		</tanstack-chart>
	`,
})
export class CapsChart<
	TDatum = unknown,
	TXValue extends ChartValue = ChartValue,
	TYValue extends ChartValue = ChartValue,
> {
	/** Complete TanStack options, including the definition, accessible name and dimensions. Update immutably. */
	public readonly options = input.required<ChartOptions<TDatum, TXValue, TYValue>>();

	private readonly _chart = viewChild<Chart<TDatum, TXValue, TYValue>>(Chart);
	private readonly _tooltipBody = contentChild<ChartTooltipBodyDirective<TDatum, TXValue, TYValue>>(
		ChartTooltipBodyDirective,
		{ descendants: true },
	);

	constructor() {
		classes(() => 'caps-chart text-foreground');
		// Angular content queries stop at this component boundary. Delegate through the adapter's
		// public template setter so TanStack retains its embedded-view and tooltip lifecycle.
		afterRenderEffect(() => {
			const chart = this._chart();
			if (chart) chart.tooltipBodyDirective = this._tooltipBody();
		});
	}
}
