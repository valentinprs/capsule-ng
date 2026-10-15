# Capsule Bubble

Import `CapsBubbleImports` from `@capsule-ng/caps/bubble`.

Properties follow [Spartan Bubble](https://www.spartan.ng/components/bubble):

- `CapsBubble`: `variant` defaults to `default` (default, secondary, muted, tinted, outline, ghost, destructive); `align` defaults to `start` (start/end).
- `CapsBubbleReactions`: `side` defaults to `bottom` (top/bottom); `align` defaults to `end` (start/end).
- `CapsBubbleContent`, `CapsBubbleContentDirective`, `CapsBubbleGroup`: no inputs or custom outputs. All Bubble primitives have no custom outputs.

`caps-bubble-content` projects structure. `button[capsBubbleContent]` and `a[capsBubbleContent]` keep native action semantics and must not contain other controls. Variant-derived input types retain the baseline null/undefined values. See [conversation anatomy](../../../docs/specs/caps-messages.md).
