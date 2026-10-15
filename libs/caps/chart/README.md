# Chart

```ts
import { CAPS_CHART_THEME, CapsChartImports, capsChartTooltip } from '@capsule-ng/caps/chart';
```

```html
<caps-chart [options]="options" />
```

`options` is the generic TanStack `ChartOptions` contract. Keep the existing `defineChart` marks,
scales, legends, callbacks and dimension options. Set `ariaLabel` and `ariaDescription`, use
`CAPS_CHART_THEME` in the definition and `capsChartTooltip()` for the optional DOM tooltip. Replace
options immutably when data changes. Capsule owns the surface and maps the shared semantic tokens.

Load the package's `foundations.css` and apply `style-nova` to the body for the default chart
presentation (as in the catalogue/Storybook). The existing six style presets also accept the Capsule
chart hooks, preserving their chart layout and distinctive tooltip radius, typography and shadows.
Use the normal `dark` theme class; do not introduce a separate chart stylesheet or palette.

`CapsChartImports` includes the official `ChartTooltipBodyDirective`: project a
`<ng-template [tanstackChartTooltipBody]="options.definition" let-tooltip>` to customize the body.
The engine still owns focus, pinning and dismissal. Angular owns the projected embedded view.

Provide an adjacent data table/text summary and an application-owned empty message. Chart width
adapts to its container; `height`, `width` and `aspectRatio` remain TanStack options. Server SVG is
supported by the adapter; Angular hydration is not yet its documented public guarantee.

See [the design and inventory](../../../docs/specs/caps-chart.md).

The starting reference is [Spartan Chart](https://www.spartan.ng/components/chart). Its current page
does not provide a detailed API table; the public Helm chart integration and installed TanStack
Angular 0.16.0 declarations establish the exact contract. The
[official Angular adapter documentation](https://tanstack.com/charts/latest/docs/framework/angular/adapter)
explains immutable options, callbacks and tooltip templates; use the installed package's public
exports for exact names. No Angular outputs are added: engine callbacks remain inside options.
Use public `CapsTableImports` for adjacent tables with native captions and scoped headers.
