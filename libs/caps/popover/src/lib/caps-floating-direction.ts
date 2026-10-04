import { Directionality, type Direction } from '@angular/cdk/bidi';
import { computed, effect, EventEmitter, inject, Injectable, signal } from '@angular/core';

/** @internal Direction inherited by an owned overlay, without adding a native Dir match. */
@Injectable()
export class CapsFloatingDirection {
	private readonly _parent = inject(Directionality, { skipSelf: true });
	public readonly explicit = signal<Direction | undefined>(undefined);
	public readonly valueSignal = computed(() => this.explicit() ?? this._parent.valueSignal());
	public readonly change = new EventEmitter<Direction>();
	public get value(): Direction {
		return this.valueSignal();
	}
	constructor() {
		effect(() => this.change.emit(this.valueSignal()));
	}
}
