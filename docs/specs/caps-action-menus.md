# Capsule action menus — issue #37 / lot08

## Validated contract

The issue's initial root/content samples were proposals. The implementation uses shared `@capsule-ng/caps/menu` anatomy, reexported by `/dropdown-menu`, `/context-menu` and `/menubar`. A native trigger receives a deferred template; its template owns one `caps-menu` panel. No inert dropdown/context/menubar-menu wrapper is needed. A template can be reused with different context data. Native button component selectors hide selectable/submenu indicators without wrapping or cloning the interactive element.

Sources verified on 2026-10-07:

- [Carbon Angular ContextMenu](https://angular.carbondesignsystem.com/documentation/components/ContextMenuComponent.html): panel `size=xs|sm|md|lg`, default `lg`. Capsule uses its existing control-height/font tokens.
- [ContextMenuItem](https://angular.carbondesignsystem.com/documentation/components/ContextMenuItemComponent.html): `disabled`, `danger`, `dangerDescription`, `info`, `checked`, `checkedChange`, `value`, `itemClick`. Projected content remains the native accessible label and icon content; `caps-menu-shortcut` can compose complex information. Dedicated checkbox/radio selectors determine the ARIA item type; their indicator is decorative. Ordinary item `danger` replaces Helm's `variant=destructive`; `dangerDescription` adds hidden accessible text.
- [ContextMenuGroup](https://angular.carbondesignsystem.com/documentation/components/ContextMenuGroupComponent.html): `type=radio|checkbox`, `label`, `value`/`valueChange`. Capsule adapts the upstream service's actual single/multiple selection into `string|string[]`. `label` renders the visible group heading and names the group, replacing consumer-built label anatomy. Untyped groups still isolate CDK radio siblings.
- [MenuButton](https://github.com/carbon-design-system/carbon-components-angular/blob/master/src/menu-button/menu-button.component.ts): `menuAlignment` becomes `placement`, with the six top/bottom positions; checkbox/radio activation keeps the menu open. The upstream menu button does not implement nested menus, so existing submenu/Sidebar lateral positioning is preserved: six inherited left/right placements adapt the same CDK/Helm side+align capabilities. No arbitrary new sizing, density or close-policy parameters are introduced.
- [OverflowMenu](https://angular.carbondesignsystem.com/documentation/components/OverflowMenu.html): `open`/`openChange` supplies two-way dropdown state. Existing deferred-template data and open/close notifications remain available.

Carbon Angular does not provide the existing coordinated Menubar or an equivalent context-trigger composition. Their `disabled`, side/align, deferred template/data and notifications remain inherited capabilities. ContextMenu's pointer behavior retains CDK; Shift+F10/ContextMenu keyboard invocation now uses the same CDK stack, focuses its first enabled command, and restores the triggering focus surface on menu closure. Browser focus outside the menu is preserved. Brain source remains unchanged; these Helm menus already use CDK menu primitives directly, with positions and transform-origin detection from Brain core.

## Native and accessible composition

Panels own `role=menu`, groups own `role=group`, separators own horizontal separator semantics and Menubar owns `role=menubar`. Buttons/anchors own menuitem, menuitemcheckbox and menuitemradio semantics. There is one native interactive node per command, no input/CVA and no extra Checkbox/Radio control inside selectable rows. Action button `type` defaults to `button`; consumers may still set its native type. Links preserve href/download/routerLink activation. `disabled` reflects both native button disabling and CDK navigation. `itemClick` adapts the existing activation event; checked/value events report actual selection changes.

Pointer hover follows focus through the existing modality-aware menu behavior. CDK retains arrow navigation, disabled skipping, typeahead, sibling menubar coordination, nested submenu focus, Escape/outside closure and RTL-aware positioning. Private CDK menu/menubar adapters adjust the existing key manager to skip native disabled buttons. Escape handled by a menu stops propagation, so closing a menu inside a Dialog/Sheet preserves the enclosing overlay. The context adapter exposes CDK's first-item focus and restores the surface after detachment. These adapters retain the existing stack and keyboard algorithms; Angular partial compilation requires their exports, but they remain documented `@internal` and are excluded from supported anatomy and generated API.

## Example audit and preserved exceptions

The inventory below covers every direct consumer found before migration. All three family pages, defaults, variants, source-derived snippets, Storybook families and supporting consumers migrate to public Capsule imports. Native auxiliary buttons use CapsButton. Cases/radios/submenus no longer construct indicator components. Groups with a simple heading use `label`; one-command groups and empty groups disappear. Informational user titles become labels rather than selectable divs. The Tasks avatar trigger and Sidebar footer action become native buttons. Item's dropdown rows become native button menu commands around noninteractive Item content.

Layout containers remain where they position a preview, collect multiple commands, display avatar/email content or demonstrate a block. Sidebar, Sheet, Table, MessageScroller and other not-yet-migrated primitives keep their existing public APIs until their own lots; their embedded menus/buttons use Capsule now. The styled menu family is a separate `libs/caps/menu.css` imported and packaged by the canonical Capsule preset, preserving the shared theme source. Lateral Sidebar placement, inherited context sides, explicit RTL direction providers and template context demos are intentional retained capabilities. No shared preview4200 or dependency-store content is modified. Local node_modules uses package-entry symlinks with local cache directories; Vite font access to the existing dependency store is temporarily allowed only for local verification and restored before commit.

## Validation

Local validation:13public Chromium contracts (native semantics, exact checked events, grouped state/dynamic choices, controlled state, disabled root/submenu/menubar, focus, submenu navigation, outside closure, Escape isolation);6API metadata/snapshot tests; production Angular Caps/app typechecks and Storybook tsc;64catalogue consumer sources compiled against the built Capsule declarations. Caps package builds with4secondary exports and menu.css. Catalogue audits cover146visible openings across1280/390px and light/dark, with no JavaScript errors, Axe violations, nested controls or horizontal panel overflow. Arabic RTL variants verify all3families, submenu keys and restored focus. Supporting12catalogue routes exercise41menus;6standalone Sidebars exercise30desktop and26mobile menus, preserving lateral placements. Menu-to-Sheet/AlertDialog activation retains focus in visible dialog content. The catalogue Cypress spec covers SSR/hydration, keyboard/Axe and the mobile Sidebar Escape regression. Storybook passes42/42menu and composition scenarios with retries disabled (36seconds). The native pointer-close assertion re-queries its trigger after realClick and also requires all menus to disappear: debugging confirmed CDK and public open were false and the fresh DOM was closed while a chained native-command subject was stale. The13th public Chromium contract exercises the same pointer/submenu closure. The final22-lot union must run the complete repository pipeline; this individual lot does not claim full remote CI or authorization to merge.

## Complete consumer inventory

- `apps/app/src/app/shared/page-options-dropdown/style-options-dropdown.ts`
- `apps/app/src/app/shared/page-options-dropdown/page-options-dropdown.ts`
- `apps/app/src/app/pages/(components)/components/(sidebar)/sidebar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--radio-group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--checkboxes-icons.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--shortcuts.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--destructive.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--icons.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--radio-group-icons.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu-with-context.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu-with-state.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--basic.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--submenu.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dropdown-menu)/dropdown-menu--checkboxes.preview.ts`
- `apps/app/src/app/pages/(components)/components/(avatar)/avatar--dropdown.preview.ts`
- `apps/app/src/app/pages/(components)/components/(alert-dialog)/alert-dialog--dropdown.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--sides.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu-with-state.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--icons.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--shortcuts.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--basic.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--destructive.preview.ts`
- `apps/app/src/app/pages/(components)/components/(context-menu)/context-menu--submenu.preview.ts`
- `apps/app/src/app/pages/(components)/components/(dialog)/dialog-context-menu.preview.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group.page.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group--rtl.example.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group.preview.ts`
- `apps/app/src/app/pages/(components)/components/(button-group)/button-group--dropdown-menu.example.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--commands.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--previous-context.preview.ts`
- `apps/app/src/app/pages/(components)/components/(message-scroller)/message-scroller--streaming.preview.ts`
- `apps/app/src/app/pages/(components)/components/(breadcrumb)/breadcrumb--dropdown.example.ts`
- `apps/app/src/app/pages/(components)/components/(table)/table--actions.preview.ts`
- `apps/app/src/app/pages/(components)/components/(data-table)/data-table--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(data-table)/data-table.preview.ts`
- `apps/app/src/app/pages/(components)/components/(data-table)/data-table.snippets.ts`
- `apps/app/src/app/pages/(components)/components/(data-table)/action-dropdown.ts`
- `apps/app/src/app/pages/(components)/components/(sheet)/sheet--from-dropdown.preview.ts`
- `apps/app/src/app/pages/(components)/components/(menubar)/menubar.preview.ts`
- `apps/app/src/app/pages/(components)/components/(menubar)/menubar--rtl.preview.ts`
- `apps/app/src/app/pages/(components)/components/(menubar)/menubar--icons.preview.ts`
- `apps/app/src/app/pages/(components)/components/(item)/item--dropdown.preview.ts`
- `apps/app/src/app/pages/(components)/components/(input-group)/input-group--dropdown.preview.ts`
- `apps/app/src/app/pages/(home)/components/tasks/tasks.ts`
- `apps/app/src/app/pages/(home)/components/tasks/components/table-actions.ts`
- `apps/app/src/app/pages/(home)/components/tasks/components/action-dropdown.ts`
- `apps/app/src/app/pages/(home)/components/playground/components/preset-action.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/action-dropdown.ts`
- `apps/app/src/app/pages/(home)/components/dashboard/components/dashboard-table-action.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/notion-prompt.ts`
- `apps/app/src/app/pages/(home)/components/overview/components/button-group-demo.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-rtl.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-footer.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-header.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-dropdown-menu.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/dashboard-layout.page.ts`
- `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview/sidebar-collapsable-icons.page.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/shared/sidebar/nav-user.ts`
- `apps/app/src/app/pages/(blocks-preview)/blocks-preview/shared/sidebar/nav-projects.ts`
- `apps/ui-storybook/stories/dropdown-menu.stories.ts`
- `apps/ui-storybook/stories/dialog.stories.ts`
- `apps/ui-storybook/stories/menubar.stories.ts`
- `apps/ui-storybook/stories/hlm-item.stories.ts`
- `apps/ui-storybook/stories/context-menu.stories.ts`
- `apps/ui-storybook-e2e/src/integration/item/item.cy.ts`
