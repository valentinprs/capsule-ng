import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, resource, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	CapsAutocomplete,
	CapsAutocompleteImports,
	provideCapsAutocompleteConfig,
} from '@capsule-ng/caps/autocomplete';
import { CapsButton, CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'autocomplete-reactive-form-story',

	imports: [JsonPipe, CapsAutocompleteImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm">
			<caps-field-group>
				<caps-field>
					<caps-field-label for="framework">Framework *</caps-field-label>
					<caps-autocomplete formControlName="framework" [(search)]="search">
						<caps-autocomplete-input inputId="framework" placeholder="Search frameworks..." />
						<caps-autocomplete-content>
							<caps-autocomplete-empty>No frameworks found.</caps-autocomplete-empty>

							@for (fw of filteredOptions(); track fw) {
								<caps-autocomplete-option [value]="fw">{{ fw }}</caps-autocomplete-option>
							}
						</caps-autocomplete-content>
					</caps-autocomplete>
					<caps-field-description>Start typing to find a framework.</caps-field-description>
				</caps-field>

				<caps-field orientation="horizontal">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</caps-field>
			</caps-field-group>
		</form>

		<pre class="mt-4 text-xs">
Touched: {{ form.get('framework')?.touched }}  |  Invalid: {{ form.get('framework')?.invalid }}  |  Value: {{
				form.get('framework')?.value | json
			}}</pre
		>
	`,
})
class AutocompleteReactiveFormStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ framework: ['', Validators.required] });
	public readonly search = signal('');
	public readonly filteredOptions = computed(() =>
		frameworks.filter((fw) => fw.toLowerCase().includes(this.search().toLowerCase())),
	);
}

// ── With Hint and Error ──────────────────────────────────────────────────────

@Component({
	selector: 'autocomplete-hint-error-story',

	imports: [CapsAutocompleteImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Framework *</caps-field-label>
					<caps-autocomplete formControlName="framework" [(search)]="search">
						<caps-autocomplete-input inputId="framework" placeholder="Search frameworks..." />
						<caps-autocomplete-content>
							<caps-autocomplete-empty>No frameworks found.</caps-autocomplete-empty>

							@for (fw of filteredOptions(); track fw) {
								<caps-autocomplete-option [value]="fw">{{ fw }}</caps-autocomplete-option>
							}
						</caps-autocomplete-content>
					</caps-autocomplete>

					<caps-field-description>Pick your primary framework so we can tailor docs.</caps-field-description>

					<caps-field-error>Select a framework to continue.</caps-field-error>
				</caps-field>

				<caps-field orientation="horizontal">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
class AutocompleteHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ framework: ['', Validators.required] });
	public readonly search = signal('');
	public readonly filteredOptions = computed(() =>
		frameworks.filter((fw) => fw.toLowerCase().includes(this.search().toLowerCase())),
	);
}

@Component({
	selector: 'autocomplete-search-hint-error-story',

	imports: [CapsAutocompleteImports, CapsFieldImports, CapsButton, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<form [formGroup]="form" class="w-full max-w-sm">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Framework *</caps-field-label>
					<caps-autocomplete-search formControlName="framework" [(search)]="search">
						<caps-autocomplete-input inputId="framework" placeholder="Search frameworks..." />
						<caps-autocomplete-content>
							<caps-autocomplete-empty>No frameworks found.</caps-autocomplete-empty>

							@for (fw of filteredOptions(); track fw) {
								<caps-autocomplete-option [value]="fw">{{ fw }}</caps-autocomplete-option>
							}
						</caps-autocomplete-content>
					</caps-autocomplete-search>

					<caps-field-description>Pick your primary framework so we can tailor docs.</caps-field-description>

					<caps-field-error>Select a framework to continue.</caps-field-error>
				</caps-field>

				<caps-field orientation="horizontal">
					<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
class AutocompleteSearchHintErrorStory {
	private readonly _fb = inject(FormBuilder);
	public readonly form = this._fb.group({ framework: ['', Validators.required] });
	public readonly search = signal('');
	public readonly filteredOptions = computed(() =>
		frameworks.filter((fw) => fw.toLowerCase().includes(this.search().toLowerCase())),
	);
}

@Component({
	selector: 'spartan-autocomplete-async',
	imports: [CapsAutocompleteImports, CapsSpinnerImports],
	template: `
		<caps-autocomplete [(search)]="search">
			<caps-autocomplete-input placeholder="Search" />
			<caps-autocomplete-content>
				<caps-autocomplete-status class="justify-start">
					@if (options.isLoading()) {
						<caps-spinner aria-hidden="true" />
					}
				</caps-autocomplete-status>

				@if (options.hasValue()) {
					@for (option of options.value(); track $index) {
						<caps-autocomplete-option [value]="option">{{ option }}</caps-autocomplete-option>
					}
				}
			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
})
class AutocompleteAsync {
	public readonly search = signal('');

	public options = resource({
		defaultValue: [],
		params: () => ({ search: this.search() }),
		loader: async ({ params }) => {
			const search = params.search;

			if (search.length === 0) {
				return [];
			}

			// Simulate empty state
			if (search === 'empty') {
				return [];
			}

			// DEV - call your API or 3rd party service here
			// simulate async
			return new Promise<string[]>((resolve) => {
				setTimeout(() => {
					const newOptions = Array.from({ length: 15 }, (_, i) => `${search}-${i + 1}`);
					resolve(newOptions);
				}, 500);
			});
		},
	});
}

type Country = {
	name: string;
	code: string;
	flag: string;
};

@Component({
	selector: 'spartan-autocomplete-form',
	imports: [ReactiveFormsModule, CapsAutocompleteImports, CapsButtonImports, CapsFieldImports],
	template: `
		<form [formGroup]="form" (ngSubmit)="submit()">
			<caps-field-group>
				<caps-field>
					<caps-field-label for="character">Choose your favorite character</caps-field-label>
					<caps-autocomplete formControlName="option" [(search)]="search">
						<caps-autocomplete-input inputId="character" placeholder="Search characters" />
						<caps-autocomplete-content>
							<caps-autocomplete-empty>No characters found.</caps-autocomplete-empty>

							@for (option of filteredOptions(); track $index) {
								<caps-autocomplete-option [value]="option">{{ option }}</caps-autocomplete-option>
							}
						</caps-autocomplete-content>
					</caps-autocomplete>
				</caps-field>
				<caps-field orientation="horizontal">
					<button type="submit" capsButton>Submit</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
class AutocompleteForm {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _options: string[] = [
		'Marty McFly',
		'Doc Brown',
		'Biff Tannen',
		'George McFly',
		'Jennifer Parker',
		'Emmett Brown',
		'Einstein',
		'Clara Clayton',
		'Needles',
		'Goldie Wilson',
		'Marvin Berry',
		'Lorraine Baines',
		'Strickland',
	];

	public readonly search = signal('');

	public form = this._formBuilder.group({
		option: new FormControl<string | null>(null, Validators.required),
	});

	public readonly filteredOptions = computed(() =>
		this._options.filter((option) => option.toLowerCase().includes(this.search().toLowerCase())),
	);

	submit() {
		console.log(this.form.value);
	}
}

type Item = {
	id: string;
	label: string;
};

@Component({
	selector: 'spartan-autocomplete-transform-option-value',
	imports: [ReactiveFormsModule, CapsAutocompleteImports, CapsButtonImports, CapsFieldImports],
	template: `
		<form [formGroup]="form" (ngSubmit)="submit()">
			<caps-field-group>
				<caps-field>
					<caps-field-label for="character">Choose your favorite character</caps-field-label>
					<caps-autocomplete formControlName="option" [(search)]="search" [itemToString]="itemToString">
						<caps-autocomplete-input inputId="character" placeholder="Search characters" showClear />
						<caps-autocomplete-content>
							<caps-autocomplete-empty>No characters found.</caps-autocomplete-empty>

							@for (option of filteredOptions(); track $index) {
								<caps-autocomplete-option [value]="option.id">{{ option.label }}</caps-autocomplete-option>
							}
						</caps-autocomplete-content>
					</caps-autocomplete>
				</caps-field>

				<caps-field orientation="horizontal">
					<button type="submit" capsButton>Submit</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
class AutocompleteTransformOptionValue {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _options: Item[] = [
		{ id: '1', label: 'Marty McFly' },
		{ id: '2', label: 'Doc Brown' },
		{ id: '3', label: 'Biff Tannen' },
		{ id: '4', label: 'George McFly' },
		{ id: '5', label: 'Jennifer Parker' },
		{ id: '6', label: 'Emmett Brown' },
		{ id: '7', label: 'Einstein' },
		{ id: '8', label: 'Clara Clayton' },
		{ id: '9', label: 'Needles' },
		{ id: '10', label: 'Goldie Wilson' },
		{ id: '11', label: 'Marvin Berry' },
		{ id: '12', label: 'Lorraine Baines' },
		{ id: '13', label: 'Strickland' },
	];

	public itemToString = (id: string) => this._options.find((option) => option.id === id)?.label ?? '';

	public readonly search = signal('');

	public form = this._formBuilder.group({
		option: new FormControl<string>('10', Validators.required),
	});

	public readonly filteredOptions = computed(() => {
		return this._options.filter((option) => option.label.toLowerCase().includes(this.search().toLowerCase()));
	});

	submit() {
		console.log(this.form.value.option);
	}
}

export default {
	title: 'Autocomplete',
	component: CapsAutocomplete,
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Autocomplete examples</h1>${story}</main>`,
		),
		moduleMetadata({
			imports: [
				AutocompleteAsync,
				AutocompleteForm,
				AutocompleteTransformOptionValue,
				CapsAutocompleteImports,
				AutocompleteReactiveFormStory,
				AutocompleteHintErrorStory,
				AutocompleteSearchHintErrorStory,
			],
		}),
	],
} as Meta<CapsAutocomplete>;

type Story = StoryObj<CapsAutocomplete>;

export const Default: Story = {
	render: () => {
		const search = signal('');
		const options = [
			'Marty McFly',
			'Doc Brown',
			'Biff Tannen',
			'George McFly',
			'Jennifer Parker',
			'Emmett Brown',
			'Einstein',
			'Clara Clayton',
			'Needles',
			'Goldie Wilson',
			'Marvin Berry',
			'Lorraine Baines',
			'Strickland',
		];
		const filteredOptions = computed(() =>
			options.filter((option) => option.toLowerCase().includes(search().toLowerCase())),
		);
		return {
			props: {
				search,
				filteredOptions,
			},
			template: `
		<caps-autocomplete [(search)]="search">
			<caps-autocomplete-input placeholder="Search characters" />
			<caps-autocomplete-content>
				<caps-autocomplete-empty>No characters found.</caps-autocomplete-empty>

					@for (option of filteredOptions(); track $index) {
						<caps-autocomplete-option [value]="option">{{ option }}</caps-autocomplete-option>
					}

			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
		};
	},
};

export const Async: Story = {
	render: () => ({
		template: '<spartan-autocomplete-async />',
	}),
};

export const Config: Story = {
	decorators: [
		moduleMetadata({
			providers: [
				provideCapsAutocompleteConfig({
					itemToString: (option: Country) => `${option.flag} ${option.name}`,
				}),
			],
		}),
	],
	render: () => {
		const search = signal('');
		const countries: Country[] = [
			{ name: 'Argentina', code: 'AR', flag: '🇦🇷' },
			{ name: 'Australia', code: 'AU', flag: '🇦🇺' },
			{ name: 'Belgium', code: 'BE', flag: '🇧🇪' },
			{ name: 'Brazil', code: 'BR', flag: '🇧🇷' },
			{ name: 'Canada', code: 'CA', flag: '🇨🇦' },
			{ name: 'China', code: 'CN', flag: '🇨🇳' },
			{ name: 'France', code: 'FR', flag: '🇫🇷' },
			{ name: 'Germany', code: 'DE', flag: '🇩🇪' },
			{ name: 'India', code: 'IN', flag: '🇮🇳' },
			{ name: 'Italy', code: 'IT', flag: '🇮🇹' },
			{ name: 'Japan', code: 'JP', flag: '🇯🇵' },
			{ name: 'Mexico', code: 'MX', flag: '🇲🇽' },
			{ name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
			{ name: 'Norway', code: 'NO', flag: '🇳🇴' },
			{ name: 'Russia', code: 'RU', flag: '🇷🇺' },
			{ name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
			{ name: 'South Korea', code: 'KR', flag: '🇰🇷' },
			{ name: 'Spain', code: 'ES', flag: '🇪🇸' },
			{ name: 'Sweden', code: 'SE', flag: '🇸🇪' },
			{ name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
			{ name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
			{ name: 'United States', code: 'US', flag: '🇺🇸' },
		];
		const filteredCountries = computed(() =>
			countries.filter(
				(country) =>
					country.name.toLowerCase().includes(search().toLowerCase()) ||
					`${country.flag} ${country.name}`.toLowerCase().includes(search().toLowerCase()),
			),
		);
		return {
			props: {
				search,
				filteredCountries,
			},
			template: `
		<caps-autocomplete [(search)]="search">
			<caps-autocomplete-input placeholder="Search countries" />
			<caps-autocomplete-content>
				<caps-autocomplete-empty>No countries found.</caps-autocomplete-empty>

					@for (country of filteredCountries(); track $index) {
						<caps-autocomplete-option [value]="country">{{ country.flag }} {{ country.name }}</caps-autocomplete-option>
					}

			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
		};
	},
};

export const Countries: Story = {
	render: () => {
		const search = signal('');
		const countries: Country[] = [
			{ name: 'Argentina', code: 'AR', flag: '🇦🇷' },
			{ name: 'Australia', code: 'AU', flag: '🇦🇺' },
			{ name: 'Belgium', code: 'BE', flag: '🇧🇪' },
			{ name: 'Brazil', code: 'BR', flag: '🇧🇷' },
			{ name: 'Canada', code: 'CA', flag: '🇨🇦' },
			{ name: 'China', code: 'CN', flag: '🇨🇳' },
			{ name: 'France', code: 'FR', flag: '🇫🇷' },
			{ name: 'Germany', code: 'DE', flag: '🇩🇪' },
			{ name: 'India', code: 'IN', flag: '🇮🇳' },
			{ name: 'Italy', code: 'IT', flag: '🇮🇹' },
			{ name: 'Japan', code: 'JP', flag: '🇯🇵' },
			{ name: 'Mexico', code: 'MX', flag: '🇲🇽' },
			{ name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
			{ name: 'Norway', code: 'NO', flag: '🇳🇴' },
			{ name: 'Russia', code: 'RU', flag: '🇷🇺' },
			{ name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
			{ name: 'South Korea', code: 'KR', flag: '🇰🇷' },
			{ name: 'Spain', code: 'ES', flag: '🇪🇸' },
			{ name: 'Sweden', code: 'SE', flag: '🇸🇪' },
			{ name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
			{ name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
			{ name: 'United States', code: 'US', flag: '🇺🇸' },
		];
		const itemToString = (country: Country) => `${country.flag} ${country.name}`;
		const filteredCountries = computed(() =>
			countries.filter(
				(country) =>
					country.name.toLowerCase().includes(search().toLowerCase()) ||
					`${country.flag} ${country.name}`.toLowerCase().includes(search().toLowerCase()),
			),
		);
		return {
			props: {
				search,
				filteredCountries,
				itemToString,
			},
			template: `
		<caps-autocomplete [(search)]="search" [itemToString]="itemToString">
			<caps-autocomplete-input placeholder="Search countries" />
			<caps-autocomplete-content>
				<caps-autocomplete-empty>No countries found.</caps-autocomplete-empty>

					@for (country of filteredCountries(); track $index) {
						<caps-autocomplete-option [value]="country">{{ country.flag }} {{ country.name }}</caps-autocomplete-option>
					}

			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
		};
	},
};

export const Form: Story = {
	render: () => ({
		template: '<spartan-autocomplete-form />',
	}),
};

export const TransformOptionValue: Story = {
	render: () => ({
		template: '<spartan-autocomplete-transform-option-value />',
	}),
};

const frameworks = ['Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Ember', 'Next.js', 'Nuxt', 'Remix', 'Astro'];

// ── With Reactive Form ───────────────────────────────────────────────────────

export const WithReactiveForm: Story = {
	render: () => ({
		template: '<autocomplete-reactive-form-story />',
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		template: '<autocomplete-hint-error-story />',
	}),
};

export const SearchWithHintAndError: Story = {
	render: () => ({
		template: '<autocomplete-search-hint-error-story />',
	}),
};
