# Sonner — two active native accessibility limitations

On 2026-10-15 Valentin explicitly authorized integrating Sonner while keeping Brain unchanged, documenting both known limitations and using targeted test exceptions. This supersedes the earlier delivery hold. The Capsule API follows the [official Spartan documentation](https://spartan.ng/components/sonner) and [pinned public-source matrix](./caps-sonner-api-provenance.md). No Brain/Helm patch, private renderer, DOM monkeypatch or whole-rule/region exclusion is included.

## Findings and impact

| axe rule                                                                            | Impact                                                   | Rendered anatomy                                                                                        | Limitation                                                                                                                |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`list`](https://dequeuniversity.com/rules/axe/4.10/list)                           | serious — WCAG 1.3.1 level A                             | `caps-toaster > brn-sonner-toaster > section > ol[data-sonner-toaster].caps-toaster > brn-sonner-toast` | Native ordered-list children are custom hosts rather than direct list items; valid native list structure is not provided. |
| [`aria-allowed-role`](https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role) | minor — Deque Best Practice, not a separate WCAG failure | the direct child `li[data-sonner-toast].caps-toast[role="status"]` inside that item host                | The status role conflicts with the list-item anatomy reported by the installed axe version.                               |

These findings can affect how assistive technologies expose list/status semantics. Preserved live/atomic attributes do not prove consistent announcements across screen readers. Consumers should retain essential messages and actions in the application and choose an explicit persistent duration where appropriate. This release does not claim complete HTML/ARIA accessibility conformance.

Brain owns the relevant markup at `libs/brain/sonner/src/lib/brn-toaster.ts` (ordered list and item host) and `brn-toast.ts` (inner `li`, status/live/atomic, timers/focus/actions). Brain's default toast class is empty; it is not intrinsically `spartan-toast`. The installed Helm wrapper supplies `spartan-toast`, while Capsule supplies `caps-toast` through the public `toastOptions.classes.toast`. The previously matched public Helm/Caps runtime showed the same rules with their respective hooks. The Capsule test exception matches only the verified Capsule path/hook; it does not accept arbitrary Helm or similarly named elements.

## Targeted test classification

`libs/caps/sonner/testing/known-axe-violations.ts` is test support, not a package entry point or production API. Its `@capsule-ng/test-support/sonner` TypeScript alias exists only for cross-project tests under the configured Nx boundaries; it is not an npm export or part of the built public entry point. It partitions **nodes** within each violation into `acceptedKnown` and `remaining`, retaining the original any/all/none checks and related nodes. A known node cannot hide an unknown sibling under the same rule.

A known target must resolve uniquely inside the audited root, match the actual Capsule ancestor/child structure and agree with the snapshot tag/critical attributes. Role findings require the exact status check, minor impact, data `['status']`, no related nodes and no extra checks. List findings require only `none: only-listitems`, serious impact, data `{values:'brn-sonner-toast'}`, and related nodes corresponding exactly to every direct custom item host. Extra/changed checks, targets, related nodes, DOM or other rules remain blocking.

The live mounted-notification tests assert `remaining=[]` and `missingExpected=[]`, and retain the raw axe results. Negative tests cover another node under the same rule, mixed known/unknown nodes, another rule, mismatched DOM/data/any/all/none/related checks, ambiguous targets and disappearance of expected exceptions. Pages without a mounted notification do not assert these exceptions are present. No `axe.run` rule is disabled and no page region is omitted for these findings.

## Removal conditions

After an explicitly authorized upstream Brain update changes the anatomy or either finding disappears in the real mounted-notification audit, `missingExpected` fails. Review the new DOM and complete checks, remove the obsolete exception and its expected-presence condition, and retain regression coverage for other nodes/rules. If the finding changes rather than disappears, it remains blocking until reviewed; do not broaden the matcher merely to pass a test. The ignored earlier native prototype is not delivered and does not authorize a Brain update.

The historical pointer failures were separately traced to a 414×896 Vitest iframe clipped by its 1280×720 parent. The fixture uses the public 414×650 viewport, with original native-close/preventDefault expectations retained. That test-harness correction is independent of these accessibility limitations.
