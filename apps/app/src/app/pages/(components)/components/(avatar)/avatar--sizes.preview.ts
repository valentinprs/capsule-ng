import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';

@Component({
	selector: 'spartan-avatar-sizes-preview',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-wrap items-center gap-2 grayscale">
			<caps-avatar size="sm">
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar size="lg">
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
		</div>
	`,
})
export class AvatarSizesPreview {}
