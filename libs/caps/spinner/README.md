# CapsSpinner

```ts
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
```

```html
<caps-spinner aria-label="Loading documents" />
<button capsButton disabled>
	<caps-spinner aria-hidden="true" class="text-sm" />
	Saving…
</button>
```

Properties follow [Spartan Spinner](https://www.spartan.ng/components/spinner): `icon="lucideLoader2"` (custom icons registered with provideIcons) and native `aria-label="Loading"`. Dimensions and colors use class. The inner icon is decorative. Native `aria-hidden="true"` is the Capsule accessibility adaptation for surrounding text or a parent status: it also removes the spinner status role/name. Reduced motion disables rotation. No variants, activation or overlay API.

Styles use the shared Capsule foundations and preset. See [the loading spec](../../../docs/specs/caps-loading.md) for inventory and validation.
