import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import { toast } from '@spartan-ng/brain/sonner';
import { answerLabel, type QuestionnaireItemStatus } from './questionnaire.shared';

type ItemName = 'permission' | 'verification';

@Component({
	selector: 'spartan-questionnaire-navigation-state-preview',
	imports: [CapsButtonImports, FormRoot, FormField, CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full justify-center py-6',
	},
	template: `
		<form capsQuestionnaire class="mx-auto max-w-md" [formRoot]="form" [items]="items" [(item)]="item">
			<caps-questionnaire-progress></caps-questionnaire-progress>

			<caps-questionnaire-item
				name="permission"
				required
				[formField]="form.permission"
				(statusChange)="setStatus('permission', $event)"
			>
				<caps-questionnaire-title>What may the agent modify?</caps-questionnaire-title>
				<caps-questionnaire-description>
					Next is intentionally disabled until an answer is selected.
				</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="files">Project files</caps-questionnaire-choice>
					<caps-questionnaire-choice value="tests">Project files and tests</caps-questionnaire-choice>
					<caps-questionnaire-choice value="config">Files, tests, and configuration</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-item
				name="verification"
				required
				[formField]="form.verification"
				(statusChange)="setStatus('verification', $event)"
			>
				<caps-questionnaire-title>What must pass before completion?</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="tests">Tests</caps-questionnaire-choice>
					<caps-questionnaire-choice value="types">Tests and types</caps-questionnaire-choice>
					<caps-questionnaire-choice value="all">Tests, types, and visual QA</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error></caps-questionnaire-error>
			</caps-questionnaire-item>

			<caps-questionnaire-actions>
				<button capsQuestionnairePrevious capsButton variant="outline">Previous</button>
				<button
					capsQuestionnaireNext
					capsButton
					variant="secondary"
					class="data-[status=unanswered]:opacity-(--caps-opacity-50)"
					[attr.data-status]="activeStatus()"
					[disabled]="unanswered()"
				>
					Next
				</button>
				<button capsQuestionnaireSubmit capsButton [disabled]="unanswered()">Save permissions</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
export class QuestionnaireNavigationStatePreview {
	public readonly items: readonly CapsQuestionnaireItemDefinition[] = [
		{ name: 'permission', required: true },
		{ name: 'verification', required: true },
	];

	public readonly item = signal<ItemName>('permission');
	private readonly _statuses = signal<Record<ItemName, QuestionnaireItemStatus>>({
		permission: 'unanswered',
		verification: 'unanswered',
	});

	public readonly activeStatus = computed(() => this._statuses()[this.item()]);
	public readonly unanswered = computed(() => this.activeStatus() === 'unanswered');

	protected readonly _model = signal({
		permission: '',
		verification: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.permission);
			required(schemaPath.verification);
		},
		{
			submission: {
				action: async () => {
					const answers = this._model();
					toast('Permissions saved', {
						description: `Permission: ${answerLabel(answers.permission)} · Verification: ${answerLabel(answers.verification)}`,
					});
				},
			},
		},
	);

	protected setStatus(name: ItemName, status: QuestionnaireItemStatus): void {
		this._statuses.update((current) => ({ ...current, [name]: status }));
	}
}
