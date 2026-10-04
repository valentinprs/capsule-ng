# Input OTP

Import `CapsInputOtpImports` from `@capsule-ng/caps/input-otp`.

```html
<caps-input-otp length="4" aria-label="Verification code" [(value)]="code">
	<caps-input-otp-group>
		<caps-input-otp-slot index="0" />
		<caps-input-otp-slot index="1" />
		<caps-input-otp-slot index="2" />
		<caps-input-otp-slot index="3" />
	</caps-input-otp-group>
</caps-input-otp>
```

One native input handles focus, editing and paste. Project groups, indexed slots and optional `caps-input-otp-separator` elements to choose the layout. Slots are decorative; name the input through Capsule Field or standard ARIA. `id` and the ARIA label/descriptions belong to the native input. Field descriptions merge with explicit IDs.

The existing `length` (required), `inputMode` (`numeric`), `autocomplete` (`one-time-code`), `autofocus`, `disabled`, `value`/`valueChange`, `transformPaste` and `completed` behavior is preserved. Slots retain the visual `forceInvalid` override. Explicit disabling and Angular forms disabling are independent; either disables the input. Reactive, template and Signal Forms use the root value accessor.

`inputMode` is a keyboard hint, not numeric validation. Use Angular validators for required length or digit policy. Paste is transformed then truncated to length; typing beyond length follows Brain's last-character replacement. Completion fires when user edits move from incomplete to complete; a complete programmatic forms write also emits, including repeated writes. Value writes do not emit `valueChange`. Initial forms completion waits for the native view to initialize.

Brain's visual active-slot/caret follows value length and focus, not arbitrary native selection. Capsule foundations supply the caret animation with reduced-motion support. Carbon Angular has no equivalent OTP component; no grouping or density properties were added, and Brain remains unchanged. See [the composition specification](../../../docs/specs/caps-composed-inputs.md).
