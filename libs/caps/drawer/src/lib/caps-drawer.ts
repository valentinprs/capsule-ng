import { Dir } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
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
import { BrnDrawer } from '@spartan-ng/brain/drawer';
import { CapsDrawerContent } from './caps-drawer-content';
import { CapsDrawerPanel } from './caps-drawer-panel';

export const CAPS_DRAWER_TEMPLATE = `
<ng-content />
<ng-template #portal let-ctx>
 @if (_content(); as body) {
 <caps-drawer-panel #panel [contentClass]="body.className()" [closeThreshold]="body.closeThreshold()" [side]="_side()">
 <ng-container [ngTemplateOutlet]="body.template" [ngTemplateOutletInjector]="panel.injector" [ngTemplateOutletContext]="{ $implicit: ctx }" />
 </caps-drawer-panel>
 }
</ng-template>`;

@Component({
	selector: 'caps-drawer',
	exportAs: 'capsDrawer',
	imports: [NgTemplateOutlet, CapsDrawerPanel],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{ directive: Dir, inputs: ['dir'] },
		{
			directive: BrnDrawer,
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
	template: CAPS_DRAWER_TEMPLATE,
})
export class CapsDrawer {
	/** Supports both an uncontrolled trigger and two-way controlled state. */
	public readonly open = model<boolean>(false);
	public readonly closed = output<unknown>();
	private readonly _brain = inject(BrnDrawer);
	public readonly dialogId = computed(() => this._brain.id());
	public show(side?: 'top' | 'bottom' | 'left' | 'right'): void {
		if (side) this._side.set(side);
		this._brain.open();
	}
	protected readonly _content = contentChild(CapsDrawerContent);
	protected readonly _side = this._brain.direction;
	private readonly _portal = viewChild.required<TemplateRef<unknown>>('portal');
	private readonly _injector = inject(Injector);
	constructor() {
		this._brain.setOverlayClass('caps-dialog-overlay');
		effect(() => {
			const content = this._content();
			if (content) this._side.set(content.side());
		});
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
