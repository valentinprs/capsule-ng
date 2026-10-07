import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, ElementRef, computed, inject } from '@angular/core';
import { BrnResizableGroup, BrnResizableHandle } from '@spartan-ng/brain/resizable';
import { classes } from '@spartan-ng/helm/utils';
import { CapsResizablePanel } from './caps-resizable-panel';

/** Focusable separator. Give it a name describing the preceding panel's dimension. */
@Component({
	selector: 'caps-resizable-handle',
	exportAs: 'capsResizableHandle',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'resizable-handle',
		'[attr.aria-controls]': '_context()?.left?.id() ?? null',
		'[attr.aria-valuenow]': '_context()?.value ?? null',
		'[attr.aria-valuemin]': '_context()?.min ?? null',
		'[attr.aria-valuemax]': '_context()?.max ?? null',
		'[attr.aria-valuetext]': '_context() ? _context()!.value + "%" : null',
		'(touchstart)': '_handleTouchStart($event)',
	},
	template: `
		@if (withHandle()) {
			<span class="caps-resizable-handle-icon" aria-hidden="true"></span>
		}
	`,
})
export class CapsResizableHandle extends BrnResizableHandle {
	private readonly _group = inject(BrnResizableGroup);
	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly _directionality = inject(Directionality);
	private readonly _restoredSizes = new Map<string, number>();
	protected readonly _context = computed(() => {
		const panels = this._group.panels();
		const previous = this._host.nativeElement.previousElementSibling;
		const index = panels.findIndex((panel) => panel.el.nativeElement === previous);
		const left = panels[index],
			right = panels[index + 1];
		if (!left || !right) return null;
		const layout = this._group.layout();
		const value =
			(left instanceof CapsResizablePanel ? left.currentSize() : undefined) ??
			layout[index] ??
			left.defaultSize() ??
			100 / panels.length;
		const next =
			(right instanceof CapsResizablePanel ? right.currentSize() : undefined) ??
			layout[index + 1] ??
			right.defaultSize() ??
			100 / panels.length;
		const total = value + next;
		const min = Math.max(left.minSize(), total - right.maxSize());
		const max = Math.min(left.maxSize(), total - right.minSize());
		return {
			index,
			left,
			right,
			value,
			total,
			min: left.collapsible() && total <= right.maxSize() ? 0 : min,
			max,
			resizeMin: min,
		};
	});
	constructor() {
		super();
		classes(() => 'caps-resizable-handle');
	}
	protected override _handleMouseDown(event: MouseEvent): void {
		const context = this._context();
		if (!this.disabled() && context && event.button === 0) {
			this._synchronizeLayout();
			this._group.startResize(context.index, event);
		}
	}
	protected _handleTouchStart(event: TouchEvent): void {
		const context = this._context();
		if (!this.disabled() && context && event.touches.length === 1) {
			this._synchronizeLayout();
			this._group.startResize(context.index, event);
		}
	}
	protected override _handleKeyDown(event: KeyboardEvent): void {
		const context = this._context();
		if (this.disabled() || !context) return;
		const vertical = this._group.direction() === 'vertical';
		const step = event.shiftKey ? 10 : 1;
		let size = context.value;
		switch (event.key) {
			case 'ArrowLeft':
				if (vertical) return;
				size += this._directionality.valueSignal() === 'rtl' ? step : -step;
				break;
			case 'ArrowRight':
				if (vertical) return;
				size += this._directionality.valueSignal() === 'rtl' ? -step : step;
				break;
			case 'ArrowUp':
				if (!vertical) return;
				size -= step;
				break;
			case 'ArrowDown':
				if (!vertical) return;
				size += step;
				break;
			case 'Home':
				size = context.resizeMin;
				break;
			case 'End':
				size = context.max;
				break;
			case 'Enter':
			case ' ': {
				event.preventDefault();
				const collapseLeft = context.left.collapsible();
				const panel = collapseLeft ? context.left : context.right;
				const neighbor = collapseLeft ? context.right : context.left;
				if (!panel.collapsible()) return;
				const current = collapseLeft ? context.value : context.total - context.value;
				const restored = this._restoredSizes.get(panel.id()) ?? panel.defaultSize() ?? context.total / 2;
				const target = current === 0 ? Math.max(panel.minSize(), Math.min(panel.maxSize(), restored)) : 0;
				const remaining = context.total - target;
				if (remaining < neighbor.minSize() || remaining > neighbor.maxSize()) return;
				if (current > 0) this._restoredSizes.set(panel.id(), current);
				this._apply(collapseLeft ? target : remaining);
				return;
			}
			default:
				return;
		}
		event.preventDefault();
		this._apply(Math.max(context.resizeMin, Math.min(context.max, size)));
	}
	private _currentLayout(): number[] {
		const previous = this._group.layout();
		const sizes = this._group
			.panels()
			.map(
				(panel, index) =>
					(panel instanceof CapsResizablePanel ? panel.currentSize() : undefined) ??
					previous[index] ??
					panel.defaultSize() ??
					0,
			);
		return sizes;
	}
	private _synchronizeLayout(): void {
		const previous = this._group.layout();
		const sizes = this._currentLayout();
		if (sizes.some((size, index) => size !== previous[index])) this._group.layout.set(sizes);
	}
	private _apply(size: number): void {
		const context = this._context();
		if (!context) return;
		const layout = this._currentLayout();
		layout[context.index] = size;
		layout[context.index + 1] = context.total - size;
		this._group.layout.set(layout);
		this._group.updatePanelStyles();
		this._group.layoutChanged.emit(layout);
	}
}
