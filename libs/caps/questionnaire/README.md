# Questionnaire

Import `CapsQuestionnaireImports` from `@capsule-ng/caps/questionnaire` and `CapsButtonImports` from `@capsule-ng/caps/button`.

```html
<form capsQuestionnaire [formRoot]="questions" shortcuts="letters">
	<caps-questionnaire-progress />
	<caps-questionnaire-item name="goal" required [formField]="questions.goal">
		<caps-questionnaire-title>What is your goal?</caps-questionnaire-title>
		<caps-questionnaire-description>Choose one answer.</caps-questionnaire-description>
		<caps-questionnaire-choices>
			<caps-questionnaire-choice value="build">Build components</caps-questionnaire-choice>
			<caps-questionnaire-choice value="docs">Write documentation</caps-questionnaire-choice>
			<input capsQuestionnaireInput aria-label="Another goal" />
		</caps-questionnaire-choices>
		<caps-questionnaire-error>Choose a goal to continue.</caps-questionnaire-error>
	</caps-questionnaire-item>
	<caps-questionnaire-actions>
		<button capsButton capsQuestionnairePrevious variant="outline">Previous</button>
		<button capsButton capsQuestionnaireSkip variant="ghost">Skip</button>
		<button capsButton capsQuestionnaireNext>Next</button>
		<button capsButton capsQuestionnaireSubmit>Save</button>
	</caps-questionnaire-actions>
</form>
```

Items register in projection order, so `items` is optional. A declared `readonly CapsQuestionnaireItemDefinition[]` remains supported for conditional ordering and explicit shortcut assignments. `defaultItem` selects the initial item; `[(item)]` controls the active item. `shortcuts` accepts `letters`, `numbers` or `null`. `noValidate` defaults to true; false enables native answer validity checks in addition to questionnaire validation.

Each item owns a native fieldset and first legend. `name`, `multiple`, `required`, `disabled`, `itemInvalid`, `aria-describedby`, `aria-keyshortcuts` and `statusChange` preserve existing behavior. Bind `formField` on the item, not on its individual answers. The item retains Brain's value accessor: a string for single/freeform answers, a string array for multiple choices. Moving between items retains answers; an explicit optional skip clears that item's answer. Application code owns the model, validation and async submission.

Choice owns a native label and radio/checkbox input. Project non-interactive text, icons and optional `caps-questionnaire-choice-description`. It supports `value`, `disabled`, `defaultChecked`, `checked` and the existing cancellable `checkedChange` event. Do not nest buttons, links, labels or other controls inside a choice.

`caps-questionnaire-title` content and classes are rendered on the native legend. Item classes belong to the native fieldset; Choice classes belong to the native label. Description and Error register accessible descriptions on the closest fieldset. Error is hidden until invalid and becomes an alert; projected content overrides `message` and built-in `requiredMessage`/`optionalMessage`. The native answer inputs reflect invalid state. Focus is applied after rendering the newly active item.

Progress exposes `current`, `total`, `first`, `last`, `label` and `segments` signals. It accepts `aria-label` and `valueText`; project content for custom progress. Navigation directives compose `capsButton`; they own native button types, disabled state and visibility, avoiding a second submit path.

See [the design and example audit](../../../docs/specs/caps-questionnaire.md). Brain and Helm sources remain unchanged.

Freeform inputs compose CapsInput but remain answers of the item CVA. They isolate native NgControl lookup from the ancestor item; validation ARIA and styling follow the question’s validated state, together with its error. Empty required answers therefore remain neutral until validation, then return to neutral after a valid answer.
