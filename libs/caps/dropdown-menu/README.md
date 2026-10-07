# Dropdown Menu

`CapsDropdownMenuImports` reexports the shared [menu anatomy](../menu/README.md) and `button[capsDropdownMenuTrigger]`. Bind its template directly; no inert root wrapper is necessary, and multiple triggers can reuse a context-aware template.

`placement` adapts Carbon Angular `MenuButton.menuAlignment`: `bottom`, `bottom-start`, `bottom-end`, `top`, `top-start`, `top-end`. Existing lateral CDK/Helm placement is retained as `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`; it remains necessary for Sidebar and nested compositions. CDK provides flipping, RTL and transform-origin detection. `open`/`openChange` follows Carbon OverflowMenu's two-way state. `capsDropdownMenuTriggerData` preserves deferred template context; `opened` and `closed` preserve the existing notifications.

Keep the trigger a native button, normally styled with `capsButton`. Normal menu selection closes and returns focus; checkbox/radio selection stays open; Escape and outside activation close according to CDK's existing menu stack.
