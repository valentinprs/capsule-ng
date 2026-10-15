import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-spinner-custom-preview',
	imports: [CapsSpinnerImports],
	providers: [provideIcons({ lucideLoader })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-spinner icon="lucideLoader" aria-label="Loading with a custom icon" />
	`,
})
export class SpartanSpinnerCustomPreview {}
