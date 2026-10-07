import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload, lucideFileText } from '@ng-icons/lucide';
import { HlmAttachmentImports } from '@spartan-ng/helm/attachment';
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
			providers: [provideIcons({ lucideFileText, lucideDownload })],
		}),
		moduleMetadata({
			imports: [HlmAttachmentImports, CapsSpinner, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => ({
		template: `
			<div class="flex flex-col gap-3 p-4">
				<div hlmAttachment>
					<div hlmAttachmentMedia>
						<ng-icon name="lucideFileText" />
					</div>
					<div hlmAttachmentContent>
						<span hlmAttachmentTitle>sales-dashboard.pdf</span>
						<span hlmAttachmentDescription>PDF · 2.4 MB</span>
					</div>
					<div hlmAttachmentActions>
						<button hlmAttachmentAction aria-label="Download">
							<ng-icon name="lucideDownload" />
						</button>
					</div>
				</div>
				<div hlmAttachment state="uploading">
					<div hlmAttachmentMedia>
						<caps-spinner aria-hidden="true" />
					</div>
					<div hlmAttachmentContent>
						<span hlmAttachmentTitle>uploading.pdf</span>
						<span hlmAttachmentDescription>Uploading...</span>
					</div>
				</div>
			</div>
		`,
	}),
};
