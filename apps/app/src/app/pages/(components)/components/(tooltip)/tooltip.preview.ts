import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-tooltip-preview',
	imports: [CapsTooltipImports, CapsButtonImports],
	template: `
		<button capsTooltip="Add to library" capsButton variant="outline">Default</button>
	`,
})
export class TooltipPreview {}

export const defaultImports = `
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
`;
export const defaultSkeleton = `<button capsTooltip="Add to library" capsButton variant="outline">Default</button>`;
