import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHome, lucideSearch, lucideSettings } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-tabs-icons-only',
	imports: [CapsTabsImports, NgIcon],
	providers: [provideIcons({ lucideHome, lucideSearch, lucideSettings })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs value="home">
			<caps-tabs-list aria-label="Sections">
				<button capsTabsTrigger value="home" aria-label="Home">
					<ng-icon name="lucideHome" />
				</button>
				<button capsTabsTrigger value="search" aria-label="Search">
					<ng-icon name="lucideSearch" />
				</button>
				<button capsTabsTrigger value="settings" aria-label="Settings">
					<ng-icon name="lucideSettings" />
				</button>
			</caps-tabs-list>
			<caps-tabs-content value="home">Home overview</caps-tabs-content>
			<caps-tabs-content value="search">Search your content</caps-tabs-content>
			<caps-tabs-content value="settings">Account settings</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsIconsOnlyPreview {}
