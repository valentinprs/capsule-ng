import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmpty, CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileX, lucideInbox, lucideSearch, lucideWifi } from '@ng-icons/lucide';

import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsEmpty> = {
	title: 'Empty',
	component: CapsEmpty,
	decorators: [
		moduleMetadata({
			imports: [NgIcon, CapsEmptyImports, CapsButton],
			providers: [provideIcons({ lucideInbox, lucideSearch, lucideWifi, lucideFileX })],
		}),
	],
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CapsEmpty>;

export const Default: Story = {
	render: () => ({
		template: `
      <caps-empty>
        <caps-empty-media variant="icon">
          <ng-icon aria-hidden="true" name="lucideInbox"/>
        </caps-empty-media>

            <caps-empty-title>No items found</caps-empty-title>
            <caps-empty-description>
              You don't have any items yet. Create your first item to get started.
            </caps-empty-description>

      </caps-empty>
    `,
	}),
};

export const WithAction: Story = {
	render: () => ({
		props: { actionCount: 0 },
		template: `
      <caps-empty>
        <caps-empty-media>
          <ng-icon aria-hidden="true" name="lucideInbox"/>
        </caps-empty-media>

            <caps-empty-title>No items found</caps-empty-title>
            <caps-empty-description>
              You don't have any items yet. Create your first item to get started.
            </caps-empty-description>

          <caps-empty-actions><button type="button" capsButton (click)="actionCount = actionCount + 1">Add Item</button></caps-empty-actions>
 <p role="status">Items created: {{ actionCount }}</p>

      </caps-empty>
    `,
	}),
};

export const SearchResults: Story = {
	render: () => ({
		template: `
      <caps-empty>
        <caps-empty-media>
          <ng-icon aria-hidden="true" name="lucideSearch"/>
        </caps-empty-media>

            <caps-empty-title>No search results</caps-empty-title>
            <caps-empty-description>
              We couldn't find any results for your search. Try adjusting your search terms.
            </caps-empty-description>

          <caps-empty-actions>
            <button type="button" capsButton variant="outline">Clear Search</button>
            <button type="button" capsButton>Browse All</button>
          </caps-empty-actions>

      </caps-empty>
    `,
	}),
};

export const NoConnection: Story = {
	render: () => ({
		template: `
      <caps-empty>
        <caps-empty-media>
          <ng-icon aria-hidden="true" name="lucideWifi"/>
        </caps-empty-media>

            <caps-empty-title>No internet connection</caps-empty-title>
            <caps-empty-description>
              Please check your internet connection and try again.
            </caps-empty-description>

          <caps-empty-actions><button type="button" capsButton>Retry</button></caps-empty-actions>

      </caps-empty>
    `,
	}),
};

export const FileNotFound: Story = {
	render: () => ({
		template: `
      <caps-empty>
        <caps-empty-media>
          <ng-icon aria-hidden="true" name="lucideFileX"/>
        </caps-empty-media>

            <caps-empty-title>File not found</caps-empty-title>
            <caps-empty-description>
              The file you're looking for doesn't exist or has been moved.
            </caps-empty-description>

          <caps-empty-actions>
            <button type="button" capsButton variant="outline">Go Back</button>
            <button type="button" capsButton>Go Home</button>
          </caps-empty-actions>

      </caps-empty>
    `,
	}),
};

export const MinimalText: Story = {
	render: () => ({
		template: `
      <caps-empty>

            <caps-empty-title>Nothing here yet</caps-empty-title>

      </caps-empty>
    `,
	}),
};

export const CustomLayout: Story = {
	render: () => ({
		template: `
      <div class="max-w-md">
        <caps-empty>

              <caps-empty-title>Welcome to your dashboard</caps-empty-title>
              <caps-empty-description>
                This is where you'll see all your important information. Start by adding some data.
              </caps-empty-description>

            <caps-empty-actions class="grid grid-cols-2">
              <button type="button" capsButton variant="outline">Import Data</button>
              <button type="button" capsButton>Create New</button>
            </caps-empty-actions>

        </caps-empty>
      </div>
    `,
	}),
};
