import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';

@Component({
	selector: 'spartan-badge-preview',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2">
			<caps-badge>Badge</caps-badge>
			<caps-badge variant="cool-gray">Cool gray</caps-badge>
			<caps-badge variant="red">Red</caps-badge>
			<caps-badge variant="green">Green</caps-badge>
		</div>
	`,
})
export class BadgePreview {}

export const defaultImports = `
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
`;

export const defaultSkeleton = `
<caps-badge>Badge</caps-badge>
`;
