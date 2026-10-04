import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { type BrnQuestionnaireItemDefinition } from '@spartan-ng/brain/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmQuestionnaireImports } from '@spartan-ng/helm/questionnaire';

const items: readonly BrnQuestionnaireItemDefinition[] = [
	{ name: 'detail', required: true },
	{ name: 'audience', required: true },
];

@Component({
	selector: 'spartan-questionnaire-validation-preview',
	imports: [FormRoot, FormField, HlmQuestionnaireImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form hlmQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" [(item)]="item">
			<caps-card>
				<fieldset
					hlmQuestionnaireItem
					name="detail"
					required
					[formField]="form.detail"
					[itemInvalid]="_detailInvalid()"
				>
					<caps-card-header>
						<legend hlmQuestionnaireTitle>How much detail should the answer include?</legend>
						<p hlmQuestionnaireDescription>Choose the response depth.</p>
						<caps-card-action>
							<div hlmQuestionnaireProgress class="min-w-0" valueText="%current / %total"></div>
						</caps-card-action>
					</caps-card-header>
					<caps-card-content>
						<div hlmQuestionnaireChoices>
							<label hlmQuestionnaireChoice value="summary">Concise summary</label>
							<label hlmQuestionnaireChoice value="complete">Complete answer</label>
						</div>
						<p hlmQuestionnaireError [message]="_detailError()"></p>
					</caps-card-content>
				</fieldset>

				<fieldset
					hlmQuestionnaireItem
					name="audience"
					required
					[formField]="form.audience"
					[itemInvalid]="_audienceInvalid()"
				>
					<caps-card-header>
						<legend hlmQuestionnaireTitle>Who will read the answer?</legend>
						<p hlmQuestionnaireDescription>Public answers require complete context.</p>
						<caps-card-action>
							<div hlmQuestionnaireProgress class="min-w-0" valueText="%current / %total"></div>
						</caps-card-action>
					</caps-card-header>
					<caps-card-content>
						<div hlmQuestionnaireChoices>
							<label hlmQuestionnaireChoice value="team">My team</label>
							<label hlmQuestionnaireChoice value="public">Public audience</label>
						</div>
						<p hlmQuestionnaireError [message]="_audienceError()"></p>
					</caps-card-content>
				</fieldset>

				<caps-card-footer>
					<div hlmQuestionnaireActions>
						<button hlmQuestionnairePrevious>Previous</button>
						<button hlmQuestionnaireNext>Next</button>
						<button hlmQuestionnaireSubmit>Validate answers</button>
					</div>
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
