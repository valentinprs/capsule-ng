import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BrnQuestionnaireError } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-error',
	exportAs: 'capsQuestionnaireError',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnQuestionnaireError,
			inputs: ['id', 'requiredMessage', 'optionalMessage'],
		},
	],
	host: {
		'data-slot': 'questionnaire-error',
	},
	template: `
		<ng-content>{{ message() ?? _error.defaultMessage() }}</ng-content>
	`,
})
export class CapsQuestionnaireError {
	protected readonly _error = inject(BrnQuestionnaireError);

	/** Custom error copy; falls back to the built-in required/optional message when unset. */
	public readonly message = input<string | undefined>(undefined);

	constructor() {
		classes(() => 'caps-questionnaire-error text-destructive');
	}
}
