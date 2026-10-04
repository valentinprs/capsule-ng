import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAspectRatioImports } from '@capsule-ng/caps/aspect-ratio';

@Component({
	selector: 'spartan-aspect-ratio-square',
	imports: [CapsAspectRatioImports, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex items-center justify-center h-72 w-full',
	},
	template: `
		<caps-aspect-ratio [ratio]="1 / 1" class="w-full max-w-48 overflow-hidden">
			<img ngSrc="/assets/mountains.jpg" fill alt="Mountain views" class="rounded-lg object-cover" />
		</caps-aspect-ratio>
	`,
})
export class AspectRatioSquare {}
