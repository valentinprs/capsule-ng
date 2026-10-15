import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnQuestionnaireDescription } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-description',
	exportAs: 'capsQuestionnaireDescription',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnQuestionnaireDescription,
			inputs: ['id'],
		},
	],
	host: {
		'data-slot': 'questionnaire-description',
	},
	template: `
		<ng-content />
	`,
})
export class CapsQuestionnaireDescription {
	constructor() {
		classes(() => 'caps-questionnaire-description text-muted-foreground text-pretty');
	}
}
