import { type Direction } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { afterEveryRender, Directive, ElementRef, inject, Injectable, signal } from '@angular/core';
import { NgControl } from '@angular/forms';

/** @internal Keep native ancestry when the calendar is rendered in a body portal. */
@Injectable()
export class CapsDatePickerContext {
	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
	private readonly _document = inject(DOCUMENT);
	public readonly direction = signal<Direction | undefined>(undefined);
	public readonly lang = signal<string | null>(null);
	public readonly dataLang = signal<string | null>(null);
	public readonly dialogLabel = signal<string | undefined>(undefined);
	constructor() {
		afterEveryRender(() => {
			const host = this._host.nativeElement;
			this.direction.set(this._document.defaultView?.getComputedStyle(host).direction === 'rtl' ? 'rtl' : 'ltr');
			this.lang.set(host.closest('[lang]')?.getAttribute('lang') ?? null);
			this.dataLang.set(host.closest('[data-lang]')?.getAttribute('data-lang') ?? null);
			const control = host.querySelector<HTMLInputElement | HTMLButtonElement>(
				'[data-slot="date-picker-input"], caps-date-picker-trigger button',
			);
			const labelledBy = (control?.getAttribute('aria-labelledby') ?? '')
				.split(/\s+/)
				.map((id) => this._document.getElementById(id)?.textContent ?? '')
				.join(' ')
				.trim();
			this.dialogLabel.set(
				labelledBy ||
					control?.getAttribute('aria-label')?.trim() ||
					Array.from(control?.labels ?? [])
						.map((label) => label.textContent?.trim())
						.join(' ')
						.trim() ||
					(control?.tagName === 'BUTTON' ? control.textContent?.trim() : '') ||
					host.querySelector('button[aria-haspopup="dialog"]')?.getAttribute('aria-label') ||
					undefined,
			);
		});
	}
}

/** @internal These descendants are views of the picker, not independent form controls. */
@Directive({ selector: '[capsDatePickerBoundary]', providers: [{ provide: NgControl, useValue: null }] })
export class CapsDatePickerBoundary {
	private readonly _context = inject(CapsDatePickerContext);
	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
	constructor() {
		afterEveryRender(() => {
			const panel = this._host.nativeElement.closest('.caps-popover-content');
			if (!panel) return;
			for (const [name, value] of [
				['lang', this._context.lang()],
				['data-lang', this._context.dataLang()],
			] as const) {
				if (value === null) panel.removeAttribute(name);
				else panel.setAttribute(name, value);
			}
		});
	}
}
