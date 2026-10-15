import type { BooleanInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	output,
	TemplateRef,
	untracked,
	viewChild,
} from '@angular/core';
import { BrnAccordionHeader, BrnAccordionItem } from '@spartan-ng/brain/accordion';
import { classes } from '@spartan-ng/helm/utils';
import { CapsAccordion } from './caps-accordion';
import { CapsAccordionBehavior } from './caps-accordion-behavior';
import { CapsAccordionContentBehavior, CapsAccordionTriggerBehavior } from './caps-accordion-ids';

export type CapsAccordionSelection = { id: string; expanded: boolean };

@Component({
	selector: 'caps-accordion-item',
	imports: [
		NgTemplateOutlet,
		BrnAccordionItem,
		BrnAccordionHeader,
		CapsAccordionTriggerBehavior,
		CapsAccordionContentBehavior,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'listitem',
		'data-slot': 'accordion-item',
		'[attr.id]': 'null',
		'[attr.data-state]': '_item()?.state() ?? "closed"',
	},
	template: `
		<div brnAccordionItem [isOpened]="_expanded()" [disabled]="_disabled()" (openedChange)="_selected($event)">
			<h3 brnAccordionHeader class="caps-accordion-heading">
				<button
					capsAccordionTriggerBehavior
					data-slot="accordion-trigger"
					class="caps-accordion-trigger"
					[contentId]="id()"
					[attr.aria-busy]="_skeleton() || null"
				>
					@if (_skeleton()) {
						<span class="caps-accordion-skeleton-title" aria-hidden="true"></span>
						<span class="sr-only">Loading</span>
					} @else if (_titleTemplate(); as template) {
						<ng-container [ngTemplateOutlet]="template" [ngTemplateOutletContext]="context()" />
					} @else {
						<span class="caps-accordion-title">{{ title() }}</span>
					}
					<svg
						class="caps-accordion-chevron"
						data-slot="accordion-trigger-icon"
						aria-hidden="true"
						focusable="false"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</button>
			</h3>
			<div capsAccordionContentBehavior data-slot="accordion-content" class="caps-accordion-content" [contentId]="id()">
				<div class="caps-accordion-content-inner">
					@if (_skeleton()) {
						<span class="caps-accordion-skeleton-line" aria-hidden="true"></span>
						<span class="caps-accordion-skeleton-line" aria-hidden="true"></span>
						<span class="caps-accordion-skeleton-line" aria-hidden="true"></span>
					} @else {
						<ng-content />
					}
				</div>
			</div>
		</div>
	`,
})
export class CapsAccordionItem {
	private static _nextId = 0;
	private readonly _accordion = inject(CapsAccordion);
	protected readonly _item = viewChild(BrnAccordionItem);
	/** Title text or a template containing non-interactive title content. */
	public readonly title = input<string | TemplateRef<unknown>>('');
	public readonly context = input<Record<string, unknown> | null>(null);
	/** ID of the owned content panel, targeted by the owned native button. */
	public readonly id = input<string>(`caps-accordion-content-${++CapsAccordionItem._nextId}`);
	public readonly expanded = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly skeleton = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	/** Emitted only by user activation, matching Carbon Angular's selected event. */
	public readonly selected = output<CapsAccordionSelection>();
	protected readonly _skeleton = computed(() => this.skeleton() || this._accordion.skeleton());
	protected readonly _disabled = computed(() => this.disabled() || this._accordion.disabled() || this._skeleton());
	protected readonly _expanded = computed(() => this.expanded() && !this._accordion.disabled());
	protected readonly _titleTemplate = computed(() => {
		const title = this.title();
		return title instanceof TemplateRef ? title : null;
	});
	constructor() {
		const behavior = inject(CapsAccordionBehavior);
		classes(() => 'caps-accordion-item block border-b last:border-b-0');
		// Carbon's expanded input applies even to a disabled item. User activation still goes through Brain.
		effect(() => {
			const item = this._item();
			const expanded = this._expanded();
			if (item) untracked(() => (expanded ? behavior.openItem(item.id) : behavior.closeItem(item.id)));
		});
	}
	protected _selected(expanded: boolean): void {
		this.selected.emit({ id: this.id(), expanded });
	}
}
