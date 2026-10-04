import type { BooleanInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

export type CapsItemGroupSize = 'sm' | 'md' | 'lg' | 'xl';
export type CapsItemGroupKind = 'on-page' | 'disclosed';

@Component({
	selector: 'caps-item-group',
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'item-group',
		'[attr.data-size]': 'size()',
		'[attr.data-kind]': 'kind()',
		'[attr.data-inset]': 'isInset() || null',
	},
	template: `
		<div class="caps-item-group-header">
			@if (label()) {
				<div [id]="labelId()">
					@if (_labelTemplate()) {
						<ng-container [ngTemplateOutlet]="_labelTemplate()" />
					} @else {
						{{ label() }}
					}
				</div>
			}
			<ng-content select="[capsItemGroupAction]" />
		</div>
		<div class="caps-item-list" role="list" [attr.aria-labelledby]="label() ? labelId() : null"><ng-content /></div>
	`,
})
export class CapsItemGroup {
	private static _nextId = 0;
	public readonly size = input<CapsItemGroupSize>('lg');
	public readonly kind = input<CapsItemGroupKind>('on-page');
	public readonly isInset = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly label = input<string | TemplateRef<unknown>>();
	public readonly labelId = input(`caps-item-group-${CapsItemGroup._nextId++}-label`);
	protected _labelTemplate() {
		const label = this.label();
		return label instanceof TemplateRef ? label : null;
	}
	constructor() {
		classes(() => 'caps-item-group block w-full');
	}
}
