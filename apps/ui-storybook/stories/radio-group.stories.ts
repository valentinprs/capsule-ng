import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsRadioGroup, CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { HlmCode, HlmSmall } from '@spartan-ng/helm/typography';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

@Component({
	selector: 'radio-group-example',
	imports: [CapsRadioGroupImports, FormsModule, CapsButton, HlmCode, HlmSmall],
	template: `
		<small hlmSmall class="font-semibold">Choose a version</small>
		<caps-radio-group aria-label="Version" class="font-mono text-sm font-medium" [(ngModel)]="version">
			<caps-radio value="16.1.4">v16.1.4</caps-radio>
			<caps-radio value="16.0.0">v16.0.0</caps-radio>
			<caps-radio value="15.8.0">v15.8.0</caps-radio>
			<caps-radio disabled value="15.2.0" data-testid="disabledLabel">v15.2.0</caps-radio>
		</caps-radio-group>
		<div class="my-2 flex space-x-2">
			<button size="sm" capsButton variant="outline" (click)="version = '16.0.0'">Set to v16.0.0</button>
			<button size="sm" capsButton variant="outline" (click)="version = null">Reset</button>
		</div>
		<small hlmSmall class="mt-6 block font-semibold">
			Current Version:
			<code data-testid="currentVersion" hlmCode class="text-xs">{{ version ?? 'none' }}</code>
		</small>
	`,
})
class RadioGroupExample {
	public version: string | null = '16.1.4';
}

@Component({
	selector: 'radio-group-reactive-form-tester',
	imports: [CapsRadioGroupImports, ReactiveFormsModule, CapsFieldImports, CapsButton, CapsLabel],
	template: `
		<form [formGroup]="form" class="max-w-lg space-y-3">
			<caps-field [forceInvalid]="isInvalid()">
				<caps-field-label>Billing Frequency *</caps-field-label>
				<caps-radio-group formControlName="plan" class="text-sm font-medium">
					<caps-field orientation="horizontal" class="items-center gap-3">
						<caps-radio value="monthly"></caps-radio>
						<label capsLabel class="font-normal">Monthly - $9.99</label>
					</caps-field>
					<caps-field orientation="horizontal" class="items-center gap-3">
						<caps-radio value="annual"></caps-radio>
						<label capsLabel class="font-normal">Annual - $99.99</label>
					</caps-field>
					<caps-field orientation="horizontal" class="items-center gap-3">
						<caps-radio value="lifetime"></caps-radio>
						<label capsLabel class="font-normal">Lifetime - $299.99</label>
					</caps-field>
				</caps-radio-group>
				@if (isInvalid()) {
					<caps-field-error>Choose a plan to continue.</caps-field-error>
				}
			</caps-field>

			<div class="flex flex-wrap gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
class RadioGroupReactiveFormTester {
	public readonly form = inject(FormBuilder).group({
		plan: ['', Validators.required],
	});

	isInvalid() {
		const control = this.form.get('plan');
		return !!control && control.invalid && control.touched;
	}
}

@Component({
	selector: 'radio-group-hint-error-story',
	imports: [CapsRadioGroupImports, ReactiveFormsModule, CapsFieldImports, CapsButton, CapsLabel],
	template: `
		<form [formGroup]="form" class="max-w-lg space-y-3">
			<caps-field>
				<caps-field-label>Billing Frequency *</caps-field-label>
				<caps-radio-group formControlName="plan" class="text-sm font-medium">
					<caps-field orientation="horizontal" class="items-center gap-3">
						<caps-radio value="monthly"></caps-radio>
						<label capsLabel class="font-normal">Monthly - $9.99</label>
					</caps-field>
					<caps-field orientation="horizontal" class="items-center gap-3">
						<caps-radio value="annual"></caps-radio>
						<label capsLabel class="font-normal">Annual - $99.99</label>
					</caps-field>
					<caps-field orientation="horizontal" class="items-center gap-3">
						<caps-radio value="lifetime"></caps-radio>
						<label capsLabel class="font-normal">Lifetime - $299.99</label>
					</caps-field>
				</caps-radio-group>
				<caps-field-description>Pick a plan to see the billing schedule.</caps-field-description>
				<caps-field-error>Choose a plan to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
class RadioGroupHintErrorStory {
	private readonly _fb = inject(FormBuilder);

	public readonly form = this._fb.group({
		plan: ['', Validators.required],
	});
}

const meta: Meta<CapsRadioGroup> = {
	title: 'Radio Group',
	component: CapsRadioGroup,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				RadioGroupExample,
				RadioGroupReactiveFormTester,
				RadioGroupHintErrorStory,
				CapsRadioGroupImports,
				CapsFieldImports,
				FormsModule,
				ReactiveFormsModule,
				CapsButton,
				HlmCode,
				HlmSmall,
				CapsLabel,
			],
			providers: [],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsRadioGroup>;

export const Default: Story = {
	render: () => ({
		template: '<radio-group-example/>',
	}),
};

export const LabelFor: Story = {
	render: () => ({
		template: `
		<caps-radio-group class="text-sm font-medium" >
			<div class="flex items-center gap-3">
				<caps-radio value="default" id="default">
				</caps-radio>
				<label capsLabel for="default" >
					Default
				</label>
			</div>
			<div class="flex items-center gap-3">
				<caps-radio value="comfortable" id="comfortable">
				</caps-radio>
				<label capsLabel for="comfortable" >
					Comfortable
				</label>
			</div>
			<div class="flex items-center gap-3">
				<caps-radio value="compact" id="compact">
				</caps-radio>
				<label capsLabel for="compact" >
					Compact
				</label>
			</div>
			<div class="flex items-center gap-3">
				<caps-radio class="peer group" disabled=true value="disabled" id="disabled">
				</caps-radio>
				<label capsLabel for="disabled" >
					Disabled
				</label>
			</div>
		</caps-radio-group>
`,
	}),
};

export const Validation: Story = {
	name: 'Reactive Validation',
	render: () => ({
		template: `<radio-group-reactive-form-tester></radio-group-reactive-form-tester>`,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: `<radio-group-hint-error-story></radio-group-hint-error-story>`,
	}),
};
