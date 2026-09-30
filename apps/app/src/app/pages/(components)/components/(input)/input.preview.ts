import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-preview',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<label capsLabel for="input-demo-api-key">API Key</label>
			<input capsInput id="input-demo-api-key" type="password" placeholder="sk-..." />
			<caps-field-description>Your API key is encrypted and stored securely.</caps-field-description>
		</caps-field>
	`,
})
export class InputPreview {}

export const defaultImports = `
import { CapsInputImports } from '@capsule-ng/caps/input';
`;
export const defaultSkeleton = '<input capsInput/>';
