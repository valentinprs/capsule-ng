import { _IdGenerator } from '@angular/cdk/a11y';
import type { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	inject,
	input,
	signal,
	untracked,
} from '@angular/core';
import { BrnTabs } from '@spartan-ng/brain/tabs';
import { classes } from '@spartan-ng/helm/utils';
import { CapsTabsBehavior } from './caps-tabs-behavior';

/** A value-selected group. Carbon's followFocus maps to Brain's activation mode. */
@Component({
	selector: 'caps-tabs',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsTabsBehavior,
			inputs: ['brnTabs: value', 'orientation', 'followFocus'],
			outputs: ['brnTabsChange: valueChange', 'tabActivated'],
		},
	],
	host: { 'data-slot': 'tabs', '[id]': 'id()' },
	template: `
		<ng-content />
	`,
})
export class CapsTabs {
	/** Carbon's boolean contract; Angular forwards this binding to the private behavior too. */
	public readonly followFocus = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
	/** Unique within the application; supply an id for a stable externally referenced group. */
	public readonly id = input<string>(defaultRootId());
	public readonly focusedValue = signal<string | undefined>(undefined);
	protected readonly _brain = inject(BrnTabs);
	constructor() {
		effect(() => {
			const entries = Object.entries(this._brain.$tabs()).filter(
				([, entry]) => entry.trigger && !entry.trigger.disabled,
			);
			const active = this._brain.$activeTab();
			if (entries.length && !entries.some(([key]) => key === active))
				untracked(() => this._brain.setActiveTab(entries[0][0]));
		});
		effect(() => {
			this._brain.$activeTab();
			untracked(() => this.focusedValue.set(undefined));
		});
		classes(() => 'caps-tabs group/tabs flex gap-2 data-[orientation=horizontal]:flex-col');
	}
	public triggerId(value: string) {
		return `${this.id()}-tab-${encodeURIComponent(value)}`;
	}
	public contentId(value: string) {
		return `${this.id()}-panel-${encodeURIComponent(value)}`;
	}
}

/** Read SSR identity and reserve a fresh client identity without colliding with hydrated groups. */
function defaultRootId(): string {
	const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	const generator = inject(_IdGenerator);
	let generated: string;
	do {
		generated = generator.getId('caps-tabs-');
	} while (element.ownerDocument.getElementById(generated));
	return element.getAttribute('id') ?? generated;
}
