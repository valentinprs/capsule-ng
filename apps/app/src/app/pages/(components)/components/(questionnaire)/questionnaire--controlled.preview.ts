import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel } from './questionnaire.shared';

const itemLabels: Record<string, string> = {
	scope: 'Change scope',
	checks: 'Verification',
	output: 'Final output',
};

@Component({
	selector: 'spartan-questionnaire-controlled-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full justify-center py-6',
	},
	template: `
		<div class="relative mx-auto flex h-full w-full max-w-md flex-col">
			<p class="text-muted-foreground absolute end-0 top-0 text-sm" role="status">
				Current checkpoint: {{ currentLabel() }}
			</p>

			<form capsQuestionnaire class="mt-auto" [formRoot]="form" [items]="items" [(item)]="item">
				<caps-questionnaire-progress></caps-questionnaire-progress>

				<caps-questionnaire-item name="scope" required [formField]="form.scope">
					<caps-questionnaire-title>What may the agent change?</caps-questionnaire-title>
					<caps-questionnaire-description>
						The host stores the active checkpoint while Questionnaire navigates.
					</caps-questionnaire-description>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="component">Only the target component</caps-questionnaire-choice>
						<caps-questionnaire-choice value="tests">Component and related tests</caps-questionnaire-choice>
						<caps-questionnaire-choice value="feature">The complete feature area</caps-questionnaire-choice>
					</caps-questionnaire-choices>
					<caps-questionnaire-error></caps-questionnaire-error>
				</caps-questionnaire-item>

				<caps-questionnaire-item name="checks" required [formField]="form.checks">
					<caps-questionnaire-title>Which verification level should it use?</caps-questionnaire-title>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="targeted">Targeted tests</caps-questionnaire-choice>
						<caps-questionnaire-choice value="package">Package tests and typecheck</caps-questionnaire-choice>
						<caps-questionnaire-choice value="full">Full workspace verification</caps-questionnaire-choice>
					</caps-questionnaire-choices>
					<caps-questionnaire-error></caps-questionnaire-error>
				</caps-questionnaire-item>

				<caps-questionnaire-item name="output" required [formField]="form.output">
					<caps-questionnaire-title>What should the agent return when finished?</caps-questionnaire-title>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="summary">Concise summary</caps-questionnaire-choice>
						<caps-questionnaire-choice value="diff">Summary with changed files</caps-questionnaire-choice>
						<caps-questionnaire-choice value="handoff">Detailed implementation handoff</caps-questionnaire-choice>
					</caps-questionnaire-choices>
					<caps-questionnaire-error></caps-questionnaire-error>
				</caps-questionnaire-item>

				<caps-questionnaire-actions>
					<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
					<button capsQuestionnaireNext capsButton>Next</button>
					<button capsQuestionnaireSubmit capsButton>Save workflow</button>
				</caps-questionnaire-actions>
			</form>
		</div>
	`,
})
export class QuestionnaireControlledPreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'scope', required: true },
		{ name: 'checks', required: true },
		{ name: 'output', required: true },
	];

	public readonly item = signal('scope');
	public readonly currentLabel = computed(() => itemLabels[this.item()] ?? this.item());

	protected readonly _model = signal({
		scope: '',
		checks: '',
		output: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.scope);
			required(schemaPath.checks);
			required(schemaPath.output);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Agent workflow configured', {
						description: `Scope: ${answerLabel(answers.scope)} · Verification: ${answerLabel(answers.checks)} · Output: ${answerLabel(answers.output)}`,
					});
				},
			},
		},
	);
}
