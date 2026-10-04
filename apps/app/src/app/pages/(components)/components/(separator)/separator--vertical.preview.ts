import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';

@Component({
	selector: 'spartan-separator-vertical',
	imports: [CapsSeparatorImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex h-5 items-center gap-4 text-sm">
			<div>Blog</div>
			<caps-separator orientation="vertical" />
			<div>Docs</div>
			<caps-separator orientation="vertical" />
			<div>Source</div>
		</div>
	`,
})
export class SeparatorVerticalPreview {}
