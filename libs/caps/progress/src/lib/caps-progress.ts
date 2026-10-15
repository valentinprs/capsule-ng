import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BrnProgress, BrnProgressIndicator } from '@spartan-ng/brain/progress';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-progress',
	imports: [BrnProgressIndicator],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnProgress, inputs: ['value', 'max', 'getValueLabel'] }],
	host: {
		'data-slot': 'progress',
		'[attr.aria-busy]': '_progress.state() !== "complete"',
	},
	template: `
		<brn-progress-indicator class="caps-progress-indicator" [style.width.%]="_percentage()" />
	`,
})
export class CapsProgress {
	protected readonly _progress = inject(BrnProgress);
	protected readonly _percentage = computed(() => {
		const value = this._progress.value();
		const max = this._progress.max();
		return value == null ? 50 : max === 0 && value === 0 ? 100 : (value / max) * 100;
	});
	constructor() {
		classes(() => 'caps-progress');
	}
}
