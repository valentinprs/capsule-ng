import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { CapsTabs, CapsTabsImports } from '@capsule-ng/caps/tabs';
import { BrnTabsImports } from '@spartan-ng/brain/tabs';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<{ followFocus: boolean; disabled: boolean }> = {
	title: 'Tabs',
	component: CapsTabs,
	tags: ['autodocs'],
	args: { followFocus: true },
	argTypes: {
		followFocus: { control: { type: 'boolean' } },
	},
	decorators: [
		moduleMetadata({
			imports: [BrnTabsImports, CapsTabsImports, CapsCardImports, CapsLabel, CapsInput, CapsButton, CapsSwitch],
		}),
	],
};

export default meta;
type Story = StoryObj<{ followFocus: boolean; disabled: boolean }>;
export const Default: Story = {
	render: ({ disabled, ...args }) => ({
		props: { disabled, ...args },
		template: /* HTML */ `
			<caps-tabs value="account" ${argsToTemplate(args)} class="mx-auto block max-w-3xl">
				<caps-tabs-list class="grid w-full grid-cols-2" aria-label="tabs example">
					<button capsTabsTrigger value="account">Account</button>
					<button capsTabsTrigger value="password">Password</button>
				</caps-tabs-list>
				<caps-tabs-content value="account">
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Account</caps-card-title>
							<caps-card-description>
								Make changes to your account here. Click save when you're done.
							</caps-card-description>
						</caps-card-header>
						<caps-card-content>
							<label class="my-4 block" capsLabel>
								Name
								<input class="mt-1.5 w-full" value="Pedro Duarte" capsInput />
							</label>
							<label class="my-4 block" capsLabel>
								Username
								<input class="mt-1.5 w-full" placeholder="@peduarte" capsInput />
							</label>
						</caps-card-content>
						<caps-card-footer class="gap-2">
							<button capsButton>Save Changes</button>
						</caps-card-footer>
					</caps-card>
				</caps-tabs-content>
				<caps-tabs-content value="password">
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Password</caps-card-title>
							<caps-card-description>
								Change your password here. After saving, you'll be logged out.
							</caps-card-description>
						</caps-card-header>
						<caps-card-content>
							<label class="my-4 block" capsLabel>
								Old Password
								<input class="mt-1.5 w-full" type="password" capsInput />
							</label>
							<label class="my-4 block" capsLabel>
								New Password
								<input class="mt-1.5 w-full" type="password" capsInput />
							</label>
						</caps-card-content>
						<caps-card-footer class="gap-2">
							<button capsButton>Save Password</button>
						</caps-card-footer>
					</caps-card>
				</caps-tabs-content>
			</caps-tabs>
		`,
	}),
};

export const Vertical: Story = {
	render: ({ followFocus }) => ({
		props: { followFocus },
		template: /* HTML */ `
			<caps-tabs
				value="account"
				class="mx-auto flex max-w-3xl flex-row space-x-2"
				orientation="vertical"
				[followFocus]="followFocus"
			>
				<caps-tabs-list aria-label="tabs example">
					<button class="w-full" capsTabsTrigger value="account">Account</button>
					<button class="w-full" capsTabsTrigger value="password">Password</button>
					<button class="w-full" capsTabsTrigger value="danger">Danger Zone</button>
				</caps-tabs-list>
				<caps-tabs-content value="account">
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Account</caps-card-title>
							<caps-card-description>
								Make changes to your account here. Click save when you're done.
							</caps-card-description>
						</caps-card-header>
						<caps-card-content>
							<label class="my-4 block" capsLabel>
								Name
								<input class="mt-1.5 w-full" value="Pedro Duarte" capsInput />
							</label>
							<label class="my-4 block" capsLabel>
								Username
								<input class="mt-1.5 w-full" placeholder="@peduarte" capsInput />
							</label>
						</caps-card-content>
						<caps-card-footer class="gap-2">
							<button capsButton>Save Changes</button>
						</caps-card-footer>
					</caps-card>
				</caps-tabs-content>
				<caps-tabs-content value="password">
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Password</caps-card-title>
							<caps-card-description>
								Change your password here. After saving, you'll be logged out.
							</caps-card-description>
						</caps-card-header>
						<caps-card-content>
							<label class="my-4 block" capsLabel>
								Old Password
								<input class="mt-1.5 w-full" type="password" capsInput />
							</label>
							<label class="my-4 block" capsLabel>
								New Password
								<input class="mt-1.5 w-full" type="password" capsInput />
							</label>
						</caps-card-content>
						<caps-card-footer class="gap-2">
							<button capsButton>Save Password</button>
						</caps-card-footer>
					</caps-card>
				</caps-tabs-content>
				<caps-tabs-content value="danger">
					<caps-card>
						<caps-card-header>
							<caps-card-title [level]="3">Delete Account</caps-card-title>
							<caps-card-description>
								Are you sure you want to delete your account? You cannot undo this action.
							</caps-card-description>
						</caps-card-header>
						<caps-card-footer class="gap-2">
							<button variant="destructive" capsButton>Delete Account</button>
						</caps-card-footer>
					</caps-card>
				</caps-tabs-content>
			</caps-tabs>
		`,
	}),
};

export const Paginated: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-tabs value="1" class="mx-auto block max-w-3xl">
				<caps-tabs-paginated-list>
					<button capsTabsTrigger value="1">Tab 1</button>
					<button capsTabsTrigger value="2">Tab 2</button>
					<button capsTabsTrigger value="3">Tab 3</button>
					<button capsTabsTrigger value="4">Tab 4</button>
					<button capsTabsTrigger value="5">Tab 5</button>
					<button capsTabsTrigger value="6">Tab 6</button>
					<button capsTabsTrigger value="7">Tab 7</button>
					<button capsTabsTrigger value="8">Tab 8</button>
					<button capsTabsTrigger value="9">Tab 9</button>
					<button capsTabsTrigger value="10">Tab 10</button>
					<button capsTabsTrigger value="11">Tab 11</button>
					<button capsTabsTrigger value="12">Tab 12</button>
					<button capsTabsTrigger value="13">Tab 13</button>
					<button capsTabsTrigger value="14">Tab 14</button>
					<button capsTabsTrigger value="15">Tab 15</button>
					<button capsTabsTrigger value="16">Tab 16</button>
					<button capsTabsTrigger value="17">Tab 17</button>
					<button capsTabsTrigger value="18">Tab 18</button>
					<button capsTabsTrigger value="19">Tab 19</button>
					<button capsTabsTrigger value="20">Tab 20</button>
				</caps-tabs-paginated-list>
				<caps-tabs-content value="1">Tab 1</caps-tabs-content>
				<caps-tabs-content value="2">Tab 2</caps-tabs-content>
				<caps-tabs-content value="3">Tab 3</caps-tabs-content>
				<caps-tabs-content value="4">Tab 4</caps-tabs-content>
				<caps-tabs-content value="5">Tab 5</caps-tabs-content>
				<caps-tabs-content value="6">Tab 6</caps-tabs-content>
				<caps-tabs-content value="7">Tab 7</caps-tabs-content>
				<caps-tabs-content value="8">Tab 8</caps-tabs-content>
				<caps-tabs-content value="9">Tab 9</caps-tabs-content>
				<caps-tabs-content value="10">Tab 10</caps-tabs-content>
				<caps-tabs-content value="11">Tab 11</caps-tabs-content>
				<caps-tabs-content value="12">Tab 12</caps-tabs-content>
				<caps-tabs-content value="13">Tab 13</caps-tabs-content>
				<caps-tabs-content value="14">Tab 14</caps-tabs-content>
				<caps-tabs-content value="15">Tab 15</caps-tabs-content>
				<caps-tabs-content value="16">Tab 16</caps-tabs-content>
				<caps-tabs-content value="17">Tab 17</caps-tabs-content>
				<caps-tabs-content value="18">Tab 18</caps-tabs-content>
				<caps-tabs-content value="19">Tab 19</caps-tabs-content>
				<caps-tabs-content value="20">Tab 20</caps-tabs-content>
			</caps-tabs>
		`,
	}),
};

export const LazyLoading: Story = {
	render: () => ({
		props: {
			accountLoadedAt: null as string | null,
			passwordLoadedAt: null as string | null,
		},
		template: /* HTML */ `
			<caps-tabs value="account" class="mx-auto block max-w-3xl">
				<caps-tabs-list class="grid w-full grid-cols-2" aria-label="lazy loading tabs example">
					<button capsTabsTrigger value="account">Account</button>
					<button capsTabsTrigger value="password">Password</button>
				</caps-tabs-list>
				<caps-tabs-content value="account">
					<ng-template capsTabsContentLazy>
						<caps-card>
							<caps-card-header>
								<caps-card-title [level]="3">Account (Lazy)</caps-card-title>
								<caps-card-description>
									This content was lazily loaded when the tab was first activated.
								</caps-card-description>
							</caps-card-header>
							<caps-card-content>
								<label class="my-4 block" capsLabel>
									Name
									<input class="mt-1.5 w-full" value="Pedro Duarte" capsInput />
								</label>
								<label class="my-4 block" capsLabel>
									Username
									<input class="mt-1.5 w-full" placeholder="@peduarte" capsInput />
								</label>
							</caps-card-content>
							<caps-card-footer class="gap-2">
								<button capsButton>Save Changes</button>
							</caps-card-footer>
						</caps-card>
					</ng-template>
				</caps-tabs-content>
				<caps-tabs-content value="password">
					<ng-template capsTabsContentLazy>
						<caps-card>
							<caps-card-header>
								<caps-card-title [level]="3">Password (Lazy)</caps-card-title>
								<caps-card-description>
									This content was lazily loaded when the tab was first activated. Switch tabs and inspect the DOM to
									verify.
								</caps-card-description>
							</caps-card-header>
							<caps-card-content>
								<label class="my-4 block" capsLabel>
									Old Password
									<input class="mt-1.5 w-full" type="password" capsInput />
								</label>
								<label class="my-4 block" capsLabel>
									New Password
									<input class="mt-1.5 w-full" type="password" capsInput />
								</label>
							</caps-card-content>
							<caps-card-footer class="gap-2">
								<button capsButton>Save Password</button>
							</caps-card-footer>
						</caps-card>
					</ng-template>
				</caps-tabs-content>
			</caps-tabs>
		`,
	}),
};

export const BrnOnly: Story = {
	render: () => ({
		props: { activationMode: 'automatic' },
		template: /* HTML */ `
			<div brnTabs="account" [activationMode]="activationMode" class="mx-auto block max-w-3xl">
				<div brnTabsList class="grid w-full grid-cols-2" [attr.aria-label]="'tabs example'">
					<button brnTabsTrigger="account">Account</button>
					<button brnTabsTrigger="password">Password</button>
				</div>
				<div brnTabsContent="account">Account content</div>
				<div brnTabsContent="password">Password content</div>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},

	render: ({ disabled }) => ({
		props: {
			isDisabled: disabled,
		},
		template: /* HTML */ `
			<caps-tabs value="account" class="mx-auto block max-w-3xl">
				<caps-tabs-list class="grid w-full grid-cols-2" aria-label="tabs example">
					<button [disabled]="isDisabled" capsTabsTrigger value="account">Account</button>
					<button [disabled]="isDisabled" capsTabsTrigger value="password">Password</button>
				</caps-tabs-list>
				<caps-tabs-content value="account">Account content</caps-tabs-content>
				<caps-tabs-content value="password">Password content</caps-tabs-content>
			</caps-tabs>

			<div class="mt-6 flex justify-center">
				<caps-switch [checked]="!isDisabled" (checkedChange)="isDisabled = !$event">Enable tabs</caps-switch>
			</div>
		`,
	}),
};

/** Figma Tabs `Size`: Small, Default and Large, for the Segmented and Line types. */
export const Sizes: Story = {
	render: () => ({
		template: /* HTML */ `
			<div class="flex flex-col items-start gap-4">
				@for (type of ['contained', 'line']; track type) { @for (size of ['sm', 'default', 'lg']; track size) {
				<caps-tabs value="overview">
					<caps-tabs-list [type]="type" [size]="size" [attr.aria-label]="type + ' ' + size + ' tabs'">
						<button capsTabsTrigger value="overview">Overview</button>
						<button capsTabsTrigger value="activity">Activity</button>
						<button capsTabsTrigger value="settings">Settings</button>
					</caps-tabs-list>
				</caps-tabs>
				} }
			</div>
		`,
	}),
};
