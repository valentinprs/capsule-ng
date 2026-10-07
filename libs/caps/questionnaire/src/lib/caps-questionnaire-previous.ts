import { Directive } from '@angular/core';
import { BrnQuestionnairePrevious } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsQuestionnairePrevious]',
	exportAs: 'capsQuestionnairePrevious',
	hostDirectives: [
		{
			directive: BrnQuestionnairePrevious,
			inputs: ['disabled'],
		},
	],
	host: {
		'data-slot': 'questionnaire-previous',
	},
})
export class CapsQuestionnairePrevious {
	constructor() {
		classes(() => ['col-start-1 row-start-1 min-h-11 justify-self-start sm:min-h-0']);
	}
}
