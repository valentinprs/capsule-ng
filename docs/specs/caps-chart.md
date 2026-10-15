# Capsule charts — issue #59

## Design and anatomy

`<caps-chart [options]="options">` owns the official TanStack Angular `Chart`. The required,
generic `options` input is the existing TanStack `ChartOptions<TDatum, TXValue, TYValue>` contract:
marks, scales, dimensions, focus callbacks, rendering and legend remain engine concerns.
Replace options immutably for reactive updates. No second chart grammar or engine is introduced.

The generic Capsule host is a layout/theming container, not another image or focus target.
TanStack's SVG owns its accessible name, description and keyboard navigation. Tooltip templates
using the public `tanstackChartTooltipBody` directive can be projected through the Capsule host;
`CapsChartImports` includes that directive. `CAPS_CHART_THEME` maps the existing semantic palette,
foreground and grid; `capsChartTooltip` keeps all native DOM-tooltip options and adds the Capsule
CSS hook. Both hooks join the existing six style-preset selectors: no second theme source is
introduced, and Lyra/Luma/Mira treatments remain intact. Load `foundations.css` and the body style
class (`style-nova` by default), just like the existing integration. Custom classes and chart styles remain available through the native options contract.

[Spartan Chart](https://www.spartan.ng/components/chart) is the first reference for this lot.
The page currently supplies no detailed props/events table, so it cannot establish additional API.
The repository's public Helm chart entry point and the installed TanStack Angular 0.16.0 declarations
supply the missing contract. The workspace's public Brain source has no Chart entry point. Brain/Helm source remain unchanged; Capsule retains the same engine and
chart grammar. The [official Angular adapter documentation](https://tanstack.com/charts/latest/docs/framework/angular/adapter)
explains the options/callback/template lifecycle, but its latest import path differs from the installed
`@tanstack/angular-charts` package. Installed public declarations take precedence for exact names.

## Public contract and provenance

| Props/events/config                                           | Public source                                                                     | Capsule adaptation and reason                                                                                                                                            |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `options: ChartOptions<TDatum, TXValue, TYValue>` (required)  | Installed Angular `Chart.options` and `ChartOptions`; official adapter            | A single required generic input on `caps-chart` preserves native updates and strict typing.                                                                              |
| `definition`, marks, scales, color/legend                     | Installed `@tanstack/charts` public exports; existing Helm consumers              | Forwarded unchanged inside options; no parallel data or chart-type input.                                                                                                |
| `ariaLabel`, `ariaDescription`                                | Native `ChartHostOptions`                                                         | The one focusable engine surface owns its name/description; nearby Capsule tables supply exact values.                                                                   |
| `width`, `height`, `aspectRatio`                              | Native `ChartHostOptions`                                                         | Forwarded unchanged; host container adapts width without a second sizing grammar.                                                                                        |
| `class`, `style`, `className`, renderer options               | Installed `ChartPresentationOptions`/`ChartHostOptions`; official adapter         | Inner host and engine surface retain their native presentation hooks; Capsule outer-host classes compose normally.                                                       |
| Focus configuration and callbacks such as `onFocusChange`     | Native definition/host types; official adapter                                    | Passed through as functions inside options; no invented Angular outputs or models.                                                                                       |
| `tanstackChartTooltipBody`, `ChartTooltipBodyTemplateContext` | Public Angular directive/template guard, exported by Helm import bundle           | Public directive is re-exported in `CapsChartImports`; projection is delegated through the public `Chart.tooltipBodyDirective` setter to preserve engine-owned teardown. |
| `CAPS_CHART_THEME`                                            | Existing public `HLM_CHART_THEME` in `libs/helm/chart/src/lib/hlm-chart-theme.ts` | Same semantic foreground/grid/palette; Capsule name and shared style hooks.                                                                                              |
| `capsChartTooltip(options)`                                   | Existing public `hlmChartTooltip`, native tooltip public types                    | Same native settings/DOM implementation; only the Capsule CSS class hook changes.                                                                                        |
| Exact values and empty state                                  | Native HTML semantics; integrated public `CapsTableImports`                       | Five compositions use `caps-table-container` + `table[capsTable]`; captions/scoped headers and application-owned empty text remain native.                               |

Exact installed adapter declarations: `node_modules/@tanstack/angular-charts/dist/types/tanstack-angular-charts.d.ts`.
Public Helm composition: `libs/helm/chart/src/index.ts`, `libs/helm/chart/README.md` and the helper/theme files
named above. These sources define the retained contract where the Spartan page is incomplete.

### Exhaustive export and option audit

The public entry point is `libs/caps/chart/src/index.ts`. Its seven exported names are
`CapsChart`, `CapsChartImports`, `ChartOptions`, `ChartTooltipBodyDirective`,
`ChartTooltipBodyTemplateContext`, `CAPS_CHART_THEME` and `capsChartTooltip`.
`CapsChart` has exactly one public input (`options`), no outputs/models and no imperative public
methods; its constructor only wires styling and the native tooltip view. `CapsChartImports` is the
readonly component/directive pair. The re-exported directive retains its required
`definition` input (alias `tanstackChartTooltipBody`), readonly `templateRef` and static
`ngTemplateContextGuard`; Capsule adds no directive API. The re-exported template context retains
`points`, `content`, `pinned`, `dismiss`, `defaultBody` and `$implicit` unchanged.

The tables below enumerate every direct property of the installed `ChartOptions` intersection,
every accepted tooltip option and every exported theme field. Nested mark/scale/legend/cursor
objects remain the native TanStack types, rather than being copied into another Capsule API.

| Native `options` property | Exact installed public declaration                                                                | Capsule adaptation                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `definition`              | `@tanstack/charts/dist/dom-types.d.ts:202` (`ChartHostOptions`)                                   | Required native definition; forwarded unchanged.                   |
| `class`                   | `@tanstack/angular-charts/dist/types/tanstack-angular-charts.d.ts:7` (`ChartPresentationOptions`) | Native inner host class, separate from outer Capsule host classes. |
| `style`                   | Same `ChartPresentationOptions`                                                                   | Native inner host style string, forwarded unchanged.               |
| `ariaLabel`               | `@tanstack/charts/dist/types.d.ts:934` (`RenderChartOptions`)                                     | Required accessible name on the engine surface.                    |
| `ariaDescription`         | Same `RenderChartOptions`                                                                         | Native SVG description.                                            |
| `className`               | Same `RenderChartOptions`                                                                         | Native rendered surface class.                                     |
| `tabIndex`                | Same `RenderChartOptions`                                                                         | Native surface tab order; no duplicate host tabindex.              |
| `idPrefix`                | Same `RenderChartOptions`                                                                         | Native IDs; no Capsule ID layer.                                   |
| `height`                  | `@tanstack/charts/dist/dom-types.d.ts:174` (`ChartHostCommonOptions`)                             | Native sizing.                                                     |
| `aspectRatio`             | Same `ChartHostCommonOptions`                                                                     | Native sizing.                                                     |
| `width`                   | Same `ChartHostCommonOptions`                                                                     | Native sizing.                                                     |
| `initialWidth`            | Same `ChartHostCommonOptions`                                                                     | Native initial/server sizing.                                      |
| `onFocusChange`           | Same `ChartHostCommonOptions`                                                                     | Native callback; no Angular output.                                |
| `onFocusGroupChange`      | Same `ChartHostCommonOptions`                                                                     | Native callback; no Angular output.                                |
| `onSelect`                | Same `ChartHostCommonOptions`                                                                     | Native callback; no Angular output.                                |
| `onRender`                | Same `ChartHostCommonOptions`                                                                     | Native callback/context.                                           |
| `renderSvg`               | Same `ChartHostCommonOptions`                                                                     | Native serialization hook; no second renderer.                     |
| `measureText`             | Same `ChartHostCommonOptions`                                                                     | Native measurement hook.                                           |

The definition preserves static `marks`, `scales`, `guides`, `color`, `gradients`, `clip`, `margin`
and `theme`, or responsive `chart(context)`; see `ChartSpecBase`, `StoredChartSpec` and
`ResponsiveChartDefinition` in `@tanstack/charts/dist/types.d.ts:405,485,550`.
Its complete behavior configuration is `maxFocusDistance`, `focus`, `focusRing`, `cursor`,
`spatialIndex`, `svgAnimation`, `motion`, `pointer`, `keyboard`, `selection`, `controls` and
`tooltip` (`ChartDefinitionOptions`, same file:502). All are forwarded unchanged. The declaration's
readonly `__datum`, `__xValue` and `__yValue` are native type witnesses; they are not Capsule inputs.
This keeps the installed static/responsive grammar and every nested public type intact.

| `capsChartTooltip` accepted property | Exact source                                                                                                          | Capsule adaptation                                |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `className`                          | `@tanstack/charts/dist/types.d.ts:949` (`ChartTooltipOptions`); public `libs/helm/chart/src/lib/hlm-chart-tooltip.ts` | Merge consumer classes with `caps-chart-tooltip`. |
| `motion`                             | Same `ChartTooltipOptions`                                                                                            | Native motion settings, unchanged.                |
| `portal`                             | Same `ChartTooltipOptions`                                                                                            | Native portal extension/settings, unchanged.      |
| `items`                              | Same `ChartTooltipOptions`                                                                                            | Native tooltip items, unchanged.                  |
| `sort`                               | Same `ChartTooltipOptions`                                                                                            | Native sorting, unchanged.                        |
| `anchor`                             | Same `ChartTooltipOptions`                                                                                            | Native anchor strategy, unchanged.                |
| `placement`                          | Same `ChartTooltipOptions`                                                                                            | Native placement/fallbacks, unchanged.            |
| `offset`                             | Same `ChartTooltipOptions`                                                                                            | Native offset, unchanged.                         |
| `content`                            | Same `ChartTooltipOptions`                                                                                            | Native content callback, unchanged.               |
| `format`                             | Same `ChartTooltipOptions`                                                                                            | Native point formatting callback, unchanged.      |
| `formatGroup`                        | Same `ChartTooltipOptions`                                                                                            | Native group formatting callback, unchanged.      |
| `sticky`                             | Same `ChartTooltipOptions`                                                                                            | Native pinning, unchanged.                        |
| `visibility`                         | Same `ChartTooltipOptions`                                                                                            | Native focus/pinned visibility, unchanged.        |

The helper accepts an omitted options object (default `{}`) and returns the native
`ChartTooltipInput<TDatum, TXValue, TYValue, 'dom'>` with `use: tooltip`; public source:
`@tanstack/charts/dist/types.d.ts:963,974` and `@tanstack/charts/dist/tooltip.d.ts:2`.
`CAPS_CHART_THEME` has exactly `foreground`, `muted`, `grid`, `background` and `palette`, preserving
all five fields of public `HLM_CHART_THEME` (`libs/helm/chart/src/lib/hlm-chart-theme.ts:4`) and
`ChartTheme` (`@tanstack/charts/dist/types.d.ts:360`). The palette uses shared `--chart-1` through
`--chart-5`; background remains transparent. No theme-specific palette or events are introduced.

## Inventory and migration

| Consumer              | Retained capability                                                                  | Accessible alternative                            |
| --------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------- |
| Chart preview         | 30 daily bars; Desktop/Mobile selection; custom dates and tooltip rows; 250px height | Native pressed buttons and a table of both series |
| Line example          | Six points; axes/grid; nearest-x tooltip; 16:9 aspect                                | Monthly downloads table                           |
| Legend example        | Two line series; grouped focus; color legend                                         | Device labels and per-series data table           |
| Empty example (added) | Application-owned conditional empty state and data restoration                       | Visible empty text; same table after restore      |
| Storybook (added)     | All four compositions through public Capsule imports; six monthly rows               | Same naming, native controls and data tables      |

Stories are independent consumers rather than importing application components across Nx project boundaries.

No other chart consumers, tooltip templates, stories, home demos or e2e selectors were present at
the starting commit. The page, displayed import/skeleton strings, generated snippets and API docs
are migrated too. Existing Card, Button, Link and Table APIs are used for auxiliary compositions. Helm
Alert/typography remain until their separate lots provide their APIs; no cross-lot migration occurs.

## Accessibility, responsive and SSR contracts

Always set `ariaLabel` and a concise `ariaDescription` inside options. Exact values belong in a
nearby native table or text summary. The examples compose the public `CapsTableImports` overflow container and native table with details/summary, captions, row/column
headers and visible device labels; neither hover nor color is the only access to the data. A chart
with no data should be replaced with meaningful application-owned text rather than an unlabeled
empty plot. Fixed height and aspectRatio are native TanStack options; width adapts to its parent.

The adapter renders SVG on the server and mounts in the browser. Hydration is not guaranteed by
TanStack's latest documented public contract; catalogue SSR/client behavior is checked locally.
The wrapper introduces no global document access. Tooltip pinning, Escape dismissal, focus and
teardown continue to belong to the engine, including Angular-owned tooltip embedded views.

## Validation

All final checks use Node 22.15.0 (the exact CI runtime), local isolated caches and the shared heavy
controller. Full union CI remains the collector's responsibility.

- One `caps:build` package build passed, including public secondary-entry-point export validation.
  All six distributed style files match their source files. Package source was unchanged afterward.
- Three real Chromium Chart contracts passed: generic public composition, native class/style and
  surface naming, immutable updates, keyboard custom tooltip/pinning/Escape/teardown and helper/theme.
- Strict Angular compilation passed for the catalogue, the four independent stories and six
  consumers (four examples, the story component and a public tooltip fixture), against both source
  and the built package's declarations. The fixture uses the public package alias; the internal unit
  spec uses the relative public barrel to comply with Nx self-import boundaries.
- Thirteen CSS contracts and two catalogue composition/empty-state contracts passed. Twenty
  metadata/snippet tests passed normally without snapshot-update mode after final generation.
  The snapshot diff adds only the Chart Capsule API; other families remain unchanged.
- Real project ESLint configurations passed with Nx module boundaries active, including Chart specs,
  catalogue/server, autonomous stories, styles and tooling tests. The tooling file retains three
  pre-existing `no-explicit-any` warnings outside the added Chart assertions.
- Catalogue and Storybook each passed sixteen browser contexts: four compositions, light/dark and
  viewport widths 1280/390. Axe found no violations in the chart compositions; nested controls,
  geometry, tables, keyboard series selection, plot focus, tooltip dismissal and empty restore/clear
  were checked. Captures were visually inspected. Catalogue RTL passed separately after hydration.
- A targeted raw-HTML SSR check passed: HTTP 200, three named static chart SVGs, 44 scoped data
  rows, the visible no-data status and 108 Angular hydration markers. Browser interactions waited
  for hydration before selecting series.
- Every context awaited `document.fonts.load` and `document.fonts.ready`, verifying loaded faces.
  Storybook contexts and the targeted catalogue RTL check also recorded CDP platform-font glyphs:
  Inter (400/500/700), Geist Mono, Noto Sans Arabic and Noto Sans Hebrew are custom fonts, including
  Arabic/Hebrew text. Themes are exclusive on document/body, and computed variables/colors differ.

The catalogue's interactive-card title uses h2 under the page h1 after axe exposed a heading-order
error. The isolated Storybook QA host provides an h1; no widget roles or axe rules were changed.
Browser-harness corrections wait for Angular updates after clear/RTL and bind Storybook explicitly
to IPv4. Passing contexts were retained while only incomplete checks resumed.

Limitations: no manual screen-reader session, no claim of TanStack's general Angular hydration
support, and no full union/global pipeline from this clone. The catalogue's local SSR/client
integration was tested; the engine's documented hydration limitation remains visible on the page.
