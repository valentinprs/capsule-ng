# Command and Kbd — issue 45

## API decision before implementation

The source reference is [Spartan's component inventory](https://www.spartan.ng/components),
[Command](https://www.spartan.ng/components/command) and [Kbd](https://www.spartan.ng/components/kbd),
read on 2026-10-07. The public Brain/Helm contracts resolved by this workspace's TypeScript aliases
are authoritative for the installed project. `libs/brain/package.json` declares version 1.5.0;
this is workspace source, not evidence that a separate npm Brain package is installed. The source
resolution and prop-to-source matrix are retained in the ignored validation work directory.

The original anatomy was documented before implementation. The 2026-10-07 source review keeps
Spartan's search/filter/disabled, item activation, optional IDs, compact input and class-value
capabilities. Capsule only owns structural markup and names, integrates the existing CapsDialog
boolean state and ensures accessible names on the real controls. No independent filtering,
key-registration service or extra functional props are introduced.

`caps-command` owns search/filter/disabled and active-value events; `search` remains two-way and the
existing forms value accessor represents search. `filter` defaults to case-insensitive value matching.
An application that prefilters data supplies `filter` returning true; there is no second custom filter.
`valueChange` identifies the highlighted item, while native `button[capsCommandItem]` emits `selected`
only upon activation. Consumers close dialogs or popovers in selected handlers.

Anatomy: `caps-command-input` owns a native input and decorative search icon for the compact default;
its inputId, placeholder and aria-label apply to that input. `input[capsCommandInput]` is available for
custom compositions. The owned input is a deliberate composite-native exception to ADR 0001, as for
Field and form choices; it has the only combobox role, label and focus. `caps-command-list` is the
listbox; `caps-command-group label="…"` owns its noninteractive heading and group name. Optional
`caps-command-group-label` remains for rich projected headings. `caps-command-empty` owns visibility
and a polite status; `caps-command-separator` is decorative; `caps-command-shortcut` displays a hint.
No interactive control may be nested in an item. Search stays focused during active-descendant
navigation; disabled/hidden items are skipped; Enter on a native item activates it exactly once.

`caps-command-dialog [(open)]` composes CapsDialog and its lazy panel, title and description. Title,
description, showCloseButton and dialogContentClass (`ClassValue`, including arrays and objects) remain supported, with boolean open replacing
Brain state strings. Dialog handles Escape, trapping, restoration and outside pointer dismissal.
No shortcut listener is installed by the library; demo Cmd/Ctrl K handlers remain application-owned.

`kbd[capsKbd]` preserves native key semantics. `caps-kbd-group` groups projected keys without adding
focus, controls or shortcut handling. Group labels remain application-owned and optional; the group role permits an accessible group name.

## Complete consumer inventory

Command: six catalogue previews (default/basic/groups/shortcuts/scrollable/RTL), page and snippets;
five stories (default/dialog/dynamic/reactive/bound); shared header docs dialog; home overview Notion
mention picker, playground model and preset selectors, tasks status/priority filters.
Kbd: five catalogue previews (default/group/button/input-group/RTL), page and snippets; Kbd stories;
InputGroup Kbd example and Empty InputGroup consumer; docs dialog trigger and footer.
Available Capsule Button/Card/Dialog/InputGroup/Input/Popover/Menu auxiliaries are reused. Empty,
Typography and unrelated primitives keep their existing owners. Consumer command click handlers
become selected handlers so mouse and keyboard use the same application action. Model and preset
values use their displayed names instead of UUIDs so their existing search inputs find the visible labels.

Styles use the shared foundation variables in the existing Capsule preset. Logical spacing and
bounded dialogs preserve narrow-screen and RTL layouts. No new theme or typography is introduced.

## Validation

Targeted Node 22.15.0 contracts, types, package declarations, metadata, lint and formatting;
real-browser catalogue/Storybook keyboard/focus/activation/disabled/empty tests plus axe and
light/dark desktop/mobile/RTL inspection. Production SSR/full union pipeline belongs to the central
collector. Final executed checks and limitations are recorded in the delivery ledger.

Key hints use the existing foreground token on muted surfaces to meet the text contrast requirement; tooltip contexts retain their inverse treatment.
