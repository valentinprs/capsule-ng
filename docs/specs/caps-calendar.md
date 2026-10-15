# Calendar — issue #46

## Decision before implementation (2026-10-07)

[Carbon Angular DatePicker](https://angular.carbondesignsystem.com/documentation/components/DatePicker.html)
was checked against its documented Angular selector, inputs and template. It owns text inputs and
Flatpickr; it is not an independently exposed inline Calendar. Its range/value/language APIs therefore
are not transplanted onto this lot. Date Picker remains issue #47. With no exact standalone equivalent,
Capsule preserves existing typed calendar patterns rather than introducing the issue's speculative
mode/value union or a locale-string provider that Brain does not support.

Public elements: `caps-calendar<T>` (date/dateChange), `caps-calendar-multi<T>` (date array/dateChange,
minSelection/maxSelection), `caps-calendar-range<T>` (startDate/endDate and respective outputs), and
`caps-month-year-calendar<T>` (date/dateChange/view). Every component owns its header, native
navigation buttons and grid. Shared day-calendar inputs retain min/max, disabled, dateDisabled,
weekStartsOn, highlightDays, defaultFocusedDate and captionLayout. No extra value accessor is invented.

The entrypoint exposes existing adapter and calendar i18n providers under Capsule names, without
changing implementation: native, UTC, Jalali, custom adapter, injectable date adapter and runtime i18n.
Calendar labels are configured separately from adapters, as in Brain. Generic dates remain generic.
Internal month/year selectors use CapsSelect with private host-directive adapters to Brain's existing
month/year logic (including clamping the 31st and leap days); no Brain selector is modified.

## Anatomy and styling

Native day buttons retain Brain selection, constraints, roving tabindex and arrow/Home/End/Page keys.
The host is a generic styled container, not an extra interactive node. Grids have explicit current
month/year accessible names, including when both caption dropdowns replace the visible heading.
Multiple/range grids declare aria-multiselectable. Native navigation icons are decorative and Brain provides translated labels. Capsule buttons and
selects supply shared foundation tokens; the calendar hook owns cell dimensions and rounding through
the existing skin foundation rules (Capsule and legacy hooks share one declaration). Consumer class merging remains supported.

## Complete example inventory

- Component page: main preview, multiple, range, four caption layouts, month/year picker, RTL,
  provider/runtime snippets and public API table.
- Multiple examples start with two dates to satisfy their demonstrated minSelection=2.
- Seven blocks: simple, disabled-days/highlights, disabled-weekends, multi, month/year dropdown,
  localized Vietnamese/German/English, Jalali RTL. Existing auxiliary Card/Button/Select are Capsule.
- Storybook: default, multiple, range, dropdown, month/year, disabled and RTL public examples.
- Generated primitive snippets and API metadata/snapshot are refreshed from these sources.
- No direct calendar consumer found in home. Helm Date Picker internally uses Helm Calendar and
  remains untouched until #47; its blocks are explicitly outside this standalone-calendar lot.

## Validation

Public Angular consumer tests cover typed single/multiple/range values, cardinality, constraints,
keyboard focus/navigation, caption month/year clamping, localization and alternate adapters.
Targeted real catalogue/Storybook, a11y, light/dark desktop/mobile/RTL and SSR/hydration validation
results are recorded after execution. Final targeted validation uses CI Node22.15.0; the initial exploratory run used Node24.18.

Inherited behaviors are deliberately retained: reaching maxSelection starts a fresh selection with
the newly chosen day; minSelection prevents removing the last required selection. Disabled target
dates block month navigation and arrow movement rather than skipping them. Month/year dropdown
labels are currently the fixed English Month/Year labels; all existing translated calendar strings
and alternate date systems remain configurable. Date Picker compositions wait for issue #47.

Real CSS light-theme axe found enabled outside-month day opacity50 below4.5contrast. All three Capsule day patterns use the existing muted-foreground token instead, retaining clear outside-month styling without lowering whole-control opacity. No Brain/Helm source or shared token changed.

Storybook examples explicitly configure English month/header labels through the public i18n provider, so their June2024 fixtures remain reproducible on a French OS. The library and catalogue still honor configured/local date formatting. Original behavioral assertions remain intact. Local Cypress configuration overrides nested e2e retries to zero.

## Executed validation (2026-10-07)

CI Node 22.15.0 on base `d75345c7bf9d19fba252ff7ea6b1db5885cd8cb3`:

- Eleven public Chromium contracts pass. Strict Angular compilation passes for Caps, the catalogue,
  and all seven actual Calendar stories and their imports.
- The Caps package and three dependencies build successfully. Published Calendar exports and declarations
  compile with all fourteen actual catalogue consumers and the seven stories in their shared source file.
  All six distributed skins match their source bytes and contain the Capsule calendar hook.
- Docs/snippets generation passes; all 32 metadata/snapshot tests pass again without updating snapshots.
  Calendar lint passes with zero warnings; catalogue, catalogue E2E, Storybook E2E and Tools lint pass.
- Catalogue Cypress passes 3/3 and Storybook Cypress 19/19 cumulatively across retained passing scopes
  and corrected reruns. Native keyboard focus, PageUp/PageDown/Space, disabled dates and selection remain checked.
- Real browser inspection passes 52 catalogue and 28 Storybook contexts at 390/1280 pixels, light/dark,
  with axe, named grids, selection semantics and overflow checks. Font faces and actual custom glyphs
  were verified through CDP, including Inter weights and Noto Arabic for Persian content.
- Additional Arabic RTL, SSR markup/client hydration, default 111-year dropdown scrolling/selecting/Escape
  focus, all caption layouts and native month/year selection pass. Enabled outside-month days have measured
  contrast 4.74 in light and 6.94 in dark, using existing tokens without an opacity override.

Global Storybook compilation still reports errors in unrelated Command, DropdownMenu, NavigationMenu
(`ng-icon`) and ToggleGroup stories. Those sources were unchanged in this lot; attribution to the exact
base was not established by a baseline rerun. Global Caps lint also reports three OnPush errors in the
unchanged Questionnaire spec. These global failures remain explicit limits; the strict Calendar scopes
above pass. The complete union pipeline belongs to the central collector. Development SSR logs also
report an application-wide stabilization warning; Calendar hydration and client interaction were verified.
