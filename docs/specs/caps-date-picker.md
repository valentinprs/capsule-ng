# Date Picker — issue #47

## Decision before implementation (2026-10-07)

Calendar #46 is integrated at a628aec976bc466b975cbdc783212991705deefc.
The API follows [Spartan Date Picker](https://www.spartan.ng/components/date-picker) and
[Spartan Calendar](https://www.spartan.ng/components/calendar), checked on 2026-10-07. Spartan
composes Popover and Calendar with projected triggers or native text inputs. The installed public
Brain contracts remain authoritative for names, types, defaults and text editing; current online
examples do not authorize a framework or runtime migration. No mode/value union, string date-format
API or locale-string adapter provider is introduced.

Public roots: `caps-date-picker<T>`, `caps-date-range-picker<T>`, `caps-date-picker-multi<T>` and
`caps-month-year-picker<T>`. Values remain `date/dateChange`: T|null, [T,T]|null, T[] and T|null.
An empty multi selection emits []; the other patterns emit null. Installed single/range/month-year
`date` inputs accept undefined for absence, while their outputs/CVA clear to null; nullable models
use `[date]="model ?? undefined" (dateChange)="model = $event"`. No nullable input widening is introduced. Range drafts do not commit a partial
interval. Closing an unfinished edit restores a previously committed range when one exists.
Calendar multi uses **date/dateChange**, with minSelection/maxSelection. Calendar range uses
startDate/endDate and their respective events; month/year uses date/dateChange/view.

The root owns Popover and Calendar and supplies a native text input when no control is projected.
This fallback is a Capsule ergonomic choice: a root used alone is a labeled, editable form control,
without requiring consumers to repeat the same input composition. It reuses the same public
BrnDateInput as the projected input and does not replace the documented projected anatomy.
Advanced consumers can project `caps-date-picker-trigger` (owned native button), or the typed input
components `caps-date-picker-input`, `caps-date-range-input`, `caps-date-multi-input`,
`caps-month-year-input`. All four inputs extend the public BrnDateInput; no Brain logic is copied.
This composite native-control anatomy follows the Field/OTP exceptions of ADR0001, with a generic
host and a single actual input/button focus target. Header/footer content is projected using
`capsDatePickerHeader` and `capsDatePickerFooter`; projected interactive children belong there,
never inside the control button. The root may be used alone with placeholder, id and standard native ARIA names/descriptions; parser/edit format
customization remains available through typed input components and typed config providers.

Existing align start/center/end maps to CapsPopover bottom-start/bottom/bottom-end.
minDate/maxDate, defaultFocusedDate, captionLayout, auto-close flags, generic transforms, formatters,
cardinality and provider configuration remain supported. Calendar disabled-day/highlight/week-start
constraints are passed through where supported. Adapters and calendar i18n are the public Calendar
providers: native, UTC, Jalali, custom and runtime i18n, configured separately.

## Contract audit against installed Spartan

The source paths below are relative to the repository. This matrix records installed-source facts;
the online Date Picker page confirms the same four families and their projected anatomy. The
online API tables and installed signatures agree for the retained picker contracts. Some online
form prose says `formControlName` while its examples use `formField`; Capsule documents the actual
binding shown and verifies both Angular forms mechanisms independently.

| Prop/event or anatomy                                                                                                     | Spartan installed source                                                                                                           | Capsule adaptation and reason                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date`, `dateChange`                                                                                                      | `libs/helm/date-picker/src/lib/hlm-{date-picker,date-range-picker,date-picker-multi,month-year-picker}.ts`; `BrnDatePickerBase<V>` | Keep four typed roots; range is `[T,T]`, multi is `T[]`. Empty outputs remain `null` / `[]`; no union selector.                                                |
| `minDate`, `maxDate`, `disabled`, `align`                                                                                 | The same four picker roots                                                                                                         | Keep names/defaults; map bounds to Calendar `min/max` and align to CapsPopover placement. Combine input and CVA disabled instead of overwriting either source. |
| `captionLayout`, `defaultFocusedDate`                                                                                     | Day picker roots; single/month-year focused-date inputs                                                                            | Keep each original family's supported inputs; no invented month-year caption prop.                                                                             |
| `minSelection`, `maxSelection`, `autoCloseOnMaxSelection`                                                                 | `hlm-date-picker-multi.ts` and its config token                                                                                    | Keep cardinality and closure semantics; Calendar multi uses `date/dateChange`, not `dates`.                                                                    |
| `autoCloseOnSelect`, `autoCloseOnEndSelection`                                                                            | Single/month-year and range roots/config tokens respectively                                                                       | Preserve their distinct defaults and names; keep incomplete range drafts internal.                                                                             |
| `formatDate`, `formatDates`, `transformDate`, `transformDates`                                                            | Four root classes and `hlm-*.token.ts` typed interfaces                                                                            | Keep generic function signatures and defaults; rename provider prefix only. Programmatic writes do not emit user outputs.                                      |
| `parseDate`, `formatInputDate`, `formatInputDates`                                                                        | Four `hlm-*-input.ts` subclasses of `libs/brain/date-picker/src/lib/brn-date-input.ts`                                             | Same projected typed inputs and typed configs; extend public Brain editing behavior instead of copying its implementation.                                     |
| `inputId`, `inputValue`, `placeholder`, `showClear`, `openOnClick`, `forceInvalid`, `clearAriaLabel`, `calendarAriaLabel` | Public `BrnDateInput<V>`                                                                                                           | Inherit unchanged; forceInvalid remains visual only. Real native input is the label/focus target.                                                              |
| Trigger `buttonId`, `class`, `variant`, `showTrigger`, `forceInvalid`; anchor `*DatePickerAnchorFor`                      | `hlm-date-picker-trigger.ts`, `hlm-date-picker-anchor.ts`, Brain trigger token                                                     | Keep projected trigger/anchor contracts with Caps names and CapsButton variant type. Root `id` never substitutes a projected control's own ID.                 |
| Header/footer projection                                                                                                  | Existing Helm root `ng-content` selectors                                                                                          | Rename slots `capsDatePickerHeader/Footer`; preserve content outside the interactive control.                                                                  |
| Adapters, runtime i18n, Calendar range `startDate/endDate`, month-year `view`                                             | `libs/brain/calendar/src`; final `libs/caps/calendar/src/index.ts` and README                                                      | Compose final Calendar APIs; native/UTC/Jalali/custom providers remain separate from picker formatting config.                                                 |
| `dateDisabled`, `weekStartsOn`, `highlightDays` on day pickers                                                            | Existing `brn-calendar.ts`, `mode/brn-calendar-multiple.ts`, `mode/brn-calendar-range.ts` and final CapsCalendar                   | Capsule passthrough extension, not an upstream picker prop. No new calendar behavior; undefined week start retains the installed runtime i18n fallback.        |
| Root native fallback, `id`, `placeholder`, standard ARIA forwarding                                                       | Native input composition above; Capsule ADR0001                                                                                    | Explicit Capsule convenience extension for standalone usage. Forward only to the fallback native input; projected inputs/triggers keep their own attributes.   |
| `open/close/reset`, `formattedDate`, `hasDate`, `value`, CVA/Field labeling                                               | Existing four Helm roots, Brain picker and Field contracts                                                                         | Preserve imperative API and forms behavior; isolate inner NgControl and restore native focus.                                                                  |

The last two extension rows are deliberately identified as Capsule composition conveniences, rather
than claimed as upstream picker props. They reuse existing native/Calendar contracts. Speculative
mode/value, alternate event names, dateFormat/language props and locale-string providers are absent.
No API or naming decision is based on another design system. Brain and Helm sources stay intact.

## Forms and accessibility contracts

The picker is the sole CVA and FieldControl. Native input and calendar descendants are isolated from
its NgControl using private view boundaries, so internal controls cannot replace the picker tracker
or inherit its invalid state. Explicit disabled OR CVA disabled governs all user actions and survives
runtime input changes. writeValue transforms/synchronizes without emitting user events.
Field labels target the actual input/button, and descriptions/errors are merged with explicit IDs.
forceInvalid changes appearance only. Invalid appearance uses the existing matcher, including touched,
dirty/submitted timing. Month/year navigation selects keep their own valid state.

BrnDateInput retains in-progress text, parent inputValue, caret position, commit on blur/Enter,
prevention of Enter form submission, edit-format restoration after Enter, invalid parse clearing the
model while retaining raw text, clear+touched, openOnClick and ArrowDown. Popover close marks touched
and restores focus to the original native control, including Escape, selection and public close.

## Complete example inventory and validation plan

Thirteen page scenarios (default, config, format, input, single form/input form, multi/multi form,
range/range form, month/year, date/time, RTL), page/server, Field Date Picker preview, five Calendar
blocks, five stories and existing Cypress interactions all migrate. Supporting Field/Input/Button/
Calendar APIs use Capsule. Native time input stays a separate control. Pointless single-child groups
and Field wrappers used only for submit-button placement are removed. Generic dates and RTL labels
stay configurable; no home consumer was found.

Public tests cover CVA/FormControl/formControlName/ngModel/signal Forms, disabled/rebinding/reset,
field label/description/error timing, inner-select isolation, focus restoration, all four text commit
cycles, providers/transforms, range drafts and multi cardinality. Existing Cypress assertions remain
behavioral. Package/DTS consumers, catalogue/stories, metadata/snippets/snapshot, project lint and
real light/dark 1280/390 axe, keyboard, fonts, RTL and SSR/hydration are required before final commit.
Heavy runs await the explicit coord-c/lot18 grant and use the central foreground controller.

Native `dir`, `lang` and `data-lang` ancestry follows the owned calendar into its body portal.
This preserves the existing HTML context without adding a Date Picker language property.
