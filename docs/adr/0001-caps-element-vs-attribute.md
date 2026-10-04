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

## Amendment 1: composite components may own their native link (2026-09-29)

Consumers found `<caps-breadcrumb-item><a capsLink href="/">Home</a></caps-breadcrumb-item>` more
verbose than needed for the common case. Following Carbon's breadcrumb (`cds-breadcrumb-item` /
React `BreadcrumbItem`), `<caps-breadcrumb-item>` now takes an `href` and renders the link itself:

```html
<caps-breadcrumb>
	<caps-breadcrumb-item href="/">Home</caps-breadcrumb-item>
	<caps-breadcrumb-item>
		<a capsLink routerLink="/components">Components</a>
	</caps-breadcrumb-item>
	<caps-breadcrumb-item>Breadcrumb</caps-breadcrumb-item>
</caps-breadcrumb>
```

- **Composite components may take an `href` input** and render the native `<a href>` themselves,
  wrapping the projected content. The interactive element is still a native `<a>` (focus, keyboard
  activation, middle-click, open in new tab all keep working); it is simply owned by the
  component's template instead of the consumer's. Without `href`, the content is rendered as is.
- **caps stays router-free.** Components do not take `routerLink` inputs and caps does not depend
  on `@angular/router`. For client-side routing, the consumer projects their own link element, as
  in Carbon (React: `<BreadcrumbItem><Link to="/">…</Link></BreadcrumbItem>`). In caps that element
  is `<a capsLink routerLink>`, which the composite component styles and marks through the
  `CAPS_LINK_CONTEXT` DI context.
- **`capsLink` stays** the styling-only directive for standalone links and for router links inside
  composite components.

## Amendment 2: dedicated Field components and native internals (2026-10-02)

Field uses dedicated `<caps-field>`, `<caps-field-group>`, `<caps-field-content>`,
`<caps-field-description>`, `<caps-field-error>`, `<caps-field-separator>`,
`<caps-field-label>`, `<caps-field-set>` and `<caps-field-legend>` components.
This supersedes the initial FieldSet/Legend directive composition at the user's request.
The standalone Input, Textarea and Label directives remain native-element APIs.

FieldLabel renders a native label. FieldSet renders a native fieldset and renders its directly
projected FieldLegend's content in the first native legend child. The hidden legend component host
holds a template rather than wrapping the native legend; this preserves native naming and disabled
semantics. IDs and class strings on Label/Set/Legend are forwarded to their native elements.

`caps-field` composes Brain and declares `role="group"`, named by a projected FieldLabel.
Layout and help-text hosts keep generic container semantics. Separator lines are decorative;
projected text stays readable. FieldGroup can wrap sections or sit inside a FieldSet to space fields.

Field, FieldContent, FieldLabel and FieldSet forward the ancestor Angular ControlContainer.
Messages use the existing Brain matcher and public form events; Brain remains unchanged.
Descriptions/errors register with the closest Brain accessibility context. FieldSet has its own
context and nested Fields isolate their descriptions.

## Catalogue migration preference (2026-10-02)

Component examples should use the Capsule API whenever that component already offers one.
This includes supporting buttons and links inside another component's examples, not only the
component being documented. Preserve the intended behavior and visual variants during migration;
Helm remains for primitives without a corresponding Capsule API.

## Amendment 3: composite form choices own their native control (2026-10-03)

For issue #31, Checkbox, Switch and Radio use dedicated `<caps-checkbox>`, `<caps-switch>` and
`<caps-radio>` components. Each owns its Brain control and visual indicator. Checkbox and Switch
retain Brain's native button with `role="checkbox"` or `role="switch"`; Radio retains Brain's native
radio input. This is a deliberate exception to the consumer-owned native-element rule, analogous
to Field's native internals: it hides indicator/thumb anatomy while keeping focus and activation on
one native control. Generic Capsule hosts are not additional interactive ARIA nodes and do not use
`display: contents`.

`<caps-radio-group>` composes Brain's radiogroup and Angular value accessor. Radio labels are
projected content; consumers do not construct indicators. Checkbox/Switch use `checked` and
`checkedChange` outside forms, RadioGroup uses `value` and `valueChange`. Angular forms own value
and disabled state when connected. Checkbox additionally exposes two-way `indeterminate`.

A control's `id` belongs to its internal interactive element; labels and descriptions target that
element. A Field around RadioGroup names the radiogroup with `aria-labelledby`, while individual
radios retain their own labels. Field validation and explicit description IDs are composed in the
Capsule layer. `forceInvalid` affects appearance only. Brain remains unchanged; Capsule forwards
required/invalid state where Brain's composite internals do not expose it on the interactive node.

Styles live in the existing Capsule preset and use shared foundation tokens, including focus,
disabled opacity, light/dark colors and switch dimensions. No separate theme source is introduced.
