import type { NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute } from '@angular/core';
import { CapsField } from '@capsule-ng/caps/field';
import type { CapsToggleVariants } from '@capsule-ng/caps/toggle';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnToggleGroup } from '@spartan-ng/brain/toggle-group';
import { classes } from '@spartan-ng/helm/utils';

/** A group of native pressed buttons. Brain owns selection and Angular forms. */
@Component({
	selector: 'caps-toggle-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnToggleGroup,
			inputs: ['type', 'value', 'nullable', 'disabled'],
			outputs: ['valueChange'],
		},
		BrnFieldControl,
		{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
	],
	host: {
		'data-slot': 'toggle-group',
		'[attr.data-variant]': 'variant()',
		'[attr.data-size]': 'size()',
		'[attr.data-spacing]': 'spacing()',
		'[attr.data-orientation]': 'orientation()',
		'[style.--gap]': 'spacing()',
		'[attr.aria-labelledby]': 'ariaLabelledby() ?? (ariaLabel() ? null : _field?.labelId())',
		'[attr.aria-label]': 'ariaLabel()',
		'[attr.aria-disabled]': '_effectiveDisabled()',
		'[attr.data-disabled]': '_effectiveDisabled()',
		'[attr.aria-invalid]': '_control.invalid() ? "true" : null',
		'[attr.data-matches-spartan-invalid]': '_control.spartanInvalid() ? "true" : null',
	},
	template: `
		<ng-content />
	`,
})
export class CapsToggleGroup {
	protected readonly _brain = inject(BrnToggleGroup);
	protected readonly _control = inject(BrnFieldControl);
	protected readonly _field = inject(CapsField, { optional: true });
	protected readonly _effectiveDisabled = computed(() => this._brain.disabled() || this._brain.disabledState());
	public readonly variant = input<CapsToggleVariants['variant']>('default');
	public readonly size = input<CapsToggleVariants['size']>('default');
	public readonly spacing = input<number, NumberInput>(0, { transform: numberAttribute });
	public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	constructor() {
		classes(
			() =>
				'caps-toggle-group group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch',
		);
	}
}
