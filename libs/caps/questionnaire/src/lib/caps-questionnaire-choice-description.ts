import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-choice-description',
	exportAs: 'capsQuestionnaireChoiceDescription',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'questionnaire-choice-description',
	},
	template: `
		<ng-content />
	`,
})
export class CapsQuestionnaireChoiceDescription {
	constructor() {
		classes(() => 'caps-questionnaire-choice-description');
	}
}
