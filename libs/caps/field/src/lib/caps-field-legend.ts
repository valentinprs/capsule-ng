import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';

/** FieldSet renders this content in its direct native legend, avoiding an intervening custom host. */
@Component({
	selector: 'caps-field-legend',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { '[style.display]': '"none"', '[attr.id]': 'null' },
	template: `
		<ng-template #content><ng-content /></ng-template>
	`,
})
export class CapsFieldLegend {
	public readonly id = input<string>();
	/** Uses heading-sized text by default; label uses field-label sizing. */
	public readonly variant = input<'legend' | 'label'>('legend');
	/** Forwarded to the native legend rendered by the enclosing FieldSet. */
	public readonly userClass = input<string>('', { alias: 'class' });
	/** Internal composition template; consumers project content normally. */
	public readonly content = viewChild.required<TemplateRef<unknown>>('content');
}
