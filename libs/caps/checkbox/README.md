# @capsule-ng/caps/checkbox

Import `CapsCheckbox` or `CapsCheckboxImports` from `@capsule-ng/caps/checkbox`.

```html
<caps-field orientation="horizontal">
	<caps-checkbox id="preference" [formControl]="preference" />
	<caps-field-label>Enable notifications</caps-field-label>
	<caps-field-description>Receive updates by email.</caps-field-description>
</caps-field>
```

The component owns its indicator and native button. `id` targets that button; `class` styles it.
Use `[(checked)]`, reactive forms, or `[(ngModel)]`. `disabled` and Angular disabled state prevent
interaction. `required` exposes the required state; use an Angular validator to enforce it.
Field labels associate automatically, and Field descriptions/errors merge with explicit
`aria-describedby`. Standalone controls accept `aria-label`, `aria-labelledby`, and native labels
with `for`. `forceInvalid` changes visual feedback without overriding semantic form validity.

`[(indeterminate)]` exposes the mixed state. Activating a mixed checkbox checks it and clears indeterminate.
