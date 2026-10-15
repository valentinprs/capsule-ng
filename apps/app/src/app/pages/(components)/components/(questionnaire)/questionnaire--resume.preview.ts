import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@capsule-ng/caps/sonner';
import { answerLabel } from './questionnaire.shared';

@Component({
	selector: 'spartan-questionnaire-resume-preview',
	imports: [FormRoot, FormField, CapsQuestionnaireImports, CapsButtonImports],
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
			defaultItem="verification"
			(reset)="onReset()"
		>
			<caps-questionnaire-progress></caps-questionnaire-progress>

			<caps-questionnaire-item name="change" required [formField]="form.change">
				<caps-questionnaire-title>What kind of migration is this?</caps-questionnaire-title>
				<caps-questionnaire-description>
					This answer was saved during the previous session.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="incremental" defaultChecked>
						Incremental migration
					</caps-questionnaire-choice>
					<caps-questionnaire-choice value="cutover">Single cutover</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="verification" multiple required [formField]="form.verification">
				<caps-questionnaire-title>How should the migration be verified?</caps-questionnaire-title>
				<caps-questionnaire-description>
					These checks were selected during the previous session.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="tests" defaultChecked>Run migration tests</caps-questionnaire-choice>
					<caps-questionnaire-choice value="typecheck" defaultChecked>Run the typecheck</caps-questionnaire-choice>
					<caps-questionnaire-choice value="manual">Perform a manual smoke test</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item name="notes" [formField]="form.notes">
				<caps-questionnaire-title>Anything else the agent should remember?</caps-questionnaire-title>
				<caps-questionnaire-description>This note was saved with the draft.</caps-questionnaire-description>
				<input
					capsQuestionnaireInput
					aria-label="Saved migration note"
					[defaultValue]="noteDefault"
					[attr.defaultValue]="noteDefault"
				/>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsButton type="reset" variant="outline">Reset changes</button>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button capsQuestionnaireNext capsButton>Next</button>
				<button capsQuestionnaireSubmit capsButton>Update draft</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireResumePreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'change', required: true },
		{ name: 'verification', required: true },
		{ name: 'notes' },
	];

	public readonly noteDefault = 'Keep the existing public API stable.';

	protected readonly _model = signal({
		change: 'incremental',
		verification: ['tests', 'typecheck'] as string[],
		notes: 'Keep the existing public API stable.',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.change);
			required(schemaPath.verification);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Draft updated', {
						description: `Migration: ${answerLabel(answers.change)} · Verification: ${answerLabel(answers.verification)} · Notes: ${answerLabel(answers.notes)}`,
					});
				},
			},
		},
	);

	protected onReset(): void {
		toast('Saved answers restored');
	}
}
