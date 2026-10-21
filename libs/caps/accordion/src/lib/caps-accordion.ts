import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, input, untracked } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsAccordionBehavior } from './caps-accordion-behavior';

@Component({
	selector: 'caps-accordion',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [CapsAccordionBehavior],
	host: {
		role: 'list',
		'data-slot': 'accordion',
		'[attr.data-align]': 'align()',
		'[attr.data-size]': 'size()',
		'[attr.data-variant]': 'variant()',
		'[attr.data-flush]': 'isFlush() && align() !== "start"',
	},
	template: `
		<ng-content />
	`,
})
export class CapsAccordion {
	/** Position of the chevron in the reading direction. */
	public readonly align = input<'start' | 'end'>('end');
	public readonly size = input<'sm' | 'md' | 'lg'>('md');
	/** Figma Line Accordion or Bordered Accordion (a 16px-radius box around the items). */
	public readonly variant = input<'line' | 'bordered'>('line');
	/** Flush text with the container. Ignored with align="start", as in Carbon Angular. */
	public readonly isFlush = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly skeleton = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	constructor() {
		const behavior = inject(CapsAccordionBehavior);
		classes(() => 'caps-accordion flex w-full flex-col');
		effect(() => {
			if (this.disabled()) {
				untracked(() => behavior.openItemIds().forEach((id) => behavior.closeItem(id)));
			}
		});
	}
}
