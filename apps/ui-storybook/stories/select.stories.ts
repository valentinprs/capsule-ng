import { CommonModule, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit, ViewEncapsulation, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCitrus } from '@ng-icons/lucide';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

interface BrnSelectStoryArgs {
	value: string;
	disabled: boolean;
	placeholder: string;
}

const meta: Meta<BrnSelectStoryArgs> = {
	title: 'Select',
	args: {
		disabled: false,
		value: '',
		placeholder: 'Select an option',
	},
	decorators: [
		moduleMetadata({
			imports: [
				CommonModule,
				FormsModule,
				ReactiveFormsModule,
				CapsSelectImports,
				CapsFieldImports,
				CapsButton,
				CapsLabel,
				NgIcon,
			],
			providers: [provideIcons({ lucideCitrus })],
		}),
	],
};

export default meta;
type Story = StoryObj<BrnSelectStoryArgs>;

export const Default: Story = {
	render: (args) => ({
		props: { ...args },
		template: /* HTML */ `
			<caps-select
				aria-label="Fruit"
				${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
				${argsToTemplate(args, { include: ['placeholder'] })}
				class="w-56"
			>
				<caps-select-group label="Fruits">
					<caps-select-option value="apple">Apple</caps-select-option>
					<caps-select-option value="banana">Banana</caps-select-option>
					<caps-select-option value="blueberry">Blueberry</caps-select-option>
					<caps-select-option value="grapes">Grapes</caps-select-option>
					<caps-select-option value="pineapple">Pineapple</caps-select-option>
				</caps-select-group>
			</caps-select>
		`,
	}),
};

export const Multiple: Story = {
	render: (args) => ({
		props: { ...args },
		template: /* HTML */ `
			<caps-select-multiple
				aria-label="Fruit"
				${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
				placeholder="Select fruits"
				class="w-56"
			>
				<ng-template capsSelectValue let-values>@for (value of values; track value) { {{ value }} }</ng-template>

				<caps-select-group label="Fruits">
					<caps-select-option value="apple">Apple</caps-select-option>
					<caps-select-option value="banana">Banana</caps-select-option>
					<caps-select-option value="blueberry">Blueberry</caps-select-option>
					<caps-select-option value="grapes">Grapes</caps-select-option>
					<caps-select-option value="pineapple">Pineapple</caps-select-option>
				</caps-select-group>
			</caps-select-multiple>
		`,
	}),
};

export const ReactiveFormControl: Story = {
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl(args.value) }) },
		template: /* HTML */ `
			<div class="mb-3">
				<pre>Form Control Value: {{ fruitGroup.controls.fruit.value | json }}</pre>
			</div>
			<form [formGroup]="fruitGroup">
				<caps-select
					aria-label="Fruit"
					class="w-56"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					formControlName="fruit"
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option value="banana">Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
			</form>
		`,
	}),
};

export const DisabledOption: Story = {
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl(args.value) }) },
		template: /* HTML */ `
			<div class="mb-3">
				<pre>Form Control Value: {{ fruitGroup.controls.fruit.value | json }}</pre>
			</div>
			<form [formGroup]="fruitGroup">
				<caps-select
					aria-label="Fruit"
					class="w-56"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					formControlName="fruit"
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option data-testid="banana-option" value="banana" disabled>Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
			</form>
		`,
	}),
};

export const SelectItemToString: Story = {
	render: (args) => ({
		props: {
			...args,
			fruitGroup: new FormGroup({ fruit: new FormControl(args.value) }),
			itemToString: (value: string) => {
				return value.toUpperCase();
			},
			multiple: true,
		},
		template: /* HTML */ `
			<div class="mb-3" (onClick)="console.log('CLICKED')">
				<pre>Form Control Value: {{ fruitGroup.controls.fruit.value | json }}</pre>
			</div>
			<form [formGroup]="fruitGroup">
				<caps-select
					aria-label="Fruit"
					class="w-56"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					formControlName="fruit"
					[itemToString]="itemToString"
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option data-testid="banana-option" value="banana" disabled>Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
			</form>
		`,
	}),
};

export const ReactiveFormControlWithForAndInitialValue: Story = {
	args: {
		value: 'apple',
	},
	render: (args) => ({
		props: {
			...args,
			fruitGroup: new FormGroup({
				fruit: new FormControl(args.value || null, { validators: Validators.required }),
			}),
			options: [
				{ value: 'apple', label: 'Apple' },
				{ value: 'banana', label: 'Banana' },
				{ value: 'blueberry', label: 'Blueberry' },
				{ value: 'grapes', label: 'Grapes' },
				{ value: 'pineapple', label: 'Pineapple' },
			],
		},
		template: /* HTML */ `
			<div class="mb-3">
				<pre>Form Control Value: {{ fruitGroup.controls.fruit.value | json }}</pre>
			</div>
			<form [formGroup]="fruitGroup">
				<caps-select
					aria-label="Fruit"
					class="w-56"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					formControlName="fruit"
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						@for(option of options; track option.value){
						<caps-select-option [value]="option.value">{{option.label}}</caps-select-option>
						}
					</caps-select-group>
				</caps-select>
				@if (fruitGroup.controls.fruit.invalid && fruitGroup.controls.fruit.touched){
				<span class="text-destructive">Required</span>
				}
			</form>
		`,
	}),
};

const appleAndBlueberry = new FormGroup({
	fruit: new FormControl(['apple', 'blueberry'], { validators: Validators.required }),
});
export const ReactiveFormControlWithForAndInitialValueAndMultiple: StoryObj<
	BrnSelectStoryArgs & { options: { value: string; label: string }[]; initialFormValue: FormGroup }
> = {
	args: {
		initialFormValue: appleAndBlueberry,
		options: [
			{ value: 'apple', label: 'Apple' },
			{ value: 'banana', label: 'Banana' },
			{ value: 'blueberry', label: 'Blueberry' },
			{ value: 'grapes', label: 'Grapes' },
			{ value: 'pineapple', label: 'Pineapple' },
		],
	},
	argTypes: {
		initialFormValue: {
			options: ['Apple', 'Apple & Blueberry', 'All'],
			mapping: {
				Apple: new FormGroup({
					fruit: new FormControl(['apple'], { validators: Validators.required }),
				}),
				'Apple & Blueberry': new FormGroup({
					fruit: new FormControl(['apple', 'blueberry'], {
						validators: Validators.required,
					}),
				}),
				All: new FormGroup({
					fruit: new FormControl(['apple', 'banana', 'blueberry', 'grapes', 'pineapple'], {
						validators: Validators.required,
					}),
				}),
			},
		},
		options: {
			control: 'inline-check',
			options: ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'],
			mapping: {
				Apple: { value: 'apple', label: 'Apple' },
				Banana: { value: 'banana', label: 'Banana' },
				Blueberry: { value: 'blueberry', label: 'Blueberry' },
				Grapes: { value: 'grapes', label: 'Grapes' },
				Pineapple: { value: 'pineapple', label: 'Pineapple' },
			},
		},
	},
	render: (args) => ({
		props: {
			...args,
		},
		template: /* HTML */ `
			<div class="mb-3">
				<pre>Form Control Value: {{ initialFormValue?.controls.fruit.value | json }}</pre>
			</div>
			<form [formGroup]="initialFormValue">
				<caps-select-multiple
					aria-label="Fruit"
					class="w-56"
					${argsToTemplate(args, { exclude: ['value', 'options', 'placeholder', 'initialFormValue'] })}
					formControlName="fruit"
					placeholder="Select fruits"
				>
					<ng-template capsSelectValue let-values>@for (value of values; track value) { {{ value }} }</ng-template>

					<caps-select-group label="Fruits">
						@for(option of options; track option.value){
						<caps-select-option [value]="option.value">{{option.label}}</caps-select-option>
						}
					</caps-select-group>
				</caps-select-multiple>
				@if (fruitGroup?.controls.fruit.invalid && fruitGroup.controls.fruit.touched){
				<span class="text-destructive">Required</span>
				}
			</form>
		`,
	}),
};

export const ReactiveFormControlWithValidation: Story = {
	render: (args) => ({
		props: {
			...args,
			fruitGroup: new FormGroup({
				fruit: new FormControl(args.value || null, { validators: Validators.required }),
			}),
		},
		template: /* HTML */ `
			<div class="mb-3">
				<pre>Form Control Value: {{ fruitGroup.controls.fruit.valueChanges | async | json }}</pre>
			</div>
			<form [formGroup]="fruitGroup">
				<caps-select
					aria-label="Fruit"
					class="w-56"
					formControlName="fruit"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option value="banana">Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
				@if (fruitGroup.controls.fruit.invalid && fruitGroup.controls.fruit.touched){
				<span class="text-destructive">Required</span>
				}
			</form>
		`,
	}),
};

export const ReactiveFormControlWithValidationWithLabel: Story = {
	render: (args) => ({
		props: {
			...args,
			fruitGroup: new FormGroup({
				fruit: new FormControl(args.value || null, { validators: Validators.required }),
			}),
		},
		template: /* HTML */ `
			<div class="mb-3">
				<pre>Form Control Value: {{ fruitGroup.controls.fruit.valueChanges | async | json }}</pre>
			</div>
			<form [formGroup]="fruitGroup">
				<label capsLabel for="fruit-select">Select a Fruit</label>
				<caps-select
					id="fruit-select"
					class="w-56"
					formControlName="fruit"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option value="banana">Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
				@if (fruitGroup.controls.fruit.invalid && fruitGroup.controls.fruit.touched){
				<span class="text-destructive">Required</span>
				}
			</form>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: (args) => ({
		props: {
			...args,
			form: new FormGroup({
				fruit: new FormControl('', { validators: [Validators.required] }),
			}),
		},
		template: /* HTML */ `
			<form [formGroup]="form" class="w-full max-w-sm space-y-3">
				<caps-field>
					<caps-field-label>Fruit *</caps-field-label>
					<caps-select
						aria-label="Fruit"
						class="w-56"
						formControlName="fruit"
						${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
						${argsToTemplate(args, { include: ['placeholder'] })}
					>
						<caps-select-group label="Fruits">
							<caps-select-option value="apple">Apple</caps-select-option>
							<caps-select-option value="banana">Banana</caps-select-option>
							<caps-select-option value="blueberry">Blueberry</caps-select-option>
							<caps-select-option value="grapes">Grapes</caps-select-option>
							<caps-select-option value="pineapple">Pineapple</caps-select-option>
						</caps-select-group>
					</caps-select>
					<caps-field-description>Pick a fruit so we can tailor the recommendations.</caps-field-description>
					<caps-field-error>Select your favorite fruit to continue.</caps-field-error>
				</caps-field>
				<div class="flex flex-wrap items-center gap-2">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</div>
			</form>
		`,
	}),
};

export const NgModelFormControl: Story = {
	render: (args) => ({
		props: {
			...args,
			fruit: signal(args.value),
		},
		template: /* HTML */ `
			<form ngForm>
				<div class="mb-3">
					<pre>Form Control Value: {{fruit() | json }}</pre>
				</div>
				<label capsLabel for="fruit-select">Select a Fruit</label>
				<caps-select
					id="fruit-select"
					class="w-56"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					[(ngModel)]="fruit"
					name="fruit"
					${argsToTemplate(args, { include: ['placeholder'] })}
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option value="banana">Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
			</form>
		`,
	}),
};

export const NgModelFormControlInitialValue: Story = {
	args: {
		disabled: false,
		value: 'apple',
	},

	render: (args) => ({
		props: {
			...args,
			fruit: signal(args.value),
		},

		template: `
            <form ngForm>
                <div class="mb-3">
                    <pre>Form Control Value: {{fruit() | json }}</pre>
                </div>
                    <label capsLabel for="fruit-select">Select a Fruit</label>
                <caps-select id="fruit-select"
                    class="w-56"
                    ${argsToTemplate(args, {
											exclude: ['value', 'placeholder'],
										})}
                    [(ngModel)]="fruit"
                    name="fruit"
                   ${argsToTemplate(args, { include: ['placeholder'] })}  >

						<caps-select-group label="Fruits">
							<caps-select-option value="apple">Apple</caps-select-option>
							<caps-select-option value="banana">Banana</caps-select-option>
							<caps-select-option value="blueberry">Blueberry</caps-select-option>
							<caps-select-option value="grapes">Grapes</caps-select-option>
							<caps-select-option value="pineapple">Pineapple</caps-select-option>
						</caps-select-group>
                </caps-select>
            </form>
        `,
	}),
};

export const SelectWithLabel: Story = {
	render: (args) => ({
		props: { ...args, fruitGroup: new FormGroup({ fruit: new FormControl() }) },
		template: /* HTML */ `
			<form [formGroup]="fruitGroup">
				<label capsLabel for="select-trigger">Select a Fruit</label>
				<caps-select
					formControlName="fruit"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					${argsToTemplate(args, { include: ['placeholder'] })}
					class="w-56"
					id="select-trigger"
					panelClass="w-56"
				>
					<caps-select-group label="Fruits">
						<caps-select-option value="apple">Apple</caps-select-option>
						<caps-select-option value="banana">Banana</caps-select-option>
						<caps-select-option value="blueberry">Blueberry</caps-select-option>
						<caps-select-option value="grapes">Grapes</caps-select-option>
						<caps-select-option value="pineapple">Pineapple</caps-select-option>
					</caps-select-group>
				</caps-select>
			</form>
		`,
	}),
};

export const Scrollable: Story = {
	render: (args) => ({
		props: { ...args, myform: new FormGroup({ timezone: new FormControl() }) },
		template: /* HTML */ `
			<form [formGroup]="myform">
				<caps-select
					aria-label="Time zone"
					formControlName="timezone"
					${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
					${argsToTemplate(args, { include: ['placeholder'] })}
					class="w-[280px]"
					panelClass="min-w-content max-h-96"
				>
					<caps-select-group label="North America">
						<caps-select-option value="est">Eastern Standard Time (EST)</caps-select-option>
						<caps-select-option value="cst">Central Standard Time (CST)</caps-select-option>
						<caps-select-option value="mst">Mountain Standard Time (MST)</caps-select-option>
						<caps-select-option value="pst">Pacific Standard Time (PST)</caps-select-option>
						<caps-select-option value="akst">Alaska Standard Time (AKST)</caps-select-option>
						<caps-select-option value="hst">Hawaii Standard Time (HST)</caps-select-option>
					</caps-select-group>
					<caps-select-group label="Europe & Africa">
						<caps-select-option value="gmt">Greenwich Mean Time (GMT)</caps-select-option>
						<caps-select-option value="cet">Central European Time (CET)</caps-select-option>
						<caps-select-option value="eet">Eastern European Time (EET)</caps-select-option>
						<caps-select-option value="west">Western European Summer Time (WEST)</caps-select-option>
						<caps-select-option value="cat">Central Africa Time (CAT)</caps-select-option>
						<caps-select-option value="eat">East Africa Time (EAT)</caps-select-option>
					</caps-select-group>
					<caps-select-group label="Asia">
						<caps-select-option value="msk">Moscow Time (MSK)</caps-select-option>
						<caps-select-option value="ist">India Standard Time (IST)</caps-select-option>
						<caps-select-option value="cst_china">China Standard Time (CST)</caps-select-option>
						<caps-select-option value="jst">Japan Standard Time (JST)</caps-select-option>
						<caps-select-option value="kst">Korea Standard Time (KST)</caps-select-option>
						<caps-select-option value="ist_indonesia">Indonesia Central Standard Time (WITA)</caps-select-option>
					</caps-select-group>
					<caps-select-group label="Australia & Pacific">
						<caps-select-option value="awst">Australian Western Standard Time (AWST)</caps-select-option>
						<caps-select-option value="acst">Australian Central Standard Time (ACST)</caps-select-option>
						<caps-select-option value="aest">Australian Eastern Standard Time (AEST)</caps-select-option>
						<caps-select-option value="nzst">New Zealand Standard Time (NZST)</caps-select-option>
						<caps-select-option value="fjt">Fiji Time (FJT)</caps-select-option>
					</caps-select-group>
					<caps-select-group label="South America">
						<caps-select-option value="art">Argentina Time (ART)</caps-select-option>
						<caps-select-option value="bot">Bolivia Time (BOT)</caps-select-option>
						<caps-select-option value="brt">Brasilia Time (BRT)</caps-select-option>
						<caps-select-option value="clt">Chile Standard Time (CLT)</caps-select-option>
					</caps-select-group>
				</caps-select>
			</form>
		`,
	}),
};

export const CustomPlaceholder: Story = {
	render: (args) => ({
		props: { ...args },
		template: /* HTML */ `
			<caps-select
				aria-label="Fruit"
				${argsToTemplate(args, { exclude: ['value', 'placeholder'] })}
				class="inline-block w-56"
			>
				<ng-template capsSelectPlaceholder>
					<ng-icon name="lucideCitrus" />
					Select a fruit
				</ng-template>

				<caps-select-group label="Fruits">
					<caps-select-option value="apple">Apple</caps-select-option>
					<caps-select-option value="banana">Banana</caps-select-option>
					<caps-select-option value="blueberry">Blueberry</caps-select-option>
					<caps-select-option value="grapes">Grapes</caps-select-option>
					<caps-select-option value="pineapple">Pineapple</caps-select-option>
				</caps-select-group>
			</caps-select>
		`,
	}),
};

export const WithLabelAndForm: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [LabelAndForm],
		},
		template: /* HTML */ '<label-and-form-component/>',
	}),
};
@Component({
	selector: 'label-and-form-component',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, ReactiveFormsModule, CapsSelectImports, CapsLabel, CapsButton],
	providers: [],
	host: {
		class: '',
	},
	template: `
		<form class="space-y-5" (ngSubmit)="handleSubmit()">
			<label capsLabel for="fruit-select">Select a Fruit*</label>
			<caps-select id="fruit-select" class="w-56" [(ngModel)]="fruit" placeholder="Select a fruit">
				<caps-select-group label="Fruits">
					<caps-select-option value="apple">Apple</caps-select-option>
					<caps-select-option value="banana">Banana</caps-select-option>
					<caps-select-option value="blueberry">Blueberry</caps-select-option>
					<caps-select-option value="grapes">Grapes</caps-select-option>
					<caps-select-option value="pineapple">Pineapple</caps-select-option>
				</caps-select-group>
			</caps-select>
			<button capsButton>Submit</button>
		</form>
	`,
})
class LabelAndForm {
	public fruit = signal<string | undefined>(undefined);

	public handleSubmit(): void {
		console.log(this.fruit());
	}
}

export const DynamicOptionsMultiSelect: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [DynamicOptionsMultiSelectComponent],
		},
		template: /* HTML */ '<dynamic-options-multi-select-component/>',
	}),
};
@Component({
	selector: 'dynamic-options-multi-select-component',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule, ReactiveFormsModule, CapsSelectImports, CapsLabel, CapsButton, JsonPipe],
	providers: [],
	host: {
		class: '',
	},
	template: `
		<form class="space-y-5">
			<div class="mb-3">
				<pre>Form Control Value: {{ fruit.value | json }}</pre>
			</div>
			<label capsLabel for="fruit-select">Select a Fruit*</label>
			<caps-select-multiple id="fruit-select" class="w-56" [formControl]="fruit" placeholder="Select an option">
				<ng-template capsSelectValue let-values>
					@for (value of values; track value) {
						{{ itemToString(value) }}
					}
				</ng-template>

				<caps-select-group label="Fruits">
					@for (option of options(); track option.value) {
						<caps-select-option [value]="option.value">{{ option.label }}</caps-select-option>
					}
				</caps-select-group>
			</caps-select-multiple>
		</form>
		<button capsButton class="mt-2" (click)="updateOptions()">Update Options</button>
		<button capsButton class="mt-2" (click)="updateDiffOptions()">Update Diff Options</button>
		<button capsButton class="mt-2" (click)="updatePartialOptions()">Update Partial Options</button>
	`,
})
class DynamicOptionsMultiSelectComponent implements OnInit {
	// Checking if an issue with having options as a signal
	public options = signal<{ value: number; label: string }[]>([]);
	fruit = new FormControl([1, 5]);

	itemToString = (value: number) => this.options().find((option) => option.value === value)?.label || '';

	ngOnInit(): void {
		this.options.set([
			{ label: 'Apple', value: 1 },
			{ label: 'Banana', value: 2 },
			{ label: 'Blueberry', value: 3 },
			{ label: 'Grapes', value: 4 },
			{ label: 'Pineapple', value: 5 },
		]);
	}

	public updateOptions() {
		// Reset same options
		this.options.set([
			{ label: 'Apple', value: 1 },
			{ label: 'Banana', value: 2 },
			{ label: 'Blueberry', value: 3 },
			{ label: 'Grapes', value: 4 },
			{ label: 'Pineapple', value: 5 },
		]);
	}

	public updateDiffOptions() {
		// Reset with different option values
		this.options.set([
			{ label: 'Apple', value: 6 },
			{ label: 'Banana', value: 7 },
			{ label: 'Blueberry', value: 8 },
			{ label: 'Grapes', value: 9 },
			{ label: 'Pineapple', value: 10 },
		]);
	}

	public updatePartialOptions() {
		// Reset with different option values
		this.options.set([
			{ label: 'Apple', value: 1 },
			{ label: 'Banana', value: 2 },
			{ label: 'Blueberry', value: 8 },
			{ label: 'Grapes', value: 9 },
			{ label: 'Pineapple', value: 10 },
		]);
	}
}

export const FalsyValue: Story = {
	render: () => ({
		props: { allowPayments: new FormControl<boolean | null>(null) },
		template: /* HTML */ `
			<div class="mb-3">
				<pre data-testid="value">Form Control Value: {{ allowPayments.value | json }}</pre>
			</div>
			<caps-select
				aria-label="Allow payments"
				class="w-56"
				[formControl]="allowPayments"
				placeholder="Select an option"
			>
				<caps-select-option [value]="true">Allowed</caps-select-option>
				<caps-select-option [value]="false">Not allowed</caps-select-option>
			</caps-select>
		`,
	}),
};
