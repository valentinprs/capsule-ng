import {
	colorLegend,
	type ChartColorLegend,
	type ChartColorLegendContext,
	type ChartKey,
	type SceneNode,
} from '@tanstack/charts';

export interface CapsChartLegendOptions {
	/** Formats each categorical value into its legend label. */
	format?: (value: ChartKey) => string;
}

// Figma Chart legend: 8px dot, 4px to the label, 16px between items, 12/16 labels, 12px below the axis.
const DOT = 8;
const DOT_GAP = 4;
const ITEM_GAP = 16;
const FONT_SIZE = 12;
const ROW_HEIGHT = 16;
const OFFSET = 12;

let context2d: CanvasRenderingContext2D | null | undefined;
function measure(text: string): number {
	if (context2d === undefined) {
		context2d = typeof document === 'undefined' ? null : document.createElement('canvas').getContext('2d');
	}
	if (!context2d) return text.length * FONT_SIZE * 0.6;
	context2d.font = `${FONT_SIZE}px ${getComputedStyle(document.body).fontFamily}`;
	return context2d.measureText(text).width;
}

interface Item {
	key: string;
	label: string;
	color: string;
	width: number;
}

function layout({ colors, bounds }: ChartColorLegendContext, format: (value: ChartKey) => string): Item[][] {
	const rows: Item[][] = [[]];
	let rowWidth = 0;
	for (const value of colors.domain) {
		const label = format(value);
		const width = DOT + DOT_GAP + measure(label);
		const row = rows[rows.length - 1];
		if (row.length && rowWidth + ITEM_GAP + width > bounds.width) {
			rows.push([]);
			rowWidth = 0;
		}
		rowWidth += (rows[rows.length - 1].length ? ITEM_GAP : 0) + width;
		rows[rows.length - 1].push({ key: String(value), label, color: colors.map(value), width });
	}
	return rows;
}

const isCategorical = ({ colors }: ChartColorLegendContext) => (colors.kind ?? 'categorical') === 'categorical';

/**
 * The Figma Chart legend: a centered categorical legend below the chart, without a title. TanStack's
 * `colorLegend` only aligns items to the start with 11px labels. Quantitative scales fall back to it.
 */
export function capsChartLegend(options: CapsChartLegendOptions = {}): ChartColorLegend {
	const format = options.format ?? String;
	const fallback = colorLegend({ placement: 'bottom', format });
	return {
		placement: 'bottom',
		height: (itemCount, context) =>
			isCategorical(context)
				? OFFSET + layout(context, format).length * ROW_HEIGHT
				: fallback.height(itemCount, context),
		render: (context) => {
			if (!isCategorical(context)) return fallback.render(context);
			const { bounds, theme } = context;
			const children: SceneNode[] = [];
			layout(context, format).forEach((row, index) => {
				const rowWidth = row.reduce((total, item) => total + item.width, 0) + ITEM_GAP * (row.length - 1);
				const y = bounds.y + OFFSET + index * ROW_HEIGHT + ROW_HEIGHT / 2;
				let x = bounds.x + (bounds.width - rowWidth) / 2;
				for (const item of row) {
					children.push(
						{
							kind: 'dot',
							key: `legend-dot:${item.key}`,
							x: x + DOT / 2,
							y,
							radius: DOT / 2,
							style: { fill: item.color },
						},
						{
							kind: 'label',
							key: `legend-label:${item.key}`,
							x: x + DOT + DOT_GAP,
							y,
							text: item.label,
							baseline: 'middle',
							fontSize: FONT_SIZE,
							style: { fill: theme.foreground },
						},
					);
					x += item.width + ITEM_GAP;
				}
			});
			return { kind: 'group', key: 'legend', className: 'ts-chart__legend', ariaHidden: true, children };
		},
	};
}
