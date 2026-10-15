import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { CAPS_CHART_THEME, CapsChartImports, capsChartTooltip, type ChartOptions } from '../index';

interface Revenue {
	month: string;
	revenue: number;
}
const rows: Revenue[] = [
	{ month: 'Jan', revenue: 42 },
	{ month: 'Feb', revenue: 58 },
];
const definition = defineChart(
	{
		marks: [barY(rows, { x: 'month', y: 'revenue' })],
		scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
		theme: CAPS_CHART_THEME,
	},
	{ tooltip: capsChartTooltip<Revenue, string, number>({ sticky: true }), focus: 'group-x' },
);

@Component({
	imports: [CapsChartImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-chart class="consumer-chart" [options]="options()">
			<ng-template [tanstackChartTooltipBody]="options().definition" let-tooltip>
				<span data-testid="custom-tooltip">Revenue {{ tooltip.points[0]?.yValue }}</span>
			</ng-template>
		</caps-chart>
	`,
})
class ChartConsumer {
	public readonly options = signal<ChartOptions<Revenue, string, number>>({
		definition,
		ariaLabel: 'Monthly revenue',
		ariaDescription: 'Revenue in January and February.',
		width: 400,
		height: 240,
		class: 'inner-chart',
		style: 'outline-width: 2px',
		className: 'chart-surface',
	});
}

async function renderChart() {
	const fixture = TestBed.createComponent(ChartConsumer);
	fixture.detectChanges();
	await fixture.whenStable();
	await new Promise((resolve) => requestAnimationFrame(resolve));
	return fixture;
}

describe('CapsChart public composition', () => {
	it('keeps one named, focusable TanStack surface and updates immutable options', async () => {
		const fixture = await renderChart();
		const element = fixture.nativeElement as HTMLElement;
		const host = element.querySelector('caps-chart')!;
		expect(element.querySelectorAll('svg[role="img"]')).toHaveLength(1);
		expect(host.getAttribute('role')).toBeNull();
		expect(host.getAttribute('tabindex')).toBeNull();
		expect(host.classList).toContain('consumer-chart');
		expect(host.classList).toContain('caps-chart');
		expect(host.getAttribute('data-slot')).toBe('chart');
		const innerHost = host.querySelector<HTMLElement>('.ts-chart-host')!;
		expect(innerHost.classList).toContain('inner-chart');
		expect(innerHost.style.outlineWidth).toBe('2px');
		expect(host.querySelector('svg')?.classList).toContain('chart-surface');
		let svg = element.querySelector('svg')!;
		expect(svg.getAttribute('aria-label')).toBe('Monthly revenue');
		expect(svg.querySelector('desc')?.textContent).toBe('Revenue in January and February.');
		expect(svg.getAttribute('tabindex')).toBe('0');
		fixture.componentInstance.options.update((options) => ({ ...options, ariaLabel: 'Updated revenue', height: 280 }));
		fixture.detectChanges();
		await fixture.whenStable();
		svg = element.querySelector('svg')!;
		expect(svg.getAttribute('aria-label')).toBe('Updated revenue');
		expect(svg.getAttribute('viewBox')?.split(' ').at(-1)).toBe('280');
	});

	it('forwards projected Angular tooltip content through keyboard focus and tears it down', async () => {
		const fixture = await renderChart();
		const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
		svg.focus();
		svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('[data-testid="custom-tooltip"]')?.textContent).toContain('Revenue 42');
		svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('[data-testid="custom-tooltip"]')?.textContent).toContain('Revenue 58');
		svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('.ts-chart-tooltip')?.getAttribute('data-sticky')).toBe('true');
		svg.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		fixture.detectChanges();
		await fixture.whenStable();
		expect(fixture.nativeElement.querySelector('.ts-chart-tooltip')?.hasAttribute('hidden')).toBe(true);
		expect(fixture.nativeElement.querySelector('[data-testid="custom-tooltip"]')).toBeNull();
		fixture.destroy();
		expect(fixture.nativeElement.querySelector('[data-testid="custom-tooltip"]')).toBeNull();
	});

	it('retains tooltip settings and the shared semantic palette', () => {
		expect(capsChartTooltip({ className: 'revenue-tooltip', placement: 'top', sticky: false })).toMatchObject({
			className: 'caps-chart-tooltip revenue-tooltip',
			placement: 'top',
			sticky: false,
		});
		expect(CAPS_CHART_THEME.palette).toEqual([
			'var(--chart-1)',
			'var(--chart-2)',
			'var(--chart-3)',
			'var(--chart-4)',
			'var(--chart-5)',
		]);
	});
});
