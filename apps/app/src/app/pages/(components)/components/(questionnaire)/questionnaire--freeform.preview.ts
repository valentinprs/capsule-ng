import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-freeform-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" shortcuts="letters">
			<caps-questionnaire-item name="approach" required [formField]="form.approach">
				<caps-questionnaire-title>How should the agent approach this refactor?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Choose a strategy or write a more specific instruction.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="incremental">Make the smallest safe change</caps-questionnaire-choice>
					<caps-questionnaire-choice value="module">Refactor one module at a time</caps-questionnaire-choice>
					<caps-questionnaire-choice value="rewrite">Replace the implementation completely</caps-questionnaire-choice>
					<input
						capsQuestionnaireInput
						aria-label="Another refactoring approach"
						placeholder="Describe another approach…"
					/>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnaireSubmit capsButton>Use this approach</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireFreeformPreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{
			name: 'approach',
			required: true,
			choices: [{ value: 'incremental' }, { value: 'module' }, { value: 'rewrite' }],
		},
	];

	protected readonly _model = signal({
		approach: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.approach);
		},
		{
			submission: {
				action: async () => {
					toast('Approach selected', {
						description: `Approach: ${answerLabel(this._model().approach)}`,
					});
				},
			},
		},
	);
}
