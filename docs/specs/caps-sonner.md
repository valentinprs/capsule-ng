# Capsule Sonner — issue #56

Design realigned on 2026-10-07 to the user's instruction to follow Spartan documentation. Clone base: `0b7e53f7206bd253d5640057b7a6dc40f0532f84`. Integration with unchanged Brain and two targeted accessibility-test exceptions was explicitly authorized on 2026-10-15. The issue proposal is not the public API contract.

## Verified sources

[Official Spartan Sonner documentation](https://spartan.ng/components/sonner), checked on 2026-10-07, demonstrates the toaster with the `toast` function, descriptions, primary actions, status variants, promises and six positions. Its Helm API table exposes the same thirteen container inputs as the local styled implementation.

The local, immutable implementation is the pinned source for the exact public types and additional existing behavior:

- `libs/helm/sonner/src/lib/hlm-toaster.ts`: styled container inputs, defaults, icon/action templates and four default style variables.
- `libs/brain/sonner/src/index.ts`: public exports; no private entry point is imported by Capsule.
- `libs/brain/sonner/src/lib/state.ts`: callable `toast`, message/status/loading/custom/promise/dismiss operations and replacement by ID.
- `libs/brain/sonner/src/lib/types.ts`: `ExternalToast`, `ToastT`, `ToastOptions`, promise, position and action types.
- `libs/brain/sonner/src/lib/brn-toaster.token.ts`: public provider/configuration for width, gap, swipe threshold, offset and lifetime.

The [API provenance matrix](./caps-sonner-api-provenance.md) maps every container prop, public operation/type and Capsule adaptation to source lines and file hashes. Central review remains pending.

## Exact public contract

`CapsToaster` / `<caps-toaster>` and `CapsSonnerImports` are the styled Capsule composition. No injectable notification service or alternative content schema is added. The host keeps the documented inputs:

| Input           | Type                            | Default                                        |
| --------------- | ------------------------------- | ---------------------------------------------- |
| `invert`        | `boolean`                       | `false`                                        |
| `theme`         | `'light' \| 'dark' \| 'system'` | `'light'`                                      |
| `position`      | `Position`                      | `'bottom-right'`                               |
| `hotKey`        | `string[]`                      | `['altKey', 'KeyT']`                           |
| `richColors`    | `boolean`                       | `false`                                        |
| `expand`        | `boolean`                       | `false`                                        |
| `duration`      | `number`                        | `4000`                                         |
| `visibleToasts` | `number`                        | `3`                                            |
| `closeButton`   | `boolean`                       | `false`                                        |
| `toastOptions`  | `ToastOptions`                  | `{}`                                           |
| `offset`        | `string \| number \| null`      | `null`                                         |
| `class`         | `ClassValue`                    | `''`                                           |
| `style`         | `Record<string, string>`        | the four normal surface/radius variables below |

The four default `style` properties remain `--normal-bg: var(--popover)`, `--normal-text: var(--popover-foreground)`, `--normal-border: var(--border)` and `--border-radius: var(--radius)`, as in Spartan. These already resolve against the shared Capsule tokens. Boolean/number attribute transforms are preserved.

`Position` retains `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center`. No `gap` input is invented from a field of `ToasterProps` that the documented component does not expose: the existing public provider configures that behavior.

The entry point re-exports the original function without wrapping it:

- `toast(message, options?)`, `toast.message`, `toast.success`, `toast.info`, `toast.warning`, `toast.error`, `toast.loading`.
- `toast.custom(component, options?)`, `toast.promise(promiseOrFactory, options?)`, `toast.dismiss(id?)`.
- Returned numeric/string IDs and the existing `options.id` replacement behavior.

`ExternalToast` retains `description`, `action`, `cancel`, `closeButton`, `duration`, `dismissible`, `important`, `invert`, per-toast `position`, custom icon/component/componentProps, classes/styles/testId and existing lifecycle callbacks. An action is `{label, onClick(event)}`; cancel has the same label and an optional callback. Brain wraps these callbacks to dismiss once; `event.preventDefault()` keeps the notification open. Capsule does not add another dismissal handler.

Duration remains literal upstream milliseconds. `Number.POSITIVE_INFINITY` is the existing explicit persistence option; zero is not converted to infinity. The callable and `message` operations retain the default variant; semantic status methods select their existing variants.

Public types re-exported: `ExternalToast`, `ToastT`, `ToastTypes`, `ToastAction`, `ToastOptions`, `ToastClassnames`, `ToasterProps`, `Position`, `Theme`, `PromiseData`, `PromiseT`, `BrnSonnerToasterConfig`. `provideCapsSonnerToasterConfig` aliases the public Brain provider. No low-level state or private renderer is made part of the Capsule anatomy.

## Anatomy, accessibility and SSR

One `<caps-toaster />` in the shell composes the public Brain toaster. It owns decorative icon templates and native `button capsButton` primary/cancel templates. The generic host is not an additional live region. Brain owns the ordered lists, polite/assertive status announcements, stacking, swipe, timers, direction and Alt+T shortcut. The wrapper does not query or patch Brain DOM.

Capsule's independent styling uses the shared foundation stylesheet for font, radius, native action styles and visible close-button focus. Explicit `aria-hidden` marks the wrapper's decorative icons. Per-toast close naming remains Brain's “Close toast”. Custom components retain the original public customization route.

SSR behavior is delegated unchanged to Brain. Examples call `toast` only from browser event handlers; no notification is created during their initial server render. The raw function is the same upstream global state function and gains no new server-safety guarantee. A server-platform fixture is only a smoke test; actual SSR response and hydration need catalogue validation at the allocated runtime stage.

## Complete consumer audit

- Sonner catalogue preview, four semantic variants/default/promise, description, six positions, application-shell/configuration strings and Capsule API table.
- Storybook default, expanded and rich-color stories with original description/action/cancel, explicit persistence, update by ID and promises.
- Questionnaire notification previews/page host, OTP form, Sidebar group action page and its displayed source string.
- Bubble links/reactions, Marker action/host page and MessageScroller load-history preview/host page: notification imports migrate while their unrelated APIs are preserved.
- No home-page Sonner consumer exists on this pinned base. Source import search covers all `apps/` consumers.
- Generated API and snippets must be regenerated and checked against the actual public exports.

Supporting buttons use CapsButton. Six position triggers remain a flat native-button group. Shared typography/layout helpers and the existing overlay provider in the Angular 21 configuration string remain because this base has no corresponding Capsule provider. Brain and Helm sources remain immutable; no npm publication or global migration is included.

## Validation and known accessibility limits

The ten public contracts cover plain text, statuses/live attributes, native action/cancel keyboard activation, ID updates, resolved/rejected promises, infinity and literal zero/finite timers, native close, RTL/hotkey, custom content and cancellable actions. Additional classifier tests retain unknown sibling nodes within a known rule, other rules, mismatched DOM/data/any/all/none/related checks and obsolete exceptions.

The immutable Brain renderer retains two findings: `list` (serious) on the ordered list with direct `brn-sonner-toast` children; `aria-allowed-role` (minor) on the inner status `li`. The test-only classifier accepts only the exact Capsule composition and checks documented in [the active limitations and removal conditions](./caps-sonner-accessibility-diagnostic.md), preserving all original evidence. Other violations remain blocking. Mounted-notification audits require both expected findings, so disappearance fails until the corresponding exception is reviewed and removed. No whole rule or region is disabled.

Catalogue tests exercise real hydration, native notification actions, metadata/snippets and desktop/mobile bounds using the actual theme control. The migrated Marker consumer retains its real keyboard/scroll/row-anchor assertions and upgrades its full-document audit from archive-only to the same blocking classification while preserving the raw archive.

Package/API validation uses built-package strict external compilation, raw toast/provider identity, metadata and consumer checks. Final configured lint uses the actual Nx graph; App boundaries remain disabled by the existing App configuration, while Caps boundaries remain active. This lot runs targeted local checks only, without a remote CI run, push or global pipeline. Exact local command/results and provenance are retained separately with the delivery patch; test coverage does not establish manual screen-reader speech or complete accessibility conformance.
