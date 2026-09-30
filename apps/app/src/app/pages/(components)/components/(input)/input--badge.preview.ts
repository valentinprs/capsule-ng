import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-badge',
	imports: [CapsInputImports, HlmFieldImports, HlmBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field>
			<label hlmFieldLabel for="input-badge">
				Webhook URL
				<span hlmBadge variant="secondary" class="ml-auto">Beta</span>
			</label>
			<input capsInput id="input-badge" type="url" placeholder="https://api.example.com/webhook" />
		</hlm-field>
	`,
})
export class InputBadge {}
