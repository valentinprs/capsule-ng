# Accordion

```ts
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';
```

```html
<caps-accordion>
	<caps-accordion-item title="Delivery" expanded>Three working days.</caps-accordion-item>
	<caps-accordion-item title="Returns" disabled>Contact support.</caps-accordion-item>
</caps-accordion>
```

Items expand independently. For one open section, bind each item's `expanded` and coordinate its
`selected` event (`{ id, expanded }`) in the consumer. `id` identifies the owned content panel.
The component owns its native heading/button, chevron and content region.

The root supports Carbon Angular's `align`, `size`, `isFlush`, `disabled` and `skeleton`.
The item supports `title` (text or a non-interactive title template), `context`, `id`, `expanded`,
`disabled`, `skeleton` and `selected`. Both export standalone classes and `CapsAccordionImports`.

See [the family API, sources and migration audit](../../../docs/specs/caps-disclosure.md).
