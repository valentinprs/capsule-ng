import { Directive, inject, input } from '@angular/core';
import { BrnAvatarImage } from '@spartan-ng/brain/avatar';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'img[capsAvatarImage]',
	exportAs: 'capsAvatarImage',
	hostDirectives: [BrnAvatarImage],
	host: {
		'data-slot': 'avatar-image',
		'[attr.alt]': 'alt()',
	},
})
export class CapsAvatarImage {
	public readonly alt = input<string>('');
	public readonly canShow = inject(BrnAvatarImage).canShow;

	constructor() {
		classes(() => 'caps-avatar-image aspect-square size-full object-cover');
	}
}
