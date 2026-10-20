import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsHeaderImports } from '@capsule-ng/caps/header';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand, lucideMoon } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-header-preview',
	imports: [CapsHeaderImports, CapsNavigationMenuImports, CapsButtonImports, CapsAvatarImports, NgIcon],
	providers: [provideIcons({ lucideCommand, lucideMoon })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// Demo only: the header links, including those of the menu sheet rendered in an overlay, do not
	// navigate away from the documentation page.
	host: { class: 'w-full', '(document:click)': '_stayOnPage($event)' },
	template: `
		<caps-header>
			<caps-header-menu title="Capsule navigation">
				<nav aria-label="Primary">
					<a capsButton variant="ghost" class="w-full justify-start" href="/documentation/introduction">Docs</a>
					<a capsButton variant="ghost" class="w-full justify-start" href="/components">Components</a>
					<a capsButton variant="ghost" class="w-full justify-start" href="/blocks">Blocks</a>
				</nav>
			</caps-header-menu>
			<caps-header-visual>
				<span class="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
					<ng-icon name="lucideCommand" aria-hidden="true" />
				</span>
			</caps-header-visual>
			<caps-header-title>Capsule</caps-header-title>
			<caps-header-nav>
				<caps-navigation-menu aria-label="Primary">
					<li capsNavigationMenuItem>
						<a capsNavigationMenuLink href="/documentation/introduction" active>Docs</a>
					</li>
					<li capsNavigationMenuItem><a capsNavigationMenuLink href="/components" [active]="false">Components</a></li>
					<li capsNavigationMenuItem><a capsNavigationMenuLink href="/blocks" [active]="false">Blocks</a></li>
				</caps-navigation-menu>
			</caps-header-nav>
			<caps-header-actions>
				<button capsButton variant="ghost" size="icon" type="button" aria-label="Toggle theme">
					<ng-icon name="lucideMoon" aria-hidden="true" />
				</button>
				<caps-avatar>
					<caps-avatar-fallback>JD</caps-avatar-fallback>
				</caps-avatar>
			</caps-header-actions>
		</caps-header>
	`,
})
export class HeaderPreview {
	protected _stayOnPage(event: MouseEvent): void {
		const link = (event.target as Element | null)?.closest('a[href]');
		if (link?.closest('spartan-header-preview, [data-slot="header-menu-content"]')) event.preventDefault();
	}
}

export const defaultImports = `
import { CapsHeaderImports } from '@capsule-ng/caps/header';
`;

export const defaultSkeleton = `
<caps-header>
  <caps-header-menu>
    <nav aria-label="Primary">…</nav>
  </caps-header-menu>
  <caps-header-visual>…</caps-header-visual>
  <caps-header-title>App name</caps-header-title>
  <caps-header-nav>
    <caps-navigation-menu aria-label="Primary">…</caps-navigation-menu>
  </caps-header-nav>
  <caps-header-actions>…</caps-header-actions>
  <caps-header-logo><img src="…" alt="…" /></caps-header-logo>
</caps-header>
`;
