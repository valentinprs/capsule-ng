# Capsule selection — issue #32

## Design recorded before implementation

`caps-select` owns its native button, selected value, chevron, floating listbox and scrolling.
Consumers project `caps-select-option value` and optional `caps-select-group label`.
`caps-select-multiple` is a separate component because Brain has separate single and array CVAs;
this preserves the value types and avoids switching form accessors at runtime.
Both provide placeholder, disabled, value/valueChange, itemToString, isItemEqualToValue,
id, size, forceInvalid, accessible name and description inputs. Optional
`ng-template capsSelectValue let-value` replaces only the displayed selection, never the button.
Single values and arrays retain Brain's semantics. Options own their decorative selected indicator.
Option text supplies display/typeahead labels unless itemToString is supplied. Groups own their labels.
Field registers the root control and its internal native button; descriptions reach that button.

`select[capsNativeSelect]` preserves select/option/optgroup and Angular's native value accessors,
including ngValue, compareWith and multiple. A disabled empty option is the native placeholder pattern.
The browser owns the popup, arrows, keyboard and focus; no replacement popup or custom CVA.
The visual size input is `controlSize`, leaving the native numeric size attribute available.

No Brain edits and no dependency on issue #33. Capsule choice APIs now available on main are reused;
Helm remains only for unrelated components without a released Capsule API.

## Complete initial example inventory

- `apps/ui-storybook/stories/select.stories.ts`
- `apps/ui-storybook/stories/card.stories.ts`
- `apps/ui-storybook/stories/hlm-native-select.stories.ts`
- `apps/ui-storybook/stories/field.stories.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--select.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--complex.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--select.demo.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/field-demo.ts`
- `apps/app/src/app/pages/(home)/components/tasks/tasks.ts`
- `apps/app/src/app/pages/(blocks)/blocks/calendar/calendar-month-year-dropdown/calendar-month-year-dropdown.component.ts`
- `apps/app/src/app/pages/(blocks)/blocks/calendar/calendar-localized/calendar-localized.component.ts`
- `apps/app/src/app/pages/(colors)/color-palette.ts`
- `apps/app/src/app/shared/code/code-rtl-preview.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/reviewer-cell.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/table-section.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/styles--complex-showcase.example.ts`
- `apps/app/src/app/pages/(components)/components/(field)/field--native-select.preview.ts`
- `apps/app/src/app/pages/(components)/components/(field)/field--rtl.preview.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-rtl.page.ts`
- `apps/app/src/app/pages/(components)/components/(field)/field--select.preview.ts`
- `apps/app/src/app/pages/(components)/components/(field)/field.preview.ts`
- `apps/app/src/app/pages/(components)/components/(data-table)/data-table.snippets.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--disabled.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--object.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--scrollable.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group--select.example.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--form.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--invalid.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select.page.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--multiple.preview.ts`
- `apps/app/src/app/pages/(components)/components/(select)/select--placeholder.preview.ts`
- `apps/app/src/app/pages/(components)/components/(native-select)/native-select.preview.ts`
- `apps/app/src/app/pages/(components)/components/(native-select)/native-select--form.example.ts`
- `apps/app/src/app/pages/(components)/components/(native-select)/native-select--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(native-select)/native-select--disabled.example.ts`
- `apps/app/src/app/pages/(components)/components/(native-select)/native-select--invalid.example.ts`
- `apps/app/src/app/pages/(components)/components/(native-select)/native-select--groups.example.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar--year-and-month-dropdowns.example.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--animation.preview.ts`
- `apps/app/src/app/pages/(components)/components/(questionnaire)/questionnaire--shortcuts.preview.ts`

## Verification and exceptions

The inventory above was audited across executed templates, displayed strings and generated snippets.
The Native Select page itself was additionally updated to show Capsule API tables. Both catalogue
pages now document only the public Capsule API. Internal bases remain absent from tables while their
inherited inputs are included; the extractor respects `@internal` (also hiding existing internal
Helm dropdown-menu adapters).

- Select owns trigger, value, placeholder, portal, listbox and indicators. All nominal, grouped,
  multiple, rich/object, disabled, forced-invalid, form, scroll and RTL examples use that composition.
- Native Select examples use real select/option/optgroup. Existing object values, native multiple,
  compareWith and size remain native Angular/browser features. Native signal-form empty state is
  a string rather than the old wrapper's nullable string, matching Angular's native select contract.
- Unnamed single-child option groups and old content wrappers were removed. Rich value templates use
  phrasing content suitable for a button; rich option containers use flow content. All interactive
  options remain a single selection primitive, with decorative checks only.
- Field associations are inferred. Deliberate standalone native-label stories and pagination controls
  retain explicit for/id pairs. Radio-card associations from main are retained, including external
  card labels and projected radio labels in their appropriate cases.
- The home Field demo and complex form preserve main's choice composition and remove remaining
  Field wrappers used only to arrange action buttons. Supporting Capsule Button/Input/Textarea/Label/
  Field/Checkbox/Radio/Switch APIs are reused where available. Card, calendar internals and other
  unrelated primitives remain Helm; no new component migration is introduced.
- The optional Helm hover-scroll arrows are intentionally replaced by browser scrolling (wheel/touch)
  and Brain's automatic active-option scrolling. Scrollability is exercised in the existing story test.
- Consumer class sizes apply to the root; exceptional button appearance uses triggerClass. panelClass
  is reserved for scroll height/width exceptions. Error appearance follows the shared matcher rather
  than pristine aria-invalid; forced appearance does not falsely mark semantic invalidity.

## Validation record

Local pnpm 10.30.3 with Node 24.18.0 (repository CI pins Node 22.15.0).

- Angular compiler checks pass for the catalogue and Storybook after integrating main 65193a0c0.
- Full repository test suite passes; after the main merge, all 125 Capsule tests pass, including
  selection contracts for CVA, Field labels/descriptions/errors, disabled controls/options,
  dynamic projected labels, keyboard/typeahead/focus/reopening, scalar/array values, custom value
  templates, blur/updateOn and pristine/touched/forced errors. Native object/multiple accessors tested.
- Real server render of preselected value `fr` with projected `France` produces `France` before
  hydration without an explicit label or itemToString. Catalogue hydration has no client exceptions;
  grouped options survive opening, selection, closing and reopening.
- Catalogue Cypress checks cover every Select and Native Select example with axe (including contrast),
  light/dark themes and 1280/390px widths, plus native/custom interaction and error appearance.
- Existing Select Storybook Cypress contracts (16 tests) pass after migration; the Field selection
  test now activates the inferred native label. Representative screenshot review confirms the shared
  catalogue layout, dropdown bounds, native controls, typography and themes on mobile/desktop.
- Production catalogue/package builds, Storybook build, repository lint and format checks are run
  before publication. API metadata/snapshot and all primitive snippets are regenerated.
- Brain is unchanged relative to the integrated main branch. No npm publication or merge is performed.
