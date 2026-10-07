import { CapsButtonImports } from '@capsule-ng/caps/button';
import type { CapsQuestionnaireItemDefinition } from '@capsule-ng/caps/questionnaire';
import { CapsQuestionnaire, CapsQuestionnaireImports } from '@capsule-ng/caps/questionnaire';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const items: readonly CapsQuestionnaireItemDefinition[] = [
	{
		name: 'direction',
		required: true,
		choices: [{ value: 'tool-calls' }, { value: 'approvals' }, { value: 'handoffs' }],
	},
	{
		name: 'signals',
		required: false,
		choices: [{ value: 'progress' }, { value: 'decisions' }, { value: 'risks' }],
	},
	{
		name: 'timing',
		required: true,
		choices: [{ value: 'now' }, { value: 'next-cycle' }, { value: 'backlog' }],
	},
];

const multipleItems: readonly CapsQuestionnaireItemDefinition[] = [
	{
		name: 'context',
		required: true,
		choices: [{ value: 'source' }, { value: 'tests' }, { value: 'docs' }, { value: 'history' }],
	},
];

export default {
	title: 'Questionnaire',
	component: CapsQuestionnaire,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsButtonImports, CapsQuestionnaireImports],
		}),
	],
} as Meta<CapsQuestionnaire>;

type Story = StoryObj<CapsQuestionnaire>;

export const Default: Story = {
	render: () => ({
		props: { items },
		template: `
			<form
				capsQuestionnaire
				class="mx-auto max-w-md"
				[items]="items"
				defaultItem="direction"
				shortcuts="letters"
				(submit)="$event.preventDefault()"
			>
				<caps-questionnaire-progress></caps-questionnaire-progress>
				<caps-questionnaire-item name="direction" required>
					<caps-questionnaire-title>What should the agent build next?</caps-questionnaire-title>
					<caps-questionnaire-description>Choose a direction or describe another task.</caps-questionnaire-description>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="tool-calls">
							<span class="font-medium">Tool call timeline</span>
						</caps-questionnaire-choice>
						<caps-questionnaire-choice value="approvals">
							<span class="font-medium">Approval checkpoints</span>
						</caps-questionnaire-choice>
						<caps-questionnaire-choice value="handoffs">
							<span class="font-medium">Sub-agent handoffs</span>
						</caps-questionnaire-choice>
						<input capsQuestionnaireInput aria-label="Another agent feature" placeholder="Describe another feature…" />
					</caps-questionnaire-choices>
					<caps-questionnaire-error></caps-questionnaire-error>
				</caps-questionnaire-item>
				<caps-questionnaire-item name="signals" multiple>
					<caps-questionnaire-title>What should every progress update include?</caps-questionnaire-title>
					<caps-questionnaire-description>Select all that apply, or skip this question.</caps-questionnaire-description>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="progress">Progress</caps-questionnaire-choice>
						<caps-questionnaire-choice value="decisions">Decisions</caps-questionnaire-choice>
						<caps-questionnaire-choice value="risks">Risks</caps-questionnaire-choice>
					</caps-questionnaire-choices>
				</caps-questionnaire-item>
				<caps-questionnaire-item name="timing" required>
					<caps-questionnaire-title>When should work begin?</caps-questionnaire-title>
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
	}),
};

export const Multiple: Story = {
	render: () => ({
		props: { items: multipleItems },
		template: `
			<form
				capsQuestionnaire
				class="mx-auto max-w-md"
				[items]="items"
				shortcuts="letters"
				(submit)="$event.preventDefault()"
			>
				<caps-questionnaire-item name="context" multiple required>
					<caps-questionnaire-title>What context should the agent inspect?</caps-questionnaire-title>
					<caps-questionnaire-description>Select every source that may affect the implementation.</caps-questionnaire-description>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="source">Relevant source files</caps-questionnaire-choice>
						<caps-questionnaire-choice value="tests">Existing tests</caps-questionnaire-choice>
						<caps-questionnaire-choice value="docs">Architecture documentation</caps-questionnaire-choice>
						<caps-questionnaire-choice value="history">Recent commit history</caps-questionnaire-choice>
					</caps-questionnaire-choices>
					<caps-questionnaire-error></caps-questionnaire-error>
				</caps-questionnaire-item>
				<caps-questionnaire-actions>
					<button capsQuestionnaireSubmit capsButton>Share context</button>
				</caps-questionnaire-actions>
			</form>
		`,
	}),
};

export const Freeform: Story = {
	render: () => ({
		props: {
			items: [
				{
					name: 'approach',
					required: true,
					choices: [{ value: 'incremental' }, { value: 'module' }, { value: 'rewrite' }],
				},
			] satisfies CapsQuestionnaireItemDefinition[],
		},
		template: `
			<form
				capsQuestionnaire
				class="mx-auto max-w-md"
				[items]="items"
				shortcuts="letters"
				(submit)="$event.preventDefault()"
			>
				<caps-questionnaire-item name="approach" required>
					<caps-questionnaire-title>How should the agent approach this refactor?</caps-questionnaire-title>
					<caps-questionnaire-description>Choose a strategy or write a more specific instruction.</caps-questionnaire-description>
					<caps-questionnaire-choices>
						<caps-questionnaire-choice value="incremental">Make the smallest safe change</caps-questionnaire-choice>
						<caps-questionnaire-choice value="module">Refactor one module at a time</caps-questionnaire-choice>
						<caps-questionnaire-choice value="rewrite">Replace the implementation completely</caps-questionnaire-choice>
						<input capsQuestionnaireInput aria-label="Another refactoring approach" placeholder="Describe another approach…" />
					</caps-questionnaire-choices>
					<caps-questionnaire-error></caps-questionnaire-error>
				</caps-questionnaire-item>
				<caps-questionnaire-actions>
					<button capsQuestionnaireSubmit capsButton>Use this approach</button>
				</caps-questionnaire-actions>
			</form>
		`,
	}),
};
