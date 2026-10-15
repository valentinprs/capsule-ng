import { Directive } from '@angular/core';
import { BrnQuestionnaireSubmit } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsQuestionnaireSubmit]',
	exportAs: 'capsQuestionnaireSubmit',
	hostDirectives: [
		{
			directive: BrnQuestionnaireSubmit,
			inputs: ['disabled'],
		},
	],
	host: {
		'data-slot': 'questionnaire-submit',
	},
})
export class CapsQuestionnaireSubmit {
	constructor() {
		classes(() => ['col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0']);
	}
}
