import { type NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

function normalizeRatio(value: NumberInput): number {
	const parts = typeof value === 'string' ? value.split('/').map(Number) : [Number(value)];
	const ratio = parts.length === 2 ? parts[0] / parts[1] : parts.length === 1 ? parts[0] : NaN;
	return Number.isFinite(ratio) && ratio > 0 && parts.every((part) => part > 0) ? ratio : 1;
}

@Component({
	selector: 'caps-aspect-ratio',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'aspect-ratio', '[style.aspect-ratio]': 'ratio()' },
	template: `
		<ng-content />
	`,
})
export class CapsAspectRatio {
	/** Width divided by height; invalid or non-positive values fall back to a square. */
	public readonly ratio = input<number, NumberInput>(1, { transform: normalizeRatio });
	constructor() {
		classes(() => 'caps-aspect-ratio relative block w-full min-w-0');
	}
}
