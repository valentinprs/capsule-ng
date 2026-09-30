import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';

@Component({
	selector: 'spartan-input-badge',
	imports: [CapsInputImports, CapsFieldImports, HlmBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<label capsLabel for="input-badge">
				Webhook URL
				<span hlmBadge variant="secondary" class="ml-auto">Beta</span>
			</label>
			<input capsInput id="input-badge" type="url" placeholder="https://api.example.com/webhook" />
		</caps-field>
	`,
})
export class InputBadge {}
