# Search and selection — issue #38

Design recorded before implementation, 2026-10-07. Brain and Helm sources remain unchanged.

## Sources and public contracts

Spartan's [Autocomplete documentation](https://www.spartan.ng/components/autocomplete)
and [Combobox documentation](https://www.spartan.ng/components/combobox) describe the four
existing roots, their examples, configuration and public Brain/Helm API. The implementation uses
the workspace aliases to `libs/brain` and `libs/helm` (Brain package metadata 1.5.0, private Helm
0.0.0); no installed Brain/Helm package supplies these imports. Local public declarations are the
source for exact types/defaults when the live documentation and this checkout differ.

`CapsAutocomplete` selects T independently of its search string; `CapsAutocompleteSearch` commits
free text as its string CVA value. `CapsCombobox` selects T and `CapsComboboxMultiple` selects T[].
All four retain value/search models and outputs, disabled and configured autoHighlight/itemToString.
Selection Autocomplete and both Combobox roots retain isItemEqualToValue. Combobox retains filter,
filterOptions and closeOnSelect, plus the complete existing configuration provider contract.
The input's forceInvalid and aria-invalid already exist in Spartan; Field validation remains automatic.
Root size/type/invalid are not part of the baseline and are not exposed. No query/displayWith/
clearable aliases or public command methods are introduced.

Autocomplete filtering stays application-owned. Combobox uses Brain's Intl.Collator filter helpers;
asynchronous/application-filtered sources pass `filter = () => true` to avoid a second local filter.
Existing Helm native input/trigger/chip capabilities remain, adapted to Capsule anatomy. Standard
ARIA and dir attributes reach the owned native control and portaled content rather than creating
additional configuration concepts. A review matrix with documentation links and exact local public
symbol/line references is maintained in the ignored lot work directory for delivery validation.

## Anatomy

```html
<caps-field>
	<caps-field-label>Framework</caps-field-label>
	<caps-combobox [formControl]="framework" [itemToString]="labelForValue">
		<caps-combobox-input placeholder="Choose a framework" showClear />
		<caps-combobox-content>
			@for (option of options; track option.id) {
			<caps-combobox-option [value]="option.id">{{ option.label }}</caps-combobox-option>
			}
			<caps-combobox-empty>No matching framework.</caps-combobox-empty>
		</caps-combobox-content>
	</caps-combobox>
	<caps-field-description>Choose an available framework.</caps-field-description>
	<caps-field-error validator="required">Choose a framework.</caps-field-error>
</caps-field>
```

The root owns the floating portal; Content owns the listbox. Consumers project options, groups,
separators, empty/loading messages and an optional popup-search input. Options own decorative
selection indicators. No interactive control belongs inside an option. Input owns one native
editable input and named clear/menu buttons, composed with Capsule InputGroup and Button.
A trigger owns one native button and its chevron; popup search lives outside the listbox.
Multiple selection retains customizable chips and native chip input; chips own named remove buttons.
Separators are decorative and hidden from the accessibility tree inside listboxes; their native
orientation and visual styling remain. Clear buttons restore focus to their owned native input
after activation removes the button. Custom popup triggers need a native label or aria-label: their
projected placeholder is the combobox value and does not supply its accessible name.
Native input/trigger receives ID, label, explicit ARIA and Field description/error associations;
structural hosts do not duplicate interactive roles. Overlay direction follows the root dir.

## Preserved contracts and inventory

Selected T and search remain distinct for Autocomplete/Combobox. AutocompleteSearch commits arbitrary
text and converts chosen suggestions with itemToString. Selected labels remain resolvable through
itemToString even when an asynchronous/filtered option disappears. Autohighlight, disabled items,
clear, empty/loading, equality, groups/separators, object/ID values, search form, popup form, multiple
chips/backspace, outside/Escape/Tab focus behavior and RTL retain Brain's algorithms.
CVA disabled and explicit disabled combine in Capsule; Field remains the source of validation.

Catalogue: all 15 Autocomplete previews/examples and all 20 Combobox previews, both pages/config
snippets, both Storybook families, Signal Forms CountryPicker and its displayed source.
The country picker must bind country.code as its value and derive the label with itemToString,
rather than replacing the stored code by display text. Existing Caps auxiliaries replace their Helm
counterparts; primitives without Capsule retain Helm. Generated snippets/API are regenerated at
validation. Public consumer tests and actual catalogue/Storybook keyboard, focus, ARIA, themes,
mobile/desktop/RTL and SSR/hydration checks are required before the single delivery commit.

## Validation

Targeted Node 22 validation passes: 15 public interaction/form contracts; strict Angular compilation
of Capsule, catalogue and both real story families; 47 metadata tests; configured lint with a real
Nx graph; package build and an isolated external consumer with strict templates and skipLibCheck=false.
The external fixture resolves copied package declarations without workspace aliases or source redirects.

Browser validation covers 20 Storybook Cypress cases, 12 catalogue Cypress cases, 33 Storybook visual/
accessibility contexts and 60 catalogue contexts, including desktop/mobile, native light/dark themes,
RTL, loading, groups, multiple selection and Signal Forms. The real transform-option-value story
retains its initial string value '10' and showClear: all four required contexts expose a native clear
button named Clear text and pass the complete axe audit without exclusions. Real visible Arabic text
uses loaded Noto glyphs in the story root and in both RTL catalogue portals.

Three isolated development cold boots prove each own preview/control in SSR HTML, followed by actual
Angular hydration completion and interaction. Production SSR and the final combined regression suite
remain the central integration check. The observed multi-route Analog Missing default export/NG04014
error remains unattributed; cold-boot passes do not establish a production or baseline claim.
The transform story initially displays empty input/search with selected value '10'; no initial-label
claim is made. Selection-to-label transformation and retained labels are covered separately by the
public contract tests. Sonner remains the existing Helm/Brain integration, deferred by the user.
