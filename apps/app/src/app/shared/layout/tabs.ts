import { Component, computed, EventEmitter, Input, input, Output } from '@angular/core';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';

// Spartan's docs tab look (left-aligned, semibold), keeping Capsule's primary line indicator. h-9 without
// the trigger's transparent border lets the indicator overlap the list's bottom border, as in spartan.
const tabTrigger = 'h-9 flex-none border-0 px-4 pt-2 pb-3 font-semibold';

export const tabContent =
	'block mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border border-border';
@Component({
	selector: 'spartan-tabs',
	imports: [CapsTabsImports],
	host: {
		class: 'block mt-4',
	},
	template: `
		<caps-tabs [value]="_tabValue()" class="block" (tabActivated)="onTabActivated($event)">
			<caps-tabs-list
				type="line"
				class="border-border text-muted-foreground mb-4 inline-flex h-9 w-full items-center justify-start rounded-none border-b bg-transparent p-0"
				[attr.aria-label]="'Tablist showing ' + firstTab + ' and ' + secondTab"
			>
				<button capsTabsTrigger class="${tabTrigger}" [value]="firstTab">{{ firstTab }}</button>
				<button capsTabsTrigger class="${tabTrigger}" [value]="secondTab">{{ secondTab }}</button>
			</caps-tabs-list>
			<caps-tabs-content class="${tabContent}" [value]="firstTab">
				<ng-content select="[firstTab]" />
			</caps-tabs-content>
			<caps-tabs-content class="${tabContent}" [value]="secondTab">
				<ng-content select="[secondTab]" />
			</caps-tabs-content>
		</caps-tabs>
	`,
})
export class Tabs {
	@Input()
	public firstTab = '';
	@Input()
	public secondTab = '';
	public readonly value = input('');
	protected readonly _tabValue = computed(() => (this.value() === '' ? this.firstTab : this.value()));

	@Output()
	public readonly tabActivated = new EventEmitter<string>();
	protected onTabActivated(value: string) {
		this.tabActivated.emit(value);
	}
}
