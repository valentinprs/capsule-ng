import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';

@Component({
	selector: 'spartan-tabs-input-button',
	imports: [CapsTabsImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-tabs value="overview">
			<div class="flex items-center gap-4">
				<caps-tabs-list aria-label="Sections">
					<button capsTabsTrigger value="overview">Overview</button>
					<button capsTabsTrigger value="analytics">Settings</button>
				</caps-tabs-list>

				<div class="ml-auto flex items-center gap-2">
					<input capsInput aria-label="Search dashboard" placeholder="Search..." />
					<button capsButton>Action</button>
				</div>
			</div>

			<caps-tabs-content value="overview" class="rounded-lg border p-6">
				View your dashboard metrics and key performance indicators.
			</caps-tabs-content>
			<caps-tabs-content value="analytics" class="rounded-lg border p-6">
				Detailed analytics and insights about your data.
			</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsInputButtonPreview {}
