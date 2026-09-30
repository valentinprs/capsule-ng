import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';

@Component({
	selector: 'spartan-input-file',
	imports: [CapsInputImports, HlmFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<hlm-field>
			<label hlmFieldLabel for="picture">Picture</label>
			<input capsInput id="picture" type="file" />
			<hlm-field-description>Select a picture to upload.</hlm-field-description>
		</hlm-field>
	`,
})
export class InputFilePreview {}
