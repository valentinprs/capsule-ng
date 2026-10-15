# Questionnaire Capsule — issue #57

## Anatomy and decisions

`form[capsQuestionnaire]` owns the native form and extends Brain's exported flow. A Renderer2 capture listener calls the inherited validation once before application submit listeners. Invalid submissions stop before Signal Forms (whose listener does not honor defaultPrevented); valid submissions continue once to the application. The inherited target listener is a fallback and avoids revalidating captured events. Reset and other native events retain their existing path. `caps-questionnaire-item` owns a native fieldset and its first native legend, rendered from `caps-questionnaire-title`. The item extends the exported Brain value accessor without changing Brain algorithms; Signal Forms remain bound to the public item. The native fieldset receives disabled, invalid and description state and receives navigation focus after Angular has rendered the newly active item; invalid focus follows the same render boundary. The custom host controls active visibility without becoming a second accessible group.

`caps-questionnaire-choice` owns one native label/input pair, indicator and optional shortcut. Consumers project text and `caps-questionnaire-choice-description`; single and multiple answers use native radio/checkbox inputs. `input[capsQuestionnaireInput]` composes Capsule Input and Brain's freeform answer registration. Error/description components register with the closest item automatically. Error supports projected copy, a `message` input, or built-in required/optional copy.

Actions are native buttons combining `capsButton` with `capsQuestionnairePrevious`, `Skip`, `Next` or `Submit`. Brain owns type, visibility, availability and submission; Capsule Button owns appearance. `caps-questionnaire-actions`, `choices`, `progress`, `description` and `error` own structural presentation. Progress retains state exports for custom segments.

Carbon Angular's [ProgressIndicator](https://angular.carbondesignsystem.com/documentation/components/ProgressIndicator.html) is an indicator, not a questionnaire controller or answer form. No exact Questionnaire equivalent was found in the official Angular catalogue checked on 2026-10-07. Therefore no unrelated Carbon inputs were introduced. Existing `items`, `defaultItem`, `item/itemChange`, shortcuts and noValidate remain available. `items` is optional: projected item/choice registration derives the collection; definitions remain useful for declared conditional ordering and shortcut assignments.

## Retained behavior

Single/multiple/freeform answers, optional explicit skip, required/custom/native validation, controlled current item, disabled conditional items, retained answers when moving backwards, reset/default restoration, progress segments, letters/numbers and navigation shortcuts, native FormData and Signal Forms submission remain in scope. Host code owns persistence and async business submission. Skip intentionally clears the current optional answer; it is not a persistence operation.

## Example composition audit

All fourteen catalogue previews (default, multiple, freeform, skip, shortcuts, validation, controlled, resume, conditional, navigation state, progress, animated, card, dialog), shared helpers, page usage strings and the Questionnaire Storybook file are migrated. Auxiliary Button/Card/Dialog use public Capsule APIs. Dialog lazy content uses `ng-template[capsDialogContent]`; its explicit stable label describes the overall dialog while each question is named by the native legend. Card no longer relies on custom title IDs to name fieldsets; its shared Content wraps the items once. The primary preview derives order and shortcuts from projection without duplicating its names/choices in an items array. Signal Forms models and validators are retained.

Typography and Sonner remain Helm/Brain until their separate lots are integrated. No Brain or Helm source changes. Styles use the shared Capsule preset and foundation tokens. Native choices must contain non-interactive projected content; links/buttons/other inputs inside their label would violate native label composition.

## Validation

Targeted public contract tests and catalogue/Storybook checks are recorded in the lot delivery. Global union builds and CI belong to the collector. Initial library ngc used Node24.18.0; subsequent targeted checks use the centrally verified Node22.15.0 runtime matching CI.

Freeform inputs compose CapsInput but remain answers of the item CVA. They isolate native NgControl lookup from the ancestor item; validation ARIA and styling follow the question’s validated state, together with its error. Empty required answers therefore remain neutral until validation, then return to neutral after a valid answer.
