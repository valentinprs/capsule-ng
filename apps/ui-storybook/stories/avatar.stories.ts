import { CapsAvatar, CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucidePlus } from '@ng-icons/lucide';
import { type Meta, type StoryObj, applicationConfig, argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsAvatar> = {
	title: 'Avatar',
	component: CapsAvatar,
	tags: ['autodocs'],
	decorators: [
		applicationConfig({
			providers: [provideIcons({ lucideCheck, lucidePlus })],
		}),
		moduleMetadata({
			imports: [CapsAvatarImports, NgIcon],
		}),
	],
	render: ({ ...args }) => ({
		props: { args },
		template: `
    <caps-avatar ${argsToTemplate(args)}>
      <img src='/mountains.jpg' alt='Snow-covered mountains'  capsAvatarImage>
      <caps-avatar-fallback class='bg-sky-700 text-sky-50'>MT</caps-avatar-fallback>
    </caps-avatar>
`,
	}),
};

export default meta;
type Story = StoryObj<CapsAvatar>;

export const Default: Story = {};

/** Figma Avatar `Size`: Small (`sm`), Default and Large (`lg`). */
export const Sizes: Story = {
	render: () => ({
		template: `
			<div class="flex items-center gap-4">
				@for (size of ['sm', 'default', 'lg']; track size) {
					<caps-avatar [size]="size">
						<img src="/mountains.jpg" alt="Snow-covered mountains" capsAvatarImage />
						<caps-avatar-fallback class="bg-sky-700 text-sky-50">MT</caps-avatar-fallback>
					</caps-avatar>
				}
			</div>
		`,
	}),
};

/** Figma Avatar Placeholder: no image, the fallback initials are shown. */
export const Fallback: Story = {
	render: () => ({
		template: `
			<div class="flex items-center gap-4">
				@for (size of ['sm', 'default', 'lg']; track size) {
					<caps-avatar [size]="size">
						<caps-avatar-fallback>CN</caps-avatar-fallback>
					</caps-avatar>
				}
			</div>
		`,
	}),
};

/** Figma Avatar With Status Badge and Avatar With Icon: a `caps-avatar-badge`, in each size. */
export const Badges: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-4">
					@for (size of ['sm', 'default', 'lg']; track size) {
						<caps-avatar [size]="size">
							<img src="/mountains.jpg" alt="Snow-covered mountains" capsAvatarImage />
							<caps-avatar-fallback>MT</caps-avatar-fallback>
							<caps-avatar-badge class="bg-(--caps-background-accent-green-strong)" />
						</caps-avatar>
					}
				</div>
				<div class="flex items-center gap-4">
					@for (size of ['sm', 'default', 'lg']; track size) {
						<caps-avatar [size]="size">
							<caps-avatar-fallback>CN</caps-avatar-fallback>
							<caps-avatar-badge>
								<ng-icon name="lucideCheck" />
							</caps-avatar-badge>
						</caps-avatar>
					}
				</div>
			</div>
		`,
	}),
};

/** Figma Avatar Stack: a `caps-avatar-group`, with a `caps-avatar-group-count` overflow. */
export const Group: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-4">
				@for (size of ['sm', 'default', 'lg']; track size) {
					<caps-avatar-group>
						<caps-avatar [size]="size">
							<img src="/mountains.jpg" alt="Snow-covered mountains" capsAvatarImage />
							<caps-avatar-fallback>MT</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar [size]="size">
							<caps-avatar-fallback>CN</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar [size]="size">
							<caps-avatar-fallback>ER</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar-group-count>+3</caps-avatar-group-count>
					</caps-avatar-group>
				}
				<caps-avatar-group>
					<caps-avatar>
						<caps-avatar-fallback>MT</caps-avatar-fallback>
					</caps-avatar>
					<caps-avatar>
						<caps-avatar-fallback>CN</caps-avatar-fallback>
					</caps-avatar>
					<caps-avatar-group-count>
						<ng-icon name="lucidePlus" />
					</caps-avatar-group-count>
				</caps-avatar-group>
			</div>
		`,
	}),
};
