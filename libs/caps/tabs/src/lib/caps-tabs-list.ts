import { ChangeDetectionStrategy, Component, ElementRef, contentChildren, inject, input } from '@angular/core';
import { BrnTabs, BrnTabsTrigger } from '@spartan-ng/brain/tabs';
import { classes } from '@spartan-ng/helm/utils';

export type CapsTabsType = 'line' | 'contained';
/** The tablist owns keyboard focus; Brain triggers own activation and selection. */
@Component({
	selector: 'caps-tabs-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'tablist',
		'data-slot': 'tabs-list',
		'[attr.aria-orientation]': '_root.orientation()',
		'[attr.data-orientation]': '_root.orientation()',
		'[attr.data-type]': 'type()',
		'(keydown)': '_onKeydown($event)',
	},
	template: `
		<ng-content />
	`,
})
export class CapsTabsList {
	public readonly type = input<CapsTabsType>('contained');
	protected readonly _root = inject(BrnTabs);
	private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly _triggers = contentChildren(BrnTabsTrigger, { descendants: true });
	constructor() {
		classes(
			() =>
				'caps-tabs-list group/tabs-list inline-flex w-fit items-center justify-center data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col',
		);
	}
	protected _onKeydown(event: KeyboardEvent) {
		if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
		// Only tabs in this list participate, including when groups are nested in panels.
		const items = this._triggers().filter(
			(item) =>
				!item.disabled && item.elementRef.nativeElement.closest('[role=tablist]') === this._element.nativeElement,
		);
		const index = items.findIndex((item) => item.elementRef.nativeElement === event.target);
		if (index < 0 || !items.length) return;
		const vertical = this._root.orientation() === 'vertical';
		const next = vertical ? 'ArrowDown' : this._root.direction() === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
		const previous = vertical ? 'ArrowUp' : this._root.direction() === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
		let target: number;
		if (event.key === next) target = (index + 1) % items.length;
		else if (event.key === previous) target = (index + items.length - 1) % items.length;
		else if (event.key === 'Home' || event.key === 'PageUp') target = 0;
		else if (event.key === 'End' || event.key === 'PageDown') target = items.length - 1;
		else return;
		event.preventDefault();
		items[target].focus();
	}
}
