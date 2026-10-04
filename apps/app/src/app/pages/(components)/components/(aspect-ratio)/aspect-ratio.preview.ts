import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAspectRatioImports } from '@capsule-ng/caps/aspect-ratio';

@Component({
	selector: 'spartan-aspect-ratio-preview',
	imports: [CapsAspectRatioImports, NgOptimizedImage],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex items-center justify-center h-72 w-full',
	},
	template: `
		<caps-aspect-ratio [ratio]="16 / 9" class="w-full max-w-sm overflow-hidden">
			<img ngSrc="/assets/mountains.jpg" fill alt="Mountain views" class="rounded-lg object-cover" />
		</caps-aspect-ratio>
	`,
})
export class AspectRatioPreview {}

export const defaultImports = `
import { CapsAspectRatioImports } from '@capsule-ng/caps/aspect-ratio';
`;

export const defaultSkeleton = `
  <caps-aspect-ratio [ratio]="16 / 9">
    <img src="..." alt="Image" class="size-full rounded-md object-cover"  />
  </caps-aspect-ratio>
`;
