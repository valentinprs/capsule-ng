# @capsule-ng/caps/button

Import `CapsButton` or `CapsButtonImports` from `@capsule-ng/caps/button`.
Use `capsButton` on a native button; native type, focus, activation and disabled behavior are preserved.

```html
<button capsButton type="submit">Save</button>
<button capsButton variant="outline" type="button">Cancel</button>
<button capsButton variant="ghost" type="button">More</button>
<a capsButton variant="secondary" href="/settings">Settings</a>
```

Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
Sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
Import the Capsule preset and tokens for styling; consumer classes merge with the defaults.
Use `data-icon="inline-start"` or `data-icon="inline-end"` on inline icons for logical padding,
and provide an accessible name (for example `aria-label`) for buttons that only contain an icon.

An anchor keeps its link semantics, `href`, `routerLink` and `target`; no synthetic button role is added.
Its disabled input prevents click navigation, sets `aria-disabled="true"` and removes it from the tab order.
Use `capsLink` for ordinary text links, and `capsButton` for links that need the button variants and sizing.
The `link` variant on a native button is still an action, despite its visual appearance.
