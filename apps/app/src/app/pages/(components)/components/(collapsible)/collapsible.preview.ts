import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronsUpDown } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-collapsible-preview',
	imports: [CapsCollapsibleImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideChevronsUpDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-[350px] max-w-full' },
	template: `
		<caps-collapsible class="flex w-full max-w-[350px] flex-col gap-2">
			<div class="flex items-center justify-between gap-4 px-4">
				<h4 class="text-sm font-semibold">Order #4189</h4>
				<button capsCollapsibleTrigger capsButton variant="ghost" size="icon" class="size-8">
					<ng-icon name="lucideChevronsUpDown" />
					<span class="sr-only">Toggle</span>
				</button>
			</div>
			<div class="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
				<span class="text-muted-foreground">Status</span>
				<span class="font-medium">Shipped</span>
			</div>
			<caps-collapsible-content class="flex flex-col gap-2">
				<div class="rounded-md border px-4 py-2 text-sm">
					<p class="font-medium">Shipping address</p>
					<p class="text-muted-foreground">100 Market St, San Francisco</p>
				</div>
				<div class="rounded-md border px-4 py-2 text-sm">
					<p class="font-medium">Items</p>
					<p class="text-muted-foreground">2x Studio Headphones</p>
				</div>
			</caps-collapsible-content>
		</caps-collapsible>
	`,
})
export class CollapsiblePreview {}

export const defaultImports = `
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
`;

export const defaultSkeleton = `
<caps-collapsible>
  <button capsCollapsibleTrigger>Can I use this in my project?</button>
  <caps-collapsible-content> Yes. Free to use for personal and commercial projects. No attribution required. </caps-collapsible-content>
</caps-collapsible>
`;
