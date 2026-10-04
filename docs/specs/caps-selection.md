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

No Brain edits and no dependency on issues #31/#33. Existing Capsule auxiliaries are reused;
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

Pending implementation and final example audit.
