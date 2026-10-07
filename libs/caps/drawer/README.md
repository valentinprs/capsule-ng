# Capsule Drawer

Import `CapsDrawerImports` from `@capsule-ng/caps/drawer`. The structural `<caps-drawer>`
root exposes `[(open)]`, `closed`, `show(side?)` and `close(result?)`. Native buttons use
`capsDrawerTrigger` (or `[capsDrawerTriggerFor]`) and `capsDrawerClose`.

`<ng-template capsDrawerContent side="bottom">` owns the deferred panel.
Project `<caps-drawer-header>`, `<caps-drawer-title>`, `<caps-drawer-description>` and
`<caps-drawer-footer>` to name, describe and compose actions. All four physical sides work;
trigger `side` overrides the content placement. Capsule `side` adapts Spartan `direction`,
using the same vocabulary as Sheet. `[class]` styles the actual panel; for constant classes use `[class]="'my-class'"`.
Angular does not forward a static `class` attribute from an `ng-template` to its directive input.

`closeThreshold` forwards Brain's swipe distance threshold (default 0.25). The handle is internal.

Brain retains focus trapping, restoreFocus, autoFocus, Escape/outside dismissal, disableClose,
scroll locking and nested overlays. Roots forward `dir` and explicit ARIA names. `DrawerRef`
is exported as `CapsDrawerRef`; context injection uses `injectCapsDrawerContext`.

See [design and example inventory](../../../docs/specs/caps-panels.md).

Properties are based on the official [Spartan Drawer documentation](https://spartan.ng/components/drawer)
and its public Brain API, with the established Capsule Dialog vocabulary.
