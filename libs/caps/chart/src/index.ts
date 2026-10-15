import { ChartTooltipBodyDirective } from '@tanstack/angular-charts';
import { CapsChart } from './lib/caps-chart';

export { ChartTooltipBodyDirective } from '@tanstack/angular-charts';
export type { ChartOptions, ChartTooltipBodyTemplateContext } from '@tanstack/angular-charts';
export * from './lib/caps-chart';
export * from './lib/caps-chart-theme';
export * from './lib/caps-chart-tooltip';

export const CapsChartImports = [CapsChart, ChartTooltipBodyDirective] as const;
