import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
	selector: 'spartan-tabs-lazy',
	imports: [HlmTabsImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block w-full max-w-lg',
	},
	template: `
		<hlm-tabs tab="account" class="w-full">
			<hlm-tabs-list>
				<button hlmTabsTrigger="account">Account</button>
				<button hlmTabsTrigger="password">Password</button>
			</hlm-tabs-list>
			<div hlmTabsContent="account">
				<ng-template hlmTabsContentLazy>
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
			</div>
			<div hlmTabsContent="password">
				<ng-template hlmTabsContentLazy>
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
			</div>
		</hlm-tabs>
	`,
})
export class TabsLazyPreview {}
