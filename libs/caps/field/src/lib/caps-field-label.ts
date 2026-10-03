import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BrnField } from '@spartan-ng/brain/field';
import { BrnLabel } from '@spartan-ng/brain/label';
import { hlm } from '@spartan-ng/helm/utils';
import { provideCapsFieldFormContext } from './caps-field-form-context';

/** A dedicated Field label that preserves native activation and Brain's inferred association. */
@Component({
	selector: 'caps-field-label',
	imports: [BrnLabel],
	providers: [provideCapsFieldFormContext()],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'field-label', class: 'caps-field-label block min-w-0', '[attr.id]': 'null' },
	template: `
		<label brnLabel data-slot="field-label" [id]="id()" [for]="for()" [class]="_labelClass()"><ng-content /></label>
	`,
})
export class CapsFieldLabel {
	private static _id = 0;
	/** Enclosing Field identity keeps nested option labels scoped to their own Field. */
	public readonly field = inject(BrnField, { optional: true });
	/** ID belongs to the native label, not the component host. */
	public readonly id = input<string>(`caps-field-label-${++CapsFieldLabel._id}`);
	/** Explicit control ID; otherwise Brain infers the control from the enclosing Field. */
	public readonly for = input<string>();
	/** Classes are applied to the native label, including selectable-card styling. */
	public readonly userClass = input<string>('', { alias: 'class' });
	protected readonly _labelClass = computed(() =>
		hlm(
			'caps-label caps-field-label group/field-label peer/field-label flex items-center select-none has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
			this.userClass(),
		),
	);
}
