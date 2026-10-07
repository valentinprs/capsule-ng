import { Component } from '@angular/core';
import { CapsScrollAreaImports } from '@capsule-ng/caps/scroll-area';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';

@Component({
	selector: 'spartan-scroll-area-preview',
	imports: [CapsSeparatorImports, CapsScrollAreaImports],
	template: `
		<caps-scroll-area orientation="vertical" aria-label="Release tags" class="h-72 w-48 border" appearance="compact">
			<div class="p-4">
				<h2 class="mb-4 text-sm leading-none font-medium">Tags</h2>
				@for (tag of tags; track tag) {
					<div class="text-sm">
						{{ tag }}
						<caps-separator class="my-2"></caps-separator>
					</div>
				}
			</div>
		</caps-scroll-area>
	`,
})
export class ScrollAreaPreview {
	public tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
}

export const defaultImports = `
import { CapsScrollAreaImports } from '@capsule-ng/caps/scroll-area';
`;
export const defaultSkeleton = `
<caps-scroll-area orientation="vertical" aria-label="Release tags" class="h-72 w-48 border" appearance="compact">
  <div class="p-6 whitespace-nowrap">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto,<br>
    asperiores beatae consequuntur dolor ducimus et exercitationem facilis fugiat magni<br>
    nisi officiis quibusdam rem repellat reprehenderit totam veritatis voluptatibus! Nobis.
  </div>
</caps-scroll-area>
`;
