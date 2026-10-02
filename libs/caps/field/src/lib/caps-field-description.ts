import { ChangeDetectionStrategy, Component, effect, inject, input, OnDestroy } from '@angular/core';
import { BrnFieldA11yService } from '@spartan-ng/brain/field';
import { classes } from '@spartan-ng/helm/utils';

/** Help text registered with the closest Field or native FieldSet, even through FieldContent. */
@Component({
	selector: 'caps-field-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'field-description', '[attr.id]': 'id()' },
	template: `
		<ng-content />
	`,
})
export class CapsFieldDescription implements OnDestroy {
	private static _id = 0;
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	private _registeredId: string | undefined;
	/** Unique description ID, generated when omitted. */
	public readonly id = input<string>(`caps-field-description-${++CapsFieldDescription._id}`);

	constructor() {
		classes(
			() =>
				'caps-field-description [&>a:hover]:text-primary block text-start leading-normal font-normal [&>a]:underline [&>a]:underline-offset-4',
		);
		effect(() => {
			const id = this.id();
			if (this._registeredId === id) return;
			if (this._registeredId) this._a11y?.unregisterDescription(this._registeredId);
			this._a11y?.registerDescription(id);
			this._registeredId = id;
		});
	}

	ngOnDestroy() {
		if (this._registeredId) this._a11y?.unregisterDescription(this._registeredId);
	}
}
