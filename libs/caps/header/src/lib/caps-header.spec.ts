import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { render, screen, waitFor, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { CapsHeaderImports } from '../index';

@Component({
	selector: 'caps-header-test',
	imports: [CapsHeaderImports, CapsButton],
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
			<caps-header-nav>
				<nav aria-label="Primary"><a href="#elogbook" aria-current="page">eLogbook</a></nav>
			</caps-header-nav>
			@if (showVisual()) {
				<caps-header-visual><img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="" /></caps-header-visual>
			}
			<caps-header-menu title="MyHandover navigation" description="Access the application modules.">
				<nav aria-label="Primary">
					<a capsButton variant="ghost" href="#elogbook">eLogbook</a>
					<button capsButton variant="ghost" type="button" (click)="clicked.set(true)">Reports</button>
				</nav>
			</caps-header-menu>
		</caps-header>
	`,
})
class HeaderHost {
	public readonly showVisual = signal(true);
	public readonly showLogo = signal(true);
	public readonly clicked = signal(false);
}

const part = (header: Element, slot: string) => header.querySelector(`[data-slot="${slot}"]`);

describe('CapsHeader', () => {
	it('is a banner that places its parts in the Figma order, whatever the source order', async () => {
		const { container } = await render(HeaderHost);
		const header = screen.getByRole('banner');
		expect(header.tagName).toBe('CAPS-HEADER');
		expect(header.classList).toContain('caps-header');
		expect(header.classList).toContain('sticky');
		const start = part(header, 'header-start');
		expect(Array.from(start?.children ?? []).map((child) => child.getAttribute('data-slot'))).toEqual([
			'header-menu',
			'header-visual',
			'header-brand',
		]);
		const brand = part(header, 'header-brand');
		expect(Array.from(brand?.children ?? []).map((child) => child.getAttribute('data-slot'))).toEqual([
			'header-title',
			'header-nav',
		]);
		const end = part(header, 'header-end');
		expect(Array.from(end?.children ?? []).map((child) => child.getAttribute('data-slot'))).toEqual([
			'header-actions',
			'header-logo',
		]);
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

	it('keeps the projected navigation and actions native', async () => {
		await render(HeaderHost);
		const nav = screen.getByRole('navigation', { name: 'Primary' });
		expect(nav.querySelector('a')?.getAttribute('aria-current')).toBe('page');
		expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeTruthy();
	});

	it('opens the navigation in a named left sheet and closes it when a link is followed', async () => {
		const user = userEvent.setup();
		const { fixture } = await render(HeaderHost);
		const trigger = screen.getByRole('button', { name: 'Open navigation' });
		expect(trigger.getAttribute('type')).toBe('button');
		await user.click(trigger);
		const dialog = await screen.findByRole('dialog', { name: 'MyHandover navigation' });
		expect(dialog.textContent).toContain('Access the application modules.');

		await user.click(within(dialog).getByRole('button', { name: 'Reports' }));
		expect(fixture.componentInstance.clicked()).toBe(true);
		expect(screen.getByRole('dialog')).toBeTruthy();

		await user.click(within(dialog).getByRole('link', { name: 'eLogbook' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
	});
});
