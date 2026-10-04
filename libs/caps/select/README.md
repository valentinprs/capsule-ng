# Select

```ts
import { CapsSelectImports } from '@capsule-ng/caps/select';
```

```html
<caps-field>
	<caps-field-label>Country</caps-field-label>
	<caps-select [formControl]="country" placeholder="Choose a country">
		<caps-select-group label="Europe">
			<caps-select-option value="fr">France</caps-select-option>
			<caps-select-option value="be">Belgium</caps-select-option>
			<caps-select-option value="ch" disabled>Switzerland</caps-select-option>
		</caps-select-group>
	</caps-select>
	<caps-field-description>Delivery destination.</caps-field-description>
	<caps-field-error validator="required">Choose a country.</caps-field-error>
</caps-field>
```

`CapsSelect` owns the native combobox button, displayed value, decorative chevron, overlay and
scrollable listbox. No trigger, value, content or portal directives are needed. `CapsSelectOption`
owns `role=option` and the decorative selection check. Project text, icons or other non-interactive
content; never put another control inside an option. `CapsSelectGroup` owns its visible label and
accessible group name. Omit groups when options do not need grouping. `CapsSelectSeparator` is optional.

`CapsSelectMultiple` provides array values; a separate component keeps Brain's single and multiple
form accessors unambiguous. Both support `value`/`valueChange`, `disabled`, `itemToString`,
`isItemEqualToValue`, reactive/template-driven forms and the existing Brain signal-forms bridge.
Single selection closes the panel; multiple selection keeps it open until dismissed.

The common inputs are `placeholder`, `id` (the native button ID), `size` (`default`/`sm`),
`forceInvalid`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-invalid`, `dir`,
`panelClass` and `triggerClass`. `class` styles the outer layout and width; the button fills that
width. Field infers its label association and adds descriptions and visible errors. Outside Field,
provide an accessible name. Brain supplies `state`, `stateChanged`, `closed`, `align`, `sideOffset`,
`offsetX` and `scrollStrategy` for controlled overlays.

Labels use `itemToString` when supplied, then an option's optional `label`, then projected text.
Use `label` or `itemToString` for rich options containing secondary descriptions. The same label
resolution drives typeahead. Object values can use `isItemEqualToValue` when object identity changes.

```html
<caps-select-multiple [formControl]="countries" placeholder="Choose countries">
	<ng-template capsSelectValue let-values>{{ values.length }} countries selected</ng-template>
	<caps-select-option value="fr">France</caps-select-option>
	<caps-select-option value="be">Belgium</caps-select-option>
</caps-select-multiple>
```

`CapsSelectValue` replaces only the selected display and receives the scalar or array as `$implicit`.
`CapsSelectPlaceholder` on an `ng-template` provides a rich empty display. Both templates must contain
non-interactive phrasing content (for example spans and icons). The default placeholder is a string. All classes and the imports array are
exported by the secondary entry point.

Keyboard behavior remains Brain's active-descendant model: arrows, Home/End, PageUp/PageDown and
typeahead move the active option; Enter/Space select; Escape/Tab dismiss. Disabled options are skipped.
Focus stays on the native button. Wheel/touch scrolling and automatic active-option scrolling replace
Helm's optional hover-scroll arrow controls; no application example needs to compose those controls.

See `docs/specs/caps-selection.md` for the complete migration inventory and verification record.
