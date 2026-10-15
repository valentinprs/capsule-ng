import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';

@Component({
	selector: 'spartan-tabs-lazy',
	imports: [CapsTabsImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full max-w-lg',
	},
	template: `
		<caps-tabs value="account" class="w-full">
			<caps-tabs-list aria-label="Sections">
				<button capsTabsTrigger value="account">Account</button>
				<button capsTabsTrigger value="password">Password</button>
			</caps-tabs-list>
			<caps-tabs-content value="account">
				<ng-template capsTabsContentLazy>
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Account</caps-card-title>
							<caps-card-description>
								This content was lazily loaded when the tab was first activated.
							</caps-card-description>
						</caps-card-header>
						<caps-card-content>Account content loaded lazily.</caps-card-content>
					</caps-card>
				</ng-template>
			</caps-tabs-content>
			<caps-tabs-content value="password">
				<ng-template capsTabsContentLazy>
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Password</caps-card-title>
							<caps-card-description>
								This content was lazily loaded when the tab was first activated.
							</caps-card-description>
						</caps-card-header>
						<caps-card-content>Password content loaded lazily.</caps-card-content>
					</caps-card>
				</ng-template>
			</caps-tabs-content>
		</caps-tabs>
	`,
})
export class TabsLazyPreview {}
