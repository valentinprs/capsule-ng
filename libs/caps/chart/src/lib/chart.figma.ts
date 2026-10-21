// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-12790
// source=libs/caps/chart/src/lib/caps-chart.ts
// component=CapsChart
import figma from 'figma';

const chart = figma.selectedInstance;
const axis = (show: boolean) => (show ? '{ tickLabels: CAPS_CHART_TICK_LABELS }' : 'false');
const legend = chart.getBoolean('Show legend') ? `\n    color: { legend: capsChartLegend() },` : '';

export default {
	example: figma.code`<caps-chart [options]="{
  ariaLabel: 'Visitors by month',
  height: 400,
  definition: defineChart({
    marks: [lineY(data, { x: 'month', y: 'visitors', z: 'device', strokeWidth: 2 })],
    scales: {
      x: { axis: ${axis(chart.getBoolean('Show X-axis'))} },
      y: { grid: true, axis: ${axis(chart.getBoolean('Show Y-axis'))} },
    },${legend}
    theme: CAPS_CHART_THEME,
  }),
}" />`,
	imports: [
		"import { CAPS_CHART_THEME, CAPS_CHART_TICK_LABELS, CapsChartImports, capsChartLegend } from '@capsule-ng/caps/chart';",
		"import { defineChart, lineY } from '@tanstack/charts';",
	],
	id: 'caps-chart',
};
