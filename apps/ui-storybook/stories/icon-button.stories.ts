import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucidePlus, lucideSettings, lucideTrash2 } from '@ng-icons/lucide';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsButton> = {
	title: 'Icon Button',
	component: CapsButton,
	tags: ['autodocs'],
	args: {
		variant: 'outline',
		size: 'icon',
	},
	argTypes: {
		variant: {
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['icon-xs', 'icon-sm', 'icon', 'icon-lg'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsButton, NgIcon],
			providers: [provideIcons({ lucideArrowUp, lucidePlus, lucideSettings, lucideTrash2 })],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `
			<button capsButton [variant]="variant" [size]="size" aria-label="Add item">
				<ng-icon name="lucidePlus" />
			</button>
		`,
	}),
};

export default meta;
type Story = StoryObj<CapsButton>;

export const Default: Story = {};

export const Sizes: Story = {
	render: ({ variant }) => ({
		props: { variant },
		template: `
			<div class="flex flex-wrap items-center gap-2">
				<button capsButton [variant]="variant" size="icon-xs" aria-label="Add item (extra small)">
					<ng-icon name="lucidePlus" />
				</button>
				<button capsButton [variant]="variant" size="icon-sm" aria-label="Add item (small)">
					<ng-icon name="lucidePlus" />
				</button>
				<button capsButton [variant]="variant" size="icon" aria-label="Add item">
					<ng-icon name="lucidePlus" />
				</button>
				<button capsButton [variant]="variant" size="icon-lg" aria-label="Add item (large)">
					<ng-icon name="lucidePlus" />
				</button>
			</div>
		`,
	}),
};

export const Variants: Story = {
	render: ({ size }) => ({
		props: { size },
		template: `
			<div class="flex flex-wrap items-center gap-2">
				<button capsButton variant="default" [size]="size" aria-label="Submit">
					<ng-icon name="lucideArrowUp" />
				</button>
				<button capsButton variant="secondary" [size]="size" aria-label="Settings">
					<ng-icon name="lucideSettings" />
				</button>
				<button capsButton variant="outline" [size]="size" aria-label="Add item">
					<ng-icon name="lucidePlus" />
				</button>
				<button capsButton variant="ghost" [size]="size" aria-label="Settings">
					<ng-icon name="lucideSettings" />
				</button>
				<button capsButton variant="destructive" [size]="size" aria-label="Delete">
					<ng-icon name="lucideTrash2" />
				</button>
			</div>
		`,
	}),
};

export const AllSizesAndVariants: Story = {
	render: () => ({
		props: {
			variants: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
			sizes: ['icon-xs', 'icon-sm', 'icon', 'icon-lg'],
		},
		template: `
			<div class="flex flex-col gap-3">
				@for (variant of variants; track variant) {
					<div class="flex items-center gap-2">
						@for (size of sizes; track size) {
							<button capsButton [variant]="variant" [size]="size" [attr.aria-label]="'Add item (' + variant + ', ' + size + ')'">
								<ng-icon name="lucidePlus" />
							</button>
						}
					</div>
				}
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: `
			<div class="flex flex-wrap items-center gap-2">
				<button capsButton size="icon" disabled aria-label="Submit">
					<ng-icon name="lucideArrowUp" />
				</button>
				<button capsButton variant="outline" size="icon" disabled aria-label="Add item">
					<ng-icon name="lucidePlus" />
				</button>
				<button capsButton variant="destructive" size="icon" disabled aria-label="Delete">
					<ng-icon name="lucideTrash2" />
				</button>
			</div>
		`,
	}),
};
