# Capsule form choices — issue #31

## Inventory and design

Checkbox previously used `HlmCheckbox`: checked, unchecked, disabled, indeterminate, Angular
forms and label/description compositions. Switch adds default/small sizes, disabled/invalid
examples, descriptive and selectable-card Fields. RadioGroup has a default selection, per-option
and group disabled state, forms, cards and RTL examples. Existing demonstrations and stories are
migrated; unrelated Helm controls remain until their own migration.

The public anatomy is deliberately smaller than Helm's indicator composition:

```html
<caps-field orientation="horizontal">
	<caps-checkbox [formControl]="accepted" />
	<caps-field-content>
		<caps-field-label>Accept the terms</caps-field-label>
		<caps-field-description>Required to continue.</caps-field-description>
		<caps-field-error validator="required">Accept the terms to continue.</caps-field-error>
	</caps-field-content>
</caps-field>
<caps-field>
	<caps-field-label>Plan</caps-field-label>
	<caps-radio-group [formControl]="plan">
		<caps-radio value="personal">Personal</caps-radio>
		<caps-radio value="team">Team</caps-radio>
	</caps-radio-group>
</caps-field>
<caps-field orientation="horizontal">
	<caps-field-label>Receive updates</caps-field-label>
	<caps-switch [formControl]="updates" />
</caps-field>
```

Imports are `CapsCheckboxImports`, `CapsRadioGroupImports`, `CapsSwitchImports`, and
`CapsFieldImports` from their corresponding `@capsule-ng/caps/*` secondary entry points.
Component README files document the public bindings. There is no public indicator/thumb API;
`id` replaces Helm's `inputId`. The native radio input retains browser keyboard navigation and
group exclusion. Checkbox's mixed state is exposed as `aria-checked="mixed"` with a dash indicator.

Amendment 3 of ADR 0001 records the choice to own the interactive element. The alternative native
attribute API would require duplicating Brain behavior or exposing its composite anatomy.

## Validation boundaries

Confirmed with Valentin: Angular consumer components using public Capsule imports, including
reactive/template forms, value and disabled state, mixed Checkbox state, Field labels,
descriptions/errors, focus and keyboard. Review baseline: `02bb420e8`.

Browser catalogue/Storybook checks exercise the same API with shared foundations in light/dark
modes and narrow/wide viewports. Compilation and generated API/snippet checks complement the
behavior tests; the whole repository test suite, lint, format and builds run before the PR.

## Review and regression findings

The Standards and Spec reviews ran independently against `02bb420e8`.

- Standards: Radio now uses the semantic disabled-opacity token. No documented-standard
  violation remains. The small Checkbox/Switch native-state adapters intentionally remain
  independent to avoid adding a public shared-support entry point; this is an accepted
  duplication tradeoff, not a behavior defect.
- Spec: selectable radio cards retain their full native label surface, and explicit accessible
  names override the inferred Field label. Both findings are covered by regressions.
- Integration: native fieldset disabling must also prevent clicks on the radio indicator;
  activation delegates to the native input after checking `:disabled`. FieldLabel cards must
  not create nested native labels. Consumer class inputs belong only to the documented owned
  button/label, preserving structural host classes without doubled borders or padding.

The catalogue's SSR hydration check is essential alongside component tests: template anchors
projected directly through Brain's radio content can render on the server but fail to hydrate.
The radio label projection uses a stable element boundary and keeps its template declaration
outside the Brain projection. Brain itself remains unchanged.

## Verification (2026-10-03)

- Repository unit suite after integrating current main: 852 tests across six projects. Targeted
  Capsule tests also cover the final class-forwarding and hydration-related changes.
- Angular typechecks for Capsule, catalogue and the four changed stories; 18 choice examples
  compile against built Capsule declaration entrypoints in a separate consumer configuration.
- All repository build targets, Storybook production build, repository lint, formatting and
  commit-message validation.
- Catalogue Cypress: 24 passing tests across form choices and Field, including axe in both
  themes, narrow/wide viewport bounds, native labels, card padding and hydrated Field examples.
- Storybook Cypress: 32 passing tests across Checkbox, RadioGroup and Switch (keyboard,
  forms, labels, disabled state and accessibility).
- Visual inspection in Chromium: 12 catalogue and 12 Storybook contexts covering light/dark
  themes at 390 and 1280 px. The final catalogue captures show full-width Checkbox descriptions,
  a single selectable-card border, distinct radio states and correctly aligned Switch thumbs.
- Brain is unchanged. Node used locally: 24.18.0 with pinned pnpm 10.30.3; CI uses Node 22.

Main advanced during implementation to include Dialog/AlertDialog (#60). Integration preserves
both Dialog and form-choice styles and uses Capsule Dialog with Capsule Switch in the shared
example; the PR does not introduce those Dialog components itself.

## Example composition audit (2026-10-03)

A follow-up review covered every consumer migrated by #31: catalogue previews and variants,
reactive/signal form demos and their displayed source, the four stories, and homepage consumers.
Simple radio options project their label directly into `CapsRadio`; they do not reconstruct its
layout with an empty control, a separate label and a flex wrapper. Checkbox and Switch use
`CapsField`/`CapsFieldLabel` when field composition is needed, letting Capsule associate labels,
descriptions and errors automatically. Unnecessary single-child groups, unlabelled fieldsets and
Fields used only for button layout are removed.

Selectable cards keep their outer labels and explicit targets because these enable full-card
activation with richer content. Label API demonstrations retain explicit `for`/`aria-labelledby`
wiring intentionally. Native menu checkbox items and decorative Command selection indicators
replace form controls nested inside other interactive buttons in homepage examples.

Follow-up verification: 852 unit tests, 56 Storybook tests for Checkbox/RadioGroup/Switch/Field,
18 built-package example consumer typechecks, six homepage keyboard/label/dialog checks, and
eight Radio Form/Field Radio captures in both themes at 390/1280 px. Repository builds, Storybook
build, lint and formatting pass. The full catalogue run passed 56/57 tests; the untouched
Breadcrumb dropdown contrast check then passed on rerun (3/3 Breadcrumb tests). The earlier CI
Label failure was an obsolete Helm selector, now corrected. The earlier CI Menubar failure did
not reproduce locally (2/2 tests). Both review axes have no remaining actionable findings.
