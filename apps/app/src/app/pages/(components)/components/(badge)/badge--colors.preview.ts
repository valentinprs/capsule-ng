import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';

@Component({
	selector: 'spartan-badge-colors-preview',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2">
			<caps-badge variant="blue">Blue</caps-badge>
			<caps-badge variant="green">Green</caps-badge>
			<caps-badge variant="cyan">Sky</caps-badge>
			<caps-badge variant="purple">Purple</caps-badge>
			<caps-badge variant="red">Red</caps-badge>
		</div>
	`,
})
export class BadgeColorsPreview {}
