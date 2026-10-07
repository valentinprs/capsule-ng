import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';

@Component({
	selector: 'spartan-tabs-basic',
	imports: [CapsTabsImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs value="home">
			<caps-tabs-list aria-label="Sections">
				<button capsTabsTrigger value="home">Home</button>
				<button capsTabsTrigger value="settings">Settings</button>
			</caps-tabs-list>
			<caps-tabs-content value="home">Home overview</caps-tabs-content>
			<caps-tabs-content value="settings">Account settings</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsBasicPreview {}
