import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAppWindow, lucideCode } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-tabs-with-icons',
	imports: [CapsTabsImports, NgIcon],
	providers: [provideIcons({ lucideAppWindow, lucideCode })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs value="preview">
			<caps-tabs-list aria-label="Sections">
				<button capsTabsTrigger value="preview">
					<ng-icon name="lucideAppWindow" />
					Preview
				</button>
				<button capsTabsTrigger value="code">
					<ng-icon name="lucideCode" />
					Code
				</button>
			</caps-tabs-list>
			<caps-tabs-content value="preview">Preview content</caps-tabs-content>
			<caps-tabs-content value="code">Code content</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsWithIconsPreview {}
