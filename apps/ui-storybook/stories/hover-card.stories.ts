import { Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsCard } from '@capsule-ng/caps/card';
import { CapsHoverCardImports } from '@capsule-ng/caps/hover-card';
import { CapsLink } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendarDays } from '@ng-icons/lucide';
import { type BrnHoverCard } from '@spartan-ng/brain/hover-card';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

@Component({
	selector: 'hover-card-example',
	imports: [CapsHoverCardImports, CapsLink, NgIcon, CapsAvatarImports],
	providers: [provideIcons({ lucideCalendarDays })],
	host: {
		class: 'flex w-full h-full justify-center py-80',
	},
	template: `
		<caps-hover-card>
			<a capsLink capsHoverCardTrigger href="https://analogjs.org">&#64;analogjs</a>
			<ng-template capsHoverCardContent [class]="'w-80'">
				<div class="flex justify-between space-x-4">
					<caps-avatar id="avatar-small">
						<img src="https://analogjs.org/img/logos/analog-logo.svg" alt="AnalogLogo" capsAvatarImage />
						<caps-avatar-fallback class="bg-sky-700 text-sky-50">AN</caps-avatar-fallback>
					</caps-avatar>
					<div class="space-y-1">
						<h4 class="text-sm font-semibold">&#64;analogjs</h4>
						<p class="text-sm">The Angular meta-framework – build Angular applications faster.</p>
						<div class="flex items-center pt-2">
							<ng-icon name="lucideCalendarDays" class="mr-2 opacity-(--caps-opacity-70)" />
							<span class="text-muted-foreground text-xs">Joined December 2021</span>
						</div>
					</div>
				</div>
			</ng-template>
		</caps-hover-card>
	`,
})
class HoverCardExample {}

const meta: Meta<BrnHoverCard> = {
	title: 'Hover Card',
	component: CapsCard,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [HoverCardExample],
		}),
	],
};

export default meta;
type Story = StoryObj<BrnHoverCard>;

export const Default: Story = {
	render: () => ({
		template: '<hover-card-example/>',
	}),
};
