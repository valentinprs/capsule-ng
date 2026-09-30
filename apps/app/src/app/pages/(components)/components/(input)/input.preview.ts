import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-preview',
	imports: [CapsInputImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field>
			<label hlmFieldLabel for="input-demo-api-key">API Key</label>
			<input capsInput id="input-demo-api-key" type="password" placeholder="sk-..." />
			<hlm-field-description>Your API key is encrypted and stored securely.</hlm-field-description>
		</hlm-field>
	`,
})
export class InputPreview {}

export const defaultImports = `
import { CapsInputImports } from '@capsule-ng/caps/input';
`;
export const defaultSkeleton = '<input capsInput/>';
