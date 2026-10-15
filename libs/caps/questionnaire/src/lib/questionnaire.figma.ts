// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-18622
// source=libs/caps/questionnaire/src/lib/caps-questionnaire.ts
// component=CapsQuestionnaire
import figma from 'figma';
import { slug } from '../../../code-connect/field';
import { buttonLabel } from '../../../code-connect/helpers';

const questionnaire = figma.selectedInstance;

// One question with ONE example choice, read from the first Rich Checkbox / Radio of the `List`
// slot, to replace by the data (the docs also bind `[items]`). Checkbox = `multiple`; Error forces
// the invalid state with `itemInvalid` and the error message. The radio variant adds the free-form
// input. Not mapped: the choice states (checked, hover) and the progress meter look (the progress
// segments are rendered by the app, see the docs).
const multiple = questionnaire.getEnum('Type', { Checkbox: true, Radio: false }) ?? false;
const error = questionnaire.getEnum('State', { Error: true, Default: false }) ?? false;
const container = multiple ? 'Rich Checkbox Container' : 'Rich Radio Container';
const choice =
	questionnaire.getSlot('List')?.connectedInstances.find((item) => item.name === container) ??
	questionnaire.findInstance(container);

let choiceMarkup = '<caps-questionnaire-choice value="answer">Answer</caps-questionnaire-choice>';
let shortcuts = '';
if (choice.type === 'INSTANCE') {
	const label = choice.getString('Label');
	const description = choice.getBoolean('Show description')
		? `\n\t\t\t\t<caps-questionnaire-choice-description>${choice.getString('⮑ Description')}</caps-questionnaire-choice-description>`
		: '';
	choiceMarkup = description
		? `<caps-questionnaire-choice value="${slug(label)}">\n\t\t\t\t<span class="font-medium">${label}</span>${description}\n\t\t\t</caps-questionnaire-choice>`
		: `<caps-questionnaire-choice value="${slug(label)}">${label}</caps-questionnaire-choice>`;
	shortcuts = choice.getBoolean('Show shortcut') ? ' shortcuts="letters"' : '';
}

const input = multiple ? null : questionnaire.findInstance('Input');
const freeForm =
	input?.type === 'INSTANCE'
		? `\n\t\t\t<input capsQuestionnaireInput aria-label="" placeholder="${input.getString('Value')}" />`
		: '';
const next = questionnaire.findInstance('Button');
const progress = questionnaire.getBoolean('Show progress') ? '\n\t<caps-questionnaire-progress />' : '';
const errorMarkup = error
	? `<caps-questionnaire-error message="${questionnaire.getString('Error message')}" />`
	: '<caps-questionnaire-error />';

export default {
	example: figma.code`<form capsQuestionnaire [formRoot]="form"${shortcuts}>${progress}
	<caps-questionnaire-item name="answer" required [formField]="form.answer"${multiple ? ' multiple' : ''}${
		error ? ' itemInvalid' : ''
	}>
		<caps-questionnaire-title>${questionnaire.getString('Question')}</caps-questionnaire-title>
		<caps-questionnaire-description>${questionnaire.getString('Helper text')}</caps-questionnaire-description>
		<caps-questionnaire-choices>
			${choiceMarkup}${freeForm}
		</caps-questionnaire-choices>
		${errorMarkup}
	</caps-questionnaire-item>
	<caps-questionnaire-actions>
		<button capsQuestionnaireNext capsButton>${buttonLabel(next.type === 'INSTANCE' ? next : undefined, 'Next')}</button>
	</caps-questionnaire-actions>
</form>`,
	imports: [
		"import { FormField, FormRoot } from '@angular/forms/signals';",
		"import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-questionnaire',
};
