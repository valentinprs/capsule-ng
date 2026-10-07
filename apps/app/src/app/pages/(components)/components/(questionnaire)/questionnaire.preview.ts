import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" defaultItem="direction" shortcuts="letters">
			<caps-questionnaire-progress></caps-questionnaire-progress>

			<caps-questionnaire-item name="direction" required [formField]="form.direction">
				<caps-questionnaire-title>What should the agent build next?</caps-questionnaire-title>
				<caps-questionnaire-description>Choose a direction or describe another task.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="tool-calls">
						<span class="font-medium">Tool call timeline</span>
						<caps-questionnaire-choice-description>
							Show what the agent ran and what came back.
						</caps-questionnaire-choice-description>
					</caps-questionnaire-choice>
					<caps-questionnaire-choice value="approvals">
						<span class="font-medium">Approval checkpoints</span>
						<caps-questionnaire-choice-description>
							Ask before sensitive or destructive actions.
						</caps-questionnaire-choice-description>
					</caps-questionnaire-choice>
					<caps-questionnaire-choice value="handoffs">
						<span class="font-medium">Sub-agent handoffs</span>
						<caps-questionnaire-choice-description>
							Make delegated work and results easier to follow.
						</caps-questionnaire-choice-description>
					</caps-questionnaire-choice>
					<input capsQuestionnaireInput aria-label="Another agent feature" placeholder="Describe another feature…" />
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="signals" multiple [formField]="form.signals">
				<caps-questionnaire-title>What should every progress update include?</caps-questionnaire-title>
				<caps-questionnaire-description>Select all that apply, or skip this question.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="progress">Progress</caps-questionnaire-choice>
					<caps-questionnaire-choice value="decisions">Decisions</caps-questionnaire-choice>
					<caps-questionnaire-choice value="risks">Risks</caps-questionnaire-choice>
					<caps-questionnaire-choice value="next-step">Next step</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="timing" required [formField]="form.timing">
				<caps-questionnaire-title>When should work begin?</caps-questionnaire-title>
				<caps-questionnaire-description>Choose when the agent should begin the work.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="now">Start now</caps-questionnaire-choice>
					<caps-questionnaire-choice value="next-cycle">Next development cycle</caps-questionnaire-choice>
					<caps-questionnaire-choice value="backlog">Add it to the backlog</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button capsQuestionnaireSkip capsButton variant="outline">Skip</button>
				<button capsQuestionnaireNext capsButton>Next</button>
				<button capsQuestionnaireSubmit capsButton>Save plan</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnairePreview {
	protected readonly _model = signal({
		direction: '',
		signals: [] as string[],
		timing: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.direction);
			required(schemaPath.timing);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Agent plan saved', {
						description: `Direction: ${answerLabel(answers.direction)} · Progress signals: ${answerLabel(answers.signals)} · Timing: ${answerLabel(answers.timing)}`,
					});
				},
			},
		},
	);
}

export const defaultImports = `
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
`;

export const defaultSkeleton = `
<form capsQuestionnaire [formRoot]="form" class="mx-auto max-w-md" defaultItem="direction" shortcuts="letters">
  <caps-questionnaire-progress></caps-questionnaire-progress>
  <caps-questionnaire-item name="direction" required [formField]="form.direction">
    <caps-questionnaire-title>What should the agent build next?</caps-questionnaire-title>
    <caps-questionnaire-description>Choose a direction or describe another task.</caps-questionnaire-description>
    <caps-questionnaire-choices>
      <caps-questionnaire-choice value="tool-calls">
        <span class="font-medium">Tool call timeline</span>
        <caps-questionnaire-choice-description>Show what the agent ran and what came back.</caps-questionnaire-choice-description>
      </caps-questionnaire-choice>
      <input capsQuestionnaireInput aria-label="Another agent feature" placeholder="Describe another feature…" />
    </caps-questionnaire-choices>
    <caps-questionnaire-error></caps-questionnaire-error>
  </caps-questionnaire-item>
  <caps-questionnaire-actions>
    <button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
    <button capsQuestionnaireSkip capsButton variant="outline">Skip</button>
    <button capsQuestionnaireNext capsButton>Next</button>
    <button capsQuestionnaireSubmit capsButton>Save plan</button>
  </caps-questionnaire-actions>
</form>
`;
