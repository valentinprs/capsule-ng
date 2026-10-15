import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnQuestionnaireChoices } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-choices',
	exportAs: 'capsQuestionnaireChoices',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnQuestionnaireChoices }],
	host: {
		'data-slot': 'questionnaire-choices',
	},
	template: `
		<ng-content />
	`,
})
export class CapsQuestionnaireChoices {
	constructor() {
		classes(() => 'caps-questionnaire-choices group/questionnaire-choices grid min-w-0');
	}
}
