# Capsule Sidebar

Import `CapsSidebarImports` and `CapsSidebarService` from `@capsule-ng/caps/sidebar`.
Use `<caps-sidebar-wrapper>`, `<caps-sidebar>`, header/content/footer/group/inset components.
`<caps-sidebar-menu>` contains `<caps-sidebar-menu-item>` declarations; both menu and sub-menu
own native lists. Native anchors/buttons use `capsSidebarMenuButton` or `capsSidebarMenuSubButton`.
Keep href/routerLink and accessible names on those controls. Native group actions, rail, input,
trigger and collapsible group-label buttons preserve the installed Spartan composition.

`CapsSidebarService` retains `open`, `openMobile`, `isMobile`, `variant` and `state` signals,
and `setOpen`, `setOpenMobile`, `setVariant`, `toggleSidebar`. The wrapper has only width inputs.
Configuration keeps Spartan names through `provideCapsSidebarConfig`. Mobile composes Capsule
Sheet for named dialogs, focus, Escape and backdrop. Inset never adds a main landmark.

See [interface mappings and inventory](../../../docs/specs/caps-sidebar.md).
