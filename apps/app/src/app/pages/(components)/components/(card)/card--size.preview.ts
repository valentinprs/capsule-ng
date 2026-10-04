import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-card-size-preview',
	imports: [CapsCardImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card size="sm" class="mx-auto w-full max-w-sm">
			<caps-card-header>
				<caps-card-title [level]="3">Small Card</caps-card-title>
				<caps-card-description>This card uses the small size variant.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<p>The card component supports a size prop that can be set to "sm" for a more compact appearance.</p>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" size="sm" class="w-full">Action</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardSizePreview {}
