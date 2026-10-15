import { Directive } from '@angular/core';
import { BrnQuestionnaireNext } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsQuestionnaireNext]',
	exportAs: 'capsQuestionnaireNext',
	hostDirectives: [
		{
			directive: BrnQuestionnaireNext,
			inputs: ['disabled'],
		},
	],
	host: {
		'data-slot': 'questionnaire-next',
	},
})
export class CapsQuestionnaireNext {
	constructor() {
		classes(() => ['col-start-3 row-start-1 min-h-11 justify-self-end sm:min-h-0']);
	}
}
