import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	Directive,
	effect,
	ElementRef,
	inject,
	Injector,
	input,
	model,
	numberAttribute,
	output,
	signal,
	TemplateRef,
	untracked,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import { ɵCAPS_FLOATING_DEFAULTS, ɵCapsFloatingLayer } from '@capsule-ng/caps/popover';
import { BrnOverlayService, type BrnOverlayRef } from '@spartan-ng/brain/overlay';
import { provideBrnPopoverDefaultOptions } from '@spartan-ng/brain/popover';

/** @internal Lazily created template owner, never a second interactive control. */
@Component({
	selector: 'caps-tooltip-renderer',
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { hidden: '' },
	template: `
		<ng-template #portal>
			<div
				class="caps-floating-content caps-tooltip-content"
				[attr.data-state]="owner().state()"
				[attr.data-placement]="owner().layer.activePlacement()"
				[attr.dir]="owner().layer.direction()"
				[style.--caps-caret-cross]="owner().layer.originCrossSize() / 2 + 'px'"
				[style.--caps-caret-axis]="owner().layer.caretAxisOffset() + 'px'"
				[attr.data-caret]="owner().layer.caret()"
				[attr.data-drop-shadow]="owner().layer.dropShadow()"
				[attr.data-high-contrast]="owner().layer.highContrast()"
				(pointerenter)="owner().contentHover($event, true)"
				(pointerleave)="owner().contentHover($event, false)"
			>
				@if (owner().contentTemplate(); as template) {
					<ng-container
						[ngTemplateOutlet]="template"
						[ngTemplateOutletContext]="{ $implicit: owner().templateContext() }"
					/>
				} @else {
					{{ owner().capsTooltip() }}
				}
			</div>
		</ng-template>
	`,
})
export class CapsTooltipRenderer {
	public readonly owner = input.required<CapsTooltip>();
	public readonly portal = viewChild.required<TemplateRef<unknown>>('portal');
}

@Directive({
	selector: '[capsTooltip]',
	exportAs: 'capsTooltip',
	providers: [
		provideBrnPopoverDefaultOptions({ role: 'tooltip', autoFocus: false, closeOnOutsidePointerEvents: false }),
		{ provide: ɵCAPS_FLOATING_DEFAULTS, useValue: { highContrast: true, dropShadow: false } },
	],
	hostDirectives: [
		{
			directive: ɵCapsFloatingLayer,
			inputs: ['placement', 'autoAlign', 'caret', 'dropShadow', 'highContrast', 'alignmentAxisOffset'],
		},
	],
	host: {
		'(pointerenter)': 'pointer($event, true)',
		'(pointerleave)': 'pointer($event, false)',
		'(focusin)': 'focus(true)',
		'(focusout)': 'focus(false)',
		'(document:keydown)': 'keydown($event)',
	},
})
export class CapsTooltip {
	public readonly capsTooltip = input<string | TemplateRef<unknown>>('');
	public readonly tooltipDisabled = input(false, { transform: booleanAttribute });
	public readonly enterDelayMs = input(100, { transform: numberAttribute });
	public readonly leaveDelayMs = input(300, { transform: numberAttribute });
	public readonly templateContext = input<unknown>();
	public readonly open = model(false);
	// Carbon Angular event name is intentionally preserved.
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	public readonly onOpen = output<void>();
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	public readonly onClose = output<void>();
	public readonly layer = inject(ɵCapsFloatingLayer);
	private readonly _overlayService = inject(BrnOverlayService);
	private readonly _ref = signal<BrnOverlayRef | undefined>(undefined);
	public readonly state = computed(() => this._ref()?.state() ?? 'closed');
	public readonly contentTemplate = computed(() => {
		const content = this.capsTooltip();
		return content instanceof TemplateRef ? content : null;
	});
	private readonly _element = inject(ElementRef<HTMLElement>).nativeElement;
	private readonly _vcr = inject(ViewContainerRef);
	private readonly _destroy = inject(DestroyRef);
	private readonly _injector = inject(Injector);
	private _triggerHovered = false;
	private _contentHovered = false;
	private _focused = false;
	private _dismissed = false;
	private _timer: ReturnType<typeof setTimeout> | undefined;
	private _renderer: ReturnType<ViewContainerRef['createComponent']> | undefined;
	private _ready = false;
	constructor() {
		this.layer.setOrigin(this._element);
		afterNextRender(() => {
			this._ready = true;
			effect(
				() => {
					const open = this.open();
					const disabled = this.tooltipDisabled();
					const content = this.capsTooltip();
					untracked(() => {
						if (disabled || !content || (typeof content === 'string' && !content.trim())) this.dismiss();
						else if (open) this.show();
						else this._ref()?.close();
					});
				},
				{ injector: this._injector },
			);
		});
		this._destroy.onDestroy(() => {
			this.cancel();
			this.description(false);
			this._ref()?.forceClose();
			this._renderer?.destroy();
		});
	}
	public pointer(event: Event, hovered: boolean): void {
		if (!(event instanceof PointerEvent) || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
		this._triggerHovered = hovered;
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
		if (event.key !== 'Escape' || event.altKey || event.ctrlKey || event.metaKey) return;
		if (event.defaultPrevented && this._ref()?.open) return;
		this._dismissed = true;
		this.dismiss();
	}
	private schedule(): void {
		this.cancel();
		if (this._dismissed) return;
		const show = this._triggerHovered || this._contentHovered || this._focused;
		this._timer = setTimeout(
			() => (show ? this.show() : this.dismiss()),
			show ? this.enterDelayMs() : this.leaveDelayMs(),
		);
	}
	private cancel(): void {
		if (this._timer !== undefined) clearTimeout(this._timer);
		this._timer = undefined;
	}
	private show(): void {
		if (
			!this._ready ||
			this.tooltipDisabled() ||
			!this.capsTooltip() ||
			(typeof this.capsTooltip() === 'string' && !(this.capsTooltip() as string).trim())
		)
			return;
		if (!this._renderer) {
			const ref = this._vcr.createComponent(CapsTooltipRenderer);
			ref.setInput('owner', this);
			ref.changeDetectorRef.detectChanges();
			this.layer.registerContent(ref.instance.portal(), signal(undefined), signal(undefined));
			this._renderer = ref;
		}
		if (this._ref()) {
			this._ref()?.reopen();
			return;
		}
		this.layer.prepare();
		const ref = this._overlayService.open(
			(this._renderer.instance as CapsTooltipRenderer).portal(),
			this._vcr,
			{},
			this.layer.overlayOptions(),
		);
		this._ref.set(ref);
		ref.stateChanged$.subscribe((state) => {
			const opened = state === 'open';
			this.open.set(opened);
			this.description(opened);
			if (opened) this.onOpen.emit();
			else this.onClose.emit();
		});
		ref.closed$.subscribe(() => {
			if (this._ref() === ref) this._ref.set(undefined);
			this.description(false);
		});
	}
	private dismiss(): void {
		this.cancel();
		this._ref()?.close();
		this.open.set(false);
		this.description(false);
	}
	private description(open: boolean): void {
		const ownId = this.layer.id();
		const ids = new Set((this._element.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
		if (open) ids.add(ownId);
		else ids.delete(ownId);
		if (ids.size) this._element.setAttribute('aria-describedby', [...ids].join(' '));
		else this._element.removeAttribute('aria-describedby');
	}
}
