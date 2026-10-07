import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-conditional-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items()" defaultItem="runtime">
			<caps-questionnaire-progress></caps-questionnaire-progress>

			<caps-questionnaire-item name="runtime" required [formField]="form.runtime">
				<caps-questionnaire-title>Where should the agent run?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Cloud runs add an environment question to this flow.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="local">Local workspace</caps-questionnaire-choice>
					<caps-questionnaire-choice value="cloud">Cloud workspace</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item
				name="environment"
				required
				[formField]="form.environment"
				[disabled]="_model().runtime !== 'cloud'"
			>
				<caps-questionnaire-title>Which cloud environment should it use?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="preview">Preview</caps-questionnaire-choice>
					<caps-questionnaire-choice value="staging">Staging</caps-questionnaire-choice>
					<caps-questionnaire-choice value="isolated">Isolated sandbox</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="approval" required [formField]="form.approval">
				<caps-questionnaire-title>When should the agent request approval?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="writes">Before writing files</caps-questionnaire-choice>
					<caps-questionnaire-choice value="commands">Before running commands</caps-questionnaire-choice>
					<caps-questionnaire-choice value="sensitive">Only for sensitive actions</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button capsQuestionnaireNext capsButton>Next</button>
				<button capsQuestionnaireSubmit capsButton>Save execution plan</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireConditionalPreview {
	protected readonly _model = signal({
		runtime: 'local',
		environment: '',
		approval: '',
	});

	public readonly items = computed(() => [
		{ name: 'runtime', required: true },
		{
			name: 'environment',
			required: true,
			disabled: this._model().runtime !== 'cloud',
		},
		{ name: 'approval', required: true },
	]);

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.runtime);
			required(schemaPath.approval);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Execution plan saved', {
						description: `Runtime: ${answerLabel(answers.runtime)} · Environment: ${answerLabel(answers.environment, 'Not applicable')} · Approval: ${answerLabel(answers.approval)}`,
					});
				},
			},
		},
	);
}
