import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCircleAlert,
	lucideDownload,
	lucideFileText,
	lucideRotateCw,
	lucideUpload,
	lucideX,
} from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
	title: 'Attachment',
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Attachment examples</h1>${story}</main>`,
		),
		applicationConfig({
			providers: [
				provideIcons({ lucideFileText, lucideDownload, lucideCircleAlert, lucideRotateCw, lucideUpload, lucideX }),
			],
		}),
		moduleMetadata({
			imports: [CapsAttachmentImports, CapsButton, CapsSpinner, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-3 p-4">
				<caps-attachment>
					<caps-attachment-media>
						<ng-icon name="lucideFileText" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>capsule.svg</caps-attachment-title>
						<caps-attachment-description>SVG · Capsule logo</caps-attachment-description>
					</caps-attachment-content>
					<caps-attachment-actions>
						<a capsButton href="/assets/capsule.svg" download="capsule.svg" aria-label="Download">
							<ng-icon name="lucideDownload" />
						</a>
					</caps-attachment-actions>
				</caps-attachment>
				<caps-attachment state="uploading">
					<caps-attachment-media>
						<caps-spinner aria-hidden="true" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>uploading.pdf</caps-attachment-title>
						<caps-attachment-description>Uploading...</caps-attachment-description>
					</caps-attachment-content>
				</caps-attachment>
			</div>
		`,
	}),
};

/** Figma Attachment sizes: Default, Small (`sm`) and Extra small (`xs`). */
export const Sizes: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-3 p-4">
				@for (size of ['default', 'sm', 'xs']; track size) {
					<caps-attachment [size]="size">
						<caps-attachment-media>
							<ng-icon name="lucideFileText" />
						</caps-attachment-media>
						<caps-attachment-content>
							<caps-attachment-title>report-{{ size }}.pdf</caps-attachment-title>
							<caps-attachment-description>PDF · 1.2 MB</caps-attachment-description>
						</caps-attachment-content>
						<caps-attachment-actions>
							<button capsButton type="button" aria-label="Remove">
								<ng-icon name="lucideX" />
							</button>
						</caps-attachment-actions>
					</caps-attachment>
				}
			</div>
		`,
	}),
};

/** Figma Attachment `State=Error`: the upload failed. */
export const ErrorState: Story = {
	name: 'Error',
	render: () => ({
		template: `
			<div class="flex flex-col gap-3 p-4">
				<caps-attachment state="error">
					<caps-attachment-media>
						<ng-icon name="lucideCircleAlert" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>contract.pdf</caps-attachment-title>
						<caps-attachment-description>Upload failed</caps-attachment-description>
					</caps-attachment-content>
					<caps-attachment-actions>
						<button capsButton type="button" aria-label="Retry">
							<ng-icon name="lucideRotateCw" />
						</button>
					</caps-attachment-actions>
				</caps-attachment>
			</div>
		`,
	}),
};

/** Figma Attachment `State=Idle`: a dashed placeholder waiting for a file. */
export const Idle: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-3 p-4">
				<caps-attachment state="idle">
					<caps-attachment-media>
						<ng-icon name="lucideUpload" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>Add a file</caps-attachment-title>
						<caps-attachment-description>PDF, PNG or JPG</caps-attachment-description>
					</caps-attachment-content>
				</caps-attachment>
			</div>
		`,
	}),
};

/** Figma Attachment Card Vertical: `orientation="vertical"`, in each state. */
export const Vertical: Story = {
	render: () => ({
		template: `
			<caps-attachment-group class="p-4" aria-label="Attachments">
				<caps-attachment orientation="vertical">
					<caps-attachment-media>
						<ng-icon name="lucideFileText" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>capsule.svg</caps-attachment-title>
						<caps-attachment-description>SVG</caps-attachment-description>
					</caps-attachment-content>
					<caps-attachment-actions>
						<a capsButton href="/assets/capsule.svg" download="capsule.svg" aria-label="Download">
							<ng-icon name="lucideDownload" />
						</a>
					</caps-attachment-actions>
				</caps-attachment>
				<caps-attachment orientation="vertical" state="uploading">
					<caps-attachment-media>
						<caps-spinner aria-hidden="true" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>uploading.pdf</caps-attachment-title>
						<caps-attachment-description>Uploading...</caps-attachment-description>
					</caps-attachment-content>
				</caps-attachment>
				<caps-attachment orientation="vertical" state="error">
					<caps-attachment-media>
						<ng-icon name="lucideCircleAlert" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>contract.pdf</caps-attachment-title>
						<caps-attachment-description>Upload failed</caps-attachment-description>
					</caps-attachment-content>
				</caps-attachment>
				<caps-attachment orientation="vertical" state="idle">
					<caps-attachment-media>
						<ng-icon name="lucideUpload" />
					</caps-attachment-media>
					<caps-attachment-content>
						<caps-attachment-title>Add a file</caps-attachment-title>
					</caps-attachment-content>
				</caps-attachment>
			</caps-attachment-group>
		`,
	}),
};
