# Slider API contract evidence — issue #48

Owner audit prepared on 2026-10-07. Central `api_contract_review` is pending; this file does not
claim reviewer approval or runtime validation. Base: `b612e7f1ff8b28bd59a7357a862b0871889d8d9e`.
The human instruction to align forthcoming components with Spartan governs this contract.
The protected rebase from `6f3d2d75f2346582b23158ff19302b64b3187d69` preserves all eleven central lots.
The Brain/Helm source hashes and API line references below are unchanged on the new base.

## Sources and provenance

- Official [Spartan Slider](https://www.spartan.ng/components/slider), checked on 2026-10-07:
  Brain API / BrnSlider inputs and output, Helm API / HlmSlider, Single/Range/Multiple/Signal Forms,
  Draggable Range and Draggable Range Only examples. The documented inputs/defaults agree with
  the local public source below; the docs do not specify nullable-reset behavior.
- Repository public package `@spartan-ng/brain`, version `1.5.0` from
  `libs/brain/package.json`; its public Slider barrel is `libs/brain/slider/src/index.ts`.
  The Capsule implementation imports that barrel, never a Brain internal file.
- Local authoritative definitions: `libs/brain/slider/src/lib/brn-slider.ts` (abbreviated **Brain**
  in the tables), `brn-slider-thumb.ts`, `brn-slider-track.ts` and `brn-slider-range.ts`.
  Existing consumer anatomy is in `libs/helm/slider/src/lib/hlm-slider.ts`; it is unchanged.
- Capsule implementation: `libs/caps/slider/src/lib/caps-slider.ts` and its private
  `caps-slider-thumb.ts`; public barrel `libs/caps/slider/src/index.ts` exports only
  `CapsSlider` and `CapsSliderImports`. There is no value union alias or generic class.

Source SHA-256 (the Brain/Helm files remain unchanged):

| File                                            | SHA-256                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| `libs/brain/slider/src/lib/brn-slider.ts`       | `c5911a558cd91fadc129a4fbada38b1c2abf9b349d40ac333de05f270b3b8a7e` |
| `libs/brain/slider/src/lib/brn-slider-thumb.ts` | `d75247fc203aa753e1fe17c8577d517ae8a38ce1f8766c6dddca688d7c4277de` |
| `libs/helm/slider/src/lib/hlm-slider.ts`        | `ce0ce2e446598e9b96905b8aa6c9906d3b1828bd0ba918957fe0f8e6a77711cd` |

## Exhaustive documented Spartan inputs and output

Every row below corresponds to the same named prop in the official Brain/Helm API tables.
Numbers/booleans accept the existing Angular `NumberInput`/`BooleanInput` coercion types;
the table gives the normalized signal type. None is a new product mode.

| Capsule public input    | Normalized type              | Default                    | Public Brain source lines | Mapping                                                                               |
| ----------------------- | ---------------------------- | -------------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `id`                    | `string`                     | `generated`                | Brain:66                  | Unique identifier; Capsule remaps it to the first native thumb for Field activation.  |
| `aria-label`            | `string \| null`             | `null`                     | Brain:69                  | Forwarded to each thumb unless a combined explicit/Field label names it.              |
| `aria-labelledby`       | `string \| null`             | `null`                     | Brain:72                  | Explicit naming IDs reach every native thumb.                                         |
| `value`                 | `number[]`                   | `[]`                       | Brain:80–81               | One array item per thumb, including single-thumb values; no scalar overload.          |
| `min`                   | `number`                     | `0`                        | Brain:84–86               | Same numberAttribute transform and lower bound.                                       |
| `max`                   | `number`                     | `100`                      | Brain:89–91               | Same numberAttribute transform and upper bound.                                       |
| `step`                  | `number`                     | `1`                        | Brain:94–96               | Same numberAttribute transform and step increment.                                    |
| `minStepsBetweenThumbs` | `number`                     | `0`                        | Brain:99–101              | Same minimum gap in steps.                                                            |
| `maxStepsBetweenThumbs` | `number`                     | `Number.POSITIVE_INFINITY` | Brain:104–106             | Same maximum gap in steps.                                                            |
| `preventStepOverThumb`  | `boolean`                    | `false`                    | Brain:109–111             | Same booleanAttribute transform and crossing prevention.                              |
| `disabled`              | `boolean`                    | `false`                    | Brain:114–116             | Same explicit input; Capsule combines it with form disabled state as described below. |
| `inverted`              | `boolean`                    | `false`                    | Brain:119–121             | Same direction inversion.                                                             |
| `orientation`           | `'horizontal' \| 'vertical'` | `'horizontal'`             | Brain:124                 | Same supported axes.                                                                  |
| `showTicks`             | `boolean`                    | `false`                    | Brain:127–129             | Same optional ticks.                                                                  |
| `maxTicks`              | `number`                     | `25`                       | Brain:132–134             | Same density reduction limit.                                                         |
| `tickLabelInterval`     | `number`                     | `2`                        | Brain:137–139             | Same label interval.                                                                  |
| `formatTick`            | `(value: number) => string`  | `(value) => String(value)` | Brain:142                 | Equivalent to Brain tick.toString() for numeric ticks.                                |
| `draggableRange`        | `boolean`                    | `false`                    | Brain:145–147             | Same selection translation behavior.                                                  |
| `draggableRangeOnly`    | `boolean`                    | `false`                    | Brain:150–152             | Paired with draggableRange; Brain computed guard169–172 retains this condition.       |

| Capsule output | Type       | Default                         | Public source                          | Mapping                                                                                                        |
| -------------- | ---------- | ------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `valueChange`  | `number[]` | No emission until a user change | Brain:155; official Brain/Helm Outputs | Capsule forwards the array, with no scalar branch. Brain owns sorting, stepping, pointer and keyboard updates. |

Brain:242–260 initializes a standalone empty slider to `[min]`. Its array normalization is at
Brain:157–165, and user value/range algorithms at Brain:288–378. Capsule delegates those algorithms
to the internal public `BrnSlider`. An empty array supplied after initialization has zero thumbs.
Capsule's linked `value` signal follows the same `valueInput`/`value` pattern as Brain:80–81.

## Array form contract and Capsule boundary

| API or behavior     | Type/default                                           | Provenance                                                      | Capsule mapping and reason                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `writeValue`        | `number[]`; accepts Angular null reset at the boundary | Brain:275–285                                                   | Arrays are copied, sorted and clamped without emitting. Non-array writes, including null, are ignored as in local Brain. This behavior is established by local source, not claimed from Spartan documentation. |
| `registerOnChange`  | `(value: number[]) => void`                            | Brain:263–265                                                   | User interaction forwards the same array to Angular's value accessor callback and output.                                                                                                                      |
| `registerOnTouched` | `() => void`                                           | Brain:267–269; issue #48 focus/Field requirement                | Capsule calls touched when focus leaves the entire host; moving between its thumbs does not touch the form.                                                                                                    |
| `setDisabledState`  | `boolean`, initially false                             | Brain:271–273; Angular CVA; issue #48 disabled requirement      | Form disabled OR explicit disabled prevents all editing. Native disabled and tabIndex -1 reach the actual thumbs, while either disable source remains true.                                                    |
| Nullable reset      | Model becomes null; rendered array retained            | Local Brain:275–276; Capsule public consumer test               | Test prepares an unsorted programmatic array, verifies no output, resets null, checks retained values, then verifies the next native key yields `[21, 60]` exactly once.                                       |
| Forms               | Array models for reactive, ngModel and Signal Forms    | Official Signal Forms example `volume: number[]`; Brain:263–285 | Every migrated consumer and test uses arrays, including one-thumb controls.                                                                                                                                    |

The accessor is on the Capsule host because the interactive thumbs are owned internally.
`NG_VALUE_ACCESSOR`, `provideBrnLabelable` and `BrnFieldControl` connect that host to the existing
forms/Field APIs; the host itself does not duplicate the thumb's interactive role.

## Exhaustive Capsule-specific inputs and anatomy adapters

These additions implement the issue's accessible naming, units, Field composition and native
activation requirements. They are not presented as documented Spartan inputs.

| Capsule input or adapter                | Type/default                                                                      | Source or requirement                                                                     | Reason and behavior                                                                                                                                                                                   |
| --------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `thumbLabels`                           | `readonly string[] = []`                                                          | Issue #48 per-thumb naming; Brain thumb naming at `brn-slider-thumb.ts`:13–14             | Adds hidden bound-specific text, combined with Field/explicit names, so a range's minimum and maximum are distinguishable.                                                                            |
| `valueText`                             | `((value: number) => string) \| null = null`                                      | Issue #48 accessible value text                                                           | Writes native `aria-valuetext` for units while retaining Brain's numeric min/max/now values.                                                                                                          |
| `aria-describedby`                      | `string \| null = null`                                                           | Issue #48 help/errors; `libs/brain/field/src/lib/brn-field-aria.service.ts`               | Deduplicates explicit IDs with Field descriptions/errors on every thumb.                                                                                                                              |
| Field label association / `labelableId` | ID signal alias; inferred label absent by default                                 | `BrnFieldControl`:43–65; `CapsField`:57–62; issue #48                                     | The native Field label targets the first native thumb. Its ID names every thumb; invalid/descriptions reach each thumb, not a generic host.                                                           |
| Private `CapsSliderThumb`               | Internal directive, not public barrel/metadata                                    | `BrnSliderThumb` public class and host:12–35                                              | Owns ARIA bindings that inherited Brain host bindings otherwise overwrite. A prior real test run exposed that regression. It inherits every interaction/measurement/registration algorithm unchanged. |
| Native `button type=button role=slider` | One per value; no interactive descendants                                         | Brain's thumb role:12 and handlers:32–35; ADR0001; issue #48                              | Provides native focus/label activation/disabled behavior; avoids adding a second role or consumer-built anatomy.                                                                                      |
| IDs and SSR                             | First thumb uses public id; later thumbs append index; internal root adds `-root` | Existing `libs/caps/tabs/src/lib/caps-tabs.ts`:65–72 CDK generator pattern; issue #48 SSR | Reuses the server root identity and avoids collisions with not-yet-hydrated groups. This extends the Capsule pattern; SSR stability remains a runtime check to execute.                               |
| Ticks                                   | Decorative wrapper `aria-hidden=true`                                             | Public `BrnSliderTick`; issue #48 internal anatomy                                        | Tick labels remain visible while avoiding duplicate accessible value/name output.                                                                                                                     |
| Styling                                 | Shared Capsule tokens/classes                                                     | `libs/caps/caps-preset.css`; ADR0001                                                      | Native thumbs, track and range consume existing foundation colors/focus/disabled tokens across themes and axes.                                                                                       |
| `CapsSliderImports`                     | `[CapsSlider] as const`                                                           | Existing Capsule barrel convention                                                        | Consumers import the complete anatomy; private thumb directive is not a public composition API.                                                                                                       |

## Audit and validation boundary

The prepared metadata test checks `value` type/default `number[]`/`[]`, output type `number[]`,
all public inputs and the absence of `mode`; final generated metadata/snapshot is pending.
The consumer inventory is in [the Slider spec](caps-slider.md). Brain and Helm diffs are empty.
This owner audit, source hashes, format/static checks and QA preparation do not substitute for
central contract review, Angular compilation, package declarations or real browser validation.
No heavy task is authorized by this file.
