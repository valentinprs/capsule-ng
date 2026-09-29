# ADR 0001: Element-based `caps` components instead of helm attribute directives

- **Status:** Accepted
- **Date:** 2026-09-29

## Context

This repository is a fork of [spartan-ng/spartan](https://github.com/spartan-ng/spartan). Spartan's
styled layer, `libs/helm`, exposes components as attribute directives applied to native elements.
For example, the breadcrumb anatomy (`libs/helm/breadcrumb/src/lib/`) is:

```html
<nav hlmBreadcrumb>
	<ol hlmBreadcrumbList>
		<li hlmBreadcrumbItem><a hlmBreadcrumbLink link="/">Home</a></li>
		<li hlmBreadcrumbSeparator></li>
		<li hlmBreadcrumbItem><span hlmBreadcrumbPage>Breadcrumb</span></li>
	</ol>
</nav>
```

This anatomy is verbose, leaks structural details (separators, list, page) to every consumer, and
is distributed by copying source through a CLI/registry. We want a component library whose
public API is a set of custom elements, e.g. `<caps-breadcrumb>`, consumed as a regular npm
dependency, and we want the showcase site (`apps/app`) to demonstrate that API.

## Decision

### New library

- Create a new library, `libs/caps`, built from Angular standalone components.
- Provisional TypeScript path alias: `@capsule-ng/caps/<component>` (one secondary entry point per
  component, mirroring helm's layout).
- Class names use the `Caps` prefix, e.g. `CapsBreadcrumb`, `CapsBreadcrumbItem`, and an imports
  array per component, e.g. `CapsBreadcrumbImports`.

### Elements vs. attribute directives

- **Non-interactive structure uses `<caps-*>` custom elements.** Because host elements are not
  native list/landmark elements, they carry the ARIA roles themselves. For example,
  `<caps-breadcrumb>` has `role="navigation"` and renders an internal element with `role="list"`;
  each `<caps-breadcrumb-item>` has `role="listitem"`. We do not render a native `<ol>` because it
  only accepts `<li>` children, which would forbid `<caps-breadcrumb-item>` as a direct child.
- **Native interactive elements keep their native element** (`a`, `button`, `input`, …) and receive
  camelCase attribute directives: `<button capsButton>`, `<a capsLink>`. This preserves native
  behavior — focus management, keyboard activation, middle-click / open in new tab, `href` and
  `routerLink` — without reimplementing it.
- **`capsLink` is styling-only.** It does not depend on `@angular/router`; consumers add `routerLink`
  or `href` themselves. It optionally injects a parent context through DI (for example one provided
  by `CapsBreadcrumbItem`) to select a contextual variant (styling, `aria-current`).

### Styling

- Keep helm's mechanism: a `class` input merged with the component's base classes using
  tailwind-merge through the `classes()` helper (`libs/helm/utils/src/lib/hlm.ts`).
- CSS hook classes are renamed from `spartan-*` to `caps-*` and defined in a caps-specific CSS
  preset.

### Repository layout

- `libs/brain` (unstyled primitives) stays in the repository and is kept in sync with upstream. It
  must not be modified locally; `caps` builds on it.
- `libs/helm` remains an internal dependency of the showcase site during the migration and is
  removed once every component has a `caps` equivalent.
- The copy-based distribution tooling — `libs/registry`, `libs/cli`, `libs/mcp` and the
  `hlm-to-cli` generator — is removed in a separate, preliminary step. `caps` is distributed as an
  npm dependency only (packaging itself is deferred).

## Alternatives considered

- **Rename-only prefix (`hlm*` → `caps*` directives).** Cheapest, but keeps the verbose attribute
  anatomy that motivated the change.
- **Data-driven components (e.g. `<caps-breadcrumb [items]="…">`).** Rejected for now: no concrete
  use case, and it removes control over item content (icons, links, dropdowns).
- **`display: contents` hosts wrapping native elements.** Avoids ARIA roles on hosts, but has a
  history of accessibility-tree bugs across browsers and complicates styling.
- **Angular Elements / web components.** Adds a runtime and shadow-DOM styling constraints for no
  benefit in an Angular-only library.
- **Keeping the CLI copy model.** Conflicts with the goal of versioned, npm-consumable components
  and doubles maintenance (registry, CLI, MCP, generators).

## Consequences

- Consumers write shorter templates, and structural details (separators, current page) become
  component responsibilities.
- Every `caps-*` host must explicitly declare ARIA roles and be covered by tests asserting them.
- Two styled layers (`helm`, `caps`) coexist in the repository until the migration completes.
- Upstream helm changes no longer flow in automatically; only `brain` is synced.
