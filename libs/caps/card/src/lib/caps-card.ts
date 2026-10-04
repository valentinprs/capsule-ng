import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

export type CapsCardWidth = 'fill' | 'auto';
export type CapsCardMaxWidth = 'sm' | 'md' | 'lg' | 'none';
export type CapsCardDensity = 'default' | 'compact';

@Component({
	selector: 'caps-card',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'card',
		'[attr.data-width]': 'width()',
		'[attr.data-max-width]': 'maxWidth()',
		'[attr.data-density]': 'density()',
	},
	template: `
		<ng-content />
	`,
})
export class CapsCard {
	/** Fill the available width or fit the content, including in stretching flex/grid parents. */
	public readonly width = input<CapsCardWidth>('fill');
	/** Optional token-based width cap; all cards remain bounded by their parent. */
	public readonly maxWidth = input<CapsCardMaxWidth>('none');
	/** Compact reduces spacing and title typography without changing the width. */
	public readonly density = input<CapsCardDensity>('default');

	constructor() {
		classes(() => 'caps-card group/card flex flex-col');
	}
}
