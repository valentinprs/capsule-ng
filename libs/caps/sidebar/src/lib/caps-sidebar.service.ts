import { isPlatformBrowser } from '@angular/common';
import {
	afterNextRender,
	computed,
	DestroyRef,
	DOCUMENT,
	inject,
	Injectable,
	PLATFORM_ID,
	REQUEST,
	signal,
} from '@angular/core';
import { injectCapsSidebarConfig } from './caps-sidebar.token';
export type SidebarVariant = 'sidebar' | 'floating' | 'inset';
/** One application context owns desktop persistence, mobile state and native listeners. */
@Injectable({ providedIn: 'root' })
export class CapsSidebarService {
	private readonly _document = inject(DOCUMENT);
	private readonly _browser = isPlatformBrowser(inject(PLATFORM_ID));
	private readonly _request = inject(REQUEST, { optional: true });
	private readonly _config = injectCapsSidebarConfig();
	private readonly _open = signal(this._config.defaultOpen);
	private readonly _openMobile = signal(false);
	private readonly _isMobile = signal(false);
	private readonly _variant = signal<SidebarVariant>('sidebar');
	public readonly open = this._open.asReadonly();
	public readonly openMobile = this._openMobile.asReadonly();
	public readonly isMobile = this._isMobile.asReadonly();
	public readonly variant = this._variant.asReadonly();
	public readonly state = computed<'expanded' | 'collapsed'>(() => (this.open() ? 'expanded' : 'collapsed'));
	constructor() {
		const cookie = this._browser ? this._document.cookie : this._request?.headers.get('cookie');
		const prefix = `${this._config.sidebarCookieName}=`;
		const value = cookie
			?.split(';')
			.map((part) => part.trim())
			.find((part) => part.startsWith(prefix))
			?.slice(prefix.length);
		if (value === 'true' || value === 'false') this._open.set(value === 'true');
		const destroy = inject(DestroyRef);
		afterNextRender(() => {
			const window = this._document.defaultView;
			if (!window || typeof window.matchMedia !== 'function') return;
			const media = window.matchMedia(`(max-width: ${this._config.mobileBreakpoint})`);
			const update = () => {
				this._isMobile.set(media.matches);
				if (!media.matches) this._openMobile.set(false);
			};
			update();
			const shortcut = (event: KeyboardEvent) => {
				if (
					!event.defaultPrevented &&
					event.key.toLowerCase() === this._config.sidebarKeyboardShortcut.toLowerCase() &&
					(event.ctrlKey || event.metaKey)
				) {
					event.preventDefault();
					this.toggleSidebar();
				}
			};
			let timer: number | undefined;
			const resize = () => {
				if (timer !== undefined) window.clearTimeout(timer);
				timer = window.setTimeout(update, 100);
			};
			media.addEventListener('change', update);
			window.addEventListener('keydown', shortcut);
			window.addEventListener('resize', resize);
			destroy.onDestroy(() => {
				media.removeEventListener('change', update);
				window.removeEventListener('keydown', shortcut);
				window.removeEventListener('resize', resize);
				if (timer !== undefined) window.clearTimeout(timer);
			});
		});
	}
	public setOpen(open: boolean): void {
		this._open.set(open);
		if (this._browser)
			this._document.cookie = `${this._config.sidebarCookieName}=${open}; path=/; max-age=${this._config.sidebarCookieMaxAge}`;
	}
	public setOpenMobile(open: boolean): void {
		if (this.isMobile()) this._openMobile.set(open);
	}
	public setVariant(variant: SidebarVariant): void {
		this._variant.set(variant);
	}
	public toggleSidebar(): void {
		if (this.isMobile()) this.setOpenMobile(!this.openMobile());
		else this.setOpen(!this.open());
	}
}
