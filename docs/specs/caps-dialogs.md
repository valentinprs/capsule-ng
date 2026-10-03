# Capsule dialogs (issue #30)

## Composition

`@capsule-ng/caps/dialog` and `@capsule-ng/caps/alert-dialog` expose imports arrays,
structural elements, native button directives and lazy content templates. Consumers never
assemble Brain portals or overlays. Both roots use `[(open)]` (boolean); the template owns
its content classes and Dialog's optional close button (`showCloseButton`, `closeLabel`).
A template's implicit context offers `close()` for explicit actions.

Dialog retains outside/Escape dismissal, configurable dismissal, focus trapping/restoration,
external menu triggers, nested dialogs, dynamic component content, RTL and scrollable layouts.
Alert Dialog has role alertdialog, ignores outside clicks, supports Escape, and initially
focuses Cancel when present. Confirmation is an ordinary native button: application code
closes only after success. No automatically closing confirmation directive is provided.
Titles have heading semantics (level 2); descriptions register with Brain. Header, footer
and media are generic layout containers. Each dialog must have a title or an explicit label.

## Existing examples retained

Dialog: profile form, hidden close button, dismissal options, sticky footer, scrollable
content, controlled state, context menu trigger, dynamic user selection, explicit close, RTL.
Storybook also retains nested declarative/dynamic dialogs and service default options.
Alert Dialog: standard, destructive, small, media, small media, dropdown trigger and RTL.
Auxiliary Button/Input/Label/Field/Link use existing Capsule APIs; other families retain Helm.

## Validation boundaries

Confirmed by Valentin: public Capsule API in Angular consumers; catalogue/Storybook browser
paths for keyboard, focus and accessibility. Review compares against starting main commit
`02bb420e8f14f795888475e2a067656341068c8f` (includes shared foundations #27).

## Verification (2026-10-02)

- Full unit suite: 837 tests across six projects. The generated API snapshot was updated
  after reviewing the new exports, then the Tools suite passed; all other suites passed.
- Typechecks: Capsule and catalogue Angular templates; 17 preview sources compiled again
  against the built Capsule, Brain and Helm declaration entrypoints in a separate consumer.
  The declarative example imports its two typography directives explicitly because Helm's
  broad, non-tuple typography imports array cannot be statically resolved from its package.
- Repository lint and formatting; all six build targets and Storybook production build.
- Chromium: both default dialogs in catalogue and Storybook, light/dark, 320/390/1280 px
  (24 contexts), with accessible names, initial focus, viewport gutters and open-modal axe.
- Cypress covers triggers, close, outside/Escape rules, keyboard, restoration, nesting,
  menu triggers, dynamic content, hidden close buttons, mobile gutters and open-modal axe.
  Accessibility audits wait for entry animations to settle before measuring contrast.
- Standards review: reusable dimensions now compose the shared scales; duplicate shared
  footer styles are grouped. Spec review found no confirmed mismatch. Brain remains unchanged.

Local verification used pnpm 10.30.3 with Node 24.18.0 (the repository CI uses Node 22).

The catalogue audit also covers every directly triggered variant, including RTL, small/media
alerts and scrollable/sticky-footer dialogs. Both scrolling regions expose a named, focusable
region so keyboard users can scroll them. The corresponding Cypress spec is
`apps/app-e2e/src/e2e/dialogs.cy.ts`.
