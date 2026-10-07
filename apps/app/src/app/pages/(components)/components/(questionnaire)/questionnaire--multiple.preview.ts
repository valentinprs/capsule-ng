import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-multiple-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" shortcuts="letters">
			<caps-questionnaire-item name="context" multiple required [formField]="form.context">
				<caps-questionnaire-title>What context should the agent inspect?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Select every source that may affect the implementation.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="source">Relevant source files</caps-questionnaire-choice>
					<caps-questionnaire-choice value="tests">Existing tests</caps-questionnaire-choice>
					<caps-questionnaire-choice value="docs">Architecture documentation</caps-questionnaire-choice>
					<caps-questionnaire-choice value="history">Recent commit history</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnaireSubmit capsButton>Share context</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireMultiplePreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{
			name: 'context',
			required: true,
			choices: [{ value: 'source' }, { value: 'tests' }, { value: 'docs' }, { value: 'history' }],
		},
	];

	protected readonly _model = signal({
		context: [] as string[],
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.context);
		},
		{
			submission: {
				action: async () => {
					toast('Context selected', {
						description: `Context: ${answerLabel(this._model().context)}`,
					});
				},
			},
		},
	);
}
