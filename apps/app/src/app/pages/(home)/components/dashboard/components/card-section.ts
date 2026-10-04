import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerTrendingDown, tablerTrendingUp } from '@ng-icons/tabler-icons';
import { HlmBadge } from '@spartan-ng/helm/badge';

@Component({
	selector: 'spartan-dashboard-card-section',
	imports: [CapsCardImports, HlmBadge, NgIcon],
	providers: [
		provideIcons({
			tablerTrendingUp,
			tablerTrendingDown,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
		>
			<caps-card class="@container/card">
				<caps-card-header>
					<caps-card-description>Total Revenue</caps-card-description>
					<caps-card-title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" [level]="3">
						$1,250.00
					</caps-card-title>

					<caps-card-action>
						<span hlmBadge variant="outline">
							<ng-icon name="tablerTrendingUp" />
							+12.5%
						</span>
					</caps-card-action>
				</caps-card-header>
				<caps-card-footer class="flex-col items-start gap-1.5 text-sm">
					<div class="line-clamp-1 flex gap-2 font-medium">
						Trending up this month
						<ng-icon name="tablerTrendingUp" />
					</div>
					<div class="text-muted-foreground">Visitors for the last 6 months</div>
				</caps-card-footer>
			</caps-card>
			<caps-card class="@container/card">
				<caps-card-header>
					<caps-card-description>New Customers</caps-card-description>
					<caps-card-title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" [level]="3">
						1,432
					</caps-card-title>

					<caps-card-action>
						<span hlmBadge variant="outline">
							<ng-icon name="tablerTrendingDown" />
							-20.4%
						</span>
					</caps-card-action>
				</caps-card-header>
				<caps-card-footer class="flex-col items-start gap-1.5 text-sm">
					<div class="line-clamp-1 flex gap-2 font-medium">
						Down 20.4% this month
						<ng-icon name="tablerTrendingDown" />
					</div>
					<div class="text-muted-foreground">Acquisition needs attention</div>
				</caps-card-footer>
			</caps-card>
			<caps-card class="@container/card">
				<caps-card-header>
					<caps-card-description>Active Accounts</caps-card-description>
					<caps-card-title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" [level]="3">
						55,124
					</caps-card-title>

					<caps-card-action>
						<span hlmBadge variant="outline">
							<ng-icon name="tablerTrendingUp" />
							+12.5%
						</span>
					</caps-card-action>
				</caps-card-header>
				<caps-card-footer class="flex-col items-start gap-1.5 text-sm">
					<div class="line-clamp-1 flex gap-2 font-medium">
						Strong user retention
						<ng-icon name="tablerTrendingUp" />
					</div>
					<div class="text-muted-foreground">Engagement exceed targets</div>
				</caps-card-footer>
			</caps-card>
			<caps-card class="@container/card">
				<caps-card-header>
					<caps-card-description>Growth Rate</caps-card-description>
					<caps-card-title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl" [level]="3">
						+4.5%
					</caps-card-title>

					<caps-card-action>
						<span hlmBadge variant="outline">
							<ng-icon name="tablerTrendingUp" />
							4.5%
						</span>
					</caps-card-action>
				</caps-card-header>
				<caps-card-footer class="flex-col items-start gap-1.5 text-sm">
					<div class="line-clamp-1 flex gap-2 font-medium">
						Steady performance increase

						<ng-icon name="tablerTrendingUp" />
					</div>
					<div class="text-muted-foreground">Meets growth projections</div>
				</caps-card-footer>
			</caps-card>
		</div>
	`,
})
export class DashboardCardSection {}
