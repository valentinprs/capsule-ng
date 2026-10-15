import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialog, CapsDialogImports } from '@capsule-ng/caps/dialog';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@capsule-ng/caps/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-dialog-preview',
	imports: [FormRoot, FormField, CapsQuestionnaireImports, CapsDialogImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<caps-dialog aria-label="Clarification" aria-describedby="clarification-description">
			<button capsDialogTrigger capsButton variant="outline">Open clarification</button>
			<ng-template capsDialogContent>
				<p id="clarification-description" class="sr-only">Answer two questions to clarify scope and verification.</p>
				<form capsQuestionnaire [formRoot]="form" [items]="items" defaultItem="scope">
					<caps-questionnaire-item name="scope" required [formField]="form.scope">
						<caps-questionnaire-progress></caps-questionnaire-progress>
						<caps-questionnaire-title>Which files are in scope?</caps-questionnaire-title>
						<caps-questionnaire-description>
							Choose how broadly the agent can update the workspace.
						</caps-questionnaire-description>

						<caps-questionnaire-choices>
							<caps-questionnaire-choice value="component">Component only</caps-questionnaire-choice>
							<caps-questionnaire-choice value="feature">Complete feature directory</caps-questionnaire-choice>
							<caps-questionnaire-choice value="workspace">Any related workspace file</caps-questionnaire-choice>
						</caps-questionnaire-choices>
						<caps-questionnaire-error></caps-questionnaire-error>
					</caps-questionnaire-item>

					<caps-questionnaire-item name="tests" required [formField]="form.tests">
						<caps-questionnaire-progress></caps-questionnaire-progress>
						<caps-questionnaire-title>How much verification is needed?</caps-questionnaire-title>
						<caps-questionnaire-description>
							Choose the checks the agent should run before handoff.
						</caps-questionnaire-description>

						<caps-questionnaire-choices>
							<caps-questionnaire-choice value="targeted">Targeted tests</caps-questionnaire-choice>
							<caps-questionnaire-choice value="package">Package tests</caps-questionnaire-choice>
							<caps-questionnaire-choice value="full">Full workspace verification</caps-questionnaire-choice>
						</caps-questionnaire-choices>
						<caps-questionnaire-error></caps-questionnaire-error>
					</caps-questionnaire-item>

					<caps-dialog-footer>
						<button capsButton type="button" variant="outline" capsDialogClose>Cancel</button>
						<caps-questionnaire-actions>
							<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
							<button capsQuestionnaireNext capsButton>Next</button>
							<button capsQuestionnaireSubmit capsButton>Send answer</button>
						</caps-questionnaire-actions>
					</caps-dialog-footer>
				</form>
			</ng-template>
		</caps-dialog>
	`,
})
export class QuestionnaireDialogPreview {
	private readonly _dialog = viewChild(CapsDialog);

	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'scope', required: true },
		{ name: 'tests', required: true },
	];

	protected readonly _model = signal({
		scope: '',
		tests: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.scope);
			required(schemaPath.tests);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					this._dialog()?.close({});
					toast('Clarification sent', {
						description: `Scope: ${answerLabel(answers.scope)} · Verification: ${answerLabel(answers.tests)}`,
					});
				},
			},
		},
	);
}
