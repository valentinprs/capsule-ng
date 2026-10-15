import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import {
	BrnQuestionnaireChoice,
	BrnQuestionnaireChoiceInput,
	BrnQuestionnaireChoiceLabel,
	BrnQuestionnaireChoiceShortcut,
} from '@spartan-ng/brain/questionnaire';
import { hlm } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-choice',
	exportAs: 'capsQuestionnaireChoice',
	imports: [BrnQuestionnaireChoiceInput, BrnQuestionnaireChoiceLabel, BrnQuestionnaireChoiceShortcut, NgIcon],
	viewProviders: [provideIcons({ lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnQuestionnaireChoice,
			inputs: ['value', 'disabled', 'defaultChecked', 'checked'],
			outputs: ['checkedChange'],
		},
	],
	host: {
		'data-slot': 'questionnaire-choice',
		class: 'block min-w-0 group/questionnaire-choice',
	},
	template: `
		<label
			[class]="_classes()"
			[attr.data-checked]="_choice.checked() ? '' : null"
			[attr.data-invalid]="_choice.invalid() ? '' : null"
			[attr.data-disabled]="_choice.disabled() ? '' : null"
		>
			<input
				brnQuestionnaireChoiceInput
				data-slot="questionnaire-choice-input"
				class="caps-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0"
			/>
			<span aria-hidden="true" data-slot="questionnaire-choice-indicator" class="caps-questionnaire-choice-indicator">
				@if (_choice.checked() && _choice.type() === 'radio') {
					<span data-slot="questionnaire-choice-indicator-dot" class="caps-questionnaire-choice-indicator-dot"></span>
				}
				@if (_choice.checked() && _choice.type() === 'checkbox') {
					<ng-icon
						name="lucideCheck"
						data-slot="questionnaire-choice-indicator-check"
						class="caps-questionnaire-choice-indicator-check"
					/>
				}
			</span>
			<span
				brnQuestionnaireChoiceLabel
				data-slot="questionnaire-choice-label"
				class="caps-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug"
			>
				<ng-content />
			</span>
			@if (_choice.shortcut(); as shortcut) {
				<span
					brnQuestionnaireChoiceShortcut
					data-slot="questionnaire-choice-shortcut"
					class="caps-questionnaire-shortcut"
				>
					{{ shortcut }}
				</span>
			}
		</label>
	`,
})
export class CapsQuestionnaireChoice {
	protected readonly _choice = inject(BrnQuestionnaireChoice);

	public readonly userClass = input('', { alias: 'class' });
	protected readonly _classes = computed(() =>
		hlm(
			'caps-questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start outline-none select-none',
			this.userClass(),
		),
	);
}
