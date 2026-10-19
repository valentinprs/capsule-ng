import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-card-image-preview',
	imports: [CapsCardImports, CapsButtonImports, CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card maxWidth="sm" class="relative mx-auto pt-0">
			<div
				class="bg-primary absolute inset-0 z-(--caps-z-30) aspect-video opacity-(--caps-opacity-50) mix-blend-color"
			></div>
			<img
				src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Event cover"
				class="relative z-(--caps-z-20) aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
			/>
			<caps-card-header>
				<caps-card-action>
					<caps-badge variant="cool-gray">Featured</caps-badge>
				</caps-card-action>
				<caps-card-title [level]="3">Design systems meetup</caps-card-title>
				<caps-card-description>
					A practical talk on component APIs, accessibility, and shipping faster.
				</caps-card-description>
			</caps-card-header>
			<caps-card-footer class="gap-2">
				<button capsButton class="w-full">View Event</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardImagePreview {}
