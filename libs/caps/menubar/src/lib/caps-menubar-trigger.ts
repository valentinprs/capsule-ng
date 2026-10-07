import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {
	booleanAttribute,
	computed,
	Directive,
	effect,
	forwardRef,
	inject,
	input,
	output,
	TemplateRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createMenuPosition, MENU_SIDE, type MenuAlign, type MenuSide } from '@spartan-ng/brain/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'button[capsMenubarTrigger]',
	providers: [{ provide: MENU_SIDE, useExisting: forwardRef(() => CapsMenubarTrigger) }],
	hostDirectives: [
		{
			directive: CdkMenuItem,
		},
		{
			directive: CdkMenuTrigger,
		},
	],
	host: {
		'data-slot': 'menubar-trigger',
		'[disabled]': 'disabled()',
		'[attr.data-disabled]': 'disabled() ? "" : null',
	},
})
export class CapsMenubarTrigger {
	public readonly capsMenubarTrigger = input.required<TemplateRef<unknown>>();
	public readonly capsMenubarTriggerData = input<unknown>();
	public readonly opened = output<void>();
	public readonly closed = output<void>();

	private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });

	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	public readonly align = input<MenuAlign>('start');
	public readonly side = input<MenuSide>('bottom');

	private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

	constructor() {
		effect(() => {
			this._cdkTrigger.menuTemplateRef = this.disabled() ? null : this.capsMenubarTrigger();
			this._cdkTrigger.menuData = this.capsMenubarTriggerData();
		});
		this._cdkTrigger.opened.pipe(takeUntilDestroyed()).subscribe(() => this.opened.emit());
		this._cdkTrigger.closed.pipe(takeUntilDestroyed()).subscribe(() => this.closed.emit());

		const item = inject(CdkMenuItem);
		effect(() => (item.disabled = this.disabled()));
		// CDK sets transform-origin on the menu content (a shared caps-menu) from the resolved
		// position; the content reads it to animate from the anchored corner and to derive its data-side.
		// Cast tolerates @angular/cdk < 21.2 (we still support >=21.0), where the property is absent and
		// the assignment is a harmless no-op.
		(this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector = '[data-slot="dropdown-menu"]';

		effect(() => {
			this._cdkTrigger.menuPosition = this._menuPosition();
		});

		classes(
			() =>
				'caps-menubar-trigger flex items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
		);
	}
}
