# Capsule Sheet

Import `CapsSheetImports` from `@capsule-ng/caps/sheet`. The structural `<caps-sheet>`
root exposes `[(open)]`, `closed`, `show(side?)` and `close(result?)`. Native buttons use
`capsSheetTrigger` (or `[capsSheetTriggerFor]`) and `capsSheetClose`.

`<ng-template capsSheetContent side="right">` owns the deferred panel.
Project `<caps-sheet-header>`, `<caps-sheet-title>`, `<caps-sheet-description>` and
`<caps-sheet-footer>` to name, describe and compose actions. All four physical sides work;
trigger `side` overrides the content placement. `[class]` styles the actual panel; for constant classes use `[class]="'my-class'"`.
Angular does not forward a static `class` attribute from an `ng-template` to its directive input.

`showCloseButton` and `closeLabel` configure the internal native close button. When hiding it,
include a focusable control or a content focus stop so Brain can cycle Tab within the modal.

Brain retains focus trapping, restoreFocus, autoFocus, Escape/outside dismissal, disableClose,
scroll locking and nested overlays. Roots forward `dir` and explicit ARIA names. `SheetRef`
is exported as `CapsSheetRef`; context injection uses `injectCapsSheetContext`.

See [design and example inventory](../../../docs/specs/caps-panels.md).

Properties are based on the official [Spartan Sheet documentation](https://www.spartan.ng/components/sheet)
and its public Brain API, with the established Capsule Dialog vocabulary.
