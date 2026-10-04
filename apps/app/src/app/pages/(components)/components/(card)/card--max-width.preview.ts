import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
@Component({
	selector: 'spartan-card-max-width-preview',
	imports: [CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'block w-full' },
	template: `
		<div class="grid gap-4">
			<caps-card maxWidth="sm">
				<caps-card-content>
					Small bound: 24rem. Content wraps within the available width on small screens.
				</caps-card-content>
			</caps-card>
			<caps-card maxWidth="md"><caps-card-content>Medium bound: 28rem.</caps-card-content></caps-card>
			<caps-card maxWidth="lg"><caps-card-content>Large bound: 32rem.</caps-card-content></caps-card>
			<caps-card width="auto">
				<caps-card-content class="break-all">
					LongUnbrokenContentRemainsInsideItsParentEvenWhenTheCardUsesContentWidthWithoutANominalMaximumWidth
				</caps-card-content>
			</caps-card>
		</div>
	`,
})
export class CardMaxWidthPreview {}
