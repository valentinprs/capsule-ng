import { Directionality } from '@angular/cdk/bidi';
import { type ConnectedPosition, type FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import {
	afterNextRender,
	booleanAttribute,
	computed,
	DestroyRef,
	Directive,
	effect,
	ElementRef,
	forwardRef,
	inject,
	InjectionToken,
	Injector,
	input,
	numberAttribute,
	signal,
	untracked,
} from '@angular/core';
import { BrnOverlay } from '@spartan-ng/brain/overlay';
import { BrnPopover } from '@spartan-ng/brain/popover';

export type CapsPlacement =
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
const placements: readonly CapsPlacement[] = [
	'top',
	'top-start',
	'top-end',
	'bottom',
	'bottom-start',
	'bottom-end',
	'left',
	'left-start',
	'left-end',
	'right',
	'right-start',
	'right-end',
];

export const CAPS_FLOATING_DEFAULTS = new InjectionToken<{ highContrast: boolean; dropShadow: boolean }>(
	'CapsFloatingDefaults',
);

/** @internal Carbon positioning adapted to Brain's public overlay extension points. */
@Directive({
	providers: [
		{ provide: BrnOverlay, useExisting: forwardRef(() => CapsFloatingLayer) },
		{ provide: BrnPopover, useExisting: forwardRef(() => CapsFloatingLayer) },
	],
})
export class CapsFloatingLayer extends BrnPopover {
	public readonly placement = input<CapsPlacement>('bottom');
	/** Experimental, as in Carbon Angular. Assign once before opening. */
	public readonly autoAlign = input(false, { transform: booleanAttribute });
	public readonly caret = input(true, { transform: booleanAttribute });
	private readonly _appearance = inject(CAPS_FLOATING_DEFAULTS, { optional: true });
	public readonly dropShadow = input(this._appearance?.dropShadow ?? true, { transform: booleanAttribute });
	public readonly highContrast = input(this._appearance?.highContrast ?? false, { transform: booleanAttribute });
	/** Alignment-axis offset, applied only with autoAlign. */
	public readonly alignmentAxisOffset = input<number | undefined, number | string | undefined>(undefined, {
		transform: (value) => (value === undefined ? undefined : numberAttribute(value)),
	});
	public readonly activePlacement = signal<CapsPlacement>('bottom');
	private readonly _dir = inject(Directionality);
	private readonly _destroy = inject(DestroyRef);
	private readonly _floatingInjector = inject(Injector);
	private _strategy: FlexibleConnectedPositionStrategy | undefined;
	private _candidates: readonly CapsPlacement[] = [];
	private _positions: ConnectedPosition[] = [];
	public readonly direction = computed(() => this._dir.valueSignal());
	public readonly originCrossSize = signal(24);
	public readonly caretAxisOffset = computed(() => {
		const [side, alignment] = this.activePlacement().split('-');
		if (!alignment || !this.autoAlign()) return 0;
		const axis = (this.alignmentAxisOffset() ?? 0) * (alignment === 'end' ? -1 : 1);
		return (side === 'top' || side === 'bottom') && this.direction() === 'rtl' ? -axis : axis;
	});
	constructor() {
		super();
		afterNextRender(() =>
			effect(
				() => {
					const positions = this.getAttachPositions();
					this._dir.valueSignal();
					untracked(() => {
						this._positions = positions;
						this._candidates = this.candidates();
						this._strategy?.withPositions(positions);
						this._strategy?.apply();
					});
				},
				{ injector: this._floatingInjector },
			),
		);
	}
	private candidates(): readonly CapsPlacement[] {
		return this.autoAlign()
			? [this.placement(), ...placements.filter((p) => p !== this.placement())]
			: [this.placement()];
	}
	protected override getAttachPositions(): ConnectedPosition[] {
		return this.candidates().map((placement) => this.positionFor(placement));
	}
	private positionFor(placement: CapsPlacement): ConnectedPosition {
		const [side, alignment] = placement.split('-');
		const horizontal = side === 'top' || side === 'bottom';
		const crossX = alignment === 'start' ? 'start' : alignment === 'end' ? 'end' : 'center';
		const crossY = alignment === 'start' ? 'top' : alignment === 'end' ? 'bottom' : 'center';
		const logicalLeft = this._dir.value === 'rtl' ? 'end' : 'start';
		const logicalRight = this._dir.value === 'rtl' ? 'start' : 'end';
		const gap = this.caret() ? 8 : 4;
		const axis = this.autoAlign() && alignment ? (this.alignmentAxisOffset() ?? 0) * (alignment === 'end' ? -1 : 1) : 0;
		return horizontal
			? {
					originX: crossX,
					overlayX: crossX,
					originY: side === 'top' ? 'top' : 'bottom',
					overlayY: side === 'top' ? 'bottom' : 'top',
					offsetX: axis * (this._dir.value === 'rtl' ? -1 : 1),
					offsetY: side === 'top' ? -gap : gap,
				}
			: {
					originY: crossY,
					overlayY: crossY,
					originX: side === 'left' ? logicalLeft : logicalRight,
					overlayX: side === 'left' ? logicalRight : logicalLeft,
					offsetX: side === 'left' ? -gap : gap,
					offsetY: axis,
				};
	}
	public originElement(): HTMLElement | null {
		const origin = this.getAttachTo();
		const element = origin instanceof ElementRef ? origin.nativeElement : origin;
		return element instanceof HTMLElement ? element : null;
	}
	public prepare(): void {
		this.activePlacement.set(this.placement());
		const rect = this.originElement()?.getBoundingClientRect();
		this.originCrossSize.set(
			rect
				? this.placement().startsWith('top') || this.placement().startsWith('bottom')
					? rect.width
					: rect.height
				: 24,
		);
	}
	public overlayOptions() {
		return this._options();
	}
	public override open(): void {
		this.prepare();
		super.open();
	}
	protected override getPositionStrategy() {
		const origin = this.getAttachTo();
		if (!origin) return super.getPositionStrategy();
		const positions = this.getAttachPositions();
		const candidates = this.candidates();
		this._positions = positions;
		this._candidates = candidates;
		const strategy = this._positionBuilder
			.flexibleConnectedTo(origin)
			.withPositions(positions)
			.withFlexibleDimensions(false)
			.withPush(false)
			.withViewportMargin(8);
		this._strategy = strategy;
		const sub = strategy.positionChanges.subscribe((change) => {
			const index = this._positions.findIndex(
				(p) =>
					p.originX === change.connectionPair.originX &&
					p.originY === change.connectionPair.originY &&
					p.overlayX === change.connectionPair.overlayX &&
					p.overlayY === change.connectionPair.overlayY,
			);
			if (index >= 0) this.activePlacement.set(this._candidates[index]);
		});
		this._destroy.onDestroy(() => sub.unsubscribe());
		return strategy;
	}
}
