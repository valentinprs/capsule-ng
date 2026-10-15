import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsAlert, CapsAlertImports } from '@capsule-ng/caps/alert';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleAlert, lucideInfo } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'caps-urgent-alert-story',
	imports: [CapsAlertImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton type="button" variant="outline" (click)="_failed.set(true)">Simulate payment failure</button>
		@if (_failed()) {
			<caps-alert variant="destructive" role="alert" class="mt-3 max-w-md">
				<caps-alert-title>Payment failed</caps-alert-title>
				<caps-alert-description>Check your payment method and try again.</caps-alert-description>
				<caps-alert-actions>
					<button capsButton type="button" variant="outline" (click)="_failed.set(false)">Try again</button>
				</caps-alert-actions>
			</caps-alert>
		}
	`,
})
class UrgentAlertStory {
	protected readonly _failed = signal(false);
}

const meta: Meta<CapsAlert> = {
	title: 'Alert',
	component: CapsAlert,
	tags: ['autodocs'],
	argTypes: {
		variant: { options: ['default', 'destructive'], control: 'select' },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsAlertImports, CapsButton, NgIcon, UrgentAlertStory],
			providers: [provideIcons({ lucideInfo, lucideCircleAlert })],
		}),
	],
	render: (args) => ({
		props: args,
		template: `
  <caps-alert class="max-w-xl" ${argsToTemplate(args)}>
   <caps-alert-media><ng-icon name="lucideInfo" aria-hidden="true" /></caps-alert-media>
   <caps-alert-title>Welcome to Capsule</caps-alert-title>
   <caps-alert-description>Import components from the Capsule package and use the shared foundations to style your application.</caps-alert-description>
  </caps-alert>
 `,
	}),
};
export default meta;
type Story = StoryObj<CapsAlert>;
export const Default: Story = { args: { variant: 'default' } };
export const Destructive: Story = {
	args: { variant: 'destructive' },
	render: (args) => ({
		props: args,
		template: `
  <caps-alert class="max-w-xl" ${argsToTemplate(args)}>
   <caps-alert-media><ng-icon name="lucideCircleAlert" aria-hidden="true" /></caps-alert-media>
   <caps-alert-title>Payment could not be processed</caps-alert-title>
   <caps-alert-description>This callout preserves the default Spartan alert role and projects a native link action.</caps-alert-description>
   <caps-alert-actions><a capsButton href="/components" variant="outline">View components</a></caps-alert-actions>
  </caps-alert>
 `,
	}),
};
export const Urgent: Story = { render: () => ({ template: '<caps-urgent-alert-story />' }) };
