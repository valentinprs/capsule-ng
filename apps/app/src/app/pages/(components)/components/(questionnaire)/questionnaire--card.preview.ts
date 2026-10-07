import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-card-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form
			capsQuestionnaire
			class="mx-auto max-w-md"
			[formRoot]="form"
			[items]="items"
			defaultItem="task"
			shortcuts="numbers"
		>
			<caps-card>
				<caps-card-header><caps-questionnaire-progress /></caps-card-header>
				<caps-card-content>
					<caps-questionnaire-item name="task" required [formField]="form.task">
						<caps-questionnaire-title>What should the agent work on?</caps-questionnaire-title>
						<caps-questionnaire-description>
							Choose the task that should be handled next.
						</caps-questionnaire-description>

						<caps-questionnaire-choices>
							<caps-questionnaire-choice value="fix">Fix the failing tests</caps-questionnaire-choice>
							<caps-questionnaire-choice value="refactor">Refactor the data layer</caps-questionnaire-choice>
							<caps-questionnaire-choice value="docs">Update the integration guide</caps-questionnaire-choice>
						</caps-questionnaire-choices>
						<caps-questionnaire-error></caps-questionnaire-error>
					</caps-questionnaire-item>

					<caps-questionnaire-item name="output" required [formField]="form.output">
						<caps-questionnaire-title>What should the final handoff include?</caps-questionnaire-title>
						<caps-questionnaire-description>Pick the level of detail needed for review.</caps-questionnaire-description>

						<caps-questionnaire-choices>
							<caps-questionnaire-choice value="summary">Summary only</caps-questionnaire-choice>
							<caps-questionnaire-choice value="files">Summary and changed files</caps-questionnaire-choice>
							<caps-questionnaire-choice value="review">Full review handoff</caps-questionnaire-choice>
						</caps-questionnaire-choices>
						<caps-questionnaire-error></caps-questionnaire-error>
					</caps-questionnaire-item>
				</caps-card-content>
				<caps-card-footer>
					<caps-questionnaire-actions class="w-full">
						<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
						<button capsQuestionnaireNext capsButton>Next</button>
						<button capsQuestionnaireSubmit capsButton>Create task</button>
					</caps-questionnaire-actions>
				</caps-card-footer>
			</caps-card>
		</form>
	`,
})
export class QuestionnaireCardPreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{
			name: 'task',
			required: true,
			choices: [{ value: 'fix' }, { value: 'refactor' }, { value: 'docs' }],
		},
		{
			name: 'output',
			required: true,
			choices: [{ value: 'summary' }, { value: 'files' }, { value: 'review' }],
		},
	];

	protected readonly _model = signal({
		task: '',
		output: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.task);
			required(schemaPath.output);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Agent task created', {
						description: `Task: ${answerLabel(answers.task)} · Handoff: ${answerLabel(answers.output)}`,
					});
				},
			},
		},
	);
}
