# Capsule Autocomplete

Use `CapsAutocompleteImports` from `@capsule-ng/caps/autocomplete`. Capsule owns the floating portal,
listbox, native input and decorative option indicators. Consumers project Content,
Options, Empty, Status, Groups and Labels; there is no public portal/list directive.

See [the search and selection specification](../../../docs/specs/caps-search-choices.md) for the
complete anatomy, Spartan public contracts, CVA/Field integration and inventory.

`CapsAutocomplete` selects T; search is distinct. `CapsAutocompleteSearch` commits arbitrary text as a string. Filtering is application-owned.

The clear action has a native button and an accessible name. Native input IDs and Field
labels/descriptions/errors target the editable control. Shared tokens and root direction survive
portaling. Brain and Helm remain unchanged.
