import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CapsButton, CapsButtonVariant } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnComboboxAnchor, BrnComboboxPopoverTrigger, BrnComboboxTrigger } from '@spartan-ng/brain/combobox';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

@Component({
	selector: 'caps-combobox-trigger',
	imports: [
		NgIcon,
		CapsButton,
		BrnComboboxAnchor,
		BrnComboboxTrigger,
		BrnComboboxPopoverTrigger,
		BrnFieldControlDescribedBy,
	],
	providers: [provideIcons({ lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
	},
	template: `
		<button
			brnComboboxTrigger
			brnComboboxAnchor
			brnComboboxPopoverTrigger
			brnFieldControlDescribedBy
			capsButton
			data-slot="combobox-trigger"
			[id]="buttonId()"
			[attr.aria-label]="ariaLabel()"
			[attr.aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="ariaDescribedby()"
			[class]="_computedClass()"
			[variant]="variant()"
			[forceInvalid]="forceInvalid()"
		>
			<ng-content />
			<ng-icon aria-hidden="true" name="lucideChevronDown" class="caps-combobox-trigger-icon" />
		</button>
	`,
})
export class CapsComboboxTrigger {
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });

	private static _id = 0;

	public readonly userClass = input<ClassValue>('', {
		alias: 'class',
	});
	protected readonly _computedClass = computed(() => hlm('caps-combobox-trigger', this.userClass()));

	public readonly buttonId = input<string>(`caps-combobox-trigger-${CapsComboboxTrigger._id++}`);

	public readonly variant = input<CapsButtonVariant>('outline');

	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
}
