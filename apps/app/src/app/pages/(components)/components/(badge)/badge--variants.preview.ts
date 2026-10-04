import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';

@Component({
	selector: 'spartan-badge-variants-preview',
	imports: [CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap gap-2">
			<caps-badge variant="red">red</caps-badge>
			<caps-badge variant="magenta">magenta</caps-badge>
			<caps-badge variant="purple">purple</caps-badge>
			<caps-badge variant="blue">blue</caps-badge>
			<caps-badge variant="cyan">cyan</caps-badge>
			<caps-badge variant="teal">teal</caps-badge>
			<caps-badge variant="green">green</caps-badge>
			<caps-badge variant="gray">gray</caps-badge>
			<caps-badge variant="cool-gray">cool-gray</caps-badge>
			<caps-badge variant="warm-gray">warm-gray</caps-badge>
			<caps-badge variant="high-contrast">high-contrast</caps-badge>
			<caps-badge variant="outline">outline</caps-badge>
		</div>
	`,
})
export class BadgeVariantsPreview {}
