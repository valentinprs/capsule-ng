# Capsule Combobox

Use `CapsComboboxImports` from `@capsule-ng/caps/combobox`. Capsule owns the floating portal,
listbox, native input/trigger and decorative option indicators. Consumers project Content,
Options, Empty, Status, Groups and Labels; there is no public portal/list directive.

See [the search and selection specification](../../../docs/specs/caps-search-choices.md) for the
complete anatomy, Spartan public contracts, CVA/Field integration and inventory.

`CapsCombobox` selects T and filters through Brain. `CapsComboboxMultiple` selects T[]. itemToString resolves selected labels independently of current options; asynchronous sources may opt out of local filtering with filter = () => true.

All clear/menu/remove actions have native buttons and accessible names. Native IDs and Field
labels/descriptions/errors target the interactive control. A popup trigger remains the Field label
target while its search input lives in a dialog. Native chip input receives listbox/active-descendant
associations. Shared tokens and root direction survive portaling. Brain and Helm remain unchanged.
