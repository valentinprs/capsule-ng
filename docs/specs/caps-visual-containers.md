# Capsule visual containers (issue #33)

## API design, recorded before implementation

Card is a generic visual container, not an automatic landmark or clickable surface.
The public anatomy is `caps-card` (`size="default" | "sm"`), `caps-card-header`,
`caps-card-title` (`level` 1–6, default 3), `caps-card-description`,
`caps-card-content`, `caps-card-footer`, and optional `caps-card-action` for a header action.
Titles render native headings, retaining the existing heading levels when migrated.
Layout classes remain on the title host and typography inherits into the native heading.
Description/content hosts are generic containers, allowing existing paragraphs or rich content.
Cards do not infer accessible names; applications can choose a region and label when meaningful.
Native links/buttons retain interaction and focus; these containers add no keyboard behavior.

Separator composes unchanged BrnSeparator. `orientation` defaults to horizontal;
`decorative` defaults to true (role none). Semantic separators use role separator;
only vertical semantic separators need explicit aria-orientation.

Aspect Ratio has no Brain counterpart. `ratio` accepts a number or width/height string,
including fractional operands. Invalid, non-finite or non-positive values fall back to 1.
It is a responsive block with native CSS aspect-ratio and projected content. Consumers
choose crop (`object-cover`), image alt and media sizing. No JavaScript resize measurement.

Each family exports individual standalone components and a Caps\*Imports array from its
secondary entry point. Styles use shared semantic tokens and the Capsule preset; Brain and
unmigrated Helm families remain unchanged. No dependency on issue #32. The initial design was based on main before #31 merged.

## Existing behaviors and example audit inventory

Retain Card default/small sizes, spacing overrides, edge-to-edge content, image, header
actions and RTL; Aspect Ratio square/portrait/landscape/RTL; Separator horizontal,
vertical, menu/list compositions and RTL. Consumer cards, shared shells and stories are
included, not only family pages. Auxiliary components use Capsule when available on main.

The following inventory was captured before implementation (generated snippets additionally
regenerated from these source examples):

- `apps/app/src/app/pages/(blocks)/blocks/calendar/calendar-localized/calendar-localized.component.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/login-simple/login-form.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/sidebar-inset/sidebar-inset/site-header.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/sidebar-sticky-header/sticky-header/site-header.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/signup-simple/signup-form.ts`
- `apps/app/src/app/pages/(components)/components/(accordion)/accordion--card.example.ts`
- `apps/app/src/app/pages/(components)/components/(accordion)/accordion.page.ts`
- `apps/app/src/app/pages/(components)/components/(aspect-ratio)/aspect-ratio--portrait.example.ts`
- `apps/app/src/app/pages/(components)/components/(aspect-ratio)/aspect-ratio--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(aspect-ratio)/aspect-ratio--square.example.ts`
- `apps/app/src/app/pages/(components)/components/(aspect-ratio)/aspect-ratio.page.ts`
- `apps/app/src/app/pages/(components)/components/(aspect-ratio)/aspect-ratio.preview.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar--month-and-year.example.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar--multiple.example.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar--range.example.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar--year-and-month-dropdowns.example.ts`
- `apps/app/src/app/pages/(components)/components/(calendar)/calendar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card--edge-to-edge.preview.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card--image.preview.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card--size.preview.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card--spacing.preview.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card.page.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card.preview.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel--orientation.example.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel--plugins.example.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel--sizes.example.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel--slide-count.example.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel--spacing.example.ts`
- `apps/app/src/app/pages/(components)/components/(carousel)/carousel.preview.ts`
- `apps/app/src/app/pages/(components)/components/(chart)/chart.preview.ts`
- `apps/app/src/app/pages/(components)/components/(collapsible)/collapsible--file-tree.example.ts`
- `apps/app/src/app/pages/(components)/components/(collapsible)/collapsible--settings-panel.preview.ts`
- `apps/app/src/app/pages/(components)/components/(command)/command--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(command)/command.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input-otp)/input-otp--form.example.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--anchoring.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--animation.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--commands.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--group-chat.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--load-history.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--opening-position.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--previous-context.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--scrollable.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--streaming.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--visibility.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller.preview.ts`
- `apps/app/src/app/pages/(components)/components/(questionnaire)/questionnaire--card.preview.ts`
- `apps/app/src/app/pages/(components)/components/(questionnaire)/questionnaire--validation.preview.ts`
- `apps/app/src/app/pages/(components)/components/(scroll-area)/scroll-area.preview.ts`
- `apps/app/src/app/pages/(components)/components/(separator)/separator--list.preview.ts`
- `apps/app/src/app/pages/(components)/components/(separator)/separator--menu.preview.ts`
- `apps/app/src/app/pages/(components)/components/(separator)/separator--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(separator)/separator--vertical.preview.ts`
- `apps/app/src/app/pages/(components)/components/(separator)/separator.preview.ts`
- `apps/app/src/app/pages/(components)/components/(skeleton)/skeleton--card.preview.ts`
- `apps/app/src/app/pages/(components)/components/(tabs)/tabs--lazy.preview.ts`
- `apps/app/src/app/pages/(components)/components/(tabs)/tabs--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(tabs)/tabs--vertical.preview.ts`
- `apps/app/src/app/pages/(components)/components/(tabs)/tabs.preview.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/figma.page.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/styles--complex-showcase.example.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--checkbox.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--input.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--radio-group.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--select.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--switch.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms--textarea.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(reactive-forms)/reactive-forms.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--checkbox.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--complex.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--custom-control.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--input.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--radio-group.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--select.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--switch.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms--textarea.demo.ts`
- `apps/app/src/app/pages/(forms)/forms/(signal-forms)/signal-forms.demo.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/card-section.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/field-hear.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/input-group.ts`
- `apps/app/src/app/pages/(home)/components/playground/playground.ts`
- `apps/app/src/app/shared/blocks/block-viewer.ts`
- `apps/app/src/app/shared/code/code-rtl-preview.ts`
- `apps/app/src/app/shared/header/header.ts`
- `apps/ui-storybook/stories/aspect-ratio.stories.ts`
- `apps/ui-storybook/stories/card.stories.ts`
- `apps/ui-storybook/stories/carousel.stories.ts`
- `apps/ui-storybook/stories/hover-card.stories.ts`
- `apps/ui-storybook/stories/input-group.stories.ts`
- `apps/ui-storybook/stories/scroll-area.stories.ts`
- `apps/ui-storybook/stories/separator.stories.ts`
- `apps/ui-storybook/stories/tabs.stories.ts`
- `apps/ui-storybook-e2e/src/integration/separator/separator.cy.ts`

## Completed composition audit and deliberate exceptions

All inventoried consumers use the public Card, Separator and Aspect Ratio entry points.
Calendar and Command examples formerly using a Card host directive now project their
content into a real `caps-card`. The native OTP form remains inside CardContent so
Angular FormRoot and external submit buttons continue working. Existing heading levels
are preserved except the main catalogue preview, which uses h2 after the page h1.

Card login examples use Field's automatic control associations, including RTL without
duplicated email/password IDs. Action-only Fields in form footers and login/signup/OTP
examples were removed; footer gap classes retain button spacing. Header actions, selected
choice-card labels, form boundaries, descriptions and meaningful layout containers remain.
The Terms of Service scrolling region is named and keyboard focusable. Native links,
buttons, inputs and labels remain native and no Card adds a landmark implicitly.

Auxiliary Button, Input, Textarea, Label, Field and Breadcrumb use their Capsule APIs.
Select, tabs, icons and other not-yet-migrated families retain Helm from main.
After #31 merged during this work, its Checkbox/Radio/Switch APIs and simplified examples
were integrated without reverting their form, label or hydration fixes. This PR remains
independent of #32. Explicit `for`/control IDs remain for Helm
controls, selected cards and examples demonstrating external submit targets. In the Card
story, the Framework label targets Helm Select's native `buttonId`, not its custom host.
The inset sidebar keeps its current breadcrumb visible on mobile; only its ancestor and
separator hide. Plain FieldTitle text becomes styled text, without nested labels.

Aspect Ratio keeps all former ratios, including string ratios used in Storybook; it fixes
fractional-string truncation and invalid infinite values. Its projected images explicitly
choose fill/object-cover. Description and content elements remain generic containers so
rich projected content is valid. CardTitle classes style its host and its native heading
inherits typography. The optional header action is retained, not folded into footer.

## Validation

The API extraction snapshot is updated, and all snippets are regenerated by the catalogue
build. Browser unit tests cover heading changes/projection, native label activation and
actions, separator semantics/orientation, ratio coercion and dynamic updates. Catalogue
Cypress covers all 15 family examples, both themes, 375/1280px viewports, hydration, native
labels/focus, nested-interactive exclusions and actual 16:9 geometry. Storybook and catalogue
are also inspected in Chromium with captured renders and axe checks.

Local checks use pnpm 10.30.3 and Node 24.18.0 (CI uses Node 22). Brain is unchanged.

After integrating main (#61), the complete suite passes 869 tests across 115 files,
including 133 Capsule tests. Field and form-choice library sources remain identical to main.
