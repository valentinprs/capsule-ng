import { Directive, ElementRef, Injectable, inject } from '@angular/core';
import {
	BrnMessageScroller,
	BrnMessageScrollerViewport,
	SCROLL_POSITION_EPSILON,
	USER_SCROLL_KEYS,
	type BrnMessageScrollerScrollOptions,
} from '@spartan-ng/brain/message-scroller';

/** @internal Capsule policy around the public Brain controller; no private geometry. */
@Injectable()
export class CapsMessageScrollerBehavior extends BrnMessageScroller {
	private _capsContent: HTMLDivElement | null = null;
	private _capsViewport: HTMLDivElement | null = null;
	private _readingHistory = false;
	private _lastObservedTop = 0;
	private _knownAnchors = new WeakSet<Element>();
	private _suppressedAnchors = new WeakSet<Element>();

	public override setContentElement(element: HTMLDivElement | null): void {
		if (element && element !== this._capsContent) {
			this._capsContent = element;
			this._readingHistory = false;
			this._lastObservedTop = 0;
			this._knownAnchors = new WeakSet();
			this._suppressedAnchors = new WeakSet();
		}
		super.setContentElement(element);
	}
	public override clearContentElement(element: HTMLDivElement): void {
		if (this._capsContent === element) this._capsContent = null;
		super.clearContentElement(element);
	}
	public override setViewportElement(element: HTMLDivElement | null): void {
		if (element) this._capsViewport = element;
		super.setViewportElement(element);
	}
	public override clearViewportElement(element: HTMLDivElement): void {
		if (this._capsViewport === element) this._capsViewport = null;
		super.clearViewportElement(element);
	}
	public override userScrollIntent(): void {
		this._readingHistory = true;
		super.userScrollIntent();
	}
	public override syncAfterScroll(): void {
		const top = this._capsViewport?.scrollTop ?? 0;
		if (top < this._lastObservedTop - SCROLL_POSITION_EPSILON) this._readingHistory = true;
		super.syncAfterScroll();
		this._lastObservedTop = top;
		if (!this.scrollable().end) this._readingHistory = false;
	}
	public override handleContentChange(): void {
		// Brain processes new scrollAnchor before its free-scrolling branch. Suppress only
		// anchors first encountered during historical reading. Their semantic attributes
		// remain intact outside this synchronous reconcile and visibility still sees them.
		const hidden: Element[] = [];
		for (const row of Array.from(this._capsContent?.children ?? [])) {
			if (row.getAttribute('data-scroll-anchor') !== 'true') {
				this._knownAnchors.delete(row);
				this._suppressedAnchors.delete(row);
				continue;
			}
			if (this._readingHistory && !this._knownAnchors.has(row)) this._suppressedAnchors.add(row);
			this._knownAnchors.add(row);
			if (this._suppressedAnchors.has(row)) {
				row.setAttribute('data-scroll-anchor', 'false');
				hidden.push(row);
			}
		}
		try {
			super.handleContentChange();
		} finally {
			for (const row of hidden) row.setAttribute('data-scroll-anchor', 'true');
			this._lastObservedTop = this._capsViewport?.scrollTop ?? 0;
		}
	}
	public override handleResize(): void {
		super.handleResize();
		this._lastObservedTop = this._capsViewport?.scrollTop ?? 0;
	}
	public override scrollToMessage(messageId: string, options?: BrnMessageScrollerScrollOptions): boolean {
		const accepted = super.scrollToMessage(messageId, this.motionOptions(options));
		if (accepted) this._readingHistory = true;
		return accepted;
	}
	public override scrollToStart(options?: BrnMessageScrollerScrollOptions): boolean {
		this._readingHistory = true;
		return super.scrollToStart(this.motionOptions(options));
	}
	public override scrollToEnd(options?: BrnMessageScrollerScrollOptions): boolean {
		this._readingHistory = false;
		return super.scrollToEnd(this.motionOptions(options));
	}
	public focusViewport(): void {
		this._capsViewport?.focus({ preventScroll: true });
	}
	private motionOptions(options: BrnMessageScrollerScrollOptions = {}): BrnMessageScrollerScrollOptions {
		const reduce = this._capsViewport?.ownerDocument.defaultView?.matchMedia?.(
			'(prefers-reduced-motion: reduce)',
		).matches;
		return reduce && options.behavior === 'smooth' ? { ...options, behavior: 'auto' } : options;
	}
}

/** @internal Native viewport behavior with local keyboard/wheel/touch scope. */
@Directive({
	selector: '[capsMessageScrollerViewportBehavior]',
	host: {
		'(wheel)': 'onScopedPointerIntent($event)',
		'(touchmove)': 'onScopedPointerIntent($event)',
	},
})
export class CapsMessageScrollerViewportBehavior extends BrnMessageScrollerViewport {
	private readonly _capsElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	private readonly _capsScroller = inject(CapsMessageScrollerBehavior);
	protected override onWheel(): void {
		/* Scoped event handler below owns pointer intent. */
	}
	protected override onTouchMove(): void {
		/* Scoped event handler below owns pointer intent. */
	}
	protected override onKeyDown(event: KeyboardEvent): void {
		if (event.target === this._capsElement && !event.defaultPrevented && USER_SCROLL_KEYS.has(event.key)) {
			this._capsScroller.userScrollIntent();
		}
	}
	protected onScopedPointerIntent(event: Event): void {
		const target = event.target;
		if (target instanceof Element && target.closest('[data-slot="message-scroller-viewport"]') === this._capsElement) {
			this._capsScroller.userScrollIntent();
		}
	}
}
