import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkContextMenuTrigger, MENU_STACK, MENU_TRIGGER, MenuStack } from '@angular/cdk/menu';
import { DOCUMENT } from '@angular/common';
import {
	booleanAttribute,
	computed,
	Directive,
	effect,
	ElementRef,
	forwardRef,
	inject,
	input,
	output,
	TemplateRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createMenuPosition, MENU_SIDE, type MenuAlign, type MenuSide } from '@spartan-ng/brain/core';
import { classes } from '@spartan-ng/helm/utils';

/** @internal Uses CDK's existing menu stack and focuses its native item on keyboard invocation. */
@Directive({
	selector: '[capsContextMenuCdk]',
	providers: [
		{ provide: CdkContextMenuTrigger, useExisting: CapsContextMenuCdk },
		{ provide: MENU_TRIGGER, useExisting: CapsContextMenuCdk },
		{ provide: MENU_STACK, useClass: MenuStack },
	],
})
export class CapsContextMenuCdk extends CdkContextMenuTrigger {
	private readonly _document = inject(DOCUMENT);
	private readonly _element = inject(ElementRef<HTMLElement>);
	constructor() {
		super();
		this.closed.subscribe(() => {
			const active = this._document.activeElement;
			if (!active || !this.isElementInsideMenuStack(active)) return;
			queueMicrotask(() => {
				if (this._document.activeElement === this._document.body || !active.isConnected)
					this._element.nativeElement.focus();
			});
		});
	}
	public focusFirstItem() {
		this.childMenu?.focusFirstItem('keyboard');
	}
}

@Directive({
	selector: '[capsContextMenuTrigger]',
	providers: [{ provide: MENU_SIDE, useExisting: forwardRef(() => CapsContextMenuTrigger) }],
	hostDirectives: [
		{
			directive: CapsContextMenuCdk,
		},
	],
	host: {
		'data-slot': 'context-menu-trigger',
		'(keydown)': '_openFromKeyboard($event)',
		'[attr.data-disabled]': 'disabled() ? "" : null',
	},
})
export class CapsContextMenuTrigger {
	public readonly capsContextMenuTrigger = input.required<TemplateRef<unknown>>();
	public readonly capsContextMenuTriggerData = input<unknown>();
	public readonly opened = output<void>();
	public readonly closed = output<void>();

	private readonly _element = inject(ElementRef<HTMLElement>);
	private readonly _cdkTrigger = inject(CapsContextMenuCdk, { host: true });

	public readonly disabled = input<boolean, BooleanInput>(this._cdkTrigger.disabled, { transform: booleanAttribute });

	public readonly align = input<MenuAlign>('start');
	public readonly side = input<MenuSide>('right');

	private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

	protected _openFromKeyboard(event: KeyboardEvent) {
		if (this.disabled() || !(event.key === 'ContextMenu' || (event.key === 'F10' && event.shiftKey))) return;
		event.preventDefault();
		const box = this._element.nativeElement.getBoundingClientRect();
		this._cdkTrigger.open({ x: box.left, y: box.bottom });
		this._cdkTrigger.focusFirstItem();
	}
	constructor() {
		effect(() => {
			this._cdkTrigger.menuTemplateRef = this.capsContextMenuTrigger();
			this._cdkTrigger.menuData = this.capsContextMenuTriggerData();
		});
		this._cdkTrigger.opened.pipe(takeUntilDestroyed()).subscribe(() => this.opened.emit());
		this._cdkTrigger.closed.pipe(takeUntilDestroyed()).subscribe(() => this.closed.emit());

		effect(() => (this._cdkTrigger.disabled = this.disabled()));

		// CDK sets transform-origin on the menu content (a shared caps-menu) from the resolved
		// position; the content reads it to animate from the anchored corner and to derive its data-side.
		// Cast tolerates @angular/cdk < 21.2 (we still support >=21.0), where the property is absent and
		// the assignment is a harmless no-op.
		(this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector = '[data-slot="dropdown-menu"]';

		effect(() => {
			this._cdkTrigger.menuPosition = this._menuPosition();
		});

		classes(() => 'select-none');
	}
}
