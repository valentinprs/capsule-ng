import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	OnDestroy,
} from '@angular/core';
import { BrnField, BrnFieldA11yService } from '@spartan-ng/brain/field';
import { ErrorStateMatcher } from '@spartan-ng/brain/forms';
import { classes } from '@spartan-ng/helm/utils';
import { injectCapsFieldParentForm } from './caps-field-form-context';

/** Displays projected messages and describes the control only while the error is visible. */
@Component({
	selector: 'caps-field-error',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'alert', 'data-slot': 'field-error', '[attr.id]': 'id()', '[hidden]': '!_display()' },
	template: `
		@if (_display()) {
			<ng-content />
		}
	`,
})
export class CapsFieldError implements OnDestroy {
	private static _id = 0;
	private readonly _field = inject(BrnField, { optional: true });
	private readonly _matcher = inject(ErrorStateMatcher);
	private readonly _parentForm = injectCapsFieldParentForm();
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	private _registeredId: string | undefined;

	/** Unique error ID, generated when omitted. */
	public readonly id = input<string>(`caps-field-error-${++CapsFieldError._id}`);
	/** Matches a validator key such as required or email; omitted matches any error. */
	public readonly validator = input<string>();
	/** Displays manual/server errors without changing the control's ARIA validation state. */
	public readonly forceShow = input<boolean, boolean | string | null | undefined>(false, {
		transform: booleanAttribute,
	});

	protected readonly _display = computed(() => {
		this._parentForm.events();
		if (!this._field || this.forceShow()) return true;
		const errors = this._field.errors();
		const state = this._field.controlState();
		const control = this._field.brnFieldControl()?.ngControl?.control ?? null;
		// Use the shared matcher with the latest submission state, without modifying the control.
		const matches = control ? this._matcher.isInvalid(control, this._parentForm.form) : state?.spartanInvalid;
		if (!errors || !matches) return false;
		const validator = this.validator();
		return validator ? validator in errors : Object.keys(errors).length > 0;
	});

	constructor() {
		classes(() => 'caps-field-error font-normal');
		effect(() => {
			const id = this.id();
			const visible = this._display();
			if (this._registeredId && (this._registeredId !== id || !visible)) {
				this._a11y?.unregisterError(this._registeredId);
				this._registeredId = undefined;
			}
			if (visible && this._registeredId !== id) {
				this._a11y?.registerError(id);
				this._registeredId = id;
			}
		});
	}

	ngOnDestroy() {
		if (this._registeredId) this._a11y?.unregisterError(this._registeredId);
	}
}
