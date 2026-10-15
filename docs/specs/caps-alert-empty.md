# Capsule Alert and Empty — issue43

## Sources and scope (2026-10-07)

The public inputs follow official [Spartan Alert](https://www.spartan.ng/components/alert)
and [Spartan Empty](https://www.spartan.ng/components/empty) documentation. The local source
at `d8b2b3744378c72cd5bfe364a280a72c43681b96` confirms this contract in
`libs/helm/alert/src/lib/hlm-alert.ts` and `libs/helm/empty/src/lib/hlm-empty-media.ts`.
The Brain workspace source declares version `1.5.0` in `libs/brain/package.json:3`;
`tsconfig.base.json` resolves Brain imports to workspace aliases. This is workspace provenance,
not evidence of an installed Brain package version. There is no Alert or Empty behavioral
primitive in this workspace. Brain sources remain unchanged.

| Component                        | Input   | Type                                                                          | Initial value                        | Outputs |
| -------------------------------- | ------- | ----------------------------------------------------------------------------- | ------------------------------------ | ------- |
| CapsAlert                        | variant | CapsAlertVariants['variant']: 'default' \| 'destructive' \| null \| undefined | 'default'                            | none    |
| CapsEmptyMedia                   | variant | CapsEmptyMediaVariants['variant']: 'default' \| 'icon' \| null \| undefined   | undefined; effective style 'default' | none    |
| All other Alert/Empty components | none    | —                                                                             | —                                    | none    |

Variant types retain Spartan's CVA optional/null values: `undefined` selects the default style,
`null` omits variant styling. Color customization uses consumer classes and projected content
as in Spartan's Custom Colors example.
No status, size, heading-level, notification service, dismissal or data/creation API is added.

## Anatomy decided before implementation

`CapsAlertImports`: `caps-alert`, `caps-alert-media`, `caps-alert-title`,
`caps-alert-description`, `caps-alert-actions`. Media is optional; title/description/actions can
be projected directly. The root owns a responsive grid, media its leading column, actions its own
row. Action controls remain native `button capsButton` or `a capsButton/capsLink` and are siblings.

`CapsEmptyImports`: `caps-empty`, `caps-empty-media`, `caps-empty-title`,
`caps-empty-description`, `caps-empty-actions`, optional `caps-empty-header` and `caps-empty-content`.
The simplest composition projects media/title/description/actions directly. Header groups media and
text where needed; Content holds rich content such as InputGroup. One-child action/content wrappers
are removed where they serve only spacing. Media accepts existing `variant="icon"` or `"default"`.

Alert preserves the documented Spartan host `role="alert"`, verified in the official source
and local `libs/helm/alert/src/lib/hlm-alert.ts:23`. Both default and destructive variants
retain this role. Consumers can override native `role` and set native live attributes; there is
no additional ARIA input. Empty retains the role-free source host. The dynamically inserted
error example demonstrates an urgent update separately from callouts present on initial render.
Titles retain the decided Capsule styled-text composition.
No heading level input is needed: a genuine section heading can be projected as a native h2–h6
inside a title component using the surrounding document hierarchy. Generic title hosts are not
additional heading nodes. Catalogue callouts stay titles within already named example sections.

Decorative icons are hidden explicitly by consumers; media can hold meaningful images/avatars
with native alt text. All content is projected without rewriting names, descriptions or links.
CSS uses shared Capsule foundation tokens and hooks; six existing style choices receive corresponding
Caps selectors. No typography family or Helm/Brain source is changed.

## Exhaustive consumer migration inventory

- `apps/ui-storybook-e2e/src/integration/empty/empty.cy.ts`
- `apps/ui-storybook/stories/alert.stories.ts`
- `apps/ui-storybook/stories/empty.stories.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/installation.page.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/theming.page.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/styles.page.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--avatar-group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--avatar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--background.preview.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/empty-avatar-group.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--input-group.preview.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/spinner-empty.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--outline.preview.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--rtl.preview.ts`
- `apps/app/src/app/pages/(stack)/stack/installation.page.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty.preview.ts`
- `apps/app/src/app/pages/(components)/components/(tabs)/tabs.page.ts`
- `apps/app/src/app/pages/(components)/components/(alert)/alert.page.ts`
- `apps/app/src/app/pages/(components)/components/(alert)/alert--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(chart)/chart.page.ts`
- `apps/app/src/app/pages/(components)/components/(alert)/alert--custom-colors.example.ts`
- `apps/app/src/app/pages/(components)/components/(alert)/alert.preview.ts`
- `apps/app/src/app/pages/(components)/components/(alert)/alert--action.example.ts`
- `apps/app/src/app/pages/(components)/components/(alert)/alert--destructive.example.ts`
- `apps/app/src/app/pages/(components)/components/(data-table)/data-table.page.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--streaming.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--animation.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--anchoring.preview.ts`
- `apps/app/src/app/shared/code/style-header.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller.preview.ts`
- `apps/app/src/app/pages/(components)/components/(spinner)/spinner--empty.preview.ts`

The inventory includes catalogue documentation installation/theming/styles and style-header;
Chart/DataTable status callouts; Tabs documentation callout; home avatar/loading states;
Spinner empty preview; MessageScroller default/streaming/animation/anchoring Empty primitives only.
Scroller API and streaming behavior remain owned by issue55. Alert and Empty pages publish Capsule
metadata; generated snippets/API are regenerated and reviewed during the authorized validation slot.

Spinner (issue44) is validated in collector HEAD15 and reused by the home/preview Empty loading
compositions as `caps-spinner aria-hidden="true"`, since nearby text describes loading. Kbd (issue45)
is validated in collector HEAD15 and reused as native `kbd capsKbd` in the Empty input composition.
No unvalidated source is copied from other clones. Avatar, Button, Link and InputGroup already have
Capsule APIs and are migrated in every affected example. Other families stay with their owners.

## Validation requirements

Public Angular consumer contracts cover static/urgent semantics, reactive Spartan variants, class merging,
projected headings/media/text, native buttons/links, accessible names and rich Empty content. Targeted
real-browser QA covers every inventory example, light/dark at1280/390, actual Arabic RTL, keyboard
focus/action, accessibility and SSR/hydration. Node22.15 matches CI. Heavy tests, ngc, Nx graphs,
package, Vite/Cypress/Chromium run only under central permission and the shared foreground lock.
Exactly one Conventional commit follows complete evidence; no push, PR, merge or publication.
