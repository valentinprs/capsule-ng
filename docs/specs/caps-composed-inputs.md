# Composed inputs

Issue #35 migrates Input Group and Input OTP to Capsule. Carbon Angular has no equivalent public component for either composition. Their existing necessary capabilities remain, without adding a new sizing, density or grouping API. Brain remains unchanged.

## Input Group

Import `CapsInputGroupImports` from `@capsule-ng/caps/input-group` and the native control imports you use. Project `input capsInput`, `textarea capsTextarea` and named native `button capsButton` actions into `caps-input-group`. `caps-input-group-addon` accepts the existing logical alignment values: `inline-start` (default), `inline-end`, `block-start`, `block-end`. `caps-input-group-text` displays prefixes, suffixes and status text.

The group has no value accessor. Forms, native attributes, labels, disabled state and validation belong to the input or textarea. Capsule Field supplies label and description associations. Actions stay outside labels. Logical spacing follows inherited HTML direction.

## Input OTP

Import `CapsInputOtpImports` from `@capsule-ng/caps/input-otp`. `caps-input-otp` wraps one native input; project `caps-input-otp-group`, `caps-input-otp-slot` with an `index`, and decorative `caps-input-otp-separator` elements to choose the layout. Slots are hidden from accessibility APIs; give the actual input a Field label or standard `aria-label` / `aria-labelledby`.

| Input                                  | Default / contract                                                                 |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `length`                               | Required number; bounds paste and Brain's input replacement behavior               |
| `inputMode`                            | `numeric`; a keyboard hint, not digit validation                                   |
| `autocomplete`                         | `one-time-code`; also accepts `off`                                                |
| `value` / `valueChange`                | Nullable value input; string change output                                         |
| `transformPaste`                       | Identity function `(text, length) => string`; transformed paste replaces the value |
| `disabled`, `autofocus`                | `false`; also supports forms disabled state                                        |
| `id`, standard ARIA names/descriptions | Applied to the native input; descriptions merge with Capsule Field                 |
| Slot `forceInvalid`                    | Existing visual override; does not change form validity                            |

Reactive Forms, template forms and Signal Forms use the root value accessor. `completed` preserves Brain's semantics: entering/pasting a changed value emits when moving from incomplete to complete; replacing an already complete value does not emit again. A programmatic `writeValue` of a complete value emits, including repeated writes. An initial forms write waits for the internal native view to initialize before forwarding that event. Value writes never emit `valueChange`.

Use Angular required/minLength/maxLength/pattern validators for application validation. The native input retains selection, arrow keys, backspace and composition events. Visual active-slot and caret position follow Brain's value length and focus state; they do not represent arbitrary native text selection. `length` is not implemented as native `maxlength`, preserving Brain's last-character replacement when typing beyond the length.

A private view adapter extends the public `BrnInputOtp` class and supplies native ARIA bindings. It also reconciles the native value after a repeated overflow edit, which can leave Brain's canonical value unchanged and therefore skip Angular's property update. Active IME composition retains its native text until composition ends; reconciliation clamps the native selection to the canonical value without emitting another value or completion event. Value, paste, focus and completion algorithms remain inherited. The public Capsule component hides Brain's styling inputs; no unexported Brain token is imported. The caret and all composition styling live in the shared Capsule foundations, with reduced-motion support.

## Migration and verification

The initial inventory contains 44 consumer files: catalogue previews and examples, the two Storybook stories, native/reactive/Signal Forms compositions, the password custom control, homepage compositions, and the sticky-header block. All source consumers and displayed snippets use the Capsule entrypoints. Remaining Helm ButtonGroup and Combobox internals keep this PR independent of the separately reviewed migration in #34; Brain and Helm source are unchanged.

The catalogue and documentation generator expose only the approved public inputs and outputs. Twenty complete preview/example snippet sources compile against the generated Capsule package declarations, including the OTP form example without requiring Node-specific timer types.

Local validation:

- 930 unit tests pass, including 191 Capsule and 44 documentation/tool tests. Eleven new browser unit tests cover native composition, reactive and Signal Forms, explicit/forms disabling, labels/descriptions, keyboard/selection, transformed paste, repeated completion writes, repeated overflow edits and active IME composition.
- Fourteen Chrome Cypress cases pass without retries: hydration and axe on all 20 family examples in light/dark at 390/1280px, native editing and label focus, OTP keyboard editing, the Signal Forms password visibility action, and regressions for named homepage actions, Voice mode and disabled-group status contrast.
- 88 rendered catalogue/Storybook cases pass axe, viewport, nested-control and page-error checks. Real Arabic selection verifies inherited RTL, label focus and right-to-left OTP slot order. Ten auxiliary routes contain 20 visible migrated compositions with no axe, overflow or nested-control failures; the homepage's interactive overview is checked at desktop width because its existing mobile surface is a static image. SSR preserves the prefilled native OTP value before hydration.
- Production typechecks pass for the five affected production projects; catalogue/library Angular templates and Storybook source are included. The existing E2E standalone TypeScript exclusion remains; Cypress executes those tests. Nine projects pass lint; formatting and diff checks pass.
- Capsule package and catalogue production builds pass, including 154 prerendered routes. Storybook builds and its rendered audit pass. The final disabled-status color and auxiliary action labels are then compiled into the package/catalogue and verified by the targeted regressions, without repeating unchanged unit suites.

Finite time-based transitions settle before theme contrast measurements. Infinite caret/spinner animations and scroll-driven scrollbar timelines remain active; they are not awaited or disabled. No axe rule is excluded.

Manual screen-reader sessions were not performed. Automated accessibility, native keyboard/focus, forms and browser checks provide the evidence above; the draft does not claim manual assistive-technology certification or full end-to-end CI.

## Inline border alignment regression

An inline InputGroup beside a 32px icon button grew to 38px: its native 32px input counted the group's two borders again, while an inline addon combined a 24px action with 12px vertical padding. The visible bottom seam differed by 6px. Inline native inputs now subtract the outer borders from the control-height token, and inline addons use zero block padding. The root retains intrinsic height and a 32px minimum, so larger content grows naturally. Direct textareas and block-start/end addons keep their existing layout.

The real adjacent-button regression failed before the correction and passes in eight combinations of 390/1280px, light/dark and LTR/RTL. Twenty-one targeted Chrome Cypress cases pass without retries on the combined local #67/#68 catalogue, covering geometry, grouped actions, forms, focus, editing and accessibility. Browser measurements also preserve actual 28/32/36px button sizes, stacked/fluid layouts, containment across 32 InputGroup examples and natural growth for larger addons. The shared stylesheet is compiled by the running catalogue; unchanged full builds and unit suites were not repeated for this CSS correction. Brain, public API and ButtonGroup styling are unchanged.
