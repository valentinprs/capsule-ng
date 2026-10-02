import { Dir } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	Directive,
	effect,
	inject,
	Injector,
	model,
	output,
	signal,
	TemplateRef,
	untracked,
	viewChild,
} from '@angular/core';
import { BrnDialog, injectBrnDialogDefaultOptions } from '@spartan-ng/brain/dialog';
import { CapsDialogContent } from './caps-dialog-content';
import { CapsDialogPanel } from './caps-dialog-panel';

export const CAPS_DIALOG_TEMPLATE = `
<ng-content />
<ng-template #portal let-ctx>
 @if (_content(); as body) {
 <caps-dialog-panel #panel [alert]="_isAlert" [contentClass]="body.className()" [showCloseButton]="body.showCloseButton()" [closeLabel]="body.closeLabel()" [size]="body.size()">
 <ng-container [ngTemplateOutlet]="body.template" [ngTemplateOutletInjector]="panel.injector" [ngTemplateOutletContext]="{ $implicit: ctx }" />
 </caps-dialog-panel>
 }
</ng-template>`;

@Directive()
export class CapsDialogBase {
	/** Supports both an uncontrolled trigger and two-way controlled state. */
	public readonly open = model(false);
	public readonly closed = output<unknown>();
	private readonly _brain = inject(BrnDialog);
	public readonly dialogId = computed(() => this._brain.id());
	public show(): void {
		this._brain.open();
	}
	protected readonly _content = contentChild(CapsDialogContent);
	protected readonly _isAlert = injectBrnDialogDefaultOptions().role === 'alertdialog';
	private readonly _portal = viewChild.required<TemplateRef<unknown>>('portal');
	private readonly _injector = inject(Injector);
	constructor() {
		this._brain.setOverlayClass('caps-dialog-overlay');
		this._brain.stateChanged.subscribe((state) => this.open.set(state === 'open'));
		this._brain.closed.subscribe((result) => this.closed.emit(result));
		afterNextRender(() => {
			this._brain.registerContent(this._portal(), signal(undefined), signal(undefined));
			effect(
				() => {
					const open = this.open();
					untracked(() => (open ? this._brain.open() : this._brain.close()));
				},
				{ injector: this._injector },
			);
		});
	}
	close(result?: unknown): void {
		this._brain.close(result);
	}
}

@Component({
	selector: 'caps-dialog',
	exportAs: 'capsDialog',
	imports: [NgTemplateOutlet, CapsDialogPanel],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{ directive: Dir, inputs: ['dir'] },
		{
			directive: BrnDialog,
			inputs: [
				'disableClose',
				'closeOnOutsidePointerEvents',
				'autoFocus',
				'restoreFocus',
				'aria-label',
				'aria-labelledby',
				'aria-describedby',
				'hasBackdrop',
			],
		},
	],
	template: CAPS_DIALOG_TEMPLATE,
})
export class CapsDialog extends CapsDialogBase {}
