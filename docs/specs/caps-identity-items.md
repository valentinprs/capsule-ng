# Avatar, Badge and Item — Capsule API

Issue #42 migrates presentation compositions to public secondary entry points. Brain is unchanged.
The user-approved source for new properties is Carbon **Angular**, rather than the unvalidated API
proposal in the issue. Avatar has no Carbon Angular equivalent, so its existing necessary capabilities
are retained without inventing properties.

## Public composition

```ts
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsItemImports } from '@capsule-ng/caps/item';
```

```html
<caps-item-group label="People" size="lg" kind="on-page">
	<button capsItemGroupAction capsButton type="button">Add person</button>
	<caps-item>
		<caps-item-media>
			<caps-avatar>
				<img capsAvatarImage src="/alice.jpg" alt="" />
				<caps-avatar-fallback>AM</caps-avatar-fallback>
			</caps-avatar>
		</caps-item-media>
		<caps-item-content>
			<caps-item-title><a capsLink href="/people/alice">Alice Martin</a></caps-item-title>
			<caps-item-description>Designer — Product team</caps-item-description>
		</caps-item-content>
		<caps-item-actions>
			<caps-badge variant="green">Member</caps-badge>
			<button capsButton type="button">Invite</button>
		</caps-item-actions>
	</caps-item>
	<caps-item>
		<a capsItem href="/people/bob" [disabled]="unavailable">
			<caps-item-content><caps-item-title>Bob's profile</caps-item-title></caps-item-content>
		</a>
	</caps-item>
</caps-item-group>
```

The snippet also imports `CapsButtonImports` and `CapsLinkImports` when these directives are used.
Native anchors retain `href`, `routerLink`, target, focus and open-in-new-tab behavior. Native buttons
retain their keyboard activation and type. Whole-item native links/buttons contain only descriptive
content or decorative icons; independent actions belong in a separate structural Item.

## Avatar

`CapsAvatar`, `CapsAvatarImage`, `CapsAvatarFallback`, `CapsAvatarBadge`, `CapsAvatarGroup` and
`CapsAvatarGroupCount` are exported individually and by `CapsAvatarImports`.

`caps-avatar` retains `size="default" | "sm" | "lg"` (default: `default`). Consumers project the native
`img[capsAvatarImage]`, a `caps-avatar-fallback`, and optional `caps-avatar-badge`. The image's native
`src` and `alt` remain on the image. Brain handles its load/error state. The fallback appears while
loading or following an error. The Capsule fallback wrapper exposes the image's alternative text during fallback,
and follows changes to `alt`; the loaded native image carries the alternative itself. An empty `alt`
marks the fallback decorative. Fallback-only avatars can contain readable text, or receive a consumer
`role="img"` and `aria-label` when initials need a complete accessible name. Status decoration does
not get an invented live-region role.

Groups/counts preserve the existing overlapping composition. No src/fallback/shape/width input is
added to Avatar. Classes remain available for application-specific sizing and decoration.

## Badge — Carbon Angular Tag

[Carbon Angular Tag](https://angular.carbondesignsystem.com/documentation/components/Tag.html)
provides the public properties: `type` becomes `variant`, with its values preserved: `red`, `magenta`,
`purple`, `blue`, `cyan`, `teal`, `green`, `gray`, `cool-gray`, `warm-gray`, `high-contrast`, `outline`.
Default: `gray`. `size` accepts `sm`, `md`, `lg` (default: `md`); `skeleton` defaults to false.

`CapsBadge` is the static `caps-badge` element. `CapsBadgeDirective` styles native `a[capsBadge]` and
`button[capsBadge]`; `CapsBadgeImports` exports both. Content, icons and optional decorations are
projected. Decorative icons should use `aria-hidden="true"`. Static skeleton badges suppress their
content and expose `aria-busy`. Native skeleton badges retain their native accessible name while
visually suppressing the label; consumers control their disabled state, since Tag has no disabled input.

The default without an explicit variant is now Carbon `gray`. Migration maps explicit Helm `default` to `high-contrast`, `secondary` to `gray`, `destructive` to `red`, and keeps
`outline`. `ghost` and `link` adopt `outline` presentation; navigation remains native. These visual
changes replace the old variants with the approved Carbon vocabulary. Badge no longer has invented
severity/status properties. Colors use the shared Tailwind palette and light/dark cascade in the Capsule
foundation stylesheet.

## Item — Carbon Angular ContainedListItem

[ContainedListItem source](https://github.com/carbon-design-system/carbon-components-angular/blob/master/src/contained-list/contained-list-item.component.ts)
provides disabled and projected icon/action content. `clickable` is represented by native `a[capsItem]`
or `button[capsItem]`, with no new click output. Brain supplies effective disabled native controls:
buttons have `disabled`; disabled anchors expose `aria-disabled`, leave the tab order and suppress
navigation and application click handlers.

`CapsItem` is `caps-item`. Structural slots are `CapsItemMedia`, `CapsItemContent`, `CapsItemTitle`,
`CapsItemDescription`, `CapsItemActions`, `CapsItemHeader`, `CapsItemFooter`. They are generic containers;
ItemTitle is text, not an implicit document heading. All are exported individually and by `CapsItemImports`,
which also exports `CapsItemDirective` and `CapsItemGroup`. Use existing `caps-separator` where needed.

As in Carbon's non-clickable item, structural `disabled` does not disable projected independent actions.
It records `data-disabled`, without an inherited `aria-disabled` claim or forced disabled styling.
Pass `[disabled]` to each native action when the application wants to disable those actions.

```html
<caps-item [disabled]="unavailable">
	<caps-item-content>Invitation</caps-item-content>
	<caps-item-actions>
		<button capsButton type="button" [disabled]="unavailable">Invite</button>
	</caps-item-actions>
</caps-item>
```

[ContainedList source](https://github.com/carbon-design-system/carbon-components-angular/blob/master/src/contained-list/contained-list.component.ts)
is represented by `caps-item-group`: `size="sm" | "md" | "lg" | "xl"` (default: `lg`),
`kind="on-page" | "disclosed"` (default: `on-page`), `isInset` (default: false), `label` (text or
TemplateRef) and `labelId`. Header actions use `[capsItemGroupAction]` projection, replacing the
Carbon `action`/`actionData` template pair with the consumer's own data binding. No competing action
input is introduced. A header action can be projected without a label. The list is named only when a
label exists; `labelId` is available for explicit server/client-stable IDs.

The group owns `role="list"`; structural Item declares `role="listitem"` within a group. Standalone
structural items stay generic. Links/buttons keep their native roles and are wrapped by `caps-item`
when they occur in a list. Parent list appearance and size replace Item's old `variant`/`size` inputs;
Media has no variant input. No density/width/maxWidth/align properties are added. Card's approved
width/maxWidth/density API is unchanged.

## Example composition audit

All 10 Avatar, 7 Badge and 11 Item previews and the three page APIs are migrated, including RTL,
groups, counts, status badges, menu composition, sizes, kinds, images and whole-item links. Item's
old variants/sizes previews and stories now demonstrate Carbon group kinds/sizes instead. Individual
projection wrappers become dedicated structural elements; available Capsule Button/Link/Separator
APIs are used. Whole-item links in a list receive a structural listitem wrapper. Icon-only group actions
have an accessible label. Avatar photos beside the same person's visible name are decorative.

Consumer migrations include home overview/dashboard/tasks, navigation/sidebar blocks, Message,
Spinner, Empty, Input, Card, HoverCard, index and styling showcase. Helm remains for components
outside the lot (DropdownMenu, Message, Spinner, Empty, Tooltip and others). These components keep
their own interaction primitives. Layout containers that constrain real previews, tables, grids,
responsive demonstrations or card layouts are retained. Classes customizing application imagery or
colorful fallback initials are retained; Badge color previews now use its public variants.

The catalogue generator regenerates snippets from the actual previews. API metadata includes the
new Capsule entry points. The existing Item Storybook E2E suite is migrated to the same public anatomy.

### Audited source inventory

- `apps/app/src/app/shared/header/header-mobile-nav.ts`
- `apps/app/src/app/pages/(components)/components/index.page.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar.server.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--badge.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--group-count.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--badge-icon.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--dropdown.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--basic.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--group-icon.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--sizes.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar.page.ts`
- `apps/app/src/app/pages/(components)/components/(card)/card--image.preview.ts`
- `apps/app/src/app/pages/(components)/components/(hover-card)/hover-card--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(hover-card)/hover-card.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input)/input--badge.preview.ts`
- `apps/app/src/app/pages/(components)/components/(spinner)/spinner--item.preview.ts`
- `apps/app/src/app/pages/(components)/components/(spinner)/spinner--badge.preview.ts`
- `apps/app/src/app/pages/(components)/components/(spinner)/spinner--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(spinner)/spinner.preview.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge.page.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge--link.example.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge--icons.preview.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge.preview.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge--variants.preview.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge.server.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge--spinner.preview.ts`
- `apps/app/src/app/pages/(components)/components/(badge)/badge--colors.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message)/message--group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message)/message.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message)/message--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message)/message--avatar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--avatar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(empty)/empty--avatar-group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--size.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--dropdown.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--avatar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--icon.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--image.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item.page.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--link.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item.server.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--variants.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--header.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--group.preview.ts`
- `apps/app/src/app/pages/(home)/components/tasks/tasks.ts`
- `apps/app/src/app/pages/(home)/components/tasks/components/title-cell.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/type-cell.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/table-section.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/status-cell.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/card-section.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/notion-prompt.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/item-demo.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/empty-avatar-group.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/spinner-badge.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/mentionable-item.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-rtl.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/dashboard-layout.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-collapsable-icons.page.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/version-support.page.ts`
- `apps/app/src/app/pages/(documentation)/documentation/(ui)/styles--complex-showcase.example.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/shared/sidebar/nav-user.ts`
- `apps/ui-storybook/stories/hlm-message-scroller.stories.ts`
- `apps/ui-storybook/stories/hover-card.stories.ts`
- `apps/ui-storybook/stories/card.stories.ts`
- `apps/ui-storybook/stories/avatar.stories.ts`
- `apps/ui-storybook/stories/hlm-item.stories.ts`
- `apps/ui-storybook/stories/hlm-message.stories.ts`
- `apps/ui-storybook/stories/badge.stories.ts`

## Validation evidence (2026-10-04)

- 887 workspace tests passed, followed by 150 Capsule tests after the additional fallback-only name
  regression (888 total at the final source state). Tools metadata snapshot was regenerated for the
  three new entry points; 43 generator tests passed.
- Angular typechecks pass for catalogue and Storybook. All 28 complete Avatar/Badge/Item snippet
  sources compile against the built Capsule package declarations.
- Production catalogue prerenders 154 routes. Library and Storybook production builds pass. The
  catalogue build uses the repository's `NODE_OPTIONS=--max-old-space-size=6000`; the first invocation
  without that setting reached the default 4GB heap during Nitro server bundling.
- Five catalogue Cypress tests passed: hydration, every preview's axe audit, no nested controls,
  group names/listitems, native link focus, four group sizes and both group kinds. The existing
  twenty Item Storybook Cypress tests passed with public Capsule selectors.
- Twenty-four principal renders were checked across catalogue/Storybook, 390/1280px and light/dark;
  zero preview axe violations, nested controls, viewport overflows or page errors. Inter is loaded
  in both surfaces. Every catalogue example also passed the dedicated preview accessibility audit.
  The surrounding documentation shell has existing unnamed copy/info controls and heading/table
  alerts; those unrelated shell findings are excluded from this lot's preview audit.
- Avatar fallback was separately rendered after an actual image error to verify its 32×32 geometry
  and full accessible alternative, in addition to the load/error/alt-change consumer tests.
- Lint passes across all nine projects (eight pre-existing application warnings); formatting and
  `git diff --check` pass. Brain has no source changes. Node used locally: 24.18.0; CI uses Node 22.

The new APIs do not publish an npm package or merge any branch. #36 remains independently compilable;
its floating-content consumers overlap with the Avatar/Badge migration and will need the coordinated
source union when both PRs are integrated.
