import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsLabel } from '@capsule-ng/caps/label';
import { BrnSwitch, BrnSwitchImports } from '@spartan-ng/brain/switch';
import { HlmSwitch, HlmSwitchImports } from '@spartan-ng/helm/switch';

import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'hlm-switch-ng-model',
	template: `
		<!-- eslint-disable-next-line @angular-eslint/template/label-has-associated-control -->
		<label class="flex items-center" capsLabel>
			test switch
			<hlm-switch [(ngModel)]="switchValue" inputId="testSwitchForm" (checkedChange)="handleChange($event)" />
		</label>

		<p data-testid="switchValue">{{ switchValue }}</p>
		<p data-testid="changedValue">{{ changedValueTo }}</p>
	`,
	imports: [HlmSwitch, FormsModule, CapsLabel],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchForm {
	@Input()
	public switchValue = false;

	protected changedValueTo: boolean | undefined;

	handleChange(value: boolean) {
		this.changedValueTo = value;
	}
}

@Component({
	selector: 'switch-hint-error-story',
	imports: [HlmSwitch, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm">
			<caps-field-group>
				<caps-field>
					<caps-field-label id="test-switch-label">Test Switch</caps-field-label>
					<hlm-switch formControlName="test" class="ml-2" inputId="test-switch-label-with-aria" />
					<caps-field-description>This is a test switch.</caps-field-description>

					<caps-field-error>Test switch must be enabled.</caps-field-error>
				</caps-field>

				<caps-field orientation="horizontal">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
class SwitchHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ test: [false, Validators.requiredTrue] });
}

const meta: Meta<BrnSwitch> = {
	title: 'Switch',
	component: BrnSwitch,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [BrnSwitchImports, HlmSwitchImports, CapsLabel, SwitchForm, SwitchHintErrorStory, FormsModule],
		}),
	],
};

export default meta;
type Story = StoryObj<BrnSwitch>;

export const Default: Story = {
	render: () => ({
		template: `
       <hlm-switch inputId='testSwitchDefault' aria-label='test switch' />
    `,
	}),
};

export const InsideLabel: Story = {
	render: () => ({
		template: `
      <label class='flex items-center' capsLabel> Test Switch
        <hlm-switch class='ml-2' inputId='testSwitchInsideLabel' />
      </label>
    `,
	}),
};

export const LabeledWithAriaLabeledBy: Story = {
	render: () => ({
		template: `
      <div class='flex items-center'>
        <label id='testSwitchLabel' for='testSwitchLabeledWithAria' capsLabel> Test Switch </label>
        <hlm-switch class='ml-2' inputId='testSwitchLabeledWithAria' aria-labelledby='testSwitchLabel' />
      </div>
    `,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: `
      <div class='flex items-center'>
         <label id='testSwitchLabel' for='testSwitchDisabled' capsLabel> Disabled Switch </label>
       <hlm-switch  disabled="true" class='ml-2' inputId='testSwitchDisabled' aria-labelledby='testSwitchLabel' />
      </div>
    `,
	}),
};

type FormStory = StoryObj<SwitchForm>;
export const Form: FormStory = {
	render: () => ({
		template: `
    <hlm-switch-ng-model />
    `,
	}),
};

export const FormTrue: FormStory = {
	args: {
		switchValue: true,
	},
	render: ({ ...args }) => ({
		props: args,
		template: `
    <hlm-switch-ng-model  ${argsToTemplate(args)} />
    `,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: '<switch-hint-error-story />',
	}),
};
