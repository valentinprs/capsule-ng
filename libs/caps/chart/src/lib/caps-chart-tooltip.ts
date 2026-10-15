import { hlm } from '@spartan-ng/helm/utils';
import type { ChartTooltipInput, ChartTooltipOptions, ChartValue } from '@tanstack/charts';
import { tooltip } from '@tanstack/charts/tooltip';

/** Enables TanStack's DOM tooltip with Capsule styling. */
export function capsChartTooltip<
	TDatum = unknown,
	TXValue extends ChartValue = ChartValue,
	TYValue extends ChartValue = ChartValue,
>(options: ChartTooltipOptions<TDatum, TXValue, TYValue> = {}): ChartTooltipInput<TDatum, TXValue, TYValue, 'dom'> {
	return {
		use: tooltip,
		...options,
		className: hlm('caps-chart-tooltip', options.className),
	};
}
