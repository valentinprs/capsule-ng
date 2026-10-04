import { computed, Directive, inject, input } from '@angular/core';
import { capsToggleVariants, CapsToggleVariants } from '@capsule-ng/caps/toggle';
import { BrnToggleGroupItem, injectBrnToggleGroup } from '@spartan-ng/brain/toggle-group';
import { classes } from '@spartan-ng/helm/utils';
import { CapsToggleGroup } from './caps-toggle-group';

@Directive({
	selector: 'button[capsToggleItem]',
	hostDirectives: [
		{
			directive: BrnToggleGroupItem,
			inputs: ['id', 'value', 'disabled', 'state', 'aria-label', 'type'],
			outputs: ['stateChange'],
		},
	],
	host: {
		'data-slot': 'toggle-group-item',
		'[attr.disabled]': '_disabled() ? true : null',
		'[attr.data-disabled]': '_disabled() ? true : null',
		'[attr.data-variant]': '_variant()',
		'[attr.data-size]': '_size()',
		'[attr.data-spacing]': '_toggleGroup.spacing()',
	},
})
export class CapsToggleItem {
	protected readonly _toggleGroup = inject(CapsToggleGroup);
	protected readonly _item = inject(BrnToggleGroupItem);
	protected readonly _brainGroup = injectBrnToggleGroup();
	// Brain guards selection through disabledState; also disable the actual native button for CVA.
	protected readonly _disabled = computed(
		() => this._item.disabled() || this._brainGroup?.disabled() || this._brainGroup?.disabledState(),
	);

	public readonly variant = input<CapsToggleVariants['variant']>('default');
	public readonly size = input<CapsToggleVariants['size']>('default');

	protected readonly _variant = computed(() => this._toggleGroup.variant() || this.variant());
	protected readonly _size = computed(() => this._toggleGroup.size() || this.size());

	constructor() {
		classes(() => [
			'caps-toggle-group-item shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
			capsToggleVariants({
				variant: this._variant(),
				size: this._size(),
			}),
		]);
	}
}
