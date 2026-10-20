import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import { render, screen, waitFor, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsHeaderImports } from '../index';

@Component({
	selector: 'caps-header-test',
	imports: [CapsHeaderImports, CapsNavigationMenuImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-header class="sticky top-0">
			@if (showLogo()) {
				<caps-header-logo><svg role="img" aria-label="Brand"></svg></caps-header-logo>
			}
			<caps-header-actions>
				<button capsButton variant="ghost" size="icon" type="button" aria-label="Toggle theme"></button>
			</caps-header-actions>
			<caps-header-title>MyHandover</caps-header-title>
			@if (showNav()) {
				<caps-navigation-menu *capsHeaderNav aria-label="Primary">
					<li capsNavigationMenuItem><a capsNavigationMenuLink href="#elogbook" active>eLogbook</a></li>
					<li capsNavigationMenuItem><a capsNavigationMenuLink href="#reports">Reports</a></li>
				</caps-navigation-menu>
			}
			@if (showVisual()) {
				<caps-header-visual><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="" /></caps-header-visual>
			}
			@if (customMenu()) {
				<caps-header-menu title="MyHandover navigation" description="Access the application modules." />
			}
		</caps-header>
	`,
})
class HeaderHost {
	public readonly showVisual = signal(true);
	public readonly showLogo = signal(true);
	public readonly showNav = signal(true);
	public readonly customMenu = signal(true);
}

const part = (header: Element, slot: string) => header.querySelector(`[data-slot="${slot}"]`);
const slots = (element: Element | null) =>
	Array.from(element?.children ?? []).map((child) => child.getAttribute('data-slot'));

describe('CapsHeader', () => {
	it('is a banner that places its parts in the Figma order, whatever the source order', async () => {
		const { container } = await render(HeaderHost);
		const header = screen.getByRole('banner');
		expect(header.tagName).toBe('CAPS-HEADER');
		expect(header.classList).toContain('caps-header');
		expect(header.classList).toContain('sticky');
		expect(slots(part(header, 'header-start')).filter((slot) => slot !== null)).toEqual([
			'header-menu',
			'header-visual',
			'header-brand',
		]);
		expect(slots(part(header, 'header-brand'))).toEqual(['header-title', 'header-nav']);
		expect(slots(part(header, 'header-end'))).toEqual(['header-actions', 'header-logo']);
		expect(container.querySelector('caps-header-title')?.textContent?.trim()).toBe('MyHandover');
	});

	it('projects the logo at the end and drops absent parts', async () => {
		const { fixture } = await render(HeaderHost);
		const header = screen.getByRole('banner');
		expect(part(header, 'header-logo')?.contains(screen.getByRole('img', { name: 'Brand' }))).toBe(true);
		fixture.componentInstance.showVisual.set(false);
		fixture.componentInstance.showLogo.set(false);
		fixture.detectChanges();
		expect(part(header, 'header-visual')).toBeNull();
		expect(part(header, 'header-logo')).toBeNull();
		expect(screen.queryByRole('img', { name: 'Brand' })).toBeNull();
	});

	it('renders the navigation written once in the bar, next to native actions', async () => {
		await render(HeaderHost);
		const header = screen.getByRole('banner');
		const nav = within(part(header, 'header-nav') as HTMLElement).getByRole('navigation', { name: 'Primary' });
		expect(within(nav).getByRole('link', { name: 'eLogbook' }).getAttribute('aria-current')).toBe('page');
		expect(screen.getAllByRole('navigation', { name: 'Primary' })).toHaveLength(1);
		expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeTruthy();
	});

	it('opens the same navigation in a named left sheet and closes it when a link is followed', async () => {
		const user = userEvent.setup();
		await render(HeaderHost);
		const trigger = screen.getByRole('button', { name: 'Open navigation' });
		expect(trigger.getAttribute('type')).toBe('button');
		await user.click(trigger);
		const dialog = await screen.findByRole('dialog', { name: 'MyHandover navigation' });
		expect(dialog.textContent).toContain('Access the application modules.');
		expect(within(dialog).getByRole('navigation', { name: 'Primary' })).toBeTruthy();

		await user.click(within(dialog).getByText('MyHandover navigation'));
		expect(screen.getByRole('dialog')).toBeTruthy();

		await user.click(within(dialog).getByRole('link', { name: 'eLogbook' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
	});

	it('shows the menu button with default texts without caps-header-menu, and none without navigation', async () => {
		const user = userEvent.setup();
		const { fixture } = await render(HeaderHost);
		fixture.componentInstance.customMenu.set(false);
		fixture.detectChanges();
		await user.click(screen.getByRole('button', { name: 'Open navigation' }));
		expect(await screen.findByRole('dialog', { name: 'Navigation' })).toBeTruthy();
		await user.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

		fixture.componentInstance.showNav.set(false);
		fixture.detectChanges();
		const header = screen.getByRole('banner');
		expect(part(header, 'header-menu')).toBeNull();
		expect(part(header, 'header-nav')).toBeNull();
		expect(screen.queryByRole('button', { name: 'Open navigation' })).toBeNull();
	});
});
