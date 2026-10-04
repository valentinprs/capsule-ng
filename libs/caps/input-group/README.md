# Input Group

Import `CapsInputGroupImports` from `@capsule-ng/caps/input-group`, together with `CapsInputImports`, `CapsTextareaImports` or `CapsButtonImports` for the controls you project.

```html
<caps-input-group>
	<input capsInput aria-label="Search" placeholder="Search…" />
	<caps-input-group-addon align="inline-end">
		<button capsButton type="button" variant="ghost" size="xs">Search</button>
	</caps-input-group-addon>
</caps-input-group>
```

The group only composes native controls. Bind forms, IDs, readonly/required/disabled attributes and validation to the input or textarea. Capsule Field labels and descriptions associate with that native control. Keep actions outside labels.

Addon `align` keeps the existing `inline-start` default, `inline-end`, `block-start` and `block-end`. Logical placement follows inherited HTML direction. Use `caps-input-group-text` for prefixes, suffixes and status text. Consumer classes remain available on the public elements.

Carbon Angular has no equivalent InputGroup API. This migration preserves the existing composition without adding group value, sizing or density properties. See [the composition specification](../../../docs/specs/caps-composed-inputs.md).
