import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CapsInput } from '@capsule-ng/caps/input';
import { BrnQuestionnaireInput, injectBrnQuestionnaireItem } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'input[capsQuestionnaireInput]',
	exportAs: 'capsQuestionnaireInput',
	// The item owns its CVA. Prevent CapsInput from inheriting the ancestor item's NgControl.
	providers: [{ provide: NgControl, useValue: null }],
	hostDirectives: [
		CapsInput,
		{
			directive: BrnQuestionnaireInput,
			inputs: ['type', 'disabled', 'value', 'defaultValue'],
		},
	],
	host: {
		'data-slot': 'questionnaire-input',
		'[attr.aria-invalid]': "_item.invalid() ? 'true' : null",
		'[attr.data-invalid]': "_item.invalid() ? 'true' : null",
		'[attr.data-matches-spartan-invalid]': "_item.invalid() ? 'true' : null",
	},
})
export class CapsQuestionnaireInput {
	protected readonly _item = injectBrnQuestionnaireItem();
	constructor() {
		classes(() => [
			'caps-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0',
			'selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground',
		]);
	}
}
