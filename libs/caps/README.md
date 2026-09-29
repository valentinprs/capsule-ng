# caps

Element-based styled components for capsule-ng (see `docs/adr/0001-caps-element-vs-attribute.md`).
Non-interactive structure is exposed as `<caps-*>` elements that carry their own ARIA roles;
native interactive elements keep their native element and receive `caps*` attribute directives.

Each component is a secondary entry point, e.g. `@capsule-ng/caps/breadcrumb` or
`@capsule-ng/caps/link`.

The `caps-*` hook classes are defined in `caps-preset.css`, which the showcase site imports from its
`styles.css`.

## Running unit tests

Run `nx test caps` to execute the unit tests via [Vitest](https://vitest.dev).
