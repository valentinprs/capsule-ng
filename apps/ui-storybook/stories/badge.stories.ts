import { CapsBadgeDirective, CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideBookmark, lucideSparkles, lucideTrash2 } from '@ng-icons/lucide';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
const meta: Meta<CapsBadgeDirective> = {
	title: 'Badge',
	component: CapsBadgeDirective,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			options: ['blue', 'cool-gray', 'red', 'magenta', 'purple', 'cyan', 'orange', 'yellow', 'green'],
			control: 'select',
		},
		highContrast: { control: 'boolean' },
		skeleton: { control: 'boolean' },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsBadgeImports, CapsSpinnerImports, NgIcon],
			providers: [provideIcons({ lucideBadgeCheck, lucideBookmark, lucideSparkles, lucideTrash2 })],
		}),
	],
	render: (args) => ({ props: args, template: `<caps-badge ${argsToTemplate(args)}>I am a badge</caps-badge>` }),
};
export default meta;
type Story = StoryObj<CapsBadgeDirective>;
type DefaultArgs = CapsBadgeDirective & { label: string; withIcon: boolean };
export const Default: StoryObj<DefaultArgs> = {
	args: { label: 'Badge', withIcon: false, variant: 'blue', highContrast: false, skeleton: false },
	argTypes: {
		label: { control: 'text' },
		withIcon: { control: 'boolean' },
	},
	render: ({ label, withIcon, ...args }) => ({
		props: { ...args, label, withIcon },
		template: `<caps-badge ${argsToTemplate(args)}>
			@if (withIcon) {
				<ng-icon name="lucideSparkles" />
			}
			{{ label }}
		</caps-badge>`,
	}),
};
export const Colors: Story = {
	render: () => ({
		template: `<div class="flex flex-wrap gap-2">
			<caps-badge>Blue</caps-badge>
			<caps-badge variant="cool-gray">Cool gray</caps-badge>
			<caps-badge variant="red">Red</caps-badge>
			<caps-badge variant="magenta">Magenta</caps-badge>
			<caps-badge variant="purple">Purple</caps-badge>
			<caps-badge variant="cyan">Cyan</caps-badge>
			<caps-badge variant="orange">Orange</caps-badge>
			<caps-badge variant="yellow">Yellow</caps-badge>
			<caps-badge variant="green">Green</caps-badge>
		</div>`,
	}),
};
export const HighContrast: Story = {
	render: () => ({
		template: `<div class="flex flex-wrap gap-2">
			<caps-badge highContrast>Blue</caps-badge>
			<caps-badge variant="cool-gray" highContrast>Cool gray</caps-badge>
			<caps-badge variant="red" highContrast>Red</caps-badge>
			<caps-badge variant="magenta" highContrast>Magenta</caps-badge>
			<caps-badge variant="purple" highContrast>Purple</caps-badge>
			<caps-badge variant="cyan" highContrast>Cyan</caps-badge>
			<caps-badge variant="orange" highContrast>Orange</caps-badge>
			<caps-badge variant="yellow" highContrast>Yellow</caps-badge>
			<caps-badge variant="green" highContrast>Green</caps-badge>
		</div>`,
	}),
};
export const WithIcons: Story = {
	render: () => ({
		template: `<div class="flex flex-col gap-2">
			<div class="flex flex-wrap gap-2">
				<caps-badge>
					<ng-icon name="lucideBadgeCheck" />
					Verified
				</caps-badge>
				<caps-badge variant="red">
					<ng-icon name="lucideTrash2" />
					Deleted
				</caps-badge>
				<caps-badge variant="purple">
					Bookmark
					<ng-icon name="lucideBookmark" />
				</caps-badge>
				<caps-badge variant="cool-gray">
					<ng-icon name="lucideSparkles" />
					AI
				</caps-badge>
			</div>
			<div class="flex flex-wrap gap-2">
				<caps-badge highContrast>
					<ng-icon name="lucideBadgeCheck" />
					Verified
				</caps-badge>
				<caps-badge variant="red" highContrast>
					<ng-icon name="lucideTrash2" />
					Deleted
				</caps-badge>
				<caps-badge variant="purple" highContrast>
					Bookmark
					<ng-icon name="lucideBookmark" />
				</caps-badge>
				<caps-badge variant="cool-gray" highContrast>
					<ng-icon name="lucideSparkles" />
					AI
				</caps-badge>
			</div>
		</div>`,
	}),
};
export const WithSpinner: Story = {
	render: () => ({
		template: `<div class="flex flex-wrap gap-2">
			<caps-badge>
				<caps-spinner aria-hidden="true" class="text-xs" />
				Syncing
			</caps-badge>
			<caps-badge variant="red">
				<caps-spinner aria-hidden="true" class="text-xs" />
				Deleting
			</caps-badge>
			<caps-badge variant="green" highContrast>
				<caps-spinner aria-hidden="true" class="text-xs" />
				Publishing
			</caps-badge>
			<caps-badge variant="cool-gray">
				Uploading
				<caps-spinner aria-hidden="true" class="text-xs" />
			</caps-badge>
		</div>`,
	}),
};
export const Skeleton: Story = { args: { skeleton: true } };
