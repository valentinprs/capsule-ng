import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGitBranch, lucideSearch } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
	title: 'Marker',
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Marker examples</h1>${story}</main>`,
		),
		applicationConfig({
			providers: [provideIcons({ lucideGitBranch, lucideSearch })],
		}),
		moduleMetadata({
			imports: [CapsMarkerImports, CapsButtonImports, CapsSpinner, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => ({
		template: `
			<div class="flex w-full max-w-sm flex-col gap-8 p-4">
				<caps-marker>
					<caps-marker-icon><ng-icon name="lucideGitBranch" /></caps-marker-icon>
					<caps-marker-content>Switched to a new branch</caps-marker-content>
				</caps-marker>
				<caps-marker role="status">
					<caps-marker-icon><caps-spinner aria-hidden="true" /></caps-marker-icon>
					<caps-marker-content class="shimmer">Thinking...</caps-marker-content>
				</caps-marker>
				<caps-marker variant="separator">
					<caps-marker-content>Conversation compacted</caps-marker-content>
				</caps-marker>
				<caps-marker>
					<caps-marker-icon><ng-icon name="lucideSearch" /></caps-marker-icon>
					<caps-marker-content>Explored 4 files</caps-marker-content>
				</caps-marker>
				<!-- Figma Marker Separator, Variant=Button: an outline button between the lines. -->
				<caps-marker variant="separator">
					<button capsButton variant="outline" type="button" class="text-muted-foreground">
						<ng-icon name="lucideGitBranch" />
						Show earlier messages
					</button>
				</caps-marker>
			</div>
		`,
	}),
};
