import { type BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	Directive,
	ElementRef,
	HOST_TAG_NAME,
	HostAttributeToken,
	inject,
	input,
} from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebarService } from './caps-sidebar.service';
import { injectCapsSidebarConfig } from './caps-sidebar.token';
@Directive({
	selector: 'a[capsSidebarMenuSubButton],button[capsSidebarMenuSubButton]',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: {
		'data-slot': 'sidebar-menu-sub-button',
		'data-sidebar': 'menu-sub-button',
		'[attr.data-size]': 'size()',
		'[attr.data-active]': 'isActive()',
		'[attr.aria-current]': '_anchor && isActive() ? "page" : null',
		'[attr.aria-disabled]': '_anchor && _button.disabled() ? true : _nativeAriaDisabled',
		'(click)': '_click($event)',
	},
})
export class CapsSidebarMenuSubButton {
	private readonly _config = injectCapsSidebarConfig();
	private readonly _service = inject(CapsSidebarService);
	private readonly _element = inject(ElementRef<HTMLElement>).nativeElement;
	protected readonly _button = inject(BrnButton);
	protected readonly _nativeAriaDisabled = inject(new HostAttributeToken('aria-disabled'), { optional: true });
	protected readonly _anchor = inject(HOST_TAG_NAME) === 'a';
	public readonly size = input<'sm' | 'md'>('md');
	public readonly isActive = input(false, { transform: booleanAttribute });
	public readonly closeMobileSidebarOnClick = input<boolean, BooleanInput>(
		this._config.closeMobileSidebarOnMenuButtonClick,
		{
			transform: booleanAttribute,
		},
	);
	constructor() {
		classes(
			() =>
				'caps-sidebar-menu-sub-button flex min-w-0 items-center overflow-hidden outline-hidden [&_ng-icon]:shrink-0 [&>span:last-child]:truncate',
		);
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
