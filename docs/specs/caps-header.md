# Capsule Header

Status: implemented (2026-10-20); single navigation since `feat/header-single-navigation`. Figma: Capsule 2 file, page
"Header - NEW •", component `4523:38`.

## Origin

Spartan has no header component: its sidebar blocks write a plain `<header>` with Tailwind classes
and size it with `--header-height`. The Capsule Header comes from MyHandover's `AppHeader`
(`components/app-shell/app-header.tsx`) and was first designed in Figma.

## Anatomy

| Figma                               | Code                                                          | Notes                                                                 |
| ----------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------- |
| Header                              | `caps-header`                                                 | `role="banner"`, `h-14`, `bg-background`, bottom border, `px-4`       |
| Menu button + `Show menu button`    | rendered by `caps-header` (`caps-header-menu` sets its texts) | Below `md` when a `*capsHeaderNav` exists; not mapped by Code Connect |
| `Visual ID` slot + `Show visual ID` | `caps-header-visual`                                          | Always 40 × 40 px, content clipped                                    |
| `App name`                          | `caps-header-title`                                           | `text-sm font-semibold`, truncated                                    |
| Navigation Menu + `Show navigation` | `caps-navigation-menu *capsHeaderNav`                         | In the bar from `md`, in the menu sheet below                         |
| `Actions` slot + `Show actions`     | `caps-header-actions`                                         | Theme toggle and avatar by default                                    |
| Brand logo (no property)            | `caps-header-logo`                                            | Slot in code, 56 × 56 px; the app provides the asset                  |

## Decisions

- **No breakpoint input.** Figma had a Desktop/Mobile variant; it was replaced by `Show menu button`
  because, in code, the switch is a CSS media query on `md` (48rem), as in Spartan's blocks and
  MyHandover. The property is therefore left out of Code Connect.
- **Fixed layout.** `caps-header` projects each part into its place with `ng-content select`, so the
  template order does not change the rendering. Unknown content goes before the actions.
- **The navigation is written once.** `ng-content` cannot project the same nodes twice, so
  `*capsHeaderNav` turns the navigation into a template that `caps-header` renders in the bar and
  in the menu sheet, where CSS stacks it. The menu button only exists with a navigation, and
  `caps-header-menu` only carries its texts. The sheet closes when a link inside is followed and
  when the viewport grows past `md`. Navigation menu triggers render flat in the sheet: collapsible
  sub-menus on mobile are not supported yet. Code Connect wraps the nested Navigation Menu snippet
  in `<ng-container *capsHeaderNav>`, since a nested snippet cannot take the directive.
- **The logo is a slot in code, fixed in Figma.** Figma always shows the brand logo, with no
  property. In code, `caps-header-logo` is a slot so that an app can omit the logo or wrap it in a
  link. The logo asset is not in the repository: the app provides it, and Code Connect always
  writes the slot with an `img` placeholder.
- **Router-free**, like the rest of Capsule: projected native links carry `href` or `routerLink`.
