import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-badge',
	imports: [CapsInputImports, CapsFieldImports, CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<caps-field-label for="input-badge">
				Webhook URL
				<caps-badge variant="cool-gray" class="ml-auto">Beta</caps-badge>
			</caps-field-label>
			<input capsInput id="input-badge" type="url" placeholder="https://api.example.com/webhook" />
		</caps-field>
	`,
})
export class InputBadge {}
