import { inject, type Provider } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlContainer, FormGroupDirective, NgForm } from '@angular/forms';

/** Preserve Angular's parent form across projected Field/FieldContent component hosts. */
export function provideCapsFieldFormContext(): Provider {
	return {
		provide: ControlContainer,
		useFactory: () => inject(ControlContainer, { skipSelf: true, optional: true }),
	};
}

/** Track public form events: NgForm.submitted deliberately uses an untracked getter. */
export function injectCapsFieldParentForm() {
	const templateForm = inject(NgForm, { optional: true });
	const reactiveForm = inject(FormGroupDirective, { optional: true });
	const source = templateForm?.form.events ?? reactiveForm?.ngSubmit;
	return {
		form: reactiveForm ?? templateForm,
		events: source ? toSignal<unknown>(source, { initialValue: null }) : () => null,
	};
}
