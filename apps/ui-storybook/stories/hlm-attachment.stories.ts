import { CapsAttachmentImports } from '@capsule-ng/caps/attachment';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload, lucideFileText } from '@ng-icons/lucide';
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
