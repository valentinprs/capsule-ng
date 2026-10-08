import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch, lucideX } from '@ng-icons/lucide';
import {
	BrnAutocompleteAnchor,
	BrnAutocompleteClear,
	BrnAutocompleteInput,
	injectBrnAutocompleteBase,
} from '@spartan-ng/brain/autocomplete';
import { BrnField } from '@spartan-ng/brain/field';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-input',
	imports: [CapsInput, CapsButton, CapsInputGroupImports, NgIcon, BrnAutocompleteClear, BrnAutocompleteInput],
	providers: [provideIcons({ lucideSearch, lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnAutocompleteAnchor],
	host: {
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.aria-invalid]': 'null',
	},
	template: `
		<caps-input-group>
			<input
				#nativeInput
				brnAutocompleteInput
				#autocompleteInput="brnAutocompleteInput"
				capsInput
				[aria-describedby]="ariaDescribedby()"
				[attr.aria-label]="_accessibleName()"
				[attr.aria-labelledby]="ariaLabelledby()"
				[attr.aria-invalid]="_invalid() ? 'true' : null"
				[attr.data-matches-spartan-invalid]="_visualInvalid() ? 'true' : null"
				[id]="inputId()"
				[placeholder]="placeholder()"
				[autocomplete]="autocomplete()"
				[aria-invalid]="ariaInvalidInput()"
				[forceInvalid]="forceInvalid()"
			/>

			@if (showSearch()) {
				<caps-input-group-addon>
					<ng-icon aria-hidden="true" name="lucideSearch" [class.opacity-50]="autocompleteInput.disabled()" />
				</caps-input-group-addon>
			}

			@if (showClear()) {
				<caps-input-group-addon align="inline-end">
					<button
						*brnAutocompleteClear
						capsButton
						data-slot="autocomplete-clear"
						aria-label="Clear text"
						(click)="nativeInput.focus()"
						[disabled]="autocompleteInput.disabled()"
						size="icon-xs"
						variant="ghost"
					>
						<ng-icon aria-hidden="true" name="lucideX" />
					</button>
				</caps-input-group-addon>
			}
			<ng-content />
		</caps-input-group>
	`,
})
export class CapsAutocompleteInput {
	private readonly _field = inject(BrnField, { optional: true });
	protected readonly _accessibleName = computed(
		() => this.ariaLabel() ?? (this.ariaLabelledby() || this._field ? null : this.placeholder()),
	);
	private readonly _base = injectBrnAutocompleteBase();
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	protected readonly _invalid = computed(() => this.ariaInvalidInput() ?? this._base.controlState?.()?.invalid);
	protected readonly _visualInvalid = computed(
		() => this.forceInvalid() || this._base.controlState?.()?.spartanInvalid,
	);

	private static _id = 0;

	public readonly inputId = input<string>(`caps-autocomplete-input-${CapsAutocompleteInput._id++}`);

	public readonly placeholder = input<string>('');

	public readonly autocomplete = input<string>('off');

	public readonly showSearch = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	public readonly showClear = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	/** Forces the invalid state visually, regardless of form control state. */
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	/** Manual override for aria-invalid. When not set, auto-detects from the parent autocomplete error state. */
	public readonly ariaInvalidInput = input<boolean | undefined, BooleanInput>(undefined, {
		transform: (v: BooleanInput) => (v === '' || v === undefined ? undefined : booleanAttribute(v)),
		alias: 'aria-invalid',
	});

	constructor() {
		classes(() => 'block w-full min-w-0');
	}
}
