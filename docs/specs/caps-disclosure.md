# Capsule disclosure composition — issue #40

Base: `develop` at `6af822fb46b5698f7a73bce90af875b58183533d`. Brain is unchanged.

## Verified Carbon Angular API

The supplied [Accordion Storybook documentation](https://angular.carbondesignsystem.com/?path=/docs/components-accordion--docs)
was checked against the published Angular sources:
[Accordion](https://angular.carbondesignsystem.com/documentation/components/Accordion.html) and
[AccordionItem](https://angular.carbondesignsystem.com/documentation/components/AccordionItem.html).
These are Angular references, not Carbon React or Web Components.

`caps-accordion` adapts `cds-accordion`: `align: 'start' | 'end' = 'end'`,
`size: 'sm' | 'md' | 'lg' = 'md'`, `isFlush = false`, `disabled = false`, `skeleton = false`.
`isFlush` is ignored with start alignment. The root is a list, with structural `caps-accordion-item`
list items. Each item owns its native heading/button, chevron and measured content region.

`caps-accordion-item` adapts `cds-accordion-item`: `title: string | TemplateRef<unknown>`,
`context: Record<string, unknown> | null`, `id: string`, `expanded = false`, `disabled = false`,
`skeleton = false`, and `selected: { id: string; expanded: boolean }`.
The ID targets the owned panel. Title templates contain non-interactive phrasing content; body
content is projected outside the button. The fixed native h3 preserves Brain's heading contract.
Skeleton supplies a loading name and decorative placeholders, suppressing projected controls.
An individually disabled item can remain externally expanded; root disabled closes all items and
cascades disabled without overwriting individual bindings.

Items expand independently, matching Carbon Angular. Existing single-panel examples coordinate
item `expanded` inputs and `selected` events in the consumer. No root `value`, `type`,
`orientation`, separate public trigger/content/heading or heading-level input is introduced.
External `expanded` input changes do not emit `selected`; activation does.

No standalone Carbon Angular Collapsible equivalent was identified in these published references.
Its existing capabilities are therefore retained: `caps-collapsible` exposes `expanded` /
`expandedChange`, `disabled`, the `capsCollapsible` template context (`expanded`, `disabled`,
`state`, `toggle()`); a consumer-owned native `button capsCollapsibleTrigger` supplies activation;
`caps-collapsible-content` supplies content, optional ID, inert state and dimensions. The trigger
retains Brain's `type` input, defaulting to button inside forms. No additional `open` alias is added.

Both families expose standalone classes and `CapsAccordionImports` / `CapsCollapsibleImports`
from their secondary entry points. They use the existing Capsule CSS foundations and class merger.
They add no value accessor; projected native or Capsule form controls retain their own form state.

## Brain composition and ARIA

Accordion's private root adapter fixes Brain to multiple mode without exposing Brain-only inputs.
Items use the existing public Brain item/trigger/content behavior. The public `expanded` input also
uses Brain's public open/close-ID operations, because Brain's item input intentionally refuses an
open when disabled, while Carbon allows an externally expanded disabled item.

Private trigger/content adapters override the ID host bindings themselves. Native template
bindings alone are overwritten by Brain on initialization. The rendered `aria-controls` always
uses the public panel ID; the region's `aria-labelledby` targets Brain's unique native trigger ID.
Angular packaging requires the root host directive to be reachable from the secondary entry
point. It is exported only as `ɵCapsAccordionBehavior` and retains `@internal`; it is excluded from
`CapsAccordionImports` and generated user API docs. The trigger/content adapters are internal
template imports, not host directives, and remain unexported. This packaging export adds no
supported component or input to the Carbon Angular API.
Collapsible references only Brain host directives that already have public Brain entry-point exports.
No Brain source, focus algorithm or keyboard handler is patched.

Brain retains ArrowUp/Down, Home/End and editable-target guards. Its keydown handling and native
button activation are verified with Playwright-backed keyboard commands and Chrome real events:
Enter/Space toggle once. Closed panels remain inert and disappear from the normal Tab sequence.
Logical spacing preserves RTL chevron placement. Shared reduced-motion CSS disables disclosure
transitions, including consumer-supplied Collapsible animations.

## Complete consumer audit

| Surface               | Reviewed and migrated                                                                                                                                                                                                            | Retained composition                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accordion catalogue   | Main preview, multiple, disabled, borders, card, dynamic content, RTL; page usage/API prose and displayed snippets                                                                                                               | Main, disabled, borders, card and RTL retain consumer-coordinated single expansion. Multiple retains independent initial expansion. Card remains a real Capsule card.                           |
| Collapsible catalogue | Main preview, animated, settings panel, dynamic members, recursive file tree, RTL; page usage/API prose and displayed snippets                                                                                                   | Native buttons remain native; settings grid and projected fields retain their naming. Dynamic measurement and nested sections remain. Preview widths have a bounded responsive host.            |
| Introduction          | All seven FAQ items and auxiliary action links                                                                                                                                                                                   | Single FAQ coordination; native router links styled with capsButton. General introductory prose is outside this family migration.                                                               |
| Sidebar consumers     | `nav-main.ts`; `sidebar-collapsable`, `sidebar-menu-sub-collapsable`, `sidebar-collapsable-icons`, `sidebar-rtl`; the two corresponding displayed examples and Sidebar page names                                                | Native li elements directly contain Capsule structure. The icon-only nav-main disclosure button receives a contextual accessible name. Helm Sidebar/Menu primitives remain until their own lot. |
| Storybook Accordion   | Default single composition, Multiple, WithFormInputs, WithTapable, TwoAccordions, SetOpenState, AccordionWithInput, TestAriaValidWithIcon, ButtonStateSync; title-template/context, disabled/skeleton and compact/flush coverage | Native labels, textarea, select, input and auxiliary buttons use their available Capsule APIs. ARIA editing fixtures are named.                                                                 |
| Storybook Collapsible | Default controls and a controlled expansion story                                                                                                                                                                                | Story args are passed as props, so disabled controls work. Native trigger/default type and external state synchronization are demonstrated.                                                     |
| Tests/docs data       | Existing Accordion Cypress assertions, new Collapsible Cypress behavior checks, component browser specs, generated snippets and API snapshot                                                                                     | Existing behavioral assertions are retained through public data-slot hooks. Generated JSON is ignored/build-generated as before.                                                                |

`bubble--collapsible.preview.ts` uses Bubble's own expansion API, not a Collapsible primitive,
and requires no family migration. File tree retains Helm Tabs because Capsule Tabs is not present
at this base. No global Helm removal or migration of those families is included.

## Validation

Targeted `ngc` checks cover Capsule and the catalogue; `tsc` covers Storybook and these specs.
ESLint runs on changed TypeScript with an actual project graph; Prettier runs only on changed files.
The docs/snippet generators are rerun; the existing API snapshot includes only the public components.

The Chromium component suite covers native activation/focus, controlled/uncontrolled state,
independent roots and IDs, contextual title projection, external expanded/disabled state,
root disabled/skeleton changes, inert Tab order, form editing guards and dynamic measurements.
The Chromium suite passes 10 checks; Chrome Cypress passes 25 public-story checks (22 Accordion, 3 Collapsible), and the documentation executor passes its 5 checks and public API snapshot.

Catalogue checks exercise the real main, multiple, disabled, dynamic, card/settings and nested
file-tree consumers, the introduction and all four Sidebar pages. Static SSR HTML is checked with
JavaScript disabled; hydrated pages then exercise their native controls. RTL and reduced motion
are checked in the browser. Screenshots/geometry cover light/dark at 1440 and 390 pixels.
Local evidence is in `.local/lot11/` in the isolated checkout.

The local runtime is Node 24.18.0; CI uses Node 22. Full repository builds/E2E and production SSR
validation belong to the final integrated branch. The development catalogue was capped at 6 GB;
after multiple HMR updates and preloaded routes it exhausted that heap. Earlier completed SSR and consumer checks remain recorded. The final hydrated consumer and visual
pass succeeds with a fresh process at the same cap: Collapsible measures 350 px on desktop and
308 px in the mobile preview; Accordion has no horizontal overflow. Sixteen additional Storybook
captures cover title/context, start alignment, compact/flush, skeleton and independent groups.
No memory increase, distant push, package publication or global pipeline is part of this lot.
