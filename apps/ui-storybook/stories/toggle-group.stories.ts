import type { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic, lucideUnderline } from '@ng-icons/lucide';
import { ToggleType } from '@spartan-ng/brain/toggle-group';

import { CapsToggleGroup, CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { hlmP } from '@spartan-ng/helm/typography';
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsToggleGroup> = {
	title: 'Toggle Group',
	component: CapsToggleGroup,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'outline'],
			description: 'The visual style of the toggle group',
			defaultValue: 'default',
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg'],
			description: 'The size of the toggle group',
			defaultValue: 'default',
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupImports, NgIcon],
			providers: [provideIcons({ lucideBold, lucideItalic, lucideUnderline })],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsToggleGroup>;

export const Default: Story = {
	render: (args) => ({
		template: `
		<div class="flex items-center justify-center p-4">
	 <caps-toggle-group aria-label="Options" type="single" ${argsToTemplate(args)}> <button aria-label="Bold Toggle" value="bold" capsToggleItem>
	   <ng-icon name="lucideBold" ${argsToTemplate(args)} />
	 </button>

	 <button aria-label="Italic Toggle" value="italic" capsToggleItem>
	   <ng-icon name="lucideItalic" ${argsToTemplate(args)} />
	 </button>

	 <button aria-label="Underline Toggle" value="underline" capsToggleItem>
	   <ng-icon name="lucideUnderline" ${argsToTemplate(args)} />
	 </button>
			</caps-toggle-group>
		</div>
		`,
	}),
};

export const Outline: Story = {
	render: (args) => ({
		template: `
		<div class="flex items-center justify-center p-4">
	<caps-toggle-group aria-label="Options" size="sm" variant="outline" type="multiple" ${argsToTemplate(args)}> <button aria-label="Bold" value="bold" capsToggleItem>
		 <ng-icon name="lucideBold" />
	 </button>

	 <button aria-label="Italic" value="italic" capsToggleItem>
	   <ng-icon name="lucideItalic" />
	 </button>

	 <button aria-label="Underline" value="underline" capsToggleItem>
	 	 <ng-icon name="lucideUnderline" />
	 </button>
	</caps-toggle-group>
		</div>
		`,
	}),
};

export const Small: Story = {
	render: (args) => ({
		template: `
	<div class="flex items-center justify-center p-4">
	<caps-toggle-group aria-label="Options" size="sm" ${argsToTemplate(args)} type="single"> <button aria-label="Bold" value="bold" capsToggleItem>
	 <ng-icon name="lucideBold" />
	</button>
	<button aria-label="Italic" value="italic" capsToggleItem>
	  <ng-icon name="lucideItalic" />
	</button>
	<button aria-label="Underline" value="underline" capsToggleItem>
		 <ng-icon name="lucideUnderline" />
	</button>
	</caps-toggle-group>
	</div>
		`,
	}),
};

export const Large: Story = {
	render: (args) => ({
		template: `
		<div class="flex items-center justify-center p-4">
<caps-toggle-group aria-label="Options" ${argsToTemplate(args)} type="single" size="lg"> <button aria-label="Bold" value="bold" capsToggleItem>
		 <ng-icon  name="lucideBold" />
	 </button>

	 <button aria-label="Italic" value="italic" capsToggleItem>
	   <ng-icon  name="lucideItalic" />
	 </button>

	 <button aria-label="Underline" value="underline" capsToggleItem>
	 	 <ng-icon  name="lucideUnderline" />
	 </button>
	</caps-toggle-group>
		</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: `
	<div class="flex items-center justify-center p-4">
  <caps-toggle-group aria-label="Options" type="single" size="sm" disabled> <button aria-label="Bold" value="bold" capsToggleItem>
		 <ng-icon name="lucideBold" />
	</button>
	<button aria-label="Italic" value="italic" capsToggleItem>
	  <ng-icon name="lucideItalic" />
	</button>
	<button aria-label="Underline" value="underline" capsToggleItem>
		 <ng-icon name="lucideUnderline" />
	</button>
	</caps-toggle-group>
	</div>
		`,
	}),
};

type City = { name: string; population: number };
const CITIES = [
	{
		name: 'Sparta',
		population: 23234233,
	},
	{
		name: 'Athens',
		population: 989889,
	},
	{
		name: 'Corinth',
		population: 988989,
	},
	{
		name: 'Syracuse',
		population: 998889,
	},
];

@Component({
	selector: 'caps-toggle-group-story',
	imports: [CapsToggleGroupImports, CapsButton, FormsModule],
	template: `
		<div class="flex space-x-4 p-4">
			<caps-toggle-group
				aria-label="Options"
				[disabled]="disabled()"
				[nullable]="nullable()"
				[type]="type()"
				[(ngModel)]="selected"
				variant="merged"
			>
				@for (city of cities; track city.name; let last = $last) {
					<button [value]="city" capsToggleItem>
						{{ city.name }}
					</button>
				}
			</caps-toggle-group>

			<button capsButton size="sm" (click)="setToSyracuse()">Set to Syracuse</button>
			<button capsButton size="sm" (click)="addCity()">Add Piraeus</button>
		</div>

		<p class="${hlmP}">{{ type() === 'multiple' ? 'Cities selected' : 'City selected' }}: {{ selectedCities }}</p>
	`,
})
class CapsToggleGroupStory {
	public readonly type = input<ToggleType>('single');
	public readonly nullable = input<BooleanInput>(true);
	public readonly disabled = input<BooleanInput>(false);
	public readonly defaultValue = input<City | City[] | undefined>(undefined);
	public readonly selected = signal<City | City[] | undefined>(undefined);

	private _cities: City[] = [...CITIES];
	public get cities(): City[] {
		return this._cities;
	}

	ngOnInit() {
		this.selected.set(this.defaultValue());
	}

	get selectedCities() {
		if (!this.selected()) {
			return this.type() === 'multiple' ? 'No cities selected' : 'No city selected';
		}

		if (Array.isArray(this.selected())) {
			const selectedArray = this.selected() as City[];
			if (selectedArray.length === 0) return 'No cities selected';

			return selectedArray.map((c) => c.name).join(',');
		}

		// At this point, selected must be a single City
		const selectedCity = this.selected() as City;
		return selectedCity.name;
	}

	setToSyracuse() {
		this.selected.set(this.type() === 'multiple' ? [this.cities[3]] : this.cities[3]);
	}

	addCity() {
		this.cities.push({
			name: 'Piraeus',
			population: 998889,
		});
	}
}

export const ToggleGroupSingleNullable: Story = {
	name: 'Toggle Group - Single Nullable',
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupStory],
		}),
	],
	render: () => ({
		template: '<caps-toggle-group-story/>',
	}),
};

export const ToggleGroupMultipleNullable: Story = {
	name: 'Toggle Group - Multiple Nullable',
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupStory],
		}),
	],
	render: () => ({
		template: '<caps-toggle-group-story type="multiple"/>',
	}),
};

export const ToggleGroupSingle: StoryObj<{ defaultValue: City }> = {
	name: 'Toggle Group - Single',
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupStory],
		}),
	],
	args: {
		defaultValue: CITIES[0],
	},
	render: ({ defaultValue }) => ({
		props: { defaultValue },
		template: '<caps-toggle-group-story nullable="false" [defaultValue]="defaultValue"/>',
	}),
};

export const ToggleGroupDisabled: Story = {
	name: 'Toggle Group - Disabled',
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupStory],
		}),
	],
	render: () => ({
		template: '<caps-toggle-group-story [disabled]="true"/>',
	}),
};

export const ToggleGroupMultiple: StoryObj<{ defaultValue: City[] }> = {
	name: 'Toggle Group - Multiple',
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupStory],
		}),
	],
	args: {
		defaultValue: [CITIES[0]],
	},
	render: ({ defaultValue }) => ({
		props: { defaultValue },
		template: '<caps-toggle-group-story type="multiple" nullable="false" [defaultValue]="defaultValue"/>',
	}),
};

@Component({
	selector: 'caps-toggle-group-form-story',
	imports: [CapsToggleGroupImports, FormsModule, ReactiveFormsModule],
	template: `
		<form class="flex space-x-4 p-4" [formGroup]="citiesForm">
			<caps-toggle-group aria-label="Options" formControlName="selectedCity" [nullable]="false">
				@for (city of cities; track city.name; let last = $last) {
					<button [value]="city" capsToggleItem>
						{{ city.name }}
					</button>
				}
			</caps-toggle-group>
		</form>

		<pre class="${hlmP}" data-testid="selectedCity">{{ citiesForm.controls.selectedCity?.getRawValue()?.name }}</pre>
	`,
})
class CapsToggleGroupFormStory {
	protected readonly cities: City[] = CITIES;
	protected readonly citiesForm = new FormGroup({
		selectedCity: new FormControl(CITIES[0]),
	});
}

export const ToggleGroupForm: Story = {
	name: 'Toggle Group - Form',
	decorators: [
		moduleMetadata({
			imports: [CapsToggleGroupFormStory],
		}),
	],
	render: () => ({
		template: '<caps-toggle-group-form-story/>',
	}),
};

@Component({
	selector: 'caps-toggle-group-disabled-form-story',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CapsToggleGroupImports, CapsButton, ReactiveFormsModule],
	template: `
		<div class="flex flex-col gap-4">
			<caps-toggle-group [formControl]="choice" aria-label="Formatting">
				<button capsToggleItem value="bold">Bold</button>
				<button capsToggleItem value="italic" disabled>Italic</button>
				<button capsToggleItem value="underline">Underline</button>
			</caps-toggle-group>
			<div class="flex gap-2">
				<button capsButton variant="outline" (click)="choice.disable()">Disable group</button>
				<button capsButton variant="outline" (click)="choice.enable()">Enable group</button>
			</div>
			<output data-testid="choice">{{ choice.value }}</output>
		</div>
	`,
})
class DisabledFormStory {
	public readonly choice = new FormControl('bold');
}
export const DisabledForm: Story = {
	decorators: [moduleMetadata({ imports: [DisabledFormStory] })],
	render: () => ({ template: '<caps-toggle-group-disabled-form-story />' }),
};
