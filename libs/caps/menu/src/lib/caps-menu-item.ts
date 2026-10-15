import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio, CdkMenuItemSelectable } from '@angular/cdk/menu';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	Directive,
	effect,
	inject,
	input,
	model,
	output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { classes } from '@spartan-ng/helm/utils';
import { CapsMenuFocusOnHover } from './caps-menu-focus-on-hover';
import { CapsMenuSelection } from './caps-menu-selection';
const itemClasses =
	'caps-menu-item relative flex w-full cursor-default items-center text-start outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0';
@Component({
	// Native interactive hosts use the camelCase attribute convention in ADR 0001.
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[capsMenuItem],a[capsMenuItem]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: CdkMenuItem }, CapsMenuFocusOnHover],
	host: {
		'[attr.type]': 'type()',
		'data-slot': 'dropdown-menu-item',
		'[attr.data-disabled]': 'disabled() ? "" : null',
		'[attr.data-danger]': 'danger() ? "" : null',
		'[attr.disabled]': 'disabled() ? "" : null',
	},
	template:
		'<ng-content /> @if (info()) { <span class="caps-menu-shortcut">{{info()}}</span> } @if (danger() && dangerDescription()) { <span class="sr-only">{{dangerDescription()}}</span> }',
})
export class CapsMenuItem {
	public readonly type = input<'button' | 'submit' | 'reset'>('button');
	public readonly itemClick = output<void>();
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly danger = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly dangerDescription = input<string>('');
	public readonly info = input<string>('');
	constructor() {
		const cdk = inject(CdkMenuItem);
		effect(() => (cdk.disabled = this.disabled()));
		cdk.triggered.pipe(takeUntilDestroyed()).subscribe(() => this.itemClick.emit());
		classes(() => itemClasses);
	}
}
/** @internal CDK selectable rows stay open, matching Carbon menu buttons. */
@Directive({
	selector: '[capsMenuCheckboxCdk]',
	providers: [
		{ provide: CdkMenuItemCheckbox, useExisting: CapsMenuCheckboxCdk },
		{ provide: CdkMenuItemSelectable, useExisting: CapsMenuCheckboxCdk },
		{ provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
	],
})
export class CapsMenuCheckboxCdk extends CdkMenuItemCheckbox {
	override trigger() {
		super.trigger({ keepOpen: true });
	}
}
/** @internal */
@Directive({
	selector: '[capsMenuRadioCdk]',
	providers: [
		{ provide: CdkMenuItemRadio, useExisting: CapsMenuRadioCdk },
		{ provide: CdkMenuItemSelectable, useExisting: CapsMenuRadioCdk },
		{ provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
	],
})
export class CapsMenuRadioCdk extends CdkMenuItemRadio {
	override trigger() {
		super.trigger({ keepOpen: true });
	}
}
@Component({
	// Native interactive hosts use the camelCase attribute convention in ADR 0001.
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[capsMenuCheckboxItem]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsMenuCheckboxCdk,
		},
		CapsMenuFocusOnHover,
	],
	host: {
		'[attr.type]': 'type()',
		'data-slot': 'dropdown-menu-checkbox-item',
		'[attr.data-disabled]': 'disabled() ? "" : null',
		'[attr.data-checked]': 'checked() ? "" : null',
		'[attr.disabled]': 'disabled() ? "" : null',
	},
	template: '<ng-content /> <span class="caps-menu-indicator" aria-hidden="true">✓</span>',
})
export class CapsMenuCheckboxItem {
	public readonly checked = model<boolean>(false);
	public readonly type = input<'button' | 'submit' | 'reset'>('button');
	public readonly itemClick = output<void>();
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly value = input<string>('');
	public readonly radio = false;
	private readonly _cdk = inject(CapsMenuCheckboxCdk);
	private readonly _selection = inject(CapsMenuSelection);
	constructor() {
		classes(() => itemClasses + ' caps-menu-selectable');
		this._selection.items.add(this);
		this._selection.generation.update((n) => n + 1);
		inject(DestroyRef).onDestroy(() => {
			this._selection.items.delete(this);
			this._selection.generation.update((n) => n + 1);
		});
		effect(() => {
			this._cdk.checked = this.checked();
			this._cdk.disabled = this.disabled();
		});
		this._cdk.triggered.pipe(takeUntilDestroyed()).subscribe(() => {
			this._selection.select(this);
			this.itemClick.emit();
		});
	}
}
@Component({
	// Native interactive hosts use the camelCase attribute convention in ADR 0001.
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[capsMenuRadioItem]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsMenuRadioCdk,
		},
		CapsMenuFocusOnHover,
	],
	host: {
		'[attr.type]': 'type()',
		'data-slot': 'dropdown-menu-radio-item',
		'[attr.data-disabled]': 'disabled() ? "" : null',
		'[attr.data-checked]': 'checked() ? "" : null',
		'[attr.disabled]': 'disabled() ? "" : null',
	},
	template: '<ng-content /> <span class="caps-menu-indicator" aria-hidden="true">✓</span>',
})
export class CapsMenuRadioItem {
	public readonly checked = model<boolean>(false);
	public readonly type = input<'button' | 'submit' | 'reset'>('button');
	public readonly itemClick = output<void>();
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly value = input<string>('');
	public readonly radio = true;
	private readonly _cdk = inject(CapsMenuRadioCdk);
	private readonly _selection = inject(CapsMenuSelection);
	constructor() {
		classes(() => itemClasses + ' caps-menu-selectable');
		this._selection.items.add(this);
		this._selection.generation.update((n) => n + 1);
		inject(DestroyRef).onDestroy(() => {
			this._selection.items.delete(this);
			this._selection.generation.update((n) => n + 1);
		});
		effect(() => {
			this._cdk.checked = this.checked();
			this._cdk.disabled = this.disabled();
		});
		this._cdk.triggered.pipe(takeUntilDestroyed()).subscribe(() => {
			this._selection.select(this);
			this.itemClick.emit();
		});
	}
}
