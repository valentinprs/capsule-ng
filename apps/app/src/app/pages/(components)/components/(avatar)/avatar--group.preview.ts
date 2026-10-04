import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';

@Component({
	selector: 'spartan-avatar-group-preview',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-avatar-group class="grayscale">
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
		</caps-avatar-group>
	`,
})
export class AvatarGroupPreview {}
