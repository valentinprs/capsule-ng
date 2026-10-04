# Card

Import `CapsCardImports` from `@capsule-ng/caps/card`.

| Input    | Values                   | Default   |
| -------- | ------------------------ | --------- |
| width    | `fill`, `auto`           | `fill`    |
| maxWidth | `sm`, `md`, `lg`, `none` | `none`    |
| density  | `default`, `compact`     | `default` |

`fill` uses available width; `auto` fits content even in flex-column/grid stretch layouts. Both stay within their parent. The maximum widths use shared container tokens (24rem, 28rem, 32rem), clamped on small screens. Density affects spacing and title typography independently of width.

```html
<caps-card maxWidth="sm" density="compact" class="mx-auto">
	<caps-card-header><caps-card-title [level]="2">Account</caps-card-title></caps-card-header>
	<caps-card-content>Manage your account.</caps-card-content>
</caps-card>
```

Classes and inline styles are escape hatches for custom widths, responsive layout, margins and `--card-spacing`. Cards do not add landmarks; titles render a native heading (default level 3).

See [the composition specification](../../../docs/specs/caps-visual-containers.md).
