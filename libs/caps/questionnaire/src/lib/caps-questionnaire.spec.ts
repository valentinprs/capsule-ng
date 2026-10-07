import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { userEvent } from '@vitest/browser/context';
import { CapsQuestionnaireImports } from '../index';

@Component({
	imports: [CapsQuestionnaireImports, CapsButtonImports, FormField, FormRoot],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form
			capsQuestionnaire
			[formRoot]="questions"
			shortcuts="letters"
			(submit)="submissions.set(submissions() + 1)"
			(reset)="resets.set(resets() + 1)"
		>
			<caps-questionnaire-progress />
			<caps-questionnaire-item name="goal" required [formField]="questions.goal" [itemInvalid]="invalid()">
				<caps-questionnaire-title>Choose a goal</caps-questionnaire-title>
				<caps-questionnaire-description>One answer.</caps-questionnaire-description>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="build">
						Build
						<caps-questionnaire-choice-description>Components</caps-questionnaire-choice-description>
					</caps-questionnaire-choice>
					<caps-questionnaire-choice value="docs">Document</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error>Choose a goal to continue.</caps-questionnaire-error>
			</caps-questionnaire-item>
			<caps-questionnaire-item name="checks" multiple [formField]="questions.checks">
				<caps-questionnaire-title>Choose checks</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="tests">Tests</caps-questionnaire-choice>
					<caps-questionnaire-choice value="review">Review</caps-questionnaire-choice>
				</caps-questionnaire-choices>
				<caps-questionnaire-error />
			</caps-questionnaire-item>
			<caps-questionnaire-item name="notes" [formField]="questions.notes">
				<caps-questionnaire-title>Notes</caps-questionnaire-title>
				<input capsQuestionnaireInput aria-label="Notes" />
			</caps-questionnaire-item>
			<caps-questionnaire-actions>
				<button capsButton capsQuestionnairePrevious>Previous</button>
				<button capsButton capsQuestionnaireSkip>Skip</button>
				<button capsButton capsQuestionnaireNext>Next</button>
				<button capsButton capsQuestionnaireSubmit>Save</button>
			</caps-questionnaire-actions>
		</form>
	`,
})
class Host {
	public readonly answers = signal({ goal: '', checks: [] as string[], notes: '' });
	public readonly saved = signal(0);
	public readonly invalid = signal(false);
	public readonly submissions = signal(0);
	public readonly resets = signal(0);
	public readonly questions = form(this.answers, (p) => required(p.goal), {
		submission: {
			action: async () => {
				this.saved.update((v) => v + 1);
			},
		},
	});
}

async function setup() {
	const fixture = TestBed.createComponent(Host);
	fixture.detectChanges();
	await fixture.whenStable();
	fixture.detectChanges();
	const stable = async () => {
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
	};
	const root: HTMLElement = fixture.nativeElement;
	const action = async (name: string) => {
		(root.querySelector(`[capsQuestionnaire${name}]`) as HTMLButtonElement).click();
		await stable();
	};
	return { fixture, root, stable, action };
}

@Component({
	imports: [CapsQuestionnaireImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form capsQuestionnaire>
			<caps-questionnaire-item name="disabled" disabled required>
				<caps-questionnaire-title>Disabled question</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="x">Unavailable</caps-questionnaire-choice>
					<input capsQuestionnaireInput aria-label="Disabled note" />
				</caps-questionnaire-choices>
			</caps-questionnaire-item>
			<caps-questionnaire-item name="available">
				<caps-questionnaire-title>Available</caps-questionnaire-title>
				<caps-questionnaire-choices>
					<caps-questionnaire-choice value="yes">Yes</caps-questionnaire-choice>
				</caps-questionnaire-choices>
			</caps-questionnaire-item>
		</form>
	`,
})
class DisabledHost {}

@Component({
	imports: [CapsQuestionnaireImports, FormField, FormRoot],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form capsQuestionnaire [formRoot]="questions">
			<caps-questionnaire-item name="answer" required [formField]="questions.answer">
				<caps-questionnaire-title>Answer</caps-questionnaire-title>
				<input capsQuestionnaireInput aria-label="Answer" />
				<caps-questionnaire-error />
			</caps-questionnaire-item>
			<button capsQuestionnaireSubmit>Save</button>
		</form>
	`,
})
class FreeformHost {
	public readonly answers = signal({ answer: '' });
	public readonly questions = form(this.answers, (p) => required(p.answer));
}

describe('CapsQuestionnaire public composition', () => {
	it('shows freeform invalid styling only with the question error after validation', async () => {
		const fixture = TestBed.createComponent(FreeformHost);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
		const error: HTMLElement = fixture.nativeElement.querySelector('caps-questionnaire-error');
		for (const attr of ['aria-invalid', 'data-invalid', 'data-matches-spartan-invalid'])
			expect(input.hasAttribute(attr)).toBe(false);
		expect(error.hasAttribute('hidden')).toBe(true);
		fixture.nativeElement.querySelector('button').click();
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		for (const attr of ['aria-invalid', 'data-invalid', 'data-matches-spartan-invalid'])
			expect(input.getAttribute(attr)).toBe('true');
		expect(error.getAttribute('role')).toBe('alert');
		expect(fixture.nativeElement.querySelector('fieldset').getAttribute('aria-describedby').split(' ')).toContain(
			error.id,
		);
		await userEvent.fill(input, 'Valid answer');
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		for (const attr of ['aria-invalid', 'data-invalid', 'data-matches-spartan-invalid'])
			expect(input.hasAttribute(attr)).toBe(false);
		expect(error.hasAttribute('hidden')).toBe(true);
	});

	it('keeps disabled items out of navigation and disables the owned fieldset and both answer controls', async () => {
		const fixture = TestBed.createComponent(DisabledHost);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		const disabled: HTMLElement = fixture.nativeElement.querySelector('caps-questionnaire-item[name="disabled"]');
		expect(disabled.hasAttribute('hidden')).toBe(true);
		expect((disabled.querySelector('fieldset') as HTMLFieldSetElement).disabled).toBe(true);
		for (const input of disabled.querySelectorAll('input')) expect(input.disabled).toBe(true);
		expect(
			fixture.nativeElement.querySelector('caps-questionnaire-item[name="available"]').hasAttribute('hidden'),
		).toBe(false);
	});

	it('owns native legends and labels, associates errors, blocks required navigation and focuses its invalid answer', async () => {
		const { root, action } = await setup();
		const fieldset = root.querySelector('fieldset')!;
		expect(fieldset.firstElementChild?.tagName).toBe('LEGEND');
		expect(fieldset.querySelector('legend')?.textContent).toContain('Choose a goal');
		expect(root.querySelectorAll('label label, button button').length).toBe(0);
		expect(root.querySelector('label')?.querySelector('input')?.type).toBe('radio');
		await action('Next');
		const error = root.querySelector('caps-questionnaire-error')!;
		expect(error.getAttribute('role')).toBe('alert');
		expect(error.textContent).toContain('Choose a goal');
		expect(fieldset.getAttribute('aria-describedby')?.split(' ')).toContain(error.id);
		expect(fieldset.getAttribute('aria-invalid')).toBe('true');
		expect(document.activeElement).toBe(root.querySelector('input'));
	});
	it('retains Signal Forms answers across steps, supports multiple choices, keyboard shortcuts, skip and one submission', async () => {
		const { fixture, root, stable, action } = await setup();
		const first = root.querySelector('input')!;
		first.focus();
		await userEvent.keyboard('a');
		await stable();
		expect(fixture.componentInstance.answers().goal).toBe('build');
		await action('Next');
		const items = root.querySelectorAll('caps-questionnaire-item');
		await expect.poll(() => document.activeElement).toBe(items[1].querySelector('fieldset'));
		await userEvent.keyboard('[ArrowDown]');
		await stable();
		expect(document.activeElement).toBe(items[1].querySelector('input'));
		const labels = items[1].querySelectorAll('label');
		(labels[0] as HTMLLabelElement).click();
		(labels[1] as HTMLLabelElement).click();
		await stable();
		expect(fixture.componentInstance.answers().checks).toEqual(['tests', 'review']);
		await action('Previous');
		expect((first as HTMLInputElement).checked).toBe(true);
		await action('Next');
		await action('Skip');
		expect(fixture.componentInstance.answers().checks).toEqual([]);
		const notes = items[2].querySelector('input')!;
		await userEvent.fill(notes, 'Remember this');
		await stable();
		await action('Submit');
		expect(fixture.componentInstance.saved()).toBe(1);
		expect(fixture.componentInstance.submissions()).toBe(1);
		expect(fixture.componentInstance.answers().notes).toBe('Remember this');
	});
	it('returns to an invalid earlier step on submit and applies focus after visibility is restored', async () => {
		const { fixture, root, stable, action } = await setup();
		fixture.componentInstance.answers.set({ goal: 'docs', checks: ['review'], notes: 'saved' });
		await stable();
		await action('Next');
		await action('Next');
		fixture.componentInstance.invalid.set(true);
		await stable();
		await action('Submit');
		const goal = root.querySelector('caps-questionnaire-item')!;
		expect(goal.hasAttribute('hidden')).toBe(false);
		await expect.poll(() => document.activeElement).toBe(goal.querySelector('input'));
		expect(goal.querySelector('caps-questionnaire-error')?.getAttribute('role')).toBe('alert');
		expect(fixture.componentInstance.saved()).toBe(0);
		expect(fixture.componentInstance.submissions()).toBe(0);
	});
	it('restores prefilled Signal Forms answers without losing values', async () => {
		const { fixture, root, stable } = await setup();
		fixture.componentInstance.answers.set({ goal: 'docs', checks: ['review'], notes: 'saved' });
		await stable();
		expect((root.querySelector('input[value="docs"]') as HTMLInputElement).checked).toBe(true);
		expect((root.querySelector('input[value="review"]') as HTMLInputElement).checked).toBe(true);
		expect((root.querySelector('input[capsQuestionnaireInput]') as HTMLInputElement).value).toBe('saved');
		(root.querySelector('form') as HTMLFormElement).reset();
		await stable();
		expect(fixture.componentInstance.resets()).toBe(1);
		expect(fixture.componentInstance.answers().goal).toBe('');
		expect(fixture.componentInstance.saved()).toBe(0);
		expect(fixture.componentInstance.submissions()).toBe(0);
	});
});
