# styles

The style presets (`style-*.css`) that define the `spartan-*` classes used by helm, one file per
style, plus the `STYLES` list (`@spartan-ng/styles`). Nova is the default style and the global
baseline; see the comment at the top of `src/style-nova.css`.

Consumers import the CSS directly, e.g. from the showcase site's `styles.css`:

```css
@import '../../../libs/styles/src/style-nova.css' layer(spartan-nova-baseline);
```

## Running unit tests

Run `nx test styles` to execute the unit tests via [Vitest](https://vitest.dev).
