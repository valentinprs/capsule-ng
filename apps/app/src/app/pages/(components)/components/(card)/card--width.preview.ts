import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
@Component({
	selector: 'spartan-card-width-preview',
	imports: [CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full' },
	template: `
		<div class="flex flex-col gap-4" data-width-parent="flex">
			<caps-card><caps-card-content>Fill available width</caps-card-content></caps-card>
			<caps-card width="auto"><caps-card-content>Content width</caps-card-content></caps-card>
		</div>
		<div class="mt-4 grid gap-4" data-width-parent="grid">
			<caps-card><caps-card-content>Fill available width</caps-card-content></caps-card>
			<caps-card width="auto"><caps-card-content>Content width</caps-card-content></caps-card>
		</div>
	`,
})
export class CardWidthPreview {}
