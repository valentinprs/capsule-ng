# Header

Import `CapsHeaderImports` from `@capsule-ng/caps/header` (and `CapsNavigationMenuImports` for the
navigation) and load the shared Capsule preset.

```html
<caps-header>
	<caps-header-visual><img src="/icon.svg" alt="" /></caps-header-visual>
	<caps-header-title>Capsule</caps-header-title>
	<caps-navigation-menu *capsHeaderNav aria-label="Primary">
		<li capsNavigationMenuItem><a capsNavigationMenuLink href="/docs" active>Getting started</a></li>
		<li capsNavigationMenuItem><a capsNavigationMenuLink href="/components">Components</a></li>
	</caps-navigation-menu>
	<caps-header-actions>…</caps-header-actions>
	<caps-header-logo><img src="/logo.svg" alt="…" /></caps-header-logo>
</caps-header>
```

`caps-header` is the application bar (`role="banner"`, 56 px, bottom border). It places its parts
in a fixed order, whatever their order in the template: menu button, visual, title and navigation
at the start; actions and the logo at the end.

- `caps-header-visual` holds a 40 × 40 px product icon, logo or monogram; larger content is clipped.
- `caps-header-title` is the app name, truncated when space runs out. It is not a heading.
- `*capsHeaderNav` marks the primary navigation, written once. From the `md` breakpoint it shows in
  the bar. Below `md`, the header shows a ghost menu button before the visual, which opens the same
  navigation, stacked, in a left Sheet; following a link closes it, and so does growing past
  `md`. The current link (`active` or `routerLinkActive`) is therefore the same in both places.
- `caps-header-menu` is optional and renders nothing: it only sets the menu texts. Inputs: `label`
  (button name, default `Open navigation`), `title` (sheet title, default `Navigation`) and
  `description`. Without a `*capsHeaderNav` navigation there is no menu button.
- `caps-header-actions` holds native actions such as a theme toggle or an avatar.
- `caps-header-logo` holds the brand logo, 56 × 56 px. Capsule does not ship the logo asset: the
  app provides it as a named `img` or inline `svg`. The Figma component always shows the logo.

Capsule stays router-free: put `href` or `routerLink` on the projected native links. Make the bar
sticky with a class, for example `<caps-header class="sticky top-0 z-10">`.

The Figma `Show menu button` property is design-only and is not mapped by Code Connect. See
[the design notes](../../../docs/specs/caps-header.md).
