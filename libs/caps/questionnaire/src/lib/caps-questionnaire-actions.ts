import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-actions',
	exportAs: 'capsQuestionnaireActions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'questionnaire-actions',
	},
	template: `
		<ng-content />
	`,
})
export class CapsQuestionnaireActions {
	constructor() {
		classes(() => 'caps-questionnaire-actions grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center');
	}
}
