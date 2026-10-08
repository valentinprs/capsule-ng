# Capsule Sidebar — issue #50

Source of truth: [Spartan Sidebar](https://www.spartan.ng/components/sidebar), read 2026-10-07,
and the public Helm entry point `libs/helm/sidebar/src/index.ts` at base
`dd2f72f1595fd2be78668b3dd5a75820f8de6e6d`. Carbon is not the interface reference.

This adapts the installed public interface. It adds no controlled state inputs/outputs to the
wrapper. `CapsSidebarService.open` and `openMobile` are read-only signals; application control
uses the existing service commands. The root-scoped service owns one responsive/keyboard lifecycle.

| Public interface                                                                                                                                                                                          | Official reference and exact installed source                                                                                                                                 | Capsule adaptation                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `side`, `variant`, `collapsible`                                                                                                                                                                          | [Sidebar](https://www.spartan.ng/components/sidebar#sidebar), `libs/helm/sidebar/src/lib/hlm-sidebar.ts`                                                                      | `CapsSidebar`, same physical sides, three variants and three reduction modes                                                                               |
| `sidebarWidthMobile`, `srOnlySheetTitle`, `srOnlySheetDescription`, `sidebarContainerClass`                                                                                                               | [Sidebar](https://www.spartan.ng/components/sidebar#sidebar), `hlm-sidebar.ts`                                                                                                | Same inputs; Capsule Sheet owns the named mobile modal                                                                                                     |
| `sidebarWidth`, `sidebarWidthIcon`                                                                                                                                                                        | [Wrapper](https://www.spartan.ng/components/sidebar#sidebar-wrapper), `hlm-sidebar-wrapper.ts`                                                                                | `caps-sidebar-wrapper`, same CSS variables; no state inputs or outputs                                                                                     |
| `open`, `openMobile`, `isMobile`, `variant`, `state` signals                                                                                                                                              | [Service](https://www.spartan.ng/components/sidebar#sidebar-service), `hlm-sidebar.service.ts`                                                                                | `CapsSidebarService`, same independent desktop/mobile state                                                                                                |
| `setOpen`, `setOpenMobile`, `setVariant`, `toggleSidebar`                                                                                                                                                 | [Service](https://www.spartan.ng/components/sidebar#sidebar-service), `hlm-sidebar.service.ts`                                                                                | Same commands; desktop writes cookies only in the browser                                                                                                  |
| `defaultOpen`, `sidebarWidth`, `sidebarWidthMobile`, `sidebarWidthIcon`, `sidebarCookieName`, `sidebarCookieMaxAge`, `sidebarKeyboardShortcut`, `mobileBreakpoint`, `closeMobileSidebarOnMenuButtonClick` | [Configuration](https://www.spartan.ng/components/sidebar#configuration), `hlm-sidebar.token.ts`                                                                              | `CapsSidebarConfig`, `provideCapsSidebarConfig`, `injectCapsSidebarConfig`; same names/defaults                                                            |
| `variant`, `size`, `isActive`, `tooltip`, `closeMobileSidebarOnClick`                                                                                                                                     | [Menu button](https://www.spartan.ng/components/sidebar#sidebar-menu-button), `hlm-sidebar-menu-button.ts`                                                                    | Native `a/button[capsSidebarMenuButton]`; disabled native controls and `aria-disabled` anchors prevent activation; active anchors have `aria-current=page` |
| `size`, `isActive`, `closeMobileSidebarOnClick`                                                                                                                                                           | [Sub button](https://www.spartan.ng/components/sidebar#sidebar-menu-sub), `hlm-sidebar-menu-sub-button.ts`                                                                    | Native `a/button[capsSidebarMenuSubButton]`, same size/default/config override                                                                             |
| `showOnHover`, `showIcon`, `srOnlyText`, rail `aria-label`                                                                                                                                                | [Anatomy](https://www.spartan.ng/components/sidebar#structure), `hlm-sidebar-menu-action.ts`, `hlm-sidebar-menu-skeleton.ts`, `hlm-sidebar-trigger.ts`, `hlm-sidebar-rail.ts` | Same controls; deterministic skeleton width avoids hydration drift                                                                                         |
| Native attributes and events                                                                                                                                                                              | [Composition](https://www.spartan.ng/components/sidebar#usage), public selectors above                                                                                        | Links keep href/routerLink/middle-click; buttons keep type/disabled/focus/Enter/Space; input keeps forms/value/native naming; no router dependency         |

## Anatomy and invariants

Structural parts are dedicated `caps-sidebar-*` components. Header/footer/content/group/label/
group-content/badge/separator/inset preserve their composition. Menu and submenu render their own
native `ul`; declared item templates render native `li` children, so custom hosts never become
invalid direct children of a list. They remain navigation lists, without widget menu roles.
A native `nav` names each Sidebar. Inset projects content and never manufactures a `main`.
Native group-label buttons remain available for Collapsible composition.

Menus compose the integrated Capsule dropdowns. Escape first dismisses a nested menu and then the
Sheet. Mobile uses public Capsule Sheet `[(open)]`, `capsSheetContent`, title/description, physical
side, and no internal close button; callers can keep the native Sidebar trigger. Sheet supplies
focus trapping, restoration, Escape/backdrop and scroll lock. Constant panel classes use a bound
`[class]` because Angular does not forward static ng-template classes.

Cookie restoration uses `DOCUMENT.cookie` in the browser or `REQUEST.headers` on SSR. Only exact
true/false values override defaultOpen. `matchMedia` uses configured mobileBreakpoint, not a fixed
CSS breakpoint. Every transition to desktop closes mobile state; desktop state remains unchanged.
Listeners and resize timers are destroyed with the service. Ctrl/Cmd plus the configured key is
handled once. Tooltip is enabled only for a collapsed desktop Sidebar; text remains in the name.
Disabled links/buttons do not close mobile state. CSS uses existing sidebar/focus/theme tokens.

## Consumer inventory

All 14 routes in `apps/app/src/app/pages/(sidebar-preview)/sidebar-preview`, the shared Sidebar
helpers and both inset/sticky-header blocks, the blocks landing page, catalogue side-nav, home
dashboard, component page/server/displayed snippets, and Sidebar stories migrate together.
Supporting available Capsule APIs are retained. Separator placement, placeholder anchor hrefs,
icon-only names, input names and dangling aria-describedby in stories are reviewed.

## Validation plan

Public service tests: default/config/cookie browser and SSR, invalid cookie, unique shortcut,
matchMedia/resize/recovery/cleanup and separate states. Component tests: native lists/links,
active/disabled, reduction modes and configured widths. Real catalogue/Storybook QA at1280/390,
light/dark and RTL: no overflow, loaded Inter/Geist Mono, keyboard, collapsed tooltip, mobile
Sheet focus/Escape/backdrop/scroll, nested menu Escape, SSR hydration and cookie recovery.
Source and built declarations, docs/API/snippets, lint, format and package build are required.
Heavy commands wait for the explicit central grant; no commit until complete evidence.

The ConfiguredWidths story uses a 32rem mobile width with a right-side panel. The browser gate
measures the actual Sheet panel against the390px viewport and verifies the wrapper's width/icon
variables inside the portal; checking the nav inline style alone is insufficient. The stylesheet
caps the panel to the viewport and the owned nav to its panel content box. The portal explicitly
receives wrapper CSS variables and native direction/language from the original Sidebar ancestry.

Tooltip uses the existing public Brain Tooltip directly because the installed Sidebar contract
requires its mutable disabled signal during desktop/mobile transitions. Capsule supplies its shared
Tooltip content class; no Helm tooltip styles or private Capsule exports are imported.

The documentation's two inherited anatomy PNGs contain Hlm class names. The page now renders
the same header/content/two-groups/footer anatomy as accessible HTML with Capsule element names;
the original PNG assets remain untouched. The shared foundations import already includes the preset.

The catalogue server maps its native Analog IncomingMessage to Angular's public REQUEST with
`createWebRequestFromNodeRequest` from `@angular/ssr/node`. Runtime diagnostics established that
the original Angular token was null while the Analog token contained the test cookie. Actual
GET/HEAD/POST contracts preserve URL, method, headers and body; no Sidebar dependency on Analog
is introduced. DEV SSR true/false cookie rendering and hydrated recovery are verified separately
from production SSR, which remains a central union check.
