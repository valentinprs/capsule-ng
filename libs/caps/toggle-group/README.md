# Toggle Group

Import `CapsToggleGroupImports` from `@capsule-ng/caps/toggle-group`.

```html
<caps-toggle-group type="multiple" [(value)]="formatting" aria-label="Formatting">
	<button capsToggleItem value="bold">Bold</button>
	<button capsToggleItem value="italic">Italic</button>
</caps-toggle-group>
```

The structural group projects native pressed buttons. Brain preserves `type="single"` (default) or `multiple`, `value`/`valueChange`, `nullable=true`, `disabled=false`. Single values can be cleared to `null`; multiple values are arrays. Set `nullable=false` to prevent clearing the last choice. Items accept `value`, `disabled`, `id`, `state`/`stateChange`, `aria-label`, and native button `type`; within a group the group owns selection.

The existing visual choices remain: `variant="default"|"outline"`, `size="default"|"sm"|"lg"`, `spacing=0` and `orientation="horizontal"|"vertical"`. Group variant and size apply to its items. Consumer classes override appearance on the public elements.

The group retains Brain's Angular reactive, template-driven and signal-form value accessor. Capsule makes both the explicit disabled input and the value accessor's disabled state reach the native buttons; enabling the form preserves individually disabled items. ToggleGroup is a `role="group"`, not a tablist, radio group or switch. Tab visits each enabled button; Enter and Space activate it. There is no arrow navigation or roving tab stop.

A surrounding Capsule Field names the group through FieldLabel and adds descriptions and visible errors, together with explicit `aria-describedby`. Supply `aria-label` or `aria-labelledby` when the group is used on its own. Items need readable text or their own stable accessible labels. Field labels name the group; they do not activate a choice.

Carbon Angular has no equivalent group of pressed buttons. Carbon ContentSwitcher selects tab content and cannot supply this API. This wrapper preserves the existing Brain behavior without introducing new selection or keyboard features.
