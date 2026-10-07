# Capsule Slider — issue #48

## Anatomy and public contract

`@capsule-ng/caps/slider` exports `CapsSlider` and `CapsSliderImports`.
`<caps-slider>` owns its Brain rail, selected range, native `button type="button"` thumbs
with `role="slider"`, and optional decorative ticks. The generic host is not a second slider.
The consumer supplies values and labels rather than constructing internal directives.

The exhaustive [API evidence matrix](caps-slider-api-contract.md) records every prop, source line,
default and Capsule-specific adapter. The public contract follows the official [Spartan Slider documentation](https://www.spartan.ng/components/slider)
and the repository's `BrnSlider` implementation, checked on 2026-10-07. `value: number[] = []`
and `valueChange: number[]` represent one value per thumb, including a single-thumb control such
as `[40]`. Capsule has no scalar overload, generic value shape or `mode` input. Arrays determine
the number of thumbs. Brain initializes an empty standalone control to `[min]`; an array written
after initialization determines its thumb count, including an empty array. A nullable form reset
ignores null as the local Brain value accessor does (the official docs do not specify nullable reset), preserving the displayed array until another array
is written or the user interacts. Programmatic writes emit no `valueChange`.

Public Spartan defaults are retained: `min=0`, `max=100`, `step=1`, `disabled=false`,
`inverted=false`, `orientation='horizontal'`, `minStepsBetweenThumbs=0`,
`maxStepsBetweenThumbs=Infinity`, `preventStepOverThumb=false`, `showTicks=false`, `maxTicks=25`,
`tickLabelInterval=2`, `formatTick=(value) => String(value)`, `draggableRange=false` and
`draggableRangeOnly=false`. `draggableRangeOnly` requires `draggableRange`, matching the docs
and Brain's computed behavior. `id`, `aria-label` and `aria-labelledby` retain their naming
purpose; Capsule places the control identity on the first native thumb for label activation.

The existing Brain capabilities remain: horizontal/vertical orientation, inverted direction,
multiple thumbs, minimum/maximum gaps measured in steps, prevention of crossing, ticks,
maximum tick count, tick label interval/formatter, dragging a range, and range-only dragging.
Keyboard uses
Brain's one-step arrows and ten-step Shift/Page increment, Home/End and logical RTL direction.
Range-only keyboard changes move the entire selection while keeping its spacing.
Programmatic values are sorted/clamped for display; user interaction snaps to step and obeys
gaps. Programmatic writes emit no `valueChange`. Use ordered bounds, a finite positive step
and positive tick limits; the migration does not invent validation for unsupported configuration.

## Forms, Field and accessibility

The Capsule value accessor retains Brain's array values. Native buttons own focus,
IDs and accessible min/max/current values; `id` names the first thumb, subsequent thumbs append
an index. Explicit disabled and Angular form disabled states are combined with OR. Each thumb
has native disabled and `aria-disabled`, and leaves tab order while disabled. Touched fires when
focus leaves the whole component, not when moving between its thumbs.

`caps-field-label` automatically targets the first thumb. Field's label names all thumbs,
its descriptions/errors merge with explicit `aria-describedby`, and form invalid state reaches
the actual sliders. `thumbLabels` distinguishes bounds or multiple thresholds; those hidden
texts are combined with the Field name rather than replacing it. `valueText` supplies the
native `aria-valuetext` representation of units without replacing numeric ARIA values.
These two Capsule accessibility adapters implement the #48 proposal's naming/text requirement.
They are distinct from the documented Spartan props: `thumbLabels` supplies bound-specific names
and `valueText` supplies units. The private thumb adapter is necessary because inherited Brain
host ARIA bindings overwrite consumer-level thumb bindings; it keeps Brain interactions intact. Standalone consumers provide `aria-label` or `aria-labelledby`.

```html
<caps-field>
	<caps-field-label>Volume</caps-field-label>
	<caps-slider [formControl]="volume" [step]="5" [valueText]="percentLabel" />
	<caps-field-description>Speaker output level.</caps-field-description>
</caps-field>
<caps-field>
	<caps-field-label>Budget</caps-field-label>
	<caps-slider [formControl]="budget" [max]="1000" [step]="10" [thumbLabels]="['Minimum', 'Maximum']" />
</caps-field>
```

The consuming TypeScript uses `new FormControl([40], { nonNullable: true })` and
`new FormControl([100, 500], { nonNullable: true })`, imports `ReactiveFormsModule`,
`CapsSliderImports` and `CapsFieldImports`. Signal Forms and ngModel also remain supported.
Brain source is untouched. IDs use the shared CDK generator, reuse the rendered server root identity, and reserve fresh IDs around unhydrated controls. SSR renders values/names/IDs; Brain intentionally hides thumbs
until client measurement, preserving its existing first-frame behavior.

## Complete consumer inventory and composition audit

- Slider page: default, range, multiple thumbs, vertical, disabled, ticks, ticks with label,
  gap prevention, draggable range, draggable range only, Signal Forms, RTL, imports/skeleton
  strings, generated snippets and Capsule API metadata. The shared RTL header link uses
  native `a capsLink` with its existing RouterLink.
- Field Slider preview and home overview Field Slider: one control uses one Field; the
  single-child FieldSet/FieldGroup wrappers have no grouping purpose and were removed.
- Playground temperature, top-P and maximum-length controls: names and label activation now use Capsule Field automatically;
  the existing value/layout container remains necessary for the displayed current value.
- Message Scroller previous-context example: Capsule Slider with the existing accessible name;
  other pending message-scroller primitives remain Helm. Available card/button/menu/input-group/
  tooltip APIs already use Capsule.
- Storybook: all 18 existing variants, reactive and template forms, validation. Auxiliary
  Field/Button use Capsule; names added to every standalone slider.
- All original Brain and Helm implementations remain unchanged. No npm publication.

## Verification

Public Angular consumer tests exercise array outputs (single thumb, range and multiple thumbs), reactive/template/signal forms,
Field/native label focus, units/descriptions/errors, unique IDs, disabled composition,
step/gap limits, RTL/vertical/inversion, whole-range keyboard translation and real track clicks.
Real browser QA covers pointer dragging, themes, desktop/mobile, catalogue and Storybook.
Validation results and any concrete limitations are recorded in the delivery report.
Initial local Capsule typecheck used Node 24.18.0. Subsequent consumer typechecks and public Chromium tests use the verified Node 22.15.0 runtime matching CI. No manual screen-reader session is claimed.
