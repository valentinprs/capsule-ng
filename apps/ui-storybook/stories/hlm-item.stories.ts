import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsItem, CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideBadgeCheck,
	lucideChevronDown,
	lucideChevronRight,
	lucideExternalLink,
	lucidePlus,
	lucideShieldAlert,
} from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export default {
	title: 'Item',
	component: CapsItem,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsItemImports, CapsButtonImports, NgIcon, CapsAvatarImports, CapsDropdownMenuImports],
			providers: [
				provideIcons({
					lucideBadgeCheck,
					lucideChevronRight,
					lucidePlus,
					lucideChevronDown,
					lucideShieldAlert,
					lucideExternalLink,
				}),
			],
		}),
	],
} as Meta<CapsItem>;

type Story = StoryObj<CapsItem>;

export const Default: Story = {
	render: () => ({
		template: `
		<div class="flex w-full max-w-md flex-col gap-6 p-4">
			<caps-item>
				<caps-item-content>
					<caps-item-title>Basic Item</caps-item-title>
					<caps-item-description>A simple item with title and description.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton variant="outline" size="sm">Action</button>
				</caps-item-actions>
			</caps-item>
			<a capsItem href="#verified">
				<caps-item-media>
					<ng-icon name="lucideBadgeCheck" class="text-[length:--spacing(5)]" />
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>Your profile has been verified.</caps-item-title>
				</caps-item-content>
				<caps-item-actions>
					<ng-icon name="lucideChevronRight"  />
				</caps-item-actions>
			</a>
		</div>
		`,
	}),
};

export const Avatar: Story = {
	render: () => ({
		template: `
		<div class="flex w-full max-w-lg flex-col gap-6 p-4">
			<!-- Item 1: Evil Rabbit -->
			<caps-item>
				<caps-item-media>
					<caps-avatar class="size-10">
						<img capsAvatarImage src="https://github.com/evilrabbit.png" alt="Evil Rabbit" />
						<caps-avatar-fallback>ER</caps-avatar-fallback>
					</caps-avatar>
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>Evil Rabbit</caps-item-title>
					<caps-item-description>Last seen 5 months ago</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton size="icon-sm" variant="ghost" class="rounded-full" aria-label="Invite">
						<ng-icon name="lucidePlus" />
					</button>
				</caps-item-actions>
			</caps-item>

			<!-- Item 2: No Team Members -->
			<caps-item>
				<caps-item-media>
					<div
						class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
					>
						<caps-avatar class="hidden sm:flex">
							<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" />
							<caps-avatar-fallback>CN</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar class="hidden sm:flex">
							<img capsAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
							<caps-avatar-fallback>LR</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar>
							<img capsAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
							<caps-avatar-fallback>ER</caps-avatar-fallback>
						</caps-avatar>
					</div>
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>No Team Members</caps-item-title>
					<caps-item-description>Invite your team to collaborate on this project.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton size="sm" variant="outline">Invite</button>
				</caps-item-actions>
			</caps-item>
		</div>
		`,
	}),
};

export const Dropdown: Story = {
	render: () => ({
		props: {
			people: [
				{
					username: 'spartan-ng',
					avatar: '/assets/capsule.svg',
					email: 'spartan@ng.com',
				},
				{
					username: 'maxleiter',
					avatar: 'https://github.com/maxleiter.png',
					email: 'maxleiter@vercel.com',
				},
				{
					username: 'evilrabbit',
					avatar: 'https://github.com/evilrabbit.png',
					email: 'evilrabbit@vercel.com',
				},
			],
		},
		template: `
		<div class="flex min-h-64 w-full max-w-md flex-col items-center gap-6 p-4">
			<button capsButton variant="outline" size="sm" [capsDropdownMenuTrigger]="peopleTemplate" class="w-fit" placement="bottom-end">
				Select
				<ng-icon name="lucideChevronDown" />
			</button>

			<ng-template #peopleTemplate>
				<caps-menu class="w-48">
					@for (person of people; track person.email) {
						<button capsMenuItem class="p-0 w-full">
							<caps-item class="w-full p-2">
								<caps-item-media>
									<caps-avatar class="size-8">
										<img capsAvatarImage [src]="person.avatar" alt="" class="grayscale" />
										<caps-avatar-fallback>
											{{ person.username.charAt(0).toUpperCase() }}
										</caps-avatar-fallback>
									</caps-avatar>
								</caps-item-media>
								<caps-item-content class="gap-0">
									<caps-item-title>{{ person.username }}</caps-item-title>
									<caps-item-description>{{ person.email }}</caps-item-description>
								</caps-item-content>
							</caps-item>
						</button>
					}
				</caps-menu>
			</ng-template>
		</div>
		`,
	}),
};

export const Group: Story = {
	render: () => ({
		props: {
			people: [
				{
					username: 'spartan-ng',
					avatar: '/assets/capsule.svg',
					email: 'spartan@ng.com',
				},
				{
					username: 'maxleiter',
					avatar: 'https://github.com/maxleiter.png',
					email: 'maxleiter@vercel.com',
				},
				{
					username: 'evilrabbit',
					avatar: 'https://github.com/evilrabbit.png',
					email: 'evilrabbit@vercel.com',
				},
			],
		},
		template: `
		<div class="flex w-full max-w-md flex-col gap-6 p-4">
			<caps-item-group>
				@for (person of people; track person.username; let last = $last) {
					<caps-item>
						<caps-item-media>
							<caps-avatar>
								<img capsAvatarImage [src]="person.avatar" alt="" class="grayscale" />
								<caps-avatar-fallback>{{ person.username.charAt(0).toUpperCase() }}</caps-avatar-fallback>
							</caps-avatar>
						</caps-item-media>

						<caps-item-content class="gap-1">
							<caps-item-title>{{ person.username }}</caps-item-title>
							<caps-item-description>{{ person.email }}</caps-item-description>
						</caps-item-content>

						<caps-item-actions>
							<button capsButton variant="ghost" size="icon" class="rounded-full" aria-label="Add person">
								<ng-icon name="lucidePlus" />
							</button>
						</caps-item-actions>
					</caps-item>
				}
			</caps-item-group>
		</div>
		`,
	}),
};

export const Header: Story = {
	render: () => ({
		props: {
			models: [
				{
					name: 'v0-1.5-sm',
					description: 'Everyday tasks and UI generation.',
					image: 'https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop',
				},
				{
					name: 'v0-1.5-lg',
					description: 'Advanced thinking or reasoning.',
					image: 'https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop',
				},
				{
					name: 'v0-2.0-mini',
					description: 'Open Source model for everyone.',
					image: 'https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop',
				},
			],
		},
		template: `
		<div class="flex w-full max-w-xl flex-col gap-6 p-4">
			<caps-item-group class="[&>.caps-item-list]:grid [&>.caps-item-list]:grid-cols-1 [&>.caps-item-list]:gap-4 sm:[&>.caps-item-list]:grid-cols-3">
				@for (model of models; track model.name) {
					<caps-item>
						<caps-item-header>
							<img
								[src]="model.image"
								[alt]="model.name"
								width="128"
								height="128"
								class="aspect-square w-full rounded-sm object-cover"
							/>
						</caps-item-header>
						<caps-item-content>
							<caps-item-title>{{ model.name }}</caps-item-title>
							<caps-item-description>{{ model.description }}</caps-item-description>
						</caps-item-content>
					</caps-item>
				}
			</caps-item-group>
		</div>
		`,
	}),
};

export const Icon: Story = {
	render: () => ({
		template: `
		<div class="flex w-full max-w-lg flex-col gap-6 p-4">
			<caps-item>
				<caps-item-media>
					<ng-icon name="lucideShieldAlert" />
				</caps-item-media>
				<caps-item-content>
					<caps-item-title>Security Alert</caps-item-title>
					<caps-item-description>New login detected from unknown device.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton size="sm" variant="outline">Review</button>
				</caps-item-actions>
			</caps-item>
		</div>
		`,
	}),
};

export const Image: Story = {
	render: () => ({
		props: {
			songs: [
				{
					title: 'Midnight City Lights',
					artist: 'Neon Dreams',
					album: 'Electric Nights',
					duration: '3:45',
				},
				{
					title: 'Coffee Shop Conversations',
					artist: 'The Morning Brew',
					album: 'Urban Stories',
					duration: '4:05',
				},
				{
					title: 'Digital Rain',
					artist: 'Cyber Symphony',
					album: 'Binary Beats',
					duration: '3:30',
				},
			],
		},
		template: `
		<div class="flex w-full max-w-md flex-col gap-6 p-4">
			<caps-item-group class="gap-4">
				@for (song of songs; track song.title) {
					<caps-item><a capsItem href="#">
						<caps-item-media class="size-10 overflow-hidden">
							<img
								[src]="'https://avatar.vercel.sh/' + song.title"
								alt=""
								width="32"
								height="32"
								class="object-cover grayscale"
							/>
						</caps-item-media>

						<caps-item-content>
							<caps-item-title class="line-clamp-1">
								{{ song.title }} -
								<span class="text-muted-foreground">{{ song.album }}</span>
							</caps-item-title>
							<caps-item-description>{{ song.artist }}</caps-item-description>
						</caps-item-content>

						<caps-item-content class="flex-none text-center">
							<caps-item-description>{{ song.duration }}</caps-item-description>
						</caps-item-content>
					</a></caps-item>
				}
			</caps-item-group>
		</div>
		`,
	}),
};

export const Link: Story = {
	render: () => ({
		template: `
		<div class="flex w-full max-w-md flex-col gap-6 p-4">
			<a capsItem href="#">
				<caps-item-content>
					<caps-item-title>Visit our documentation</caps-item-title>
					<caps-item-description>Learn how to get started with our components.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<ng-icon name="lucideChevronRight" />
				</caps-item-actions>
			</a>
			<a capsItem href="#" target="_blank" rel="noopener noreferrer">
				<caps-item-content>
					<caps-item-title>External resource</caps-item-title>
					<caps-item-description>Opens in a new tab with security attributes.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<ng-icon name="lucideExternalLink" />
				</caps-item-actions>
			</a>
		</div>
		`,
	}),
};

export const Size: Story = {
	render: () => ({
		template: `
 <div class="flex w-full max-w-md flex-col gap-6 p-4">
<caps-item-group size="sm" label="sm"><caps-item><caps-item-content><caps-item-title>Inbox</caps-item-title><caps-item-description>New messages from your team.</caps-item-description></caps-item-content><caps-item-actions><button capsButton type="button" variant="outline" size="sm">Open</button></caps-item-actions></caps-item></caps-item-group><caps-item-group size="md" label="md"><caps-item><caps-item-content><caps-item-title>Inbox</caps-item-title><caps-item-description>New messages from your team.</caps-item-description></caps-item-content><caps-item-actions><button capsButton type="button" variant="outline" size="sm">Open</button></caps-item-actions></caps-item></caps-item-group><caps-item-group size="lg" label="lg"><caps-item><caps-item-content><caps-item-title>Inbox</caps-item-title><caps-item-description>New messages from your team.</caps-item-description></caps-item-content><caps-item-actions><button capsButton type="button" variant="outline" size="sm">Open</button></caps-item-actions></caps-item></caps-item-group><caps-item-group size="xl" label="xl"><caps-item><caps-item-content><caps-item-title>Inbox</caps-item-title><caps-item-description>New messages from your team.</caps-item-description></caps-item-content><caps-item-actions><button capsButton type="button" variant="outline" size="sm">Open</button></caps-item-actions></caps-item></caps-item-group></div>`,
	}),
};

export const Variants: Story = {
	render: () => ({
		template: `
 <div class="flex w-full max-w-md flex-col gap-6 p-4">
<caps-item-group kind="on-page" label="on-page"><caps-item><caps-item-content><caps-item-title>Inbox</caps-item-title><caps-item-description>New messages from your team.</caps-item-description></caps-item-content><caps-item-actions><button capsButton type="button" variant="outline" size="sm">Open</button></caps-item-actions></caps-item></caps-item-group><caps-item-group kind="disclosed" label="disclosed"><caps-item><caps-item-content><caps-item-title>Inbox</caps-item-title><caps-item-description>New messages from your team.</caps-item-description></caps-item-content><caps-item-actions><button capsButton type="button" variant="outline" size="sm">Open</button></caps-item-actions></caps-item></caps-item-group></div>`,
	}),
};
