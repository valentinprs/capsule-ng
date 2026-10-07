import { Injectable, InjectionToken, signal, type InputSignal, type ModelSignal } from '@angular/core';
/** @internal Coordinates selectable items without rendering additional form controls. */
export interface CapsSelectableMenuItem {
	checked: ModelSignal<boolean>;
	value: InputSignal<string>;
	radio: boolean;
}
/** @internal */
@Injectable()
export class CapsMenuSelection {
	public readonly generation = signal(0);
	public readonly items = new Set<CapsSelectableMenuItem>();
	public onSelection?: (item: CapsSelectableMenuItem) => void;
	select(item: CapsSelectableMenuItem) {
		if (item.radio) {
			for (const other of this.items) if (other.radio && other !== item) other.checked.set(false);
			item.checked.set(true);
		} else item.checked.set(!item.checked());
		this.onSelection?.(item);
	}
}

/** @internal */
export const CAPS_MENU_SUB = new InjectionToken<boolean>('CapsMenuSub');
