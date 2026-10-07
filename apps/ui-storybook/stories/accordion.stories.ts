import { Component, signal } from '@angular/core';
import { CapsAccordion, CapsAccordionImports } from '@capsule-ng/caps/accordion';
import { CapsButtonImports } from '@capsule-ng/caps/button';

import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsAccordion> = {
	title: 'Accordion',
	component: CapsAccordion,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsAccordionImports, CapsInput, CapsTextarea, CapsLabel, CapsNativeSelectImports, CapsButtonImports],
		}),
	],
};
export default meta;
type Story = StoryObj<CapsAccordion>;

export const Default: Story = {
	render: () => ({
		moduleMetadata: { imports: [AccordionDefaultStory] },
		template: `<caps-accordion-default-story />`,
	}),
};
@Component({
	selector: 'caps-accordion-default-story',
	imports: [CapsAccordionImports],
	template: `
		<caps-accordion>
			<caps-accordion-item
				title="Is it accessible?"
				id="accordion-story-default-1"
				[expanded]="active() === 'accordion-story-default-1'"
				(selected)="active.set($event.expanded ? $event.id : null)"
			>
				Yes. It adheres to the WAI-ARIA design pattern.
			</caps-accordion-item>

			<caps-accordion-item
				title="Is it styled?"
				id="accordion-story-default-2"
				[expanded]="active() === 'accordion-story-default-2'"
				(selected)="active.set($event.expanded ? $event.id : null)"
			>
				Yes. It comes with default styles that match the other components' aesthetics.
			</caps-accordion-item>

			<caps-accordion-item
				title="Is it animated?"
				id="accordion-story-default-3"
				[expanded]="active() === 'accordion-story-default-3'"
				(selected)="active.set($event.expanded ? $event.id : null)"
			>
				Yes. It's animated by default, but you can disable it if you prefer.
			</caps-accordion-item>
		</caps-accordion>
	`,
})
export class AccordionDefaultStory {
	public readonly active = signal<string | null>(null);
}

export const Multiple: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item title="Can multiple panels be open?">
					Yes. Each item expands independently by default.
				</caps-accordion-item>

				<caps-accordion-item title="Does it maintain state?">
					Yes. Each panel maintains its own open/closed state independently.
				</caps-accordion-item>

				<caps-accordion-item title="Is it keyboard navigable?">
					Yes. Full keyboard support with arrow keys, Home, End, Space, and Enter.
				</caps-accordion-item>
			</caps-accordion>
		`,
	}),
};

export const WithFormInputs: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item title="Form Controls Test">
					<div class="space-y-4 p-4">
						<div>
							<label capsLabel for="name-input" class="mb-1 block text-sm font-medium">Name Input</label>
							<input id="name-input" type="text" placeholder="Type your name" capsInput />
						</div>

						<div>
							<label capsLabel for="description-textarea" class="mb-1 block text-sm font-medium">Description</label>
							<textarea id="description-textarea" placeholder="Enter description" capsTextarea rows="3"></textarea>
						</div>

						<div>
							<label capsLabel for="option-select" class="mb-1 block text-sm font-medium">Select Option</label>
							<select id="option-select" capsNativeSelect>
								<option>Option One</option>
								<option>Option Two</option>
								<option>Option Three</option>
							</select>
						</div>

						<div>
							<p class="mb-1 block text-sm font-medium">Content Editable</p>
							<div
								contenteditable="true"
								class="min-h-[2rem] rounded border p-2"
								role="textbox"
								aria-label="Content Editable"
								aria-multiline="true"
							>
								Edit this text
							</div>
						</div>

						<div>
							<p class="mb-1 block text-sm font-medium">ARIA Textbox</p>
							<div
								role="textbox"
								aria-label="ARIA Textbox"
								tabindex="0"
								aria-multiline="true"
								class="rounded border p-2"
							>
								ARIA textbox
							</div>
						</div>

						<div>
							<p class="mb-1 block text-sm font-medium">ARIA Combobox</p>
							<div
								role="combobox"
								aria-label="ARIA Combobox"
								aria-controls="accordion-story-listbox"
								tabindex="0"
								aria-expanded="false"
								class="rounded border p-2"
							>
								ARIA combobox
							</div>
						</div>

						<div>
							<p class="mb-1 block text-sm font-medium">ARIA Listbox</p>
							<div
								role="listbox"
								id="accordion-story-listbox"
								aria-label="ARIA Listbox"
								tabindex="0"
								class="rounded border p-2"
							>
								<div role="option" class="p-1">Option A</div>
								<div role="option" class="p-1">Option B</div>
							</div>
						</div>
					</div>
				</caps-accordion-item>

				<caps-accordion-item title="Additional Panel">
					This panel helps test navigation between triggers.
				</caps-accordion-item>

				<caps-accordion-item title="Third Panel">Another panel for testing keyboard navigation.</caps-accordion-item>
			</caps-accordion>
		`,
	}),
};

export const WithTapable: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item title="Is the button tapable when closed?">
					<button
						capsButton
						type="button"
						data-testid="not-tapable-when-closed"
						class="rounded bg-blue-500 px-4 py-2 text-white"
					>
						This button should not be focusable when panel is closed
					</button>
				</caps-accordion-item>

				<caps-accordion-item title="Is the button tapable when open?">
					<button
						capsButton
						type="button"
						data-testid="tapable-when-open"
						class="rounded bg-green-500 px-4 py-2 text-white"
					>
						This button should be focusable when panel is open
					</button>
				</caps-accordion-item>
			</caps-accordion>
		`,
	}),
};

export const TwoAccordions: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item title="Is it an accessible accordion">
					Yes. It adheres to the WAI-ARIA design pattern.
				</caps-accordion-item>

				<caps-accordion-item title="Is it a styled accordion?">
					Yes. It comes with default styles that match the other components' aesthetics.
				</caps-accordion-item>

				<caps-accordion-item title="Is it animated?">
					Yes. It's animated by default, but you can disable it if you prefer.
				</caps-accordion-item>
			</caps-accordion>

			<caps-accordion>
				<caps-accordion-item title="Is it accessible?">
					Yes. It adheres to the WAI-ARIA design pattern.
				</caps-accordion-item>

				<caps-accordion-item title="Is it styled?">
					Yes. It comes with default styles that match the other components' aesthetics.
				</caps-accordion-item>

				<caps-accordion-item title="Is it nicely styled?">
					Yes. It comes with default styles that match the other components' aesthetics.
				</caps-accordion-item>

				<caps-accordion-item title="Is it very nicely styled?">
					Yes. It comes with default styles that match the other components' aesthetics.
				</caps-accordion-item>
			</caps-accordion>
		`,
	}),
};

export const SetOpenState: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item expanded title="Is it accessible?">
					Yes. It adheres to the WAI-ARIA design pattern.
				</caps-accordion-item>

				<caps-accordion-item title="Is it styled?">
					Yes. It comes with default styles that match the other components' aesthetics.
				</caps-accordion-item>

				<caps-accordion-item expanded title="Is it animated?">
					Yes. It's animated by default, but you can disable it if you prefer.
				</caps-accordion-item>
			</caps-accordion>
		`,
	}),
};

export const AccordionWithInput: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item title="Enter your name">
					<div class="px-1">
						<input aria-label="Your name" type="text" placeholder="Type your name here" capsInput />
					</div>
				</caps-accordion-item>
			</caps-accordion>
		`,
	}),
};

export const TestAriaValidWithIcon: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-accordion>
				<caps-accordion-item title="Button text with icon inside">
					This is the correct way - icon is inside the button, not a sibling
				</caps-accordion-item>
			</caps-accordion>
		`,
	}),
	parameters: {
		docs: {
			description: {
				story: 'Correct structure - icon is inside the button element',
			},
		},
	},
};

// Button State Sync
export const ButtonStateSync: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [ButtonStateSyncStory],
		},
		template: `<accordion-button-state-sync/>`,
	}),
};
@Component({
	selector: 'accordion-button-state-sync',
	imports: [CapsButtonImports, CapsAccordionImports],
	host: {
		class: 'block max-w-lg space-y-4',
	},
	template: `
		<caps-accordion class="pb-4">
			<caps-accordion-item [expanded]="true" title="Is it accessible?">
				Yes. It adheres to the WAI-ARIA design pattern.
			</caps-accordion-item>

			<caps-accordion-item title="Is it styled?">
				Yes. It comes with default styles that match the other components' aesthetics.
			</caps-accordion-item>

			<caps-accordion-item
				(selected)="_thirdOpened.set($event.expanded)"
				[expanded]="_thirdOpened()"
				title="Is it animated?"
			>
				Yes. It's animated by default, but you can disable it if you prefer.
			</caps-accordion-item>
		</caps-accordion>
		<button capsButton class="w-fit" (click)="toggleThird()">Toggle Third Item</button>
	`,
})
export class ButtonStateSyncStory {
	protected readonly _thirdOpened = signal(false);
	toggleThird() {
		this._thirdOpened.set(!this._thirdOpened());
	}
}

export const TitleTemplate: Story = {
	render: () => ({
		template: `<ng-template #question let-count="count">Shipping <span class="text-muted-foreground">{{ count }} options</span></ng-template>
  <caps-accordion align="start" size="lg"><caps-accordion-item [title]="question" [context]="{ count: 3 }" expanded>Choose standard, express or overnight delivery.</caps-accordion-item></caps-accordion>`,
	}),
};
export const DisabledAndSkeleton: Story = {
	render: () => ({
		template: `<caps-accordion disabled><caps-accordion-item title="Unavailable section">Restricted details</caps-accordion-item></caps-accordion>
  <caps-accordion skeleton><caps-accordion-item title="Loading section" expanded>Loading</caps-accordion-item></caps-accordion>`,
	}),
};

export const CompactFlush: Story = {
	render: () => ({
		template: `<caps-accordion size="sm" isFlush><caps-accordion-item title="Compact section" expanded>Text aligned with the container.</caps-accordion-item><caps-accordion-item title="Another section">Independent details.</caps-accordion-item></caps-accordion>`,
	}),
};
