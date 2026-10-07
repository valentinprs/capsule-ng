# Slider

Import `CapsSliderImports` from `@capsule-ng/caps/slider`.

```html
<caps-slider [(value)]="volume" aria-label="Volume" [step]="5" />
<caps-slider [(value)]="budget" aria-label="Budget" [thumbLabels]="['Minimum', 'Maximum']" />
```

Use a number array for both `volume` (for example `[40]`) and `budget` (`[20, 60]`). The component generates its rail,
range, thumbs and optional ticks. Angular forms use the same array contract as Spartan. Place the
control inside `caps-field` to associate label, descriptions and errors automatically.
`id` belongs to its first native thumb. See [the complete contract](../../../docs/specs/caps-slider.md)
for the Spartan API, Capsule accessibility adapters and form behavior.
