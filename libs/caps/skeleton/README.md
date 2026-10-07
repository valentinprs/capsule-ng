# CapsSkeleton

```ts
import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';
```

```html
<section aria-label="Profile" aria-busy="true"><caps-skeleton class="h-4 w-48" /></section>
```

An empty, decorative placeholder with no inputs, outputs or focus behavior. Size and shape it with `class`; the parent owns `aria-busy` and replaces it with the real content when ready. Every placeholder is hidden from assistive technology. Reduced motion disables the pulse. Like [Spartan Skeleton](https://www.spartan.ng/components/skeleton), there are no properties; this component does not generate text rows or random widths.

Styles use the shared Capsule foundations and preset. See [the loading spec](../../../docs/specs/caps-loading.md) for the full inventory and validation.
