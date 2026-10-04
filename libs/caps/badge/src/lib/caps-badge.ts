import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, Directive, inject, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

export type CapsBadgeVariant =
	| 'red'
	| 'magenta'
	| 'purple'
	| 'blue'
	| 'cyan'
	| 'teal'
	| 'green'
	| 'gray'
	| 'cool-gray'
	| 'warm-gray'
	| 'high-contrast'
	| 'outline';
export type CapsBadgeSize = 'sm' | 'md' | 'lg';

@Directive({
	selector: 'a[capsBadge], button[capsBadge]',
	host: {
		'data-slot': 'badge',
		'[attr.data-variant]': 'variant()',
		'[attr.data-size]': 'size()',
		'[attr.data-skeleton]': 'skeleton() || null',
		'[attr.aria-busy]': 'skeleton() || null',
	},
})
export class CapsBadgeDirective {
	public readonly variant = input<CapsBadgeVariant>('gray');
	public readonly size = input<CapsBadgeSize>('md');
	public readonly skeleton = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	constructor() {
		classes(
			() =>
				'caps-badge inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap [&>ng-icon]:pointer-events-none',
		);
	}
}

@Component({
	selector: 'caps-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: CapsBadgeDirective, inputs: ['variant', 'size', 'skeleton'] }],
	template: '@if (!_badge.skeleton()) { <ng-content /> }',
})
export class CapsBadge {
	protected readonly _badge = inject(CapsBadgeDirective);
}
