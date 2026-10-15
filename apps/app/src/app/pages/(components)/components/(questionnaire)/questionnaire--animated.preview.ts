import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@capsule-ng/caps/sonner';
import { answerLabel } from './questionnaire.shared';

const itemClassName =
	'data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-(--caps-duration-300) motion-reduce:animate-none';

@Component({
	selector: 'spartan-questionnaire-animated-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" defaultItem="task">
			<caps-questionnaire-progress></caps-questionnaire-progress>

			<caps-questionnaire-item class="${itemClassName}" name="task" required [formField]="form.task">
				<caps-questionnaire-title>What should the agent do?</caps-questionnaire-title>
				<caps-questionnaire-description>Choose the task for this run.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="implement">Implement the requested change</caps-questionnaire-choice>
					<caps-questionnaire-choice value="debug">Debug the current behavior</caps-questionnaire-choice>
					<caps-questionnaire-choice value="review">Review the implementation</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item class="${itemClassName}" name="review" required [formField]="form.review">
				<caps-questionnaire-title>How should the work be reviewed?</caps-questionnaire-title>
				<caps-questionnaire-description>Select the verification depth.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="targeted">Targeted checks</caps-questionnaire-choice>
					<caps-questionnaire-choice value="complete">Complete test suite</caps-questionnaire-choice>
					<caps-questionnaire-choice value="manual">Tests and manual QA</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item class="${itemClassName}" name="delivery" required [formField]="form.delivery">
				<caps-questionnaire-title>How should the result be delivered?</caps-questionnaire-title>
				<caps-questionnaire-description>Choose the final handoff format.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="summary">Concise summary</caps-questionnaire-choice>
					<caps-questionnaire-choice value="diff">Summary and changed files</caps-questionnaire-choice>
					<caps-questionnaire-choice value="handoff">Detailed review handoff</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button capsQuestionnaireNext capsButton>Next</button>
				<button capsQuestionnaireSubmit capsButton>Save workflow</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireAnimatedPreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'task', required: true },
		{ name: 'review', required: true },
		{ name: 'delivery', required: true },
	];

	protected readonly _model = signal({
		task: '',
		review: '',
		delivery: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.task);
			required(schemaPath.review);
			required(schemaPath.delivery);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Agent workflow saved', {
						description: `Task: ${answerLabel(answers.task)} · Review: ${answerLabel(answers.review)} · Delivery: ${answerLabel(answers.delivery)}`,
					});
				},
			},
		},
	);
}
