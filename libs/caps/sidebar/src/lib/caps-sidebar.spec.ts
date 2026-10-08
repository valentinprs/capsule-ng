import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, REQUEST, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { render, screen, waitFor } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsSidebarImports, CapsSidebarService, provideCapsSidebarConfig } from '../index';

@Component({
	selector: 'caps-sidebar-test',
	imports: [CapsSidebarImports, CapsDropdownMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-wrapper
			sidebarWidth="17rem"
			sidebarWidthIcon="4rem"
			[attr.lang]="language()"
			[attr.data-lang]="language()"
			[attr.dir]="direction()"
		>
			<caps-sidebar
				[collapsible]="collapsible()"
				[sidebarWidthMobile]="mobileWidth()"
				srOnlySheetTitle="Workspace"
				srOnlySheetDescription="Choose a page"
				aria-label="Workspace navigation"
			>
				<caps-sidebar-header>Workspace</caps-sidebar-header>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Pages</caps-sidebar-group-label>
						<caps-sidebar-menu>
							<caps-sidebar-menu-item class="project-item">
								<a
									capsSidebarMenuButton
									href="#projects"
									[isActive]="true"
									tooltip="Projects"
									[closeMobileSidebarOnClick]="true"
								>
									<span aria-hidden="true">▣</span>
									<span>Projects</span>
								</a>
								<caps-sidebar-menu-sub>
									<caps-sidebar-menu-sub-item>
										<a
											capsSidebarMenuSubButton
											href="#recent"
											[disabled]="disabled()"
											[closeMobileSidebarOnClick]="true"
										>
											Recent
										</a>
									</caps-sidebar-menu-sub-item>
								</caps-sidebar-menu-sub>
							</caps-sidebar-menu-item>
							<caps-sidebar-menu-item>
								<button capsSidebarMenuButton [disabled]="disabled()" [closeMobileSidebarOnClick]="true">
									Disabled action
								</button>
								<button capsSidebarMenuAction aria-label="Project actions" [capsDropdownMenuTrigger]="actions">
									…
								</button>
							</caps-sidebar-menu-item>
						</caps-sidebar-menu>
					</caps-sidebar-group>
				</caps-sidebar-content>
				<caps-sidebar-footer><button type="button">Account</button></caps-sidebar-footer>
				<button capsSidebarRail aria-label="Toggle Sidebar"></button>
			</caps-sidebar>
			<caps-sidebar-inset>
				<main>
					<button capsSidebarTrigger aria-label="Toggle Sidebar"></button>
					<h1>Projects</h1>
				</main>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
		<ng-template #actions>
			<caps-menu><button capsMenuItem>Rename</button></caps-menu>
		</ng-template>
	`,
})
class Host {
	public readonly service = inject(CapsSidebarService);
	public readonly language = signal<string | null>('en');
	public readonly direction = signal('ltr');
	public readonly mobileWidth = signal('19rem');
	public readonly disabled = signal(true);
	public readonly collapsible = signal<'offcanvas' | 'icon' | 'none'>('icon');
}

const cookieName = 'caps_sidebar_contract';
const config = () => provideCapsSidebarConfig({ sidebarCookieName: cookieName });
const mediaTarget = new EventTarget();
const media = {
	matches: false,
	media: '(max-width: 768px)',
	onchange: null,
	addListener: () => undefined,
	removeListener: () => undefined,
	addEventListener: mediaTarget.addEventListener.bind(mediaTarget),
	removeEventListener: mediaTarget.removeEventListener.bind(mediaTarget),
	dispatchEvent: mediaTarget.dispatchEvent.bind(mediaTarget),
};
beforeEach(() => {
	document.cookie = `${cookieName}=; path=/; max-age=0`;
	media.matches = false;
	vi.spyOn(window, 'matchMedia').mockReturnValue(media);
});
afterEach(() => {
	TestBed.resetTestingModule();
	document.cookie = `${cookieName}=; path=/; max-age=0`;
	vi.restoreAllMocks();
});

it('owns native list children, preserves links, projected li classes and exactly one explicit main', async () => {
	const view = await render(Host, { providers: [config()] });
	const nav = screen.getByRole('navigation', { name: 'Workspace navigation' });
	const lists = nav.querySelectorAll('ul');
	expect(lists).toHaveLength(2);
	for (const list of Array.from(lists)) for (const child of Array.from(list.children)) expect(child.tagName).toBe('LI');
	expect(nav.querySelector('li.project-item')).not.toBeNull();
	expect(nav.querySelector('[role="menu"]')).toBeNull();
	expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
	expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
	expect(view.container.querySelectorAll('main')).toHaveLength(1);
	expect(view.container.querySelector('caps-sidebar-inset')).not.toHaveAttribute('role');
	expect((await axe.run(view.container)).violations).toEqual([]);
});
it('restores valid cookie state, persists desktop commands and reflects service variant changes', async () => {
	document.cookie = `${cookieName}=false; path=/`;
	const view = await render(Host, { providers: [config()] });
	const service = view.fixture.componentInstance.service;
	expect(service.open()).toBe(false);
	service.setOpen(true);
	service.setVariant('inset');
	view.detectChanges();
	expect(document.cookie).toContain(`${cookieName}=true`);
	expect(view.container.querySelector('caps-sidebar')).toHaveAttribute('data-variant', 'inset');
	expect(view.container.querySelector('caps-sidebar-wrapper')).toHaveStyle('--sidebar-width: 17rem');
	expect(view.container.querySelector('caps-sidebar-wrapper')).toHaveStyle('--sidebar-width-icon: 4rem');
});
it('ignores corrupt cookie values and reads request cookies on SSR without client writes', () => {
	document.cookie = `${cookieName}=corrupt; path=/`;
	TestBed.configureTestingModule({ providers: [config()] });
	expect(TestBed.inject(CapsSidebarService).open()).toBe(true);
	TestBed.resetTestingModule();
	TestBed.configureTestingModule({
		providers: [
			config(),
			{ provide: PLATFORM_ID, useValue: 'server' },
			{
				provide: REQUEST,
				// Browser Request strips the forbidden Cookie header; SSR supplies the request header interface.
				useValue: { headers: new Headers({ cookie: `${cookieName}=false` }) },
			},
		],
	});
	TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
	expect(TestBed.inject(PLATFORM_ID)).toBe('server');
	expect(TestBed.inject(REQUEST)?.headers.get('cookie')).toBe(`${cookieName}=false`);
	const service = TestBed.inject(CapsSidebarService);
	expect(service.open()).toBe(false);
	service.setOpen(true);
	expect(document.cookie).toContain(`${cookieName}=corrupt`);
});
it('honors the configured breakpoint and shortcut while keeping mobile and desktop state independent', async () => {
	const spy = vi.mocked(window.matchMedia);
	const view = await render(Host, {
		providers: [
			provideCapsSidebarConfig({
				sidebarCookieName: cookieName,
				mobileBreakpoint: '900px',
				sidebarKeyboardShortcut: 'k',
			}),
		],
	});
	expect(spy).toHaveBeenCalledWith('(max-width: 900px)');
	const service = view.fixture.componentInstance.service;
	const toggle = new KeyboardEvent('keydown', { key: 'K', metaKey: true, cancelable: true });
	window.dispatchEvent(toggle);
	view.detectChanges();
	expect(toggle.defaultPrevented).toBe(true);
	expect(service.open()).toBe(false);
	media.matches = true;
	mediaTarget.dispatchEvent(new Event('change'));
	view.detectChanges();
	service.setOpenMobile(true);
	view.detectChanges();
	expect(service.openMobile()).toBe(true);
	expect(service.open()).toBe(false);
	media.matches = false;
	mediaTarget.dispatchEvent(new Event('change'));
	view.detectChanges();
	expect(service.openMobile()).toBe(false);
	expect(service.open()).toBe(false);
});
it('handles resize fallback and cleans up keyboard/media/resize subscriptions on destroy', async () => {
	const view = await render(Host, { providers: [config()] });
	const service = view.fixture.componentInstance.service;
	media.matches = true;
	window.dispatchEvent(new Event('resize'));
	await waitFor(() => expect(service.isMobile()).toBe(true));
	service.setOpenMobile(true);
	media.matches = false;
	window.dispatchEvent(new Event('resize'));
	await waitFor(() => expect(service.openMobile()).toBe(false));
	window.dispatchEvent(new Event('resize'));
	TestBed.resetTestingModule();
	const key = new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, cancelable: true });
	window.dispatchEvent(key);
	expect(key.defaultPrevented).toBe(false);
	expect(service.open()).toBe(true);
	media.matches = true;
	mediaTarget.dispatchEvent(new Event('change'));
	expect(service.isMobile()).toBe(false);
});
it('preserves native disabled activation and the mobile close override on anchors and buttons', async () => {
	media.matches = true;
	const view = await render(Host, { providers: [config()] });
	const service = view.fixture.componentInstance.service;
	await userEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
	view.detectChanges();
	const disabledLink = await screen.findByRole('link', { name: 'Recent' });
	expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
	const event = new MouseEvent('click', { bubbles: true, cancelable: true });
	disabledLink.dispatchEvent(event);
	view.detectChanges();
	expect(event.defaultPrevented).toBe(true);
	expect(service.openMobile()).toBe(true);
	screen.getByRole('button', { name: 'Disabled action' }).click();
	view.detectChanges();
	expect(service.openMobile()).toBe(true);
	await userEvent.click(screen.getByRole('link', { name: 'Projects' }));
	view.detectChanges();
	await waitFor(() => expect(service.openMobile()).toBe(false));
});
it('names the mobile Sheet, restores the external native trigger and dismisses a nested menu before the Sheet', async () => {
	media.matches = true;
	const view = await render(Host, { providers: [config()] });
	const trigger = screen.getByRole('button', { name: 'Toggle Sidebar' });
	await userEvent.click(trigger);
	view.detectChanges();
	const dialog = await screen.findByRole('dialog', { name: 'Workspace' });
	expect(dialog).toHaveAccessibleDescription('Choose a page');
	await userEvent.click(screen.getByRole('button', { name: 'Project actions' }));
	await screen.findByRole('menu');
	await userEvent.keyboard('{Escape}');
	view.detectChanges();
	expect(view.fixture.componentInstance.service.openMobile()).toBe(true);
	await userEvent.keyboard('{Escape}');
	view.detectChanges();
	await waitFor(() => expect(view.fixture.componentInstance.service.openMobile()).toBe(false));
	await waitFor(() => expect(trigger).toHaveFocus());
});
it('keeps a non-collapsible Sidebar inline and suppresses its tooltip even when desktop state is collapsed', async () => {
	const view = await render(Host, { providers: [config()] });
	view.fixture.componentInstance.collapsible.set('none');
	view.fixture.componentInstance.service.setOpen(false);
	view.detectChanges();
	expect(view.container.querySelector('[data-slot="sidebar-container"]')).toBeNull();
	const link = screen.getByRole('link', { name: 'Projects' });
	link.focus();
	await new Promise((resolve) => setTimeout(resolve, 200));
	expect(screen.queryByRole('tooltip')).toBeNull();
});

it('passes configured wrapper widths into the real mobile portal for oversized widths', async () => {
	media.matches = true;
	const view = await render(Host, { providers: [config()] });
	view.fixture.componentInstance.mobileWidth.set('32rem');
	view.fixture.componentInstance.service.setOpenMobile(true);
	view.detectChanges();
	const dialog = await screen.findByRole('dialog', { name: 'Workspace' });
	const panel = dialog.querySelector('[data-slot="sheet-content"]');
	expect(panel).toHaveClass('caps-sidebar-mobile');
	expect(panel?.querySelector('nav')?.style.width).toBe('32rem');
	expect(panel?.querySelector('nav')).toHaveStyle('--sidebar-width: 17rem');
	expect(panel?.querySelector('nav')).toHaveStyle('--sidebar-width-icon: 4rem');
});

it('carries native language and direction into its modal and collapsed Tooltip portals', async () => {
	media.matches = true;
	const view = await render(Host, { providers: [config()] });
	view.fixture.componentInstance.language.set('ar');
	view.fixture.componentInstance.direction.set('rtl');
	view.detectChanges();
	await userEvent.click(screen.getByRole('button', { name: 'Toggle Sidebar' }));
	const dialog = await screen.findByRole('dialog', { name: 'Workspace' });
	await waitFor(() => expect(dialog).toHaveAttribute('lang', 'ar'));
	expect(dialog).toHaveAttribute('data-lang', 'ar');
	expect(dialog).toHaveAttribute('dir', 'rtl');
	const panel = dialog.querySelector('[data-slot="sheet-content"]');
	expect(panel).toHaveAttribute('lang', 'ar');
	expect(panel).toHaveStyle('--sidebar-width: 17rem');
	// The source is the original native ancestry, never the forwarded portal attributes.
	view.fixture.componentInstance.language.set('en');
	view.fixture.componentInstance.direction.set('ltr');
	view.detectChanges();
	await waitFor(() => expect(dialog).toHaveAttribute('lang', 'en'));
	expect(panel).toHaveAttribute('data-lang', 'en');
	view.fixture.componentInstance.language.set(null);
	view.detectChanges();
	await waitFor(() => expect(dialog).not.toHaveAttribute('data-lang'));
	expect(panel).not.toHaveAttribute('data-lang');
	view.fixture.componentInstance.language.set('ar');
	view.fixture.componentInstance.direction.set('rtl');
	view.detectChanges();
	await waitFor(() => expect(dialog).toHaveAttribute('lang', 'ar'));
	await userEvent.keyboard('{Escape}');
	media.matches = false;
	mediaTarget.dispatchEvent(new Event('change'));
	view.fixture.componentInstance.service.setOpen(false);
	view.detectChanges();
	screen.getByRole('link', { name: 'Projects' }).focus();
	const tooltip = await screen.findByRole('tooltip');
	await waitFor(() => expect(tooltip).toHaveAttribute('lang', 'ar'));
	expect(tooltip).toHaveAttribute('data-lang', 'ar');
	expect(tooltip).toHaveAttribute('dir', 'rtl');
});
