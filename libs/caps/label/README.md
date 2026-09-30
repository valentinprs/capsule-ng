# @capsule-ng/caps/label

Import `CapsLabel` or `CapsLabelImports` from `@capsule-ng/caps/label` and apply `capsLabel`
to a native `<label>`. Include the Capsule CSS preset in your application to use its styling.

```html
<label capsLabel for="email">Email address</label>
<input id="email" type="email" />
```

`id` and `for` are forwarded to Brain's `BrnLabel`. Without an explicit id, Brain creates a unique
label id. Inside an existing Brain Field, `for` defaults to the registered labelable control's id.
An explicit, non-empty `for` always takes precedence; without a Field or explicit association,
no `for` attribute is added. A nested native control can also use the browser's implicit association.

The directive does not add a role or tabindex, handle clicks, or require Capsule Input or Textarea.
Clicking the label keeps the browser's native focus or toggle behavior. Consumer classes merge with
the `caps-label` hook and base layout. Disabled styling follows an ancestor `.group[data-disabled=true]`
or a preceding native `.peer:disabled` control; the label itself does not disable a control.
