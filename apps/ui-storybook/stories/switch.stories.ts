import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSwitch, CapsSwitchImports } from '@capsule-ng/caps/switch';

import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'caps-switch-ng-model',
	imports: [CapsSwitch, FormsModule, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field orientation="horizontal">
			<caps-field-label>test switch</caps-field-label>
			<caps-switch [(ngModel)]="switchValue" (checkedChange)="handleChange($event)" />
		</caps-field>

		<p data-testid="switchValue">{{ switchValue }}</p>
		<p data-testid="changedValue">{{ _changedValueTo }}</p>
	`,
})
export class SwitchForm {
	@Input()
	public switchValue = false;

	protected _changedValueTo: boolean | undefined;

	handleChange(value: boolean) {
		this._changedValueTo = value;
	}
}

@Component({
	selector: 'switch-hint-error-story',
	imports: [CapsSwitch, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Test Switch</caps-field-label>
					<caps-switch formControlName="test" />
					<caps-field-description>This is a test switch.</caps-field-description>

					<caps-field-error>Test switch must be enabled.</caps-field-error>
				</caps-field>

				<div class="flex gap-3">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</div>
			</caps-field-group>
		</form>
	`,
})
class SwitchHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ test: [false, Validators.requiredTrue] });
}

const meta: Meta<CapsSwitch> = {
	title: 'Switch',
	component: CapsSwitch,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsSwitchImports, CapsFieldImports, CapsLabel, SwitchForm, SwitchHintErrorStory, FormsModule],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsSwitch>;

export const Default: Story = {
	render: () => ({
		template: `
       <caps-switch id='testSwitchDefault' aria-label='test switch' />
    `,
	}),
};

export const InsideLabel: Story = {
	render: () => ({
		template: `
      <label class='gap-2' capsLabel> Test Switch
        <caps-switch id='testSwitchInsideLabel' />
      </label>
    `,
	}),
};

export const LabeledWithAriaLabeledBy: Story = {
	render: () => ({
		template: `
      <div class='flex items-center gap-2'>
        <label id='testSwitchLabel' for='testSwitchLabeledWithAria' capsLabel> Test Switch </label>
        <caps-switch id='testSwitchLabeledWithAria' aria-labelledby='testSwitchLabel' />
      </div>
    `,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: `
  <caps-field orientation="horizontal">
   <caps-field-label>Disabled Switch</caps-field-label>
   <caps-switch disabled />
  </caps-field>
 `,
	}),
};

export const Small: Story = {
	render: () => ({
		template: `
  <div class="flex flex-col gap-3">
   <caps-field orientation="horizontal">
    <caps-switch size="sm" />
    <caps-field-label>Small switch</caps-field-label>
   </caps-field>
   <caps-field orientation="horizontal">
    <caps-switch size="sm" checked />
    <caps-field-label>Small switch (checked)</caps-field-label>
   </caps-field>
   <caps-field orientation="horizontal">
    <caps-switch size="sm" disabled />
    <caps-field-label>Small switch (disabled)</caps-field-label>
   </caps-field>
  </div>
 `,
	}),
};

type FormStory = StoryObj<SwitchForm>;
export const Form: FormStory = {
	render: () => ({
		template: `
    <caps-switch-ng-model />
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
    <caps-switch-ng-model  ${argsToTemplate(args)} />
    `,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: '<switch-hint-error-story />',
	}),
};

/** Figma Rich Switch Container: a bordered card (label + description) holding the switch, highlighted when on. */
export const RichSwitch: Story = {
	render: () => ({
		template: `
			<caps-field-group class="w-full max-w-sm gap-3">
				<caps-field-label>
					<caps-field orientation="horizontal">
						<caps-switch [checked]="true" />
						<caps-field-content>
							<span class="font-medium">Share usage data</span>
							<caps-field-description>Help us improve the product with anonymous statistics.</caps-field-description>
						</caps-field-content>
					</caps-field>
				</caps-field-label>
				<caps-field-label>
					<caps-field orientation="horizontal">
						<caps-switch />
						<caps-field-content>
							<span class="font-medium">Beta features</span>
							<caps-field-description>Try new features before they are released.</caps-field-description>
						</caps-field-content>
					</caps-field>
				</caps-field-label>
				<caps-field-label>
					<caps-field orientation="horizontal">
						<caps-field-content>
							<span class="font-medium">Dark mode</span>
							<caps-field-description>Flipped: the switch sits after the content.</caps-field-description>
						</caps-field-content>
						<caps-switch />
					</caps-field>
				</caps-field-label>
			</caps-field-group>
		`,
	}),
};
