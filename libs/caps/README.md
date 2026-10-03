# caps

Element-based styled components for capsule-ng (see `docs/adr/0001-caps-element-vs-attribute.md`).
Non-interactive structure is exposed as `<caps-*>` elements that carry their own ARIA roles;
native interactive elements keep their native element and receive `caps*` attribute directives.
Composite Checkbox, Switch and Radio own their native Brain control and visual indicator; see
ADR amendment 3 and the READMEs in `checkbox`, `switch` and `radio-group`.

Each component is a secondary entry point, e.g. `@capsule-ng/caps/breadcrumb` or
`@capsule-ng/caps/link`.

The `caps-*` hook classes are defined in `caps-preset.css`, which the showcase site imports from its
`styles.css`.

## Running unit tests

Run `nx test caps` to execute the unit tests via [Vitest](https://vitest.dev).

## Shared foundations

Install the built Capsule package and its peer dependencies, including Tailwind
4.3.3+, `@fontsource/inter`, `@fontsource/geist-mono`,
`@fontsource-variable/noto-sans-arabic` and `@fontsource-variable/noto-sans-hebrew`.
This repository's package is private; build/install its local archive until a
release is available. Install the matching locally built `@spartan-ng/helm`
archive as well, since Capsule uses its shared utilities.

With the Tailwind v4 PostCSS integration configured, import once in global CSS:

```css
@import '@capsule-ng/caps/foundations.css';
```

This includes the fonts, primitive scales, light/dark tokens, Helm compatibility
skins and Capsule preset. Add `style-nova` to the body when retaining Helm
components, and toggle `dark` for the dark theme. Inter and Geist Mono are the
default loaded fonts. Override `--caps-font-sans`, `--caps-font-mono`,
`--caps-radius`, `--caps-spacing` or semantic `--caps-*` colors after the import
instead of redefining Helm aliases. Supply font faces for an alternative font.

See [the inventory and cascade contract](../../docs/design-tokens.md) for ownership,
component tokens and structural exceptions. In an Angular builder that already
resolves imported CSS URLs, disable `transformAssetUrls` in the Tailwind PostCSS
plugin, as in Storybook, to avoid rebasing font URLs twice.
