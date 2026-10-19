import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';

@Component({
	selector: 'spartan-badge-variants-preview',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap gap-2">
			<caps-badge>blue</caps-badge>
			<caps-badge variant="cool-gray">cool-gray</caps-badge>
			<caps-badge variant="red">red</caps-badge>
			<caps-badge variant="magenta">magenta</caps-badge>
			<caps-badge variant="purple">purple</caps-badge>
			<caps-badge variant="cyan">cyan</caps-badge>
			<caps-badge variant="orange">orange</caps-badge>
			<caps-badge variant="yellow">yellow</caps-badge>
			<caps-badge variant="green">green</caps-badge>
		</div>
		<div class="mt-2 flex flex-wrap gap-2">
			<caps-badge highContrast>blue</caps-badge>
			<caps-badge variant="cool-gray" highContrast>cool-gray</caps-badge>
			<caps-badge variant="red" highContrast>red</caps-badge>
			<caps-badge variant="magenta" highContrast>magenta</caps-badge>
			<caps-badge variant="purple" highContrast>purple</caps-badge>
			<caps-badge variant="cyan" highContrast>cyan</caps-badge>
			<caps-badge variant="orange" highContrast>orange</caps-badge>
			<caps-badge variant="yellow" highContrast>yellow</caps-badge>
			<caps-badge variant="green" highContrast>green</caps-badge>
		</div>
	`,
})
export class BadgeVariantsPreview {}
