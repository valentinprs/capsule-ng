# Empty

Import `CapsEmptyImports` from `@capsule-ng/caps/empty` and load the shared Capsule
preset/foundations. Project content and native `button capsButton` / `a capsLink` actions.

Empty adds no role or live attribute, as in Spartan. Applications can set native `role`
or `aria-live` attributes when needed, including a separate `role="status"` update after an action.
Titles are styled text; project a native heading where the document hierarchy needs one.

The media input follows [Spartan Empty](https://www.spartan.ng/components/empty):
`variant: CapsEmptyMediaVariants['variant']` accepts `'default' | 'icon' | null | undefined`.
The input starts at `undefined`; omission uses the effective `'default'` style, while `null`
omits variant styling. Root, header, title, description, content and actions have no inputs
or outputs. Media has no outputs. Content and native action behavior stay with the consumer.

See [anatomy, API decisions and migration inventory](../../../docs/specs/caps-alert-empty.md).
