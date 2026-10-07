import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
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
import { CapsMenuFocusOnHover } from './caps-menu-focus-on-hover';
import { CAPS_MENU_SUB } from './caps-menu-selection';

@Component({
	// Native interactive hosts use the camelCase attribute convention in ADR 0001.
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[capsMenuSubTrigger]',
	providers: [
		{ provide: CAPS_MENU_SUB, useValue: true },
		{ provide: MENU_SIDE, useExisting: forwardRef(() => CapsMenuSubTrigger) },
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{ directive: CdkMenuItem },
		CapsMenuFocusOnHover,
		{
			directive: CdkMenuTrigger,
		},
	],
	host: {
		'[attr.type]': 'type()',
		'[attr.disabled]': 'disabled() ? "" : null',
		'[attr.data-disabled]': 'disabled() ? "" : null',
		'data-slot': 'dropdown-menu-sub-trigger',
	},
	template: '<ng-content /> <span class="caps-menu-sub-indicator" aria-hidden="true">›</span>',
})
export class CapsMenuSubTrigger {
	public readonly capsMenuSubTrigger = input.required<TemplateRef<unknown>>();
	public readonly capsMenuTriggerData = input<unknown>();
	public readonly opened = output<void>();
	public readonly closed = output<void>();

	public readonly type = input<'button' | 'submit' | 'reset'>('button');
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	protected readonly _item = inject(CdkMenuItem);
	private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });

	public readonly align = input<MenuAlign>('start');
	public readonly side = input<MenuSide>('right');

	private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

	constructor() {
		effect(() => {
			this._item.disabled = this.disabled();
			this._cdkTrigger.menuTemplateRef = this.disabled() ? null : this.capsMenuSubTrigger();
			this._cdkTrigger.menuData = this.capsMenuTriggerData();
		});
		this._cdkTrigger.opened.pipe(takeUntilDestroyed()).subscribe(() => this.opened.emit());
		this._cdkTrigger.closed.pipe(takeUntilDestroyed()).subscribe(() => this.closed.emit());

		// CDK sets transform-origin on the submenu content from the resolved position; the content reads it
		// to animate from the anchored corner and to derive its data-side. Cast tolerates @angular/cdk < 21.2
		// (we still support >=21.0), where the property is absent and the assignment is a harmless no-op.
		(this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector =
			'[data-slot="dropdown-menu-sub"]';

		effect(() => {
			this._cdkTrigger.menuPosition = this._menuPosition();
		});

		classes(
			() =>
				'caps-menu-item aria-expanded:bg-accent aria-expanded:text-accent-foreground relative flex w-full items-center text-start outline-hidden data-disabled:opacity-50',
		);
	}
}
