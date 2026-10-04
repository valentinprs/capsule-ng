import { Dir, Directionality, type Direction } from '@angular/cdk/bidi';
import {
	OverlayPositionBuilder,
	ScrollStrategyOptions,
	type ConnectedPosition,
	type FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	DestroyRef,
	Directive,
	effect,
	ElementRef,
	inject,
	Injector,
	input,
	numberAttribute,
	signal,
	TemplateRef,
	untracked,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import { ɵCapsFloatingDirection } from '@capsule-ng/caps/popover';
import { BrnHoverCardContentService, injectBrnHoverCardDefaultOptions } from '@spartan-ng/brain/hover-card';

export type CapsHoverCardPlacement = 'top' | 'bottom' | 'left' | 'right';
@Directive({ selector: 'ng-template[capsHoverCardContent]' })
export class CapsHoverCardContent {
	public readonly template = inject(TemplateRef);
	public readonly className = input('', { alias: 'class' });
}

/** An optional preview on a working native link. */
@Directive({
	selector: 'a[capsHoverCardTrigger],button[capsHoverCardTrigger]',
	host: {
		'(pointerenter)': 'pointer($event, true)',
		'(pointerleave)': 'pointer($event, false)',
		'(focus)': 'focus(true)',
		'(blur)': 'focus(false)',
		'(click)': 'dismiss()',
		'(document:keydown)': 'keydown($event)',
	},
})
export class CapsHoverCardTrigger {
	private readonly _defaults = injectBrnHoverCardDefaultOptions();
	public readonly placement = input<CapsHoverCardPlacement>('bottom');
	public readonly showDelay = input(this._defaults.showDelay, { transform: numberAttribute });
	public readonly hideDelay = input(this._defaults.hideDelay, { transform: numberAttribute });
	public readonly animationDelay = input(this._defaults.animationDelay, { transform: numberAttribute });
	public readonly sideOffset = input(this._defaults.sideOffset, { transform: numberAttribute });
	private readonly _service = inject(BrnHoverCardContentService);
	private readonly _element = inject(ElementRef<HTMLElement>);
	private readonly _vcr = inject(ViewContainerRef);
	private readonly _destroy = inject(DestroyRef);
	private _hovered = false;
	private _focused = false;
	private _dismissed = false;
	private _contentHovered = false;
	private readonly _builder = inject(OverlayPositionBuilder);
	private readonly _scroll = inject(ScrollStrategyOptions);
	private readonly _dir = inject(Directionality);
	public readonly direction = computed(() => this._dir.valueSignal());
	private readonly _injector = inject(Injector);
	private _strategy: FlexibleConnectedPositionStrategy | undefined;
	private _candidates: CapsHoverCardPlacement[] = [];
	public readonly activePlacement = signal<CapsHoverCardPlacement>('bottom');
	private _ready = false;
	private _shown = false;
	private _timer: ReturnType<typeof setTimeout> | undefined;
	constructor() {
		this._destroy.onDestroy(() => {
			this.cancel();
			this._service.hide();
		});
	}
	public unregister(): void {
		this.dismiss();
		this._ready = false;
	}
	public register(template: TemplateRef<unknown>): void {
		if (this._strategy) {
			this._service.setContent(template, this._vcr);
			this._ready = true;
			return;
		}
		this._strategy = this._builder.flexibleConnectedTo(this._element).withPositions(this.positions());
		this._service.setConfig({ positionStrategy: this._strategy, scrollStrategy: this._scroll.reposition() });
		const sub = this._strategy.positionChanges.subscribe((change) => {
			const pair = change.connectionPair;
			this.activePlacement.set(
				pair.originY === 'center'
					? pair.originX === (this._dir.value === 'rtl' ? 'end' : 'start')
						? 'left'
						: 'right'
					: pair.originY === 'top'
						? 'top'
						: 'bottom',
			);
		});
		this._destroy.onDestroy(() => sub.unsubscribe());
		effect(
			() => {
				const positions = this.positions();
				this._dir.valueSignal();
				untracked(() => {
					this._strategy?.withPositions(positions);
					if (this._shown) this._strategy?.apply();
				});
			},
			{ injector: this._injector },
		);
		this._service.setContent(template, this._vcr);
		this._ready = true;
	}
	private positions(): ConnectedPosition[] {
		const side = this.placement();
		this._candidates =
			side === 'top'
				? ['top', 'bottom']
				: side === 'bottom'
					? ['bottom', 'top']
					: side === 'left'
						? ['left', 'right', 'bottom', 'top']
						: ['right', 'left', 'bottom', 'top'];
		const left = this._dir.value === 'rtl' ? 'end' : 'start';
		const right = this._dir.value === 'rtl' ? 'start' : 'end';
		const gap = this.sideOffset();
		return this._candidates.map((candidate) =>
			candidate === 'top' || candidate === 'bottom'
				? {
						originX: 'center',
						overlayX: 'center',
						originY: candidate === 'top' ? 'top' : 'bottom',
						overlayY: candidate === 'top' ? 'bottom' : 'top',
						offsetY: candidate === 'top' ? -gap : gap,
					}
				: {
						originY: 'center',
						overlayY: 'center',
						originX: candidate === 'left' ? left : right,
						overlayX: candidate === 'left' ? right : left,
						offsetX: candidate === 'left' ? -gap : gap,
					},
		);
	}
	public pointer(event: Event, hovered: boolean): void {
		if (!(event instanceof PointerEvent) || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
		this._hovered = hovered;
		if (hovered) this._dismissed = false;
		this.schedule();
	}
	public contentHover(event: Event, hovered: boolean): void {
		if (!(event instanceof PointerEvent) || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
		this._contentHovered = hovered;
		this.schedule();
	}
	public focus(focused: boolean): void {
		this._focused = focused;
		if (focused) this._dismissed = false;
		this.schedule();
	}
	public keydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && !event.defaultPrevented) {
			this._dismissed = true;
			this.dismiss();
		}
	}
	public dismiss(): void {
		this.cancel();
		this._service.setState('closed');
		this._service.hide();
		this._shown = false;
	}
	private cancel(): void {
		if (this._timer !== undefined) clearTimeout(this._timer);
		this._timer = undefined;
	}
	private schedule(): void {
		this.cancel();
		if (this._dismissed) return;
		const visible = this._hovered || this._focused || this._contentHovered;
		this._timer = setTimeout(
			() => {
				if (!this._ready) return;
				this._service.setState(visible ? 'open' : 'closed');
				if (visible) {
					if (!this._shown) {
						this._service.show();
						this._shown = true;
					}
				} else
					this._timer = setTimeout(() => {
						this._service.hide();
						this._shown = false;
					}, this.animationDelay());
			},
			visible ? this.showDelay() : this.hideDelay(),
		);
	}
}

@Component({
	selector: 'caps-hover-card',
	imports: [NgTemplateOutlet],
	providers: [
		BrnHoverCardContentService,
		ɵCapsFloatingDirection,
		{ provide: Directionality, useExisting: ɵCapsFloatingDirection },
	],
	viewProviders: [{ provide: Directionality, useExisting: ɵCapsFloatingDirection }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { '[attr.dir]': '_direction.valueSignal()' },
	template: `
		<ng-content />
		<ng-template #portal>
			@if (_content(); as content) {
				<div
					class="caps-floating-content caps-hover-card-content"
					[class]="content.className()"
					[attr.data-state]="_service.state()"
					[attr.data-placement]="_trigger()?.activePlacement()"
					[attr.dir]="_trigger()?.direction()"
					data-drop-shadow="true"
					(pointerenter)="_trigger()?.contentHover($event, true)"
					(pointerleave)="_trigger()?.contentHover($event, false)"
				>
					<ng-container [ngTemplateOutlet]="content.template" />
				</div>
			}
		</ng-template>
	`,
})
export class CapsHoverCard {
	public readonly dir = input<Direction | undefined>();
	private readonly _nativeDir = inject(Dir, { self: true, optional: true });
	protected readonly _direction = inject(ɵCapsFloatingDirection);
	protected readonly _content = contentChild(CapsHoverCardContent);
	protected readonly _trigger = contentChild(CapsHoverCardTrigger);
	protected readonly _service = inject(BrnHoverCardContentService);
	private readonly _portal = viewChild.required<TemplateRef<unknown>>('portal');
	private readonly _injector = inject(Injector);
	constructor() {
		effect(() => {
			this._direction.explicit.set(this.dir());
		});
		effect(() => {
			if (this._nativeDir) this._nativeDir.dir = this._direction.valueSignal();
		});
		afterNextRender(() =>
			effect(
				() => {
					const trigger = this._trigger();
					const content = this._content();
					const portal = this._portal();
					untracked(() => {
						if (trigger && content) trigger.register(portal);
						else trigger?.unregister();
					});
				},
				{ injector: this._injector },
			),
		);
	}
}
