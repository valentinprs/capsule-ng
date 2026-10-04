import { ReactiveFormsModule } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroup, CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucideCheck, lucideInfo, lucidePlus, lucideSearch, lucideSend } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export default {
	title: 'Input Group',
	component: CapsInputGroup,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				CapsButtonImports,
				CapsTextareaImports,
				CapsInputImports,
				CapsInputGroupImports,
				NgIcon,
				CapsSeparatorImports,
				CapsTooltipImports,
				ReactiveFormsModule,
			],
			providers: [provideIcons({ lucideSend, lucideSearch, lucideInfo, lucidePlus, lucideArrowUp, lucideCheck })],
		}),
	],
} as Meta<CapsInputGroup>;

type Story = StoryObj<CapsInputGroup>;

export const Default: Story = {
	render: () => ({
		template: `
<div class="grid w-full max-w-sm gap-6">
			<caps-input-group>
			<input capsInput placeholder="Search..." aria-label="Search">
			<caps-input-group-addon>
				<ng-icon name="lucideSearch" />
			</caps-input-group-addon>
			<caps-input-group-addon align="inline-end">12 results</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="example.com" class="!pl-1" aria-label="example.com">
			<caps-input-group-addon>
				<caps-input-group-text>https://</caps-input-group-text>
			</caps-input-group-addon>
			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					class="rounded-full"
					size="icon-xs"
					[capsTooltip]="'This is content in a tooltip.'"
				 variant="ghost" type="button" aria-label="More information">
					<ng-icon name="lucideInfo" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<textarea capsTextarea placeholder="Ask, Search or Chat..." aria-label="Ask, Search or Chat"></textarea>
			<caps-input-group-addon align="block-end">
				<button capsButton variant="outline" class="rounded-full" size="icon-xs" type="button" aria-label="Add attachment">
					<ng-icon name="lucidePlus" />
				</button>
				<caps-input-group-text class="ml-auto">52% used</caps-input-group-text>
				<caps-separator orientation="vertical" class="!h-4" />
				<button capsButton variant="default" class="rounded-full" size="icon-xs" disabled type="button">
					<ng-icon name="lucideArrowUp" />
					<span class="sr-only">Send</span>
				</button>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-input-group>
			<input capsInput placeholder="@spartan" aria-label="@spartan">
			<caps-input-group-addon align="inline-end">
				<div class="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
					<ng-icon  name="lucideCheck" />
				</div>
			</caps-input-group-addon>
		</caps-input-group>
		</div>
		`,
	}),
};
