import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import {
	BrnPopover,
	BrnPopoverContent,
	provideBrnPopoverConfig,
	provideBrnPopoverDefaultOptions,
} from '@spartan-ng/brain/popover';
import { BrnSelectContent, BrnSelectList, BrnSelectMultiple, BrnSelectTrigger } from '@spartan-ng/brain/select';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSelectBase } from './caps-select-base';

@Component({
	selector: 'caps-select-multiple',
	imports: [
		NgTemplateOutlet,
		BrnSelectTrigger,
		BrnFieldControlDescribedBy,
		BrnPopoverContent,
		BrnSelectContent,
		BrnSelectList,
	],
	providers: [
		provideBrnPopoverConfig({ align: 'start', sideOffset: 6 }),
		provideBrnPopoverDefaultOptions({ role: null }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: BrnSelectMultiple,
			inputs: ['value', 'disabled', 'itemToString', 'isItemEqualToValue'],
			outputs: ['valueChange'],
		},
		{
			directive: BrnPopover,
			inputs: ['state', 'align', 'sideOffset', 'offsetX', 'scrollStrategy'],
			outputs: ['stateChanged', 'closed'],
		},
	],
	host: {
		'data-slot': 'select',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.aria-invalid]': 'null',
	},
	template: `
		<button
			[class]="triggerClass()"
			(blur)="_blur()"
			brnSelectTrigger
			[id]="id()"
			brnFieldControlDescribedBy
			class="caps-select-trigger flex w-full items-center justify-between gap-2 outline-none disabled:cursor-not-allowed disabled:opacity-(--caps-opacity-disabled)"
			[forceInvalid]="forceInvalid()"
			[attr.aria-label]="ariaLabel()"
			[attr.aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="ariaDescribedby()"
			[aria-invalid]="ariaInvalid()"
			[attr.data-size]="size()"
			data-slot="select-trigger"
		>
			@if (!_select.hasValue() && _placeholderTemplate(); as placeholder) {
				<ng-container [ngTemplateOutlet]="placeholder.template" />
			} @else if (_select.hasValue() && _valueTemplate(); as custom) {
				<ng-container [ngTemplateOutlet]="custom.template" [ngTemplateOutletContext]="{ $implicit: _select.value() }" />
			} @else {
				<span class="min-w-0 truncate">{{ _display() }}</span>
			}
			<svg
				aria-hidden="true"
				class="size-4 shrink-0 opacity-60"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>
		<ng-template brnPopoverContent>
			<div
				brnSelectContent
				[dir]="dir()"
				[class]="panelClass()"
				class="caps-select-content max-h-72 w-(--brn-select-width) overflow-y-auto"
			>
				<div
					brnSelectList
					[attr.aria-multiselectable]="true"
					[attr.aria-label]="ariaLabel()"
					[attr.aria-labelledby]="ariaLabelledby() ?? (ariaLabel() ? null : id())"
				>
					<ng-content />
				</div>
			</div>
		</ng-template>
	`,
})
export class CapsSelectMultiple<T> extends CapsSelectBase<T> {
	constructor() {
		super();
		classes(() => 'block');
	}
}
