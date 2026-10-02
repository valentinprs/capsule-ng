# @capsule-ng/caps/field

Import `CapsFieldImports` from `@capsule-ng/caps/field`. It includes all nine dedicated Field components, including `CapsFieldLabel`. Input and Textarea keep their own entry points and value bindings.

```html
<caps-field>
	<caps-field-label>Email address</caps-field-label>
	<input capsInput type="email" [formControl]="emailControl" />
	<caps-field-description>We will never share your email.</caps-field-description>
	<caps-field-error validator="required">Email is required.</caps-field-error>
	<caps-field-error validator="email">Enter a valid email address.</caps-field-error>
</caps-field>
```

A Field represents one labelable control. It composes Brain's Field context and preserves native
attributes and Angular reactive, template-driven and signal forms. `caps-field-label` renders a native label and infers its `for`
from the control unless supplied explicitly. Its `id` belongs only to that native label. Field names its `role="group"` using the projected
label. Labels and controls must be in its projected content; labels hidden in another component's
own template still associate through Brain but are not discovered for the group's accessible name.

Descriptions generate an `id` when omitted and combine with consumer `aria-describedby` IDs.
Visible errors are registered the same way; hidden, removed and renamed messages leave no stale
references. This also works through `caps-field-content`. Each Field isolates its descriptions
from adjacent fields and enclosing fieldsets.

`caps-field-error` projects your translated/custom content. `validator` matches an Angular error
key; omit it to match any error. Visibility follows Brain's configured error-state matcher, including
form submission for the default template-driven matcher. `forceShow` displays a manual message and
registers it as a description without changing the control's validation ARIA. Without a Field,
an error is always displayed. `forceInvalid` on Field forces visual styling only; it neither makes
valid controls semantically invalid nor reveals hidden validator messages.

Use `orientation="vertical"` (default), `"horizontal"` or `"responsive"`. Responsive follows the
width of the enclosing FieldGroup container, switching at Tailwind's `@md` container breakpoint.

```html
<caps-field-group>
	<caps-field orientation="responsive">
		<caps-field-content>
			<caps-field-label>Name</caps-field-label>
			<caps-field-description>As it appears on invoices.</caps-field-description>
		</caps-field-content>
		<input capsInput [formControl]="nameControl" />
	</caps-field>
</caps-field-group>
```

Use `<caps-field-set>` and its direct `<caps-field-legend>` for semantic grouping. FieldSet
renders a native fieldset; it renders the projected legend content as the first native legend child,
without a custom element between fieldset and legend. Legend supports dynamic content and an optional id.
Legend's `variant` is `"legend"` by default, or `"label"` for smaller text. FieldSet preserves native
`disabled` behavior; it does not call Angular control.disable(). A FieldDescription directly under
FieldSet describes the fieldset, while nested Fields maintain independent scopes. Manual
`aria-describedby` IDs on FieldSet are supported.

`caps-field-separator` renders a decorative line and optional readable content. `caps-field-group`
and `caps-field-content` are layout containers, without synthetic ARIA roles. Import the Capsule
CSS preset and tokens for styling; consumer classes merge with the defaults. Label, Set and Legend forward their class strings to
the native element they render. The standalone `label[capsLabel]` directive remains available from
`@capsule-ng/caps/label`, separately from Field imports.
