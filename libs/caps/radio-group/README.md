# Radio group

Import `CapsRadioGroupImports` from `@capsule-ng/caps/radio-group`.

```html
<caps-field>
	<caps-field-label>Delivery</caps-field-label>
	<caps-radio-group [(value)]="delivery" name="delivery" required>
		<caps-radio value="standard">Standard</caps-radio>
		<caps-radio value="express">Express</caps-radio>
	</caps-radio-group>
	<caps-field-description>Choose a delivery speed.</caps-field-description>
</caps-field>
```

The group supports `value`/`valueChange`, `name`, `disabled`, `required`, `aria-label`,
`aria-labelledby`, `aria-describedby`, and Angular reactive, template-driven and signal forms.
Each option owns a native radio input, its indicator and a native label for projected text.
Use `id` to associate a separate label. Enclosing `CapsFieldLabel` cards are supported: the
option omits its own label to preserve valid native label nesting. Do not wrap the option in
an arbitrary native label.
Option inputs also accept `disabled`, `required`, `aria-label`, `aria-labelledby` and
`aria-describedby`. Group required and disabled states reach every native option.

Inside Field, the group uses the Field label as its accessible name and merges description/error
IDs with explicit `aria-describedby`. Nested option Fields associate their own FieldLabel with
the native radio input and isolate their help text. Native arrow-key selection, tab stops and
focus remain browser behavior. Consumer classes are merged on the public component hosts.
