import { CDK_MENU, CdkMenu, CdkMenuGroup, PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	effect,
	ElementRef,
	inject,
	input,
	model,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { deriveMenuSideFromTransformOrigin, MENU_SIDE, type MenuSide } from '@spartan-ng/brain/core';
import { classes } from '@spartan-ng/helm/utils';
import { CAPS_MENU_SUB, CapsMenuSelection } from './caps-menu-selection';
/** @internal A disabled native button cannot receive focus; skip it in CDK's existing key manager. */
@Directive({
	selector: '[capsMenuCdk]',
	providers: [
		{ provide: CdkMenu, useExisting: CapsMenuCdk },
		{ provide: CdkMenuGroup, useExisting: CapsMenuCdk },
		{ provide: CDK_MENU, useExisting: CapsMenuCdk },
		PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER('vertical'),
	],
})
export class CapsMenuCdk extends CdkMenu {
	public override _handleKeyEvent(event: KeyboardEvent) {
		super._handleKeyEvent(event);
		// After CDK removes this overlay, its Escape must not reach an enclosing Dialog/Sheet.
		if (event.key === 'Escape' && !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey))
			event.stopPropagation();
	}
	public override ngAfterContentInit() {
		super.ngAfterContentInit();
		this.keyManager.skipPredicate((item) => item.disabled);
	}
}

@Component({
	selector: 'caps-menu',
	providers: [CapsMenuSelection],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [CapsMenuCdk],
	host: {
		'[attr.data-slot]': '_isSub ? "dropdown-menu-sub" : "dropdown-menu"',
		'[attr.data-state]': '_state()',
		'[attr.data-side]': '_side()',
		'[attr.data-size]': 'size()',
	},
	template: '<ng-content />',
})
export class CapsMenu {
	protected readonly _isSub = inject(CAPS_MENU_SUB, { optional: true });
	private readonly _menu = inject(CdkMenu);
	private readonly _element = inject(ElementRef<HTMLElement>);
	private readonly _menuSide = inject(MENU_SIDE, { optional: true });
	protected readonly _state = signal('open');
	protected readonly _side = signal<MenuSide>(this._menuSide?.side() ?? 'bottom');
	public readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('lg');
	constructor() {
		classes(() => 'caps-menu block overflow-x-hidden overflow-y-auto outline-none');
		this._menu.closed.pipe(takeUntilDestroyed()).subscribe(() => this._state.set('closed'));
		setTimeout(() =>
			this._side.set(
				deriveMenuSideFromTransformOrigin(
					this._element.nativeElement.style.transformOrigin,
					this._menuSide?.side() ?? 'bottom',
				),
			),
		);
	}
}
@Component({
	selector: 'caps-menu-group',
	providers: [CapsMenuSelection],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [CdkMenuGroup],
	host: { 'data-slot': 'dropdown-menu-group', '[attr.aria-label]': 'label()' },
	template: '@if (label()) { <div class="caps-menu-label" aria-hidden="true">{{ label() }}</div> } <ng-content />',
})
export class CapsMenuGroup {
	public readonly label = input<string | null>(null);
	public readonly type = input<'radio' | 'checkbox' | null>(null);
	public readonly value = model<string | string[]>([]);
	private readonly _selection = inject(CapsMenuSelection);
	constructor() {
		classes(() => 'block');
		this._selection.onSelection = () => {
			if (this.type() === 'radio')
				this.value.set([...this._selection.items].find((item) => item.radio && item.checked())?.value() ?? '');
			if (this.type() === 'checkbox')
				this.value.set(
					[...this._selection.items].filter((item) => !item.radio && item.checked()).map((item) => item.value()),
				);
		};
		effect(() => {
			this._selection.generation();
			const type = this.type();
			const value = this.value();
			if (!type) return;
			for (const item of this._selection.items) {
				item.checked.set(
					type === 'radio' ? item.value() === value : Array.isArray(value) && value.includes(item.value()),
				);
			}
		});
	}
}
@Component({ selector: 'caps-menu-label', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content />' })
export class CapsMenuLabel {
	constructor() {
		classes(() => 'caps-menu-label block');
	}
}
@Component({
	selector: 'caps-menu-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'separator', 'aria-orientation': 'horizontal' },
	template: '',
})
export class CapsMenuSeparator {
	constructor() {
		classes(() => 'caps-menu-separator block');
	}
}
@Component({
	selector: 'caps-menu-shortcut',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content />',
})
export class CapsMenuShortcut {
	constructor() {
		classes(() => 'caps-menu-shortcut');
	}
}
