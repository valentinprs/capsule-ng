# styles

The style presets (`style-*.css`) that define the `spartan-*` classes used by helm, one file per
style, plus the `STYLES` list (`@spartan-ng/styles`), and the caps color tokens (see below). Nova
is the default style and the global baseline; see the comment at the top of `src/style-nova.css`.

Consumers import the CSS directly, e.g. from the showcase site's `styles.css`:

```css
@import '../../../libs/styles/src/style-nova.css' layer(spartan-nova-baseline);
```

## Caps color tokens

`src/caps-tokens.css` is the single source of color truth: it defines every `--caps-*` color token
for light (`:root`) and dark (`.dark`) mode, aligned with the Figma file Capsule-2 (collection
`Theme`, modes `shadcn` / `shadcn-dark`). The shadcn tokens used by helm and the brain Tailwind
preset alias them (`--primary: var(--caps-primary)`), and its `@theme` registers the colors the
preset does not know (`ring-error`, `surface`). Import it after the brain preset:

```css
@import '../../../libs/brain/hlm-tailwind-preset.css';
@import '../../../libs/styles/src/caps-tokens.css';
```

`CAPS_TOKENS_CSS` exposes the stylesheet source so the docs can show it without duplicating values.
It is a Vite `?raw` import: Vitest configs of consumers must opt the file in with
`test.css.include`.

## Running unit tests

Run `nx test styles` to execute the unit tests via [Vitest](https://vitest.dev).
