# Kbd

Import `CapsKbdImports` from `@capsule-ng/caps/kbd`.

```html
<caps-kbd-group aria-label="Control and S">
	<kbd capsKbd>Ctrl</kbd>
	<kbd capsKbd>S</kbd>
</caps-kbd-group>
```

`CapsKbd` decorates a native kbd element; `CapsKbdGroup` provides logical grouping. Neither installs
keyboard listeners or adds focus. Labels and actual shortcuts belong to the consuming application.

This follows [Spartan Kbd](https://www.spartan.ng/components/kbd): projected key text and groups,
without functional inputs, outputs or imperative methods. Capsule uses a structural group element
and an optional native ARIA group name.
