# Capsule design tokens

Issue #27. Typography confirmed by Valentin on 2026-10-02: **Inter** for UI text,
**Geist Mono** for code. Noto Sans Arabic and Hebrew remain the language-specific
fallbacks. This confirms the choice for Capsule-ng independently of the older
Capsule repository. The design values otherwise retain the existing appearance.

## Sources and consumers

`libs/styles/src/caps-foundations.css` is the shared foundation entry point. It
imports the pinned Tailwind 4.3.3 primitive scales, Capsule
semantic colors and metrics, and the six retained compatibility skins. Both
applications load `caps-fonts.css` as a bundler CSS entry and import it, Brain's unchanged preset, and `libs/caps/caps-preset.css`.
The installed package provides the equivalent single import
`@capsule-ng/caps/foundations.css`; its assets are copied from those same sources.

There are three levels, without a second JSON/TypeScript copy of the values:

1. **Primitives:** Tailwind's versioned `theme.css` owns palettes, text scales,
   font weights, line heights, tracking, container sizes, shadows, blur, easing
   and keyframes. `caps-foundation-tokens.css` extends it with off-scale sizes,
   opacity, duration and stacking scales. Utilities such as `gap-2`, `text-sm`
   and `shadow-md` are references to these scales, not independent definitions.
2. **Semantic tokens:** `caps-tokens.css` maps neutral/blue/red palette primitives
   to light/dark roles; `caps-foundation-tokens.css` defines Capsule's font,
   spacing, radius, focus, disabled and motion roles. Existing Helm/shadcn names
   (`--primary`, `--radius`, `--font-sans`, etc.) alias those roles. The blue chat
   theme is a contextual palette mapping in the same color source.
3. **Component tokens:** control heights and small radii, button active offset,
   small button text and textarea minimum height reference the foundation.
   Presets and structural classes consume those tokens. Skin-specific calendar
   cell sizes and card spacing are compositions of the shared spacing/radius
   scales, scoped to their owning component/variant.

## Category inventory

| Category                  | Canonical source / reference                                                              | Consumers                                                |
| ------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Palettes                  | Tailwind `--color-*`                                                                      | Capsule color roles, chart colors, contextual examples   |
| Semantic colors           | `caps-tokens.css`, `--caps-*`, light/dark                                                 | Capsule, Helm aliases, both apps                         |
| Font families and files   | `caps-foundation-tokens.css`, `caps-fonts.css`                                            | Preflight/body, typography utilities, RTL examples       |
| Font sizes / line heights | Tailwind `--text-*`, `--leading-*`; Capsule small-control text                            | Presets, titles, prose, code, controls                   |
| Weights / letter spacing  | Tailwind `--font-weight-*`, `--tracking-*`                                                | Presets and catalogue/stories typography                 |
| Spacing                   | `--caps-spacing` → Tailwind `--spacing`; numeric utility multipliers                      | Padding, margin, gaps, calendar/cell/card composition    |
| Dimensions                | Tailwind `--container-*`, spacing scale, `--caps-size-*`, control sizes                   | Controls, retained skins, layout max width               |
| Radii                     | `--caps-radius` → `--radius`; Brain's unchanged derived radius aliases                    | Capsule and Helm, component radius limits                |
| Borders / focus           | `--caps-border-width`, `--caps-focus-ring-width`; semantic border/ring colors             | Capsule controls and focus states                        |
| Shadows / blur            | Tailwind `--shadow-*`, `--inset-shadow-*`, `--drop-shadow-*`, `--blur-*`                  | Popovers, cards, chart tooltips, overlays                |
| Opacities                 | `--caps-opacity-*`, disabled semantic alias                                               | Disabled controls, overlays, catalogue chrome            |
| Breakpoints               | Tailwind `--breakpoint-*` / `--container-*`; shared 3xl/4xl extensions                    | Responsive layouts and container-query Field orientation |
| Stacking                  | `--caps-z-*`                                                                              | Catalogue chrome and example stacking contexts           |
| Animations / transitions  | Tailwind keyframes, Brain/tw-animate-css animations; `--caps-duration-*`, standard easing | Presets and application transitions                      |
| Component / skin variants | `caps-preset.css`, `style-{nova,vega,lyra,maia,mira,luma}.css`                            | Both apps; API Capsule takes precedence over Helm        |

The transition defaults are also runtime aliases on `:root`/`.dark`: Tailwind
transition utilities look them up at runtime, outside `@theme inline`.

CSS media queries require static breakpoints: these are declared once in `@theme`,
not through `var()`. The pinned Tailwind scales are intentionally imported rather
than copied into a parallel Capsule palette/typography database.

## Cascade and theme boundaries

Both apps and the package declare this order before imports:
`theme, base, spartan-nova-baseline, spartan-themes, caps, components, utilities`.
Nova follows preflight, other retained skins follow Nova, and Capsule follows the
skins. Tailwind utilities are deliberately **unlayered** so they can override
unlayered Angular host styles, including `ng-icon` visibility. `body.style-nova`
is present in both apps; the existing Nova scope prevents leakage into other skins.
Helm's aliases are resolved again at `.dark` boundaries. Brain is unchanged.

Inter and Geist Mono Latin font files, including the used weights, load from one
Fontsource import file. Angular's Storybook PostCSS pipeline sets
`transformAssetUrls: false`: Angular resolves imported font URLs itself; having
Tailwind rebase them first produces invalid, doubly rebased paths. Vite retains
its default handling. Loading the shared font stylesheet as a separate bundler
entry preserves asset provenance in both pipelines; nesting it inside the
Tailwind foundation import loses Vite font URLs. No remote font service is required.

## Structural and contextual exceptions

Do not turn every number in an example into a global token:

- `0`, `100%`, `auto`, `none`, `1fr`, grid spans, aspect ratios, percentage
  positioning, rotations and visibility endpoints encode structure or state.
- A calendar's seven columns, border compensation in `calc()`, icon alignment
  offsets and clipping/scroll geometry are formulas owned by that component.
- Example viewport widths/heights, chart data coordinates, map/illustration
  geometry, demo avatars and arbitrary user-content colors belong to the
  demonstrated content. They do not define library-wide defaults.
- Theme-editor examples intentionally demonstrate user overrides. They are
  documentation strings, not competing application stylesheets.
- Brain/CDK behavior and overlay stacking, and the internals of unmigrated Helm
  components, remain upstream-owned. Compatibility goes through their public
  aliases; this issue does not fork their implementation.

New reusable visual values belong in the shared source. Compose scale utilities
for ordinary sizes; introduce a semantic/component alias when its independent
customization has a concrete purpose.

## Stories and checks

Migrated APIs: Button, Breadcrumb (including its auxiliary Link), Input, Textarea,
Label, Field. All stories using these as auxiliaries also import Capsule.
Button exposes its eight current sizes. Input/Textarea controls use
`forceInvalid`; the Label controls only expose its supported ID. Breadcrumb's
router example uses `capsLink`; separators are owned by BreadcrumbItem. Field
uses dedicated elements and a semantic FieldLegend for its section heading.
Components without Capsule APIs, including ButtonGroup/InputGroup, remain Helm.

`nx test styles` compiles the public CSS contract and checks font faces, aliases,
common imports and absence of competing app definitions. Existing component and
Cypress suites cover interactions and accessibility, with selectors adapted to
Capsule's public rendered structure. Build both applications after token changes:
`pnpm run build` and `pnpm nx build-storybook ui-storybook`.

## Validation for issue #27 (2026-10-02)

- Full unit suite: 832 tests across six projects; the 30 style contracts were
  rerun after the final CSS corrections.
- Existing Cypress suites: 136 Storybook checks (migrated components and form
  auxiliaries), plus all 37 catalogue checks, including their axe audits.
- TypeScript check for Storybook, repository lint, package/catalogue builds and
  Storybook production build passed. Catalogue uses the repository build's
  6000 MB Node heap setting.
- Chromium loaded Inter 500 and Geist Mono 400 in both production builds with
  no missing font requests. The default button matched in both light/dark modes:
  14 px / 500 / 20 px typography, 32 px height, 10 px inline padding and radius,
  6 px gap, 1 px border, semantic colors, opacity, shadow and 150 ms easing.
- Separate standards/spec reviews: no outstanding findings. The installation
  page now explicitly lists the private Capsule/Helm archives and font peers.
