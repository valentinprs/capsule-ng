# Collapsible

```ts
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
```

```html
<caps-collapsible [(expanded)]="expanded">
	<button capsCollapsibleTrigger>Project details</button>
	<caps-collapsible-content>12 documents and 3 members.</caps-collapsible-content>
</caps-collapsible>
```

The root supports `expanded`/`expandedChange`, `disabled` and `#details="capsCollapsible"`
(`expanded`, `disabled`, `state`, `toggle()`). The consumer owns the native button; its `type`
defaults to button. Content accepts an optional `id`; the trigger's `aria-controls` follows it.
Closed content is inert. Omitting the expanded binding retains uncontrolled expansion.

Exported classes: `CapsCollapsible`, `CapsCollapsibleTrigger`, `CapsCollapsibleContent` and
`CapsCollapsibleImports`. See [the family audit and preserved capabilities](../../../docs/specs/caps-disclosure.md).
