import { Directive, effect, ElementRef, inject, input, linkedSignal } from '@angular/core';
import { BrnOverlay } from '@spartan-ng/brain/overlay';
import { BrnPopover } from '@spartan-ng/brain/popover';

@Directive({ selector: '[capsDatePickerAnchor]' })
export class CapsDatePickerAnchor {
	private readonly _host = inject(ElementRef, { host: true });
	private readonly _brnOverlay = inject(BrnOverlay, { optional: true });

	public readonly capsDatePickerAnchorForInput = input<BrnPopover | undefined>(undefined, {
		alias: 'capsDatePickerAnchorFor',
	});

	public readonly capsDatePickerAnchorFor = linkedSignal(this.capsDatePickerAnchorForInput);

	constructor() {
		effect(() => {
			this.capsDatePickerAnchorFor()?.setOrigin(this._host.nativeElement);
		});

		this._brnOverlay?.setOrigin(this._host.nativeElement);
	}
}
