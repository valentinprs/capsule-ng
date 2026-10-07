import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-progress-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" defaultItem="scope">
			<caps-questionnaire-progress #progress="capsQuestionnaireProgress" class="w-full">
				<div class="mb-2 flex gap-1.5" aria-hidden="true">
					@for (filled of progress.segments(); track $index) {
						<span
							[attr.data-filled]="filled || null"
							class="data-filled:bg-primary bg-muted h-1.5 flex-1 rounded-full transition-colors"
						></span>
					}
				</div>
				<span>Checkpoint {{ progress.current() }} of {{ progress.total() }}</span>
			</caps-questionnaire-progress>

			<caps-questionnaire-item name="scope" required [formField]="form.scope">
				<caps-questionnaire-title>How large is the change?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="small">Small patch</caps-questionnaire-choice>
					<caps-questionnaire-choice value="medium">Feature-sized change</caps-questionnaire-choice>
					<caps-questionnaire-choice value="large">Cross-package change</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="strategy" required [formField]="form.strategy">
				<caps-questionnaire-title>How should commits be organized?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="single">Single commit</caps-questionnaire-choice>
					<caps-questionnaire-choice value="logical">Logical commits</caps-questionnaire-choice>
					<caps-questionnaire-choice value="squash">Squash before review</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="tests" required [formField]="form.tests">
				<caps-questionnaire-title>Which tests should run?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="targeted">Targeted tests</caps-questionnaire-choice>
					<caps-questionnaire-choice value="package">Package suite</caps-questionnaire-choice>
					<caps-questionnaire-choice value="workspace">Full workspace</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="delivery" required [formField]="form.delivery">
				<caps-questionnaire-title>How should the work be delivered?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="patch">Patch only</caps-questionnaire-choice>
					<caps-questionnaire-choice value="commit">Committed locally</caps-questionnaire-choice>
					<caps-questionnaire-choice value="branch">Push a review branch</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button capsQuestionnaireNext capsButton>Next</button>
				<button capsQuestionnaireSubmit capsButton>Finish plan</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireProgressPreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'scope', required: true },
		{ name: 'strategy', required: true },
		{ name: 'tests', required: true },
		{ name: 'delivery', required: true },
	];

	protected readonly _model = signal({
		scope: '',
		strategy: '',
		tests: '',
		delivery: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.scope);
			required(schemaPath.strategy);
			required(schemaPath.tests);
			required(schemaPath.delivery);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Pull request plan ready', {
						description: `Scope: ${answerLabel(answers.scope)} · Commits: ${answerLabel(answers.strategy)} · Tests: ${answerLabel(answers.tests)} · Delivery: ${answerLabel(answers.delivery)}`,
					});
				},
			},
		},
	);
}
