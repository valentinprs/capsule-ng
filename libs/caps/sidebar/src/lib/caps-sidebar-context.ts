import { afterEveryRender, Directive, ElementRef, inject, Injectable, signal } from '@angular/core';

/** @internal Native ancestry follows the Sidebar view into the body portal. */
@Injectable()
export class CapsSidebarContext {
	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	public readonly direction = signal<'ltr' | 'rtl'>('ltr');
	public readonly lang = signal<string | null>(null);
	public readonly dataLang = signal<string | null>(null);
	constructor() {
		afterEveryRender(() => {
			this.direction.set(
				this._host.ownerDocument.defaultView?.getComputedStyle(this._host).direction === 'rtl' ? 'rtl' : 'ltr',
			);
			this.lang.set(this._host.closest('[lang]')?.getAttribute('lang') ?? null);
			this.dataLang.set(this._host.closest('[data-lang]')?.getAttribute('data-lang') ?? null);
		});
	}
}

/** @internal Copy native context only onto the Sidebar's own modal surface. */
@Directive({ selector: '[capsSidebarPortalContext]' })
export class CapsSidebarPortalContext {
	private readonly _context = inject(CapsSidebarContext);
	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	constructor() {
		afterEveryRender(() => {
			const panel = this._host.closest<HTMLElement>('.caps-sidebar-mobile');
			if (!panel) return;
			for (const target of [panel, panel.closest('[role="dialog"]')]) {
				if (!target) continue;
				for (const [name, value] of [
					['dir', this._context.direction()],
					['lang', this._context.lang()],
					['data-lang', this._context.dataLang()],
				] as const) {
					if (value === null) {
						if (target.hasAttribute(name)) target.removeAttribute(name);
					} else if (target.getAttribute(name) !== value) target.setAttribute(name, value);
				}
			}
			const style = this._host.ownerDocument.defaultView?.getComputedStyle(this._host);
			for (const name of ['--sidebar-width', '--sidebar-width-icon']) {
				const value = style?.getPropertyValue(name) ?? '';
				if (panel.style.getPropertyValue(name) !== value) panel.style.setProperty(name, value);
			}
		});
	}
}
