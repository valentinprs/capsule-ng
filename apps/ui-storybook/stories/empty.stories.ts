import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileX, lucideInbox, lucideSearch, lucideWifi } from '@ng-icons/lucide';
import {
	HlmEmpty,
	HlmEmptyContent,
	HlmEmptyDescription,
	HlmEmptyHeader,
	HlmEmptyMedia,
	HlmEmptyTitle,
} from '@spartan-ng/helm/empty';

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<HlmEmpty> = {
	title: 'Empty',
	component: HlmEmpty,
	decorators: [
		moduleMetadata({
			imports: [
				NgIcon,
				HlmEmpty,
				HlmEmptyHeader,
				HlmEmptyTitle,
				HlmEmptyDescription,
				HlmEmptyContent,
				HlmEmptyMedia,

				CapsButton,
			],
			providers: [provideIcons({ lucideInbox, lucideSearch, lucideWifi, lucideFileX })],
		}),
	],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HlmEmpty>;

export const Default: Story = {
	render: () => ({
		template: `
      <div hlmEmpty>
        <div hlmEmptyMedia variant="icon">
          <ng-icon name="lucideInbox"/>
        </div>
        <div hlmEmptyContent>
          <div hlmEmptyHeader>
            <div hlmEmptyTitle>No items found</div>
            <div hlmEmptyDescription>
              You don't have any items yet. Create your first item to get started.
            </div>
          </div>
        </div>
      </div>
    `,
	}),
};

export const WithAction: Story = {
	render: () => ({
		template: `
      <div hlmEmpty>
        <div hlmEmptyMedia>
          <ng-icon name="lucideInbox"/>
        </div>
        <div hlmEmptyContent>
          <div hlmEmptyHeader>
            <div hlmEmptyTitle>No items found</div>
            <div hlmEmptyDescription>
              You don't have any items yet. Create your first item to get started.
            </div>
          </div>
          <button capsButton>Add Item</button>
        </div>
      </div>
    `,
	}),
};

export const SearchResults: Story = {
	render: () => ({
		template: `
      <div hlmEmpty>
        <div hlmEmptyMedia>
          <ng-icon name="lucideSearch"/>
        </div>
        <div hlmEmptyContent>
          <div hlmEmptyHeader>
            <div hlmEmptyTitle>No search results</div>
            <div hlmEmptyDescription>
              We couldn't find any results for your search. Try adjusting your search terms.
            </div>
          </div>
          <div class="flex gap-2">
            <button capsButton variant="outline">Clear Search</button>
            <button capsButton>Browse All</button>
          </div>
        </div>
      </div>
    `,
	}),
};

export const NoConnection: Story = {
	render: () => ({
		template: `
      <div hlmEmpty>
        <div hlmEmptyMedia>
          <ng-icon name="lucideWifi"/>
        </div>
        <div hlmEmptyContent>
          <div hlmEmptyHeader>
            <div hlmEmptyTitle>No internet connection</div>
            <div hlmEmptyDescription>
              Please check your internet connection and try again.
            </div>
          </div>
          <button capsButton>Retry</button>
        </div>
      </div>
    `,
	}),
};

export const FileNotFound: Story = {
	render: () => ({
		template: `
      <div hlmEmpty>
        <div hlmEmptyMedia>
          <ng-icon name="lucideFileX"/>
        </div>
        <div hlmEmptyContent>
          <div hlmEmptyHeader>
            <div hlmEmptyTitle>File not found</div>
            <div hlmEmptyDescription>
              The file you're looking for doesn't exist or has been moved.
            </div>
          </div>
          <div class="flex gap-2">
            <button capsButton variant="outline">Go Back</button>
            <button capsButton>Go Home</button>
          </div>
        </div>
      </div>
    `,
	}),
};

export const MinimalText: Story = {
	render: () => ({
		template: `
      <div hlmEmpty>
        <div hlmEmptyContent>
          <div hlmEmptyHeader>
            <div hlmEmptyTitle>Nothing here yet</div>
          </div>
        </div>
      </div>
    `,
	}),
};

export const CustomLayout: Story = {
	render: () => ({
		template: `
      <div class="max-w-md">
        <div hlmEmpty>
          <div hlmEmptyContent>
            <div hlmEmptyHeader>
              <div hlmEmptyTitle>Welcome to your dashboard</div>
              <div hlmEmptyDescription>
                This is where you'll see all your important information. Start by adding some data.
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-4">
              <button capsButton variant="outline">Import Data</button>
              <button capsButton>Create New</button>
            </div>
          </div>
        </div>
      </div>
    `,
	}),
};
