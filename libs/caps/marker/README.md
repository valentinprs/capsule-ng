# Capsule Marker

Import `CapsMarkerImports` from `@capsule-ng/caps/marker`.

```html
<caps-marker variant="separator"><caps-marker-content>Today</caps-marker-content></caps-marker>
<button capsMarker type="button"><caps-marker-content>Revert change</caps-marker-content></button>
```

variant defaults to default; separator and border preserve the official [Spartan Marker](https://www.spartan.ng/components/marker) choices. CapsMarkerContent projects readable content; CapsMarkerIcon is decorative. Structural markers have no implicit live/interactive role. Add role=status only for current progress; native button/anchor forms retain native events, disabled, link and form attributes and must not contain another control.

See the [complete API and accessibility anatomy](../../../docs/specs/caps-conversation-flow.md). Native keyboard/form behavior, decorative icons, catalogue/Storybook themes and visible Arabic/Hebrew glyphs have been validated in real browsers. The specification records the remaining full-document findings in shared code and the deferred existing Sonner integration.
