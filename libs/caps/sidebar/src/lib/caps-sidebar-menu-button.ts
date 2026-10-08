import { type BooleanInput } from '@angular/cdk/coercion';
import {
	afterEveryRender,
	booleanAttribute,
	computed,
	Directive,
	effect,
	ElementRef,
	HOST_TAG_NAME,
	HostAttributeToken,
	inject,
	input,
} from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { BrnTooltip, provideBrnTooltipDefaultOptions } from '@spartan-ng/brain/tooltip';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebar } from './caps-sidebar';
import { CapsSidebarService } from './caps-sidebar.service';
import { injectCapsSidebarConfig } from './caps-sidebar.token';
@Directive({
	selector: 'a[capsSidebarMenuButton],button[capsSidebarMenuButton]',
	providers: [
		provideBrnTooltipDefaultOptions({
			showDelay: 150,
			hideDelay: 0,
			position: 'right',
			tooltipContentClasses: 'caps-tooltip-content',
		}),
	],
	hostDirectives: [
		{ directive: BrnButton, inputs: ['disabled'] },
		{ directive: BrnTooltip, inputs: ['brnTooltip: tooltip'] },
	],
	host: {
		'data-slot': 'sidebar-menu-button',
		'data-sidebar': 'menu-button',
		'[attr.data-size]': 'size()',
		'[attr.data-active]': 'isActive()',
		'[attr.aria-current]': '_anchor && isActive() ? "page" : null',
		'[attr.aria-disabled]': '_anchor && _button.disabled() ? true : _nativeAriaDisabled',
		'(click)': '_click($event)',
	},
})
export class CapsSidebarMenuButton {
	private readonly _sidebar = inject(CapsSidebar, { optional: true });
	private readonly _config = injectCapsSidebarConfig();
	private readonly _service = inject(CapsSidebarService);
	private readonly _tooltip = inject(BrnTooltip);
	protected readonly _button = inject(BrnButton);
	protected readonly _nativeAriaDisabled = inject(new HostAttributeToken('aria-disabled'), { optional: true });
	protected readonly _anchor = inject(HOST_TAG_NAME) === 'a';
	private readonly _element = inject(ElementRef<HTMLElement>).nativeElement;
	public readonly variant = input<'default' | 'outline'>('default');
	public readonly size = input<'default' | 'sm' | 'lg'>('default');
	public readonly isActive = input(false, { transform: booleanAttribute });
	public readonly closeMobileSidebarOnClick = input<boolean, BooleanInput>(
		this._config.closeMobileSidebarOnMenuButtonClick,
		{
			transform: booleanAttribute,
		},
	);
	protected readonly _tooltipHidden = computed(
		() => this._service.state() !== 'collapsed' || this._service.isMobile() || this._sidebar?.collapsible() === 'none',
	);
	constructor() {
		classes(() => [
			'caps-sidebar-menu-button peer/menu-button group/menu-button flex w-full items-center overflow-hidden outline-hidden [&_ng-icon]:shrink-0 [&>span:last-child]:truncate',
			`caps-sidebar-menu-button-variant-${this.variant()}`,
			`caps-sidebar-menu-button-size-${this.size()}`,
		]);
		effect(() => this._tooltip.mutableTooltipDisabled.set(this._tooltipHidden()));
		afterEveryRender(() => {
			const document = this._element.ownerDocument;
			const ids = (this._element.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean);
			for (const id of ids) {
				const tooltip = document.getElementById(id);
				if (tooltip?.getAttribute('role') !== 'tooltip') continue;
				for (const name of ['lang', 'data-lang']) {
					const value = this._element.closest(`[${name}]`)?.getAttribute(name);
					if (value == null) {
						if (tooltip.hasAttribute(name)) tooltip.removeAttribute(name);
					} else if (tooltip.getAttribute(name) !== value) tooltip.setAttribute(name, value);
				}
				const direction = document.defaultView?.getComputedStyle(this._element).direction === 'rtl' ? 'rtl' : 'ltr';
				if (tooltip.getAttribute('dir') !== direction) tooltip.setAttribute('dir', direction);
			}
		});
	}
	protected _click(event: Event): void {
		if (this._button.disabled() || this._element.getAttribute('aria-disabled') === 'true') {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}
		if (this.closeMobileSidebarOnClick()) this._service.setOpenMobile(false);
	}
}
