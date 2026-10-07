import { Component, input } from '@angular/core';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';

@Component({
	selector: 'spartan-tabs-paginated',
	imports: [CapsTabsImports],
	host: {
		class: 'block w-full max-w-lg min-h-[150px]',
	},
	template: `
		<caps-tabs [value]="activeTab()" class="w-full">
			<caps-tabs-paginated-list>
				@for (tab of lotsOfTabs; track tab) {
					<button capsTabsTrigger [value]="tab">{{ tab }}</button>
				}
			</caps-tabs-paginated-list>
			@for (tab of lotsOfTabs; track tab) {
				<caps-tabs-content [value]="tab">{{ tab }}</caps-tabs-content>
			}
		</caps-tabs>
	`,
})
export class TabsPaginatedPreview {
	public readonly activeTab = input('Tab 0');

	public readonly lotsOfTabs = Array.from({ length: 30 })
		.fill(0)
		.map((_, index) => `Tab ${index}`);
}
