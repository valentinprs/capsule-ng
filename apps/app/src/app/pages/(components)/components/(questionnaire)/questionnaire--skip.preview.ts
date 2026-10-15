import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@capsule-ng/caps/sonner';
import { answerLabel, type QuestionnaireItemStatus } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-skip-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" defaultItem="task">
			<caps-questionnaire-progress></caps-questionnaire-progress>

			<caps-questionnaire-item name="task" required [formField]="form.task">
				<caps-questionnaire-title>What kind of change is this?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Choose the category that best describes the work.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="feature">New feature</caps-questionnaire-choice>
					<caps-questionnaire-choice value="fix">Bug fix</caps-questionnaire-choice>
					<caps-questionnaire-choice value="refactor">Refactor</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item
				name="constraints"
				[formField]="form.constraints"
				(statusChange)="onConstraintStatus($event)"
			>
				<caps-questionnaire-title>Are there any implementation constraints?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Answer if needed, or intentionally skip this question.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="no-dependencies">Do not add dependencies</caps-questionnaire-choice>
					<caps-questionnaire-choice value="no-migrations">Do not change the database</caps-questionnaire-choice>
					<caps-questionnaire-choice value="preserve-api">Preserve the public API</caps-questionnaire-choice>
					<input
						capsQuestionnaireInput
						aria-label="Another implementation constraint"
						placeholder="Describe another constraint…"
					/>
				</caps-questionnaire-choices>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="review" required [formField]="form.review">
				<caps-questionnaire-title>How should the work be reviewed?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Choose the checks the agent should complete before handoff.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="tests">Run the test suite</caps-questionnaire-choice>
					<caps-questionnaire-choice value="diff">Review the final diff</caps-questionnaire-choice>
					<caps-questionnaire-choice value="both">Tests and diff review</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button capsQuestionnaireSkip capsButton variant="outline">Skip</button>
				<button capsQuestionnaireNext capsButton>Next</button>
				<button capsQuestionnaireSubmit capsButton>Submit brief</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireSkipPreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'task', required: true },
		{ name: 'constraints' },
		{ name: 'review', required: true },
	];

	private readonly _constraintStatus = signal<QuestionnaireItemStatus>('unanswered');

	protected readonly _model = signal({
		task: '',
		constraints: '',
		review: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.task);
			required(schemaPath.review);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					const constraints = this._constraintStatus() === 'skipped' ? 'Skipped' : answerLabel(answers.constraints);

					toast('Agent brief submitted', {
						description: `Task: ${answerLabel(answers.task)} · Constraints: ${constraints} · Review: ${answerLabel(answers.review)}`,
					});
				},
			},
		},
	);

	protected onConstraintStatus(status: QuestionnaireItemStatus): void {
		this._constraintStatus.set(status);
	}
}
