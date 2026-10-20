# Header

Import `CapsHeaderImports` from `@capsule-ng/caps/header` and load the shared Capsule preset.

```html
<caps-header>
	<caps-header-menu title="Capsule navigation">
		<nav aria-label="Primary"><a capsButton variant="ghost" href="/docs">Getting started</a></nav>
	</caps-header-menu>
	<caps-header-visual><img src="/icon.svg" alt="" /></caps-header-visual>
	<caps-header-title>Capsule</caps-header-title>
	<caps-header-nav>
		<caps-navigation-menu aria-label="Primary">…</caps-navigation-menu>
	</caps-header-nav>
	<caps-header-actions>…</caps-header-actions>
	<caps-header-logo><img src="/logo.svg" alt="…" /></caps-header-logo>
</caps-header>
```

`caps-header` is the application bar (`role="banner"`, 56 px, bottom border). It places its parts
in a fixed order, whatever their order in the template: menu, visual, title and navigation at the
start; actions and the logo at the end.

- `caps-header-visual` holds a 40 × 40 px product icon, logo or monogram; larger content is clipped.
- `caps-header-title` is the app name, truncated when space runs out. It is not a heading.
- `caps-header-nav` holds the primary navigation and is hidden below the `md` breakpoint.
- `caps-header-menu` shows a ghost menu button below `md`. It opens a left Sheet with the projected
  content; following a link closes it, and so does growing past `md`. Inputs: `label` (button
  name, default `Open navigation`), `title` (sheet title, default `Navigation`) and `description`.
- `caps-header-actions` holds native actions such as a theme toggle or an avatar.
- `caps-header-logo` holds the brand logo, 56 × 56 px. Capsule does not ship the logo asset: the
  app provides it as a named `img` or inline `svg`. The Figma component always shows the logo.

Capsule stays router-free: put `href` or `routerLink` on the projected native links. Make the bar
sticky with a class, for example `<caps-header class="sticky top-0 z-10">`.

The Figma `Show menu button` property is design-only and is not mapped by Code Connect. See
[the design notes](../../../docs/specs/caps-header.md).
