import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-input-file',
	imports: [CapsInputImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field>
			<label capsLabel for="picture">Picture</label>
			<input capsInput id="picture" type="file" />
			<caps-field-description>Select a picture to upload.</caps-field-description>
		</caps-field>
	`,
})
export class InputFilePreview {}
