import type { ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, inject, input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { BrnDialogRef, injectBrnDialogContext } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';

type PanelContext = {
	$component?: ComponentType<unknown>;
	$contentClass?: string;
	$showCloseButton?: boolean;
	$closeLabel?: string;
};

/** Internal shared surface for declarative and dynamic dialogs. */
@Component({
	selector: 'caps-dialog-panel',
	imports: [CapsButton, NgComponentOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.data-slot]': 'alert() ? "alert-dialog-content" : "dialog-content"',
		'[attr.data-state]': '_ref.state()',
		'[attr.data-size]': 'size()',
	},
	template: `
		@if (_component) {
			<ng-container [ngComponentOutlet]="_component" />
		} @else {
			<ng-content />
		}
		@if (!alert() && showCloseButton()) {
			<button
				capsButton
				type="button"
				variant="ghost"
				size="icon-sm"
				class="caps-dialog-close"
				data-slot="dialog-close"
				(click)="_ref.close()"
				[attr.aria-label]="closeLabel()"
			>
				<span aria-hidden="true">✕</span>
			</button>
		}
	`,
})
export class CapsDialogPanel {
	public readonly injector = inject(Injector);
	protected readonly _ref = inject(BrnDialogRef);
	private readonly _context = injectBrnDialogContext<PanelContext>({ optional: true });
	protected readonly _component = this._context?.$component;
	public readonly alert = input(false);
	public readonly size = input<'default' | 'sm'>('default');
	public readonly contentClass = input(this._context?.$contentClass ?? '');
	public readonly showCloseButton = input(this._context?.$showCloseButton ?? true);
	public readonly closeLabel = input(this._context?.$closeLabel ?? 'Close');
	constructor() {
		classes(() => [
			this.alert()
				? 'caps-alert-dialog-content group/alert-dialog-content mx-auto grid outline-none'
				: 'caps-dialog-content relative mx-auto grid w-full outline-none',
			this.contentClass(),
		]);
	}
}
