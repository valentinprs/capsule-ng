import { Component } from '@angular/core';
import { CapsHoverCardImports } from '@capsule-ng/caps/hover-card';
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';

@Component({
	selector: 'spartan-hover-card-preview',
	imports: [CapsHoverCardImports, CapsLinkImports, HlmAvatarImports, NgIcon],
	providers: [provideIcons({ lucideCalendar })],
	template: `
		<caps-hover-card>
			<a capsLink capsHoverCardTrigger href="https://analogjs.org">&#64;analogjs</a>
			<ng-template capsHoverCardContent [class]="'w-80'">
				<div class="flex justify-between space-x-4">
					<hlm-avatar size="sm" id="avatar-small">
						<img src="https://analogjs.org/img/logos/analog-logo.svg" alt="AnalogLogo" hlmAvatarImage />
						<span class="bg-muted text-foreground" hlmAvatarFallback>AN</span>
					</hlm-avatar>
					<div class="space-y-1">
						<h4 class="text-sm font-semibold">&#64;analogjs</h4>
						<p class="text-sm">The Angular meta-framework – build Angular applications faster.</p>
						<div class="flex items-center pt-2">
							<ng-icon name="lucideCalendar" class="mr-2 opacity-(--caps-opacity-70)" />
							<span class="text-muted-foreground text-xs">Joined December 2021</span>
						</div>
					</div>
				</div>
			</ng-template>
		</caps-hover-card>
	`,
})
export class HoverCardPreview {}

export const defaultImports = `
import { CapsLinkImports } from '@capsule-ng/caps/link';
import { CapsHoverCardImports } from '@capsule-ng/caps/hover-card';
`;

export const defaultSkeleton = `
<caps-hover-card>
  <a capsLink capsHoverCardTrigger href="https://analogjs.org">&#64;analogjs</a>
  <ng-template capsHoverCardContent>The Angular meta-framework.</ng-template>
</caps-hover-card>
`;
