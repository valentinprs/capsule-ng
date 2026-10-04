import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { MentionItem } from './notion-prompt';

@Component({
	selector: 'spartan-mentionable-item',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		@if (item().type === 'user') {
			<caps-avatar class="size-4">
				<img capsAvatarImage [alt]="item().title" [src]="item().image" />
				<caps-avatar-fallback>{{ item().title }}</caps-avatar-fallback>
			</caps-avatar>
		} @else if (item().type === 'page') {
			<span class="flex size-4 items-center justify-center">
				{{ item().image }}
			</span>
		}
	`,
})
export class MentionableItem {
	public item = input.required<MentionItem>();
}
