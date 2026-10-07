import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import {
	booleanAttribute,
	computed,
	Directive,
	effect,
	forwardRef,
	inject,
	input,
	model,
	output,
	TemplateRef,
	untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createMenuPosition, MENU_SIDE, type MenuAlign, type MenuSide } from '@spartan-ng/brain/core';

export type CapsMenuPlacement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end'
	| 'right'
	| 'right-start'
	| 'right-end';

@Directive({
	selector: 'button[capsDropdownMenuTrigger]',
	providers: [{ provide: MENU_SIDE, useExisting: forwardRef(() => CapsDropdownMenuTrigger) }],
	hostDirectives: [
		{
			directive: CdkMenuTrigger,
		},
	],
	host: { 'data-slot': 'dropdown-menu-trigger', '[disabled]': 'disabled()' },
})
export class CapsDropdownMenuTrigger {
	public readonly capsDropdownMenuTrigger = input.required<TemplateRef<unknown>>();
	public readonly capsDropdownMenuTriggerData = input<unknown>();
	public readonly opened = output<void>();
	public readonly closed = output<void>();

	private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });

	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly placement = input<CapsMenuPlacement>('bottom');
	public readonly open = model<boolean>(false);
	public readonly side = computed<MenuSide>(() => this.placement().split('-')[0] as MenuSide);
	private readonly _align = computed<MenuAlign>(() =>
		this.placement().endsWith('start') ? 'start' : this.placement().endsWith('end') ? 'end' : 'center',
	);

	private readonly _menuPosition = computed(() => createMenuPosition(this._align(), this.side()));

	constructor() {
		effect(() => {
			this._cdkTrigger.menuTemplateRef = this.disabled() ? null : this.capsDropdownMenuTrigger();
			this._cdkTrigger.menuData = this.capsDropdownMenuTriggerData();
		});
		this._cdkTrigger.opened.pipe(takeUntilDestroyed()).subscribe(() => {
			this.open.set(true);
			this.opened.emit();
		});
		this._cdkTrigger.closed.pipe(takeUntilDestroyed()).subscribe(() => {
			this.open.set(false);
			this.closed.emit();
		});
		effect(() => {
			const open = this.open() && !this.disabled();
			untracked(() => {
				if (open && !this._cdkTrigger.isOpen()) {
					this._cdkTrigger.open();
					this._cdkTrigger.getMenu()?.focusFirstItem('program');
				} else if (!open) this._cdkTrigger.close();
			});
		});
		// CDK sets transform-origin on the menu content from the resolved position; the content reads it to
		// animate from the anchored corner and to derive its data-side. Cast tolerates @angular/cdk < 21.2
		// (we still support >=21.0), where the property is absent and the assignment is a harmless no-op.
		(this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector = '[data-slot="dropdown-menu"]';

		effect(() => {
			this._cdkTrigger.menuPosition = this._menuPosition();
		});
	}
}
