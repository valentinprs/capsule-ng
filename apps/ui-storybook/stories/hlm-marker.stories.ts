import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideChevronDown,
	lucideChevronRight,
	lucideChevronUp,
	lucideExternalLink,
	lucideFileText,
	lucideGitBranch,
	lucideSearch,
} from '@ng-icons/lucide';
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
			providers: [
				provideIcons({
					lucideGitBranch,
					lucideSearch,
					lucideChevronDown,
					lucideChevronRight,
					lucideChevronUp,
					lucideExternalLink,
					lucideFileText,
				}),
			],
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

/**
 * Figma Marker Accordion: a `button[capsMarker]` with `aria-expanded`. The marker has no accordion
 * behaviour: the expanded content is owned by the app.
 */
export const Accordion: Story = {
	render: () => ({
		props: { open: false },
		template: `
			<div class="flex w-full max-w-sm flex-col gap-2 p-4">
				<button
					capsMarker
					type="button"
					aria-controls="marker-accordion-content"
					[attr.aria-expanded]="open"
					(click)="open = !open"
				>
					<caps-marker-icon><ng-icon name="lucideSearch" /></caps-marker-icon>
					<caps-marker-content>Explored 4 files</caps-marker-content>
					<caps-marker-icon>
						<ng-icon [name]="open ? 'lucideChevronUp' : 'lucideChevronDown'" />
					</caps-marker-icon>
				</button>
				@if (open) {
					<ul id="marker-accordion-content" class="text-muted-foreground flex flex-col gap-1 ps-6 text-sm">
						<li>libs/caps/marker/src/lib/caps-marker.ts</li>
						<li>libs/caps/marker/src/lib/caps-marker-icon.ts</li>
						<li>libs/caps/marker/src/lib/caps-marker-content.ts</li>
						<li>libs/caps/marker/src/index.ts</li>
					</ul>
				}
			</div>
		`,
	}),
};

/** Figma Marker `Variant=Button`: a native `button[capsMarker]` with a trailing chevron. */
export const Button: Story = {
	render: () => ({
		template: `
			<div class="flex w-full max-w-sm flex-col gap-8 p-4">
				<button capsMarker type="button">
					<caps-marker-icon><ng-icon name="lucideFileText" /></caps-marker-icon>
					<caps-marker-content>Open the generated report</caps-marker-content>
					<caps-marker-icon><ng-icon name="lucideChevronRight" /></caps-marker-icon>
				</button>
			</div>
		`,
	}),
};

/** Figma Marker `Variant=Link`: a native `a[capsMarker]`. */
export const Link: Story = {
	render: () => ({
		template: `
			<div class="flex w-full max-w-sm flex-col gap-8 p-4">
				<a capsMarker href="https://github.com/valentinprs/capsule-ng" target="_blank" rel="noopener">
					<caps-marker-icon><ng-icon name="lucideExternalLink" /></caps-marker-icon>
					<caps-marker-content>View the source on GitHub</caps-marker-content>
				</a>
			</div>
		`,
	}),
};
