import type {
	CapsQuestionnaireItemDefinition,
	CapsQuestionnaireItemStatus,
	CapsQuestionnaireShortcutMode,
} from '@capsule-ng/caps/questionnaire';

export type QuestionnaireShortcutMode = CapsQuestionnaireShortcutMode | null;
export type QuestionnaireItemStatus = CapsQuestionnaireItemStatus;
export type QuestionnaireItems = readonly CapsQuestionnaireItemDefinition[];

export function answerLabel(value: string | string[], emptyLabel = 'None'): string {
	if (Array.isArray(value)) {
		return value.length ? value.join(', ') : emptyLabel;
	}

	return value.length ? value : emptyLabel;
}
