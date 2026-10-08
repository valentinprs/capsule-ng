import { inject, InjectionToken, type ValueProvider } from '@angular/core';

export interface CapsSidebarConfig {
	defaultOpen: boolean;
	sidebarWidth: string;
	sidebarWidthMobile: string;
	sidebarWidthIcon: string;
	sidebarCookieName: string;
	sidebarCookieMaxAge: number;
	sidebarKeyboardShortcut: string;
	mobileBreakpoint: string;
	closeMobileSidebarOnMenuButtonClick: boolean;
}

const defaultConfig: CapsSidebarConfig = {
	defaultOpen: true,
	sidebarWidth: '16rem',
	sidebarWidthMobile: '18rem',
	sidebarWidthIcon: '3rem',
	sidebarCookieName: 'sidebar_state',
	sidebarCookieMaxAge: 60 * 60 * 24 * 7, // 7 days in seconds
	sidebarKeyboardShortcut: 'b',
	mobileBreakpoint: '768px',
	closeMobileSidebarOnMenuButtonClick: false,
};

const CapsSidebarConfigToken = new InjectionToken<CapsSidebarConfig>('CapsSidebarConfig');

export function provideCapsSidebarConfig(config: Partial<CapsSidebarConfig>): ValueProvider {
	return { provide: CapsSidebarConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectCapsSidebarConfig(): CapsSidebarConfig {
	return inject(CapsSidebarConfigToken, { optional: true }) ?? defaultConfig;
}
