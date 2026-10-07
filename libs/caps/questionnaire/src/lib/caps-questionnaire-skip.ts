import { Directive } from '@angular/core';
import { BrnQuestionnaireSkip } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsQuestionnaireSkip]',
	exportAs: 'capsQuestionnaireSkip',
	hostDirectives: [
		{
			directive: BrnQuestionnaireSkip,
			inputs: ['disabled'],
		},
	],
	host: {
		'data-slot': 'questionnaire-skip',
	},
})
export class CapsQuestionnaireSkip {
	constructor() {
		classes(() => ['col-start-2 row-start-1 min-h-11 justify-self-end sm:min-h-0']);
	}
}
