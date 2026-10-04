import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { BrnAvatar } from '@spartan-ng/brain/avatar';
import { classes } from '@spartan-ng/helm/utils';
import { CapsAvatarImage } from './caps-avatar-image';

@Component({
	selector: 'caps-avatar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'avatar',
		'[attr.data-size]': 'size()',
	},
	template: `
		@if (_image()?.canShow()) {
			<ng-content select="[capsAvatarImage],[brnAvatarImage]" />
		} @else {
			<span
				[attr.role]="_fallbackLabel() ? 'img' : null"
				[attr.aria-label]="_fallbackLabel()"
				[attr.aria-hidden]="_capsImage()?.alt() === '' ? true : null"
			>
				<ng-content select="caps-avatar-fallback,[brnAvatarFallback]" />
			</span>
		}
		<ng-content />
	`,
})
export class CapsAvatar extends BrnAvatar {
	protected readonly _capsImage = contentChild(CapsAvatarImage);
	protected readonly _fallbackLabel = computed(() =>
		!this._image()?.canShow() ? this._capsImage()?.alt() || null : null,
	);
	public readonly size = input<'default' | 'sm' | 'lg'>('default');

	constructor() {
		super();
		classes(
			() =>
				'caps-avatar group/avatar after:border-border relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:mix-blend-darken dark:after:mix-blend-lighten',
		);
	}
}
