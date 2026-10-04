import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-card-density-preview',
	imports: [CapsCardImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card density="compact" maxWidth="sm" class="mx-auto">
			<caps-card-header>
				<caps-card-title [level]="3">Compact Card</caps-card-title>
				<caps-card-description>This card uses compact density.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<p>Use density="compact" for smaller spacing and title typography.</p>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" size="sm" class="w-full">Action</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class CardDensityPreview {}
