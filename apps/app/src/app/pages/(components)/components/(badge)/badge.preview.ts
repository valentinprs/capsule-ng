import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';

@Component({
	selector: 'spartan-badge-preview',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2">
			<caps-badge variant="high-contrast">Badge</caps-badge>
			<caps-badge variant="gray">Secondary</caps-badge>
			<caps-badge variant="red">Destructive</caps-badge>
			<caps-badge variant="outline">Outline</caps-badge>
		</div>
	`,
})
export class BadgePreview {}

export const defaultImports = `
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
`;

export const defaultSkeleton = `
<caps-badge variant="gray" size="md">Badge</caps-badge>
`;
