import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsQuestionnaireImports, type CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';

const items: readonly CapsQuestionnaireItemDefinition[] = [
	{ name: 'detail', required: true },
	{ name: 'audience', required: true },
];

@Component({
	selector: 'spartan-questionnaire-validation-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" [(item)]="item">
			<caps-card>
				<caps-card-header><caps-questionnaire-progress /></caps-card-header>
				<caps-card-content>
					<caps-questionnaire-item name="detail" required [formField]="form.detail" [itemInvalid]="_detailInvalid()">
						<caps-questionnaire-title>How much detail should the answer include?</caps-questionnaire-title>
						<caps-questionnaire-description>Choose the response depth.</caps-questionnaire-description>

						<caps-questionnaire-choices>
							<caps-questionnaire-choice value="summary">Concise summary</caps-questionnaire-choice>
							<caps-questionnaire-choice value="complete">Complete answer</caps-questionnaire-choice>
						</caps-questionnaire-choices>
						<caps-questionnaire-error [message]="_detailError()"></caps-questionnaire-error>
					</caps-questionnaire-item>

					<caps-questionnaire-item
						name="audience"
						required
						[formField]="form.audience"
						[itemInvalid]="_audienceInvalid()"
					>
						<caps-questionnaire-title>Who will read the answer?</caps-questionnaire-title>
						<caps-questionnaire-description>Public answers require complete context.</caps-questionnaire-description>

						<caps-questionnaire-choices>
							<caps-questionnaire-choice value="team">My team</caps-questionnaire-choice>
							<caps-questionnaire-choice value="public">Public audience</caps-questionnaire-choice>
						</caps-questionnaire-choices>
						<caps-questionnaire-error [message]="_audienceError()"></caps-questionnaire-error>
					</caps-questionnaire-item>
				</caps-card-content>
				<caps-card-footer>
					<caps-questionnaire-actions>
						<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
						<button capsQuestionnaireNext capsButton>Next</button>
						<button capsQuestionnaireSubmit capsButton>Validate answers</button>
					</caps-questionnaire-actions>
				</caps-card-footer>
			</caps-card>
		</form>
	`,
})
export class QuestionnaireValidationPreview {
	public readonly items = items;
	public readonly item = signal('detail');

	protected readonly _model = signal({
		detail: '',
		audience: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.detail, { message: 'Choose how much detail the answer should include.' });
			required(schemaPath.audience, { message: 'Choose who will read the answer.' });
			validate(schemaPath.detail, ({ valueOf }) => {
				if (valueOf(schemaPath.audience) === 'public' && valueOf(schemaPath.detail) === 'summary') {
					return {
						kind: 'incomplete',
						message: 'Public answers need enough context. Choose a complete answer.',
					};
				}

				return undefined;
			});
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Agent response configured', {
						description: `Detail: ${answers.detail} · Audience: ${answers.audience}`,
					});
				},
			},
		},
	);

	protected readonly _detailInvalid = computed(() => {
		const field = this.form.detail();
		return field.touched() && field.invalid();
	});

	protected readonly _audienceInvalid = computed(() => {
		const field = this.form.audience();
		return field.touched() && field.invalid();
	});

	protected readonly _detailError = computed(() => {
		const field = this.form.detail();
		if (!field.touched() || !field.invalid()) {
			return undefined;
		}

		return field.errors()[0]?.message;
	});

	protected readonly _audienceError = computed(() => {
		const field = this.form.audience();
		if (!field.touched() || !field.invalid()) {
			return undefined;
		}

		return field.errors()[0]?.message;
	});
}
