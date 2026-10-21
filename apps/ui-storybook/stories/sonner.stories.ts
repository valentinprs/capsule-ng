import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsToaster, toast } from '@capsule-ng/caps/sonner';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'sonner-story',
	imports: [CapsToaster, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1 class="sr-only">Sonner notifications</h1>
		<caps-toaster [expand]="expand()" [richColors]="richColors()" [theme]="theme()" />
		<div class="flex flex-wrap gap-2">
			<button capsButton type="button" (click)="showToast()">Show Toast</button>
			<button capsButton type="button" variant="outline" (click)="update()">Update by ID</button>
			<button capsButton type="button" variant="outline" (click)="promise()">Promise</button>
			<button capsButton type="button" variant="outline" (click)="persistent()">Persistent</button>
			<button capsButton type="button" variant="outline" (click)="dismiss()">Dismiss all</button>
		</div>
		<p class="mt-3">{{ result() }}</p>
	`,
})
export class SonnerStory {
	public readonly result = signal('Event active');
	public readonly expand = input(false);
	public readonly richColors = input(false);
	public readonly theme = input<'light' | 'dark' | 'system'>('light');
	public showToast() {
		toast('Event has been created', {
			description: 'Sunday, December 03, 2023 at 9:00 AM',
			duration: Number.POSITIVE_INFINITY,
			action: { label: 'Undo', onClick: () => this.result.set('Event creation undone') },
			cancel: { label: 'Keep', onClick: () => this.result.set('Event retained') },
		});
	}
	public update() {
		const id = toast.loading('Saving…', { duration: Number.POSITIVE_INFINITY });
		setTimeout(() => toast.success('Event saved', { id }), 800);
	}
	public promise() {
		toast.promise(new Promise((resolve) => setTimeout(resolve, 800)), {
			loading: 'Loading…',
			success: 'Event loaded',
			error: 'Failed to load event',
		});
	}
	public persistent() {
		toast.warning('Review needed', {
			description: 'This stays until closed.',
			duration: Number.POSITIVE_INFINITY,
		});
	}
	public dismiss() {
		toast.dismiss();
	}
}

const meta: Meta<CapsToaster> = {
	title: 'Sonner',
	component: CapsToaster,
	tags: ['autodocs'],
	args: { theme: 'light', expand: false, richColors: false },
	decorators: [moduleMetadata({ imports: [SonnerStory] })],
};
export default meta;
type Story = StoryObj<CapsToaster>;
const render: Story['render'] = (args) => ({
	props: args,
	template: '<sonner-story [theme]="theme" [expand]="expand" [richColors]="richColors" />',
});
export const Default: Story = { render };
export const Expanded: Story = { args: { expand: true }, render };
export const RichColors: Story = { args: { richColors: true }, render };
