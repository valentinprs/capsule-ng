import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronsUpDown, lucidePlus, lucideTrash2 } from '@ng-icons/lucide';

const NAMES = ['Olivia Martin', 'Jackson Lee', 'Isabella Nguyen', 'William Kim', 'Sofia Davis', 'Liam Johnson'];

@Component({
	selector: 'spartan-collapsible-dynamic',
	imports: [CapsCollapsibleImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideChevronsUpDown, lucidePlus, lucideTrash2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-[320px] max-w-full' },
	template: `
		<caps-collapsible class="flex w-full max-w-[320px] flex-col gap-2">
			<div class="flex items-center justify-between gap-4">
				<h4 class="text-sm font-semibold">Team · {{ members().length }} members</h4>
				<button capsCollapsibleTrigger capsButton variant="ghost" size="icon" class="size-8">
					<ng-icon name="lucideChevronsUpDown" />
					<span class="sr-only">Toggle</span>
				</button>
			</div>

			<!-- The host's scrollHeight covers all content - the leading line and every row - so the
			height animates to fit even with this text sitting outside the rows wrapper. -->
			<caps-collapsible-content
				class="block overflow-hidden transition-all data-[state=closed]:block data-[state=closed]:h-0 data-[state=open]:h-(--brn-collapsible-content-height)"
			>
				Everyone listed here can view and edit this project.
				<div class="mt-2 flex flex-col gap-2">
					@for (member of members(); track $index) {
						<div class="rounded-md border px-4 py-2 text-sm">{{ member }}</div>
					}
					<button capsButton variant="outline" size="sm" (click)="isFull() ? clear() : addMember()">
						@if (isFull()) {
							<ng-icon name="lucideTrash2" />
							Clear
						} @else {
							<ng-icon name="lucidePlus" />
							Add member
						}
					</button>
				</div>
			</caps-collapsible-content>
		</caps-collapsible>
	`,
})
export class CollapsibleDynamic {
	public readonly members = signal(NAMES.slice(0, 3));
	public readonly isFull = computed(() => this.members().length >= NAMES.length);

	public addMember(): void {
		const next = NAMES[this.members().length];
		if (next === undefined) return;
		this.members.update((members) => [...members, next]);
	}

	public clear(): void {
		this.members.set([]);
	}
}
