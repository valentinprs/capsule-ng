import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { BrnFieldA11yService, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { hlm } from '@spartan-ng/helm/utils';
import { provideCapsFieldFormContext } from './caps-field-form-context';
import { CapsFieldLegend } from './caps-field-legend';

/** A semantic section with its own native fieldset, direct legend and description scope. */
@Component({
	selector: 'caps-field-set',
	imports: [NgTemplateOutlet, BrnFieldControlDescribedBy],
	providers: [BrnFieldA11yService, provideCapsFieldFormContext()],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block min-w-0', 'data-slot': 'field-set' },
	template: `
		<ng-content select="caps-field-legend" />
		<fieldset
			brnFieldControlDescribedBy
			[aria-describedby]="describedBy()"
			[disabled]="disabled()"
			[class]="_fieldsetClass()"
		>
			@if (_legend(); as legend) {
				<legend
					data-slot="field-legend"
					[attr.id]="legend.id()"
					[attr.data-variant]="legend.variant()"
					[class]="_legendClass()"
				>
					<ng-container *ngTemplateOutlet="legend.content()" />
				</legend>
			}
			<ng-content />
		</fieldset>
	`,
})
export class CapsFieldSet {
	/** Preserves native disabled semantics without changing Angular control state. */
	public readonly disabled = input<boolean, boolean | string | null | undefined>(false, {
		transform: booleanAttribute,
	});
	public readonly describedBy = input<string | null>(null, { alias: 'aria-describedby' });
	/** Classes are applied to the native fieldset. */
	public readonly userClass = input<string>('', { alias: 'class' });
	protected readonly _legend = contentChild(CapsFieldLegend, { descendants: false });
	protected readonly _fieldsetClass = computed(() => hlm('caps-field-set flex min-w-0 flex-col', this.userClass()));
	protected readonly _legendClass = computed(() => hlm('caps-field-legend', this._legend()?.userClass()));
}
