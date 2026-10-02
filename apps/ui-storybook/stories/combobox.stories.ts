import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmComboboxImports } from '@spartan-ng/helm/combobox';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

type Framework = { label: string; value: string };

const frameworks: Framework[] = [
	{ label: 'AnalogJs', value: 'analogjs' },
	{ label: 'Angular', value: 'angular' },
	{ label: 'Vue', value: 'vue' },
	{ label: 'Nuxt', value: 'nuxt' },
	{ label: 'React', value: 'react' },
	{ label: 'NextJs', value: 'nextjs' },
	{ label: 'Svelte', value: 'svelte' },
	{ label: 'Astro', value: 'astro' },
	{ label: 'Ember', value: 'ember' },
	{ label: 'Remix', value: 'remix' },
];

// ── Default ──────────────────────────────────────────────────────────────────

@Component({
	selector: 'combobox-default-story',
	standalone: true,
	imports: [HlmComboboxImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-combobox class="w-full max-w-sm">
			<hlm-combobox-input placeholder="Select framework..." />
			<hlm-combobox-content *hlmComboboxPortal>
				<hlm-combobox-empty>No items found.</hlm-combobox-empty>
				<div hlmComboboxList>
					@for (fw of frameworks; track fw.value) {
						<hlm-combobox-item [value]="fw">{{ fw.label }}</hlm-combobox-item>
					}
				</div>
			</hlm-combobox-content>
		</hlm-combobox>
	`,
})
class ComboboxDefaultStory {
	public readonly frameworks = frameworks;
}

@Component({
	selector: 'combobox-popup-story',
	imports: [HlmComboboxImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label for="countries">Countries</caps-field-label>
			<hlm-combobox>
				<hlm-combobox-trigger buttonId="countries" class="w-64 justify-between font-normal">
					<hlm-combobox-value placeholder="Select a country" />
				</hlm-combobox-trigger>
				<hlm-combobox-content *hlmComboboxPortal>
					<hlm-combobox-input showTrigger="false" placeholder="Search" showClear />
					<hlm-combobox-empty>No items found.</hlm-combobox-empty>
					<div hlmComboboxList>
						@for (fw of frameworks; track fw.value) {
							<hlm-combobox-item [value]="fw">{{ fw.label }}</hlm-combobox-item>
						}
					</div>
				</hlm-combobox-content>
			</hlm-combobox>
		</caps-field>
	`,
})
class ComboboxPopupStory {
	public readonly frameworks = frameworks;
}

// ── With Reactive Form ───────────────────────────────────────────────────────

@Component({
	selector: 'combobox-reactive-form-story',
	standalone: true,
	imports: [JsonPipe, HlmComboboxImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm space-y-3">
			<caps-field>
				<caps-field-label>Framework *</caps-field-label>
				<hlm-combobox formControlName="framework">
					<hlm-combobox-input placeholder="Select framework..." />
					<hlm-combobox-content *hlmComboboxPortal>
						<hlm-combobox-empty>No items found.</hlm-combobox-empty>
						<div hlmComboboxList>
							@for (fw of frameworks; track fw.value) {
								<hlm-combobox-item [value]="fw">{{ fw.label }}</hlm-combobox-item>
							}
						</div>
					</hlm-combobox-content>
				</hlm-combobox>
				<caps-field-description>Choose a framework from the list.</caps-field-description>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>

		<pre class="mt-4 text-xs">
Touched: {{ form.get('framework')?.touched }}  |  Invalid: {{ form.get('framework')?.invalid }}  |  Value: {{
				form.get('framework')?.value | json
			}}</pre
		>
	`,
})
class ComboboxReactiveFormStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ framework: [null as Framework | null, Validators.required] });
	public readonly frameworks = frameworks;
}

// ── With Hint and Error ──────────────────────────────────────────────────────

@Component({
	selector: 'combobox-hint-error-story',
	standalone: true,
	imports: [HlmComboboxImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm space-y-3">
			<caps-field>
				<caps-field-label>Framework *</caps-field-label>
				<hlm-combobox formControlName="framework">
					<hlm-combobox-input placeholder="Select framework..." />
					<hlm-combobox-content *hlmComboboxPortal>
						<hlm-combobox-empty>No items found.</hlm-combobox-empty>
						<div hlmComboboxList>
							@for (fw of frameworks; track fw.value) {
								<hlm-combobox-item [value]="fw">{{ fw.label }}</hlm-combobox-item>
							}
						</div>
					</hlm-combobox-content>
				</hlm-combobox>

				<caps-field-description>Pick a framework to get started.</caps-field-description>

				<caps-field-error>Select a framework to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
class ComboboxHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ framework: [null as Framework[] | null, Validators.required] });
	public readonly frameworks = frameworks;
}

// ── Combobox Multiple With Hint and Error ──────────────────────────────────────────────────────

@Component({
	selector: 'combobox-multiple-hint-error-story',
	standalone: true,
	imports: [HlmComboboxImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm space-y-3">
			<caps-field>
				<caps-field-label>Framework *</caps-field-label>
				<hlm-combobox-multiple formControlName="framework">
					<hlm-combobox-chips class="max-w-xs">
						<ng-template hlmComboboxValues let-values>
							@for (value of values; track $index) {
								<hlm-combobox-chip [value]="value">{{ value.label }}</hlm-combobox-chip>
							}
						</ng-template>

						<input hlmComboboxChipInput />
					</hlm-combobox-chips>
					<hlm-combobox-content *hlmComboboxPortal>
						<hlm-combobox-empty>No items found.</hlm-combobox-empty>
						<div hlmComboboxList>
							@for (framework of frameworks; track $index) {
								<hlm-combobox-item [value]="framework">{{ framework.label }}</hlm-combobox-item>
							}
						</div>
					</hlm-combobox-content>
				</hlm-combobox-multiple>

				<caps-field-description>Pick a framework to get started.</caps-field-description>

				<caps-field-error>Select a framework to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
class ComboboxMultipleHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({
		framework: [
			null as Framework[] | null,
			[
				Validators.required,
				() => {
					return { customError: true };
				},
			],
		],
	});
	public readonly frameworks = frameworks;
}

@Component({
	selector: 'combobox-popup-hint-error-story',
	imports: [HlmComboboxImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm space-y-3">
			<caps-field>
				<caps-field-label for="countries">Countries</caps-field-label>
				<hlm-combobox formControlName="framework">
					<hlm-combobox-trigger buttonId="countries" class="w-64 justify-between font-normal">
						<hlm-combobox-value placeholder="Select a country" />
					</hlm-combobox-trigger>
					<hlm-combobox-content *hlmComboboxPortal>
						<hlm-combobox-input showTrigger="false" placeholder="Search" showClear />
						<hlm-combobox-empty>No items found.</hlm-combobox-empty>
						<div hlmComboboxList>
							@for (fw of frameworks; track fw.value) {
								<hlm-combobox-item [value]="fw">{{ fw.label }}</hlm-combobox-item>
							}
						</div>
					</hlm-combobox-content>
				</hlm-combobox>

				<caps-field-description>Pick a framework to get started.</caps-field-description>

				<caps-field-error>Select a framework to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
	`,
})
class ComboboxPopupHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ framework: [null as Framework[] | null, Validators.required] });
	public readonly frameworks = frameworks;
}

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
	title: 'Combobox',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				ComboboxDefaultStory,
				ComboboxPopupStory,
				ComboboxReactiveFormStory,
				ComboboxHintErrorStory,
				ComboboxMultipleHintErrorStory,
				ComboboxPopupHintErrorStory,
			],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => ({
		template: '<combobox-default-story />',
	}),
};

export const Popup: Story = {
	render: () => ({
		template: '<combobox-popup-story />',
	}),
};

export const WithReactiveForm: Story = {
	render: () => ({
		template: '<combobox-reactive-form-story />',
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: '<combobox-hint-error-story />',
	}),
};

export const MultipleWithHintAndError: Story = {
	render: () => ({
		template: '<combobox-multiple-hint-error-story />',
	}),
};

export const PopupWithHintAndError: Story = {
	render: () => ({
		template: '<combobox-popup-hint-error-story />',
	}),
};
