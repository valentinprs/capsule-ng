import { Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmToaster } from '@spartan-ng/helm/sonner';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<HlmToaster> = {
	title: 'Sonner',
	component: HlmToaster,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [HlmToaster, CapsButton],
		}),
	],
};

export default meta;
type Story = StoryObj<HlmToaster>;

@Component({
	selector: 'sonner-story',
	imports: [HlmToaster, CapsButton],
	template: `
		<hlm-toaster />
		<button capsButton (click)="showToast()">Show Toast</button>
	`,
})
export class SonnerStory {
	showToast() {
		toast('Event has been created', {
			description: 'Sunday, December 03, 2023 at 9:00 AM',
			action: {
				label: 'Undo',
				onClick: () => console.log('Undo'),
			},
		});
	}
}

export const Default: Story = {
	render: () => ({
		template: '<sonner-story />',
	}),
};
