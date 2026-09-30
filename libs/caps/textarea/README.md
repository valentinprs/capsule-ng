# @capsule-ng/caps/textarea

Secondary entry point of `@capsule-ng/caps`. Import `CapsTextarea` or `CapsTextareaImports` from
`@capsule-ng/caps/textarea` and apply `capsTextarea` to a native `<textarea>`.

```html
<label for="message">Message</label>
<textarea capsTextarea id="message" rows="4" placeholder="Type your message here."></textarea>
```

The directive composes `BrnTextarea` and Brain's field description behavior. It exposes `id`
(generated when omitted), `forceInvalid` and `aria-describedby`, and supports field-provided labels,
descriptions and errors. Consumer description IDs are merged with the Field's description and
error IDs without duplicates. `forceInvalid` changes the visual invalid state; `aria-invalid` continues to reflect the
form control's validation state. It does not add a value accessor: reactive, template-driven and
signal forms bind directly to the native textarea.

Native attributes such as `rows`, `cols`, `maxlength`, `required`, `readonly`, `disabled` and
`placeholder` remain available. Capsule preserves the minimum height and uses CSS content sizing
where supported. Other browsers retain native row sizing, scrolling and the resize handle. Consumer
classes merge with the defaults, so sizing and resizing can be customized.

Import the Capsule CSS preset after Tailwind to style the `caps-textarea` hook. Its theme tokens
provide focus, disabled and invalid appearances in light and dark themes.
