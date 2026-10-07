import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronsUpDown } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-collapsible-animated-example',
	imports: [CapsCollapsibleImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideChevronsUpDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-[350px] max-w-full' },
	template: `
		<caps-collapsible class="flex w-full max-w-[350px] flex-col gap-2">
			<div class="flex items-center justify-between gap-4 px-4">
				<h4 class="text-sm font-semibold">&#64;peduarte starred 3 repositories</h4>
				<button capsCollapsibleTrigger capsButton variant="ghost" size="icon" class="size-8">
					<ng-icon name="lucideChevronsUpDown" />
					<span class="sr-only">Toggle</span>
				</button>
			</div>
			<div class="rounded-md border px-4 py-2 font-mono text-sm">&#64;radix-ui/primitives</div>
			<caps-collapsible-content
				class="flex origin-top flex-col gap-2 transition-all ease-out data-[state=closed]:flex data-[state=closed]:-translate-y-1 data-[state=closed]:scale-80 data-[state=closed]:opacity-0"
			>
				<div class="rounded-md border px-4 py-2 font-mono text-sm">&#64;radix-ui/colors</div>
				<div class="rounded-md border px-4 py-2 font-mono text-sm">&#64;stitches/react</div>
			</caps-collapsible-content>
		</caps-collapsible>
	`,
})
export class CollapsibleAnimatedExample {}
