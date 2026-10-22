import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'spartan-section-intro',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex flex-col gap-4',
	},
	template: `
		<h1 class="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">{{ name() }}</h1>
		<p class="text-muted-foreground text-[1.05rem] text-balance sm:text-base">{{ lead() }}</p>
	`,
})
export class SectionIntro {
	public readonly name = input('');
	public readonly lead = input('');
}
