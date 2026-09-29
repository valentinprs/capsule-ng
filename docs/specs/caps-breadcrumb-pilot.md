# Spec: `caps` breadcrumb pilot

Implements [ADR 0001](../adr/0001-caps-element-vs-attribute.md). The breadcrumb is the pilot
component used to validate the `caps` conventions before scaling to the rest of the library.

## Phase 0 — Remove copy-based distribution (separate PR)

Remove the CLI/registry distribution model before starting `caps`:

- Delete `libs/registry`, `libs/cli` and `libs/mcp`.
- Delete the `hlm-to-cli-generator` generator (`libs/tools/src/generators/hlm-to-cli-generator`,
  its entry in `libs/tools/generators.json`) and the scripts that call it (e.g.
  `prepare-manual-release` in `package.json`).
- Remove the showcase site's dependencies on these libraries, including the CLI install tabs on
  component pages.
- The style presets (`style-*.css`, defining the `spartan-*` classes used by helm) have been
  relocated from `libs/registry/src/styles/` to the standalone `libs/styles` library
  (`@spartan-ng/styles`), so they survive the deletion of `libs/registry`.

## Phase 1 — Pilot: breadcrumb, minimal `capsButton`, `capsLink`

### Scope

- `@capsule-ng/caps/breadcrumb`: `CapsBreadcrumb`, `CapsBreadcrumbItem`, `CapsBreadcrumbEllipsis`,
  exported together as `CapsBreadcrumbImports`.
- `@capsule-ng/caps/link`: `capsLink` directive (styling-only, see ADR).
- `@capsule-ng/caps/button`: minimal `capsButton` directive — enough variants/sizes for the
  breadcrumb dropdown example (`variant="ghost"`, `size="icon"`).
- Caps CSS preset with `caps-*` hook classes for these components.

### API

```html
<caps-breadcrumb>
	<caps-breadcrumb-item>
		<a capsLink routerLink="/">Home</a>
	</caps-breadcrumb-item>
	<caps-breadcrumb-item>
		<a capsLink routerLink="/components">Components</a>
	</caps-breadcrumb-item>
	<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
</caps-breadcrumb>
```

#### `<caps-breadcrumb>`

- Host: `role="navigation"`, `aria-label` input (default `'breadcrumb'`).
- Renders an internal element with `role="list"` that projects the items.
- Inserts a separator automatically between consecutive items (never before the first or after the
  last). Separators are decorative (`role="presentation"`, `aria-hidden="true"`).
- Separator is customizable through an `ng-template` and/or an input; the default is a chevron icon.
- RTL: the default separator is flipped in RTL contexts, matching the current RTL example
  (`breadcrumb--rtl.example.ts`).
- Supports the `class` input merged via `classes()`.

#### `<caps-breadcrumb-item>`

- Host: `role="listitem"`.
- The last item is automatically the current page. A `current` input overrides this behavior.
- When current, `aria-current="page"` is set on the item's `capsLink` if one is present, otherwise
  on the item host. There is no dedicated `breadcrumb-page` element.
- Provides a DI context consumed by `capsLink` to apply the breadcrumb link variant and
  `aria-current`.

#### `<caps-breadcrumb-ellipsis>`

- Manual only: consumers place it where items are collapsed. No automatic collapsing for now.
- Renders the ellipsis icon plus visually hidden text (e.g. "More").
- Dropdown usage — the ellipsis is placed inside a native button that triggers the existing
  dropdown menu:

```html
<caps-breadcrumb-item>
	<button capsButton variant="ghost" size="icon" [hlmDropdownMenuTrigger]="menu">
		<caps-breadcrumb-ellipsis />
	</button>
</caps-breadcrumb-item>
```

### Showcase site

On the breadcrumb page, `apps/app/src/app/pages/(components)/components/(breadcrumb)/`:

- Fully replace the helm examples with `caps` examples: `breadcrumb.preview.ts`,
  `breadcrumb--custom-separator.example.ts`, `breadcrumb--dropdown.example.ts`,
  `breadcrumb--collapsed.example.ts`, `breadcrumb--rtl.example.ts`.
- Remove the CLI install tab from `breadcrumb.page.ts`.
- Adapt the API docs generator (`@spartan-ng/tools:generate-ui-docs`,
  `libs/tools/src/executors/docs/generate-ui-docs`) so it reads `libs/caps` (today it reads
  `brainDir`/`helmDir` configured in `apps/app/project.json`), and update the ui-docs snapshot
  (`pnpm run update-ui-docs-snapshot`).
- Spartan branding changes are out of scope.

### Validation

- Vitest unit tests for each component covering the public API (inputs, automatic separators,
  automatic/overridden current item, `aria-current` placement) and ARIA roles
  (`navigation`, `list`, `listitem`, decorative separators).
- Axe accessibility check on the breadcrumb documentation page: `apps/app-e2e` (Cypress +
  `cypress-axe`), run with `pnpm nx e2e app-e2e` locally and in the CI `e2e` job (see
  `CONTRIBUTING.md`).
- Storybook stories are optional.

## Phase 2 and beyond

- Implement the full `capsButton`, then `dialog` and `select` to stress-test the conventions
  (overlays, forms, brain integration).
- Then scale to all remaining components and remove `libs/helm`.
- Table is explicitly deferred (element vs. native table structure undecided).
- npm packaging is deferred.
