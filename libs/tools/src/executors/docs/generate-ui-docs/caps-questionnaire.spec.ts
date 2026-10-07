import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NestedStructure } from './executor';

describe('Questionnaire public API metadata', () => {
	it('includes inherited Signal Forms item inputs and navigation composition without requiring Brain imports', () => {
		const docs = JSON.parse(
			readFileSync(join(workspaceRoot, 'dist/extracted-metadata/ui-api/questionnaire.json'), 'utf8'),
		) as NestedStructure;
		const caps = docs['questionnaire']['caps'];
		expect(caps['CapsQuestionnaire'].selector).toBe('form[capsQuestionnaire]');
		expect(caps['CapsQuestionnaireItem'].selector).toBe('caps-questionnaire-item');
		expect(caps['CapsQuestionnaireItem'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['name', 'multiple', 'required', 'disabled', 'itemInvalid', 'aria-describedby', 'class']),
		);
		expect(caps['CapsQuestionnaireItem'].outputs.map((i) => i.name)).toContain('statusChange');
		expect(caps['CapsQuestionnaireChoice'].selector).toBe('caps-questionnaire-choice');
		expect(caps['CapsQuestionnaireChoice'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['value', 'disabled', 'defaultChecked', 'checked', 'class']),
		);
		expect(caps['CapsQuestionnaireNext'].selector).toBe('button[capsQuestionnaireNext]');
		expect(caps['CapsQuestionnaireNext'].inputs.map((i) => i.name)).toEqual(['disabled']);
		expect(caps['CapsQuestionnaireError'].inputs.map((i) => i.name)).toEqual(
			expect.arrayContaining(['message', 'requiredMessage', 'optionalMessage']),
		);
	});
});
