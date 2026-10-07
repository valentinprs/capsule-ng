# Capsule site navigation — issue #49

## Anatomy and API choice

`caps-navigation-menu` owns a native `ul` with `role=list`; each native `li[capsNavigationMenuItem]` is a list item.
Native `button[caps-navigation-menu-trigger]` owns one decorative chevron and defaults to type=button, avoiding an unintended form submission.
Native `a[capsNavigationMenuLink]` composes CapsLink and retains href, target, rel, download and consumer-owned
Angular Router directives. Capsule has no Router dependency. `ng-template[capsNavigationMenuContent]`
provides deferred content; Capsule owns the first overlay element, styles it and lets Brain associate it
with its trigger. Its named `role=group` contains ordinary links, controls or a nested navigation.
There are no menu/menuitem roles. No external list, viewport, portal or chevron is required.

```html
<caps-navigation-menu aria-label="Primary">
	<li capsNavigationMenuItem id="docs">
		<button caps-navigation-menu-trigger>Documentation</button>
		<ng-template capsNavigationMenuContent [class]="'w-64'">
			<a capsNavigationMenuLink href="/docs/start" active>Getting started</a>
			<a capsNavigationMenuLink href="/docs/components">Components</a>
		</ng-template>
	</li>
	<li capsNavigationMenuItem><a capsNavigationMenuLink href="/changelog">Changelog</a></li>
</caps-navigation-menu>
```

Import `CapsNavigationMenuImports` from `@capsule-ng/caps/navigation-menu`.
Use `[aria-label]` for a dynamic navigation label or `aria-label` for a static label; Brain's Main default is retained.
Root supports Brain's `value`/`valueChange` (item IDs), `openOn="hover|click"` (hover default),
`delayDuration` (200 ms), `skipDelayDuration` (300 ms), and `orientation="horizontal|vertical"`.
Items expose `id`; triggers expose `align="start|center|end"` and `disabled`. Destination links expose
`active` (boolean, default undefined) and `disabled`. `[class]` on the content template styles its owned panel; a static class attribute on a nonrendering ng-template does not style the panel; `navOffset` preserves the existing spacing multiplier (1.5 by default); classes on native
links/buttons and structural hosts remain overridable through the existing Capsule utilities.
With RouterLinkActive, bind its `isActive` result to `active`; Brain and CapsLink manage native aria-current consistently.

## Spartan contract and extension audit

See the [complete public API contract matrix](caps-navigation-menu-api-contract.md) for every input/output/model, exact source lines and the pending central review gate.

Verified on 2026-10-07 against the official
[Spartan Navigation Menu documentation](https://www.spartan.ng/components/navigation-menu)
and this repository's public Brain classes. The documented collection is site navigation composed
of native anchors, triggers, nested navigation and controlled panels.

| Surface | Public contract and source                                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Root    | BrnNavigationMenu: value/valueChange, openOn hover or click, delayDuration 200, skipDelayDuration 300, orientation horizontal or vertical |
| Item    | BrnNavigationMenuItem: id, used by the controlled value                                                                                   |
| Trigger | BrnNavigationMenuTrigger: align start, center or end; composed BrnButton: disabled                                                        |
| Link    | BrnNavigationMenuLink: active boolean or undefined, default undefined; composed BrnButton: disabled                                       |
| Content | Existing Helm navOffset number, default 1.5, retained by the owned panel                                                                  |

`active=true` marks a destination with `aria-current=page`; `active=false` suppresses that state even
when its navigation item is active. Omitting `active` preserves Brain's contextual fallback: a direct
item destination follows that item's active state, whereas a link inside panel content is not marked
current by the item's open state. Native `href`, `target`, `rel`, `download` and optional consumer
RouterLink remain native/consumer-owned. Explicit active state can therefore be controlled independently
of an open panel, while the omitted-input fallback remains exactly Spartan's contract.

Capsule adds no navigation-policy properties. `aria-label` transfers the native landmark name to the
owned root, retaining Brain's Main default and supporting dynamic names. Content template `[class]`
transfers bound styling to the owned panel. These transfers support Capsule's simplified anatomy;
`navOffset` preserves the existing Helm capability rather than creating a new spacing policy.
CapsLink's current context follows the public active input and BrnNavigationMenuItem state using only
public Brain classes, so its native ARIA binding agrees with Brain. Boolean disabled inputs retain
BrnButton behavior; nested propagation is covered by strong Chromium runtime assertions.

Brain's NavigationMenu and Focusable tokens are not publicly exported. Capsule therefore uses the
public Brain host directives without subclassing, importing private tokens, or altering Brain.
The content adapter owns a TemplateRef wrapper and transfers native lang/data-lang to its real overlay; server trigger ARIA describes the panel actually rendered without changing controlled value; Brain retains opening, overlay positioning,
hover coordination, keyboard, focus and lifecycle behavior.

## Example composition audit

| Surface              | Coverage and retained structure                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| Principal preview    | Deferred introduction/components/icon links and direct current page; RouterLink retained                   |
| Align                | Start/center/end panels; single-item list flattened to an ordinary container                               |
| Controlled           | Explicit item ID and two-way open value                                                                    |
| Nested               | Horizontal outer menu, vertical inner menu; keep inner width and multicolumn navigation lists              |
| Open on click        | Initial click and hover switching policy unchanged                                                         |
| RTL                  | Directionality directive retained for Brain keyboard and overlay positioning                               |
| Vertical             | Vertical root, aligned panels, direct links                                                                |
| Storybook            | Default hover and click stories share the same Capsule anatomy; wide-only demo triggers retained           |
| Page/server/snippets | Capsule usage strings and public API table; generated source extracts all seven examples                   |
| Existing Cypress     | All keyboard/focus/hover/association assertions retained; dedicated current/native/viewport coverage added |

All executed and displayed NavigationMenu APIs are Capsule. Icons remain NgIcon, typography helpers
remain Helm until they have a Capsule API. No supporting Helm interactive primitive exists in these
examples. Grid containers and lists with multiple destinations are retained for layout or semantics;
single-child lists are flattened. Desktop multi-column content can scroll within the bounded panel
on smaller viewports. Navigation links are never nested in buttons or links. There is no form value
accessor; disabled triggers are native buttons and default to type=button.

## Verification

See the lot delivery report for command results and browser evidence. Unit tests exercise public
anatomy, native destination attributes/current state, modified clicks, disabled siblings, two-way
controlled panels, label associations, Tab/Shift+Tab/Escape focus, hover/click, vertical and RTL entry.
Existing Storybook Cypress coverage is preserved. Brain and Helm source files remain unchanged.
SSR rendering retains deferred closed content; overlay focus/hover is activated by Brain only in the
browser. No new persistence, navigation side effect, npm publication or action-menu feature is added.
