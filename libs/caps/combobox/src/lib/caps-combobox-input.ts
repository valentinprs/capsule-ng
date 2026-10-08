import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideX } from '@ng-icons/lucide';
import {
	BrnComboboxAnchor,
	BrnComboboxImports,
	BrnComboboxPopoverTrigger,
	injectBrnComboboxBase,
} from '@spartan-ng/brain/combobox';
import { BrnField } from '@spartan-ng/brain/field';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-input',
	imports: [CapsInput, CapsButton, CapsInputGroupImports, NgIcon, BrnComboboxImports, BrnComboboxPopoverTrigger],
	providers: [provideIcons({ lucideChevronDown, lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxAnchor],
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
				brnComboboxInput
				#comboboxInput="brnComboboxInput"
				brnComboboxPopoverTrigger
				[closeOnTriggerClick]="false"
				capsInput
				[aria-describedby]="ariaDescribedby()"
				[attr.aria-label]="_accessibleName()"
				[attr.aria-labelledby]="ariaLabelledby()"
				[attr.aria-invalid]="_invalid() ? 'true' : null"
				[attr.data-matches-spartan-invalid]="_visualInvalid() ? 'true' : null"
				[id]="inputId()"
				[placeholder]="placeholder()"
				[forceInvalid]="forceInvalid()"
				[aria-invalid]="ariaInvalidInput()"
			/>

			<caps-input-group-addon align="inline-end">
				@if (showTrigger()) {
					<button
						brnComboboxPopoverTrigger
						capsButton
						data-slot="input-group-button"
						[disabled]="comboboxInput.disabled()"
						[attr.aria-label]="triggerAriaLabel()"
						size="icon-xs"
						variant="ghost"
						class="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
					>
						<ng-icon aria-hidden="true" name="lucideChevronDown" />
					</button>
				}

				@if (showClear()) {
					<button
						*brnComboboxClear
						(click)="nativeInput.focus()"
						capsButton
						data-slot="combobox-clear"
						[disabled]="comboboxInput.disabled()"
						[attr.aria-label]="clearAriaLabel()"
						size="icon-xs"
						variant="ghost"
					>
						<ng-icon aria-hidden="true" name="lucideX" />
					</button>
				}
			</caps-input-group-addon>

			<ng-content />
		</caps-input-group>
	`,
})
export class CapsComboboxInput {
	private readonly _field = inject(BrnField, { optional: true });
	protected readonly _accessibleName = computed(
		() =>
			this.ariaLabel() ??
			(this.ariaLabelledby() || (this._field && this._base.mode() !== 'popup') ? null : this.placeholder()),
	);
	private readonly _base = injectBrnComboboxBase();
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	protected readonly _invalid = computed(() => this.ariaInvalidInput() ?? this._base.controlState?.()?.invalid);
	protected readonly _visualInvalid = computed(
		() => this.forceInvalid() || this._base.controlState?.()?.spartanInvalid,
	);

	private static _id = 0;

	public readonly inputId = input<string>(`caps-combobox-input-${CapsComboboxInput._id++}`);
	public readonly placeholder = input<string>('');

	public readonly showTrigger = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	public readonly showClear = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	/** Accessible name for the icon-only popover trigger button. */
	public readonly triggerAriaLabel = input<string>('Toggle options');

	/** Accessible name for the icon-only clear button. */
	public readonly clearAriaLabel = input<string>('Clear selection');

	/** Manual override for aria-invalid. When not set, auto-detects from the parent combobox error state. */
	public readonly ariaInvalidInput = input<boolean | undefined, BooleanInput>(undefined, {
		transform: (v: BooleanInput) => (v === '' || v === undefined ? undefined : booleanAttribute(v)),
		alias: 'aria-invalid',
	});

	constructor() {
		classes(() => 'block w-full min-w-0');
	}
}
