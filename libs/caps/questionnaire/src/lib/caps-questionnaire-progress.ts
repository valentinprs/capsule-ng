import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrnQuestionnaireProgress } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-questionnaire-progress',
	exportAs: 'capsQuestionnaireProgress',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnQuestionnaireProgress, inputs: ['aria-label', 'valueText'] }],
	host: {
		'data-slot': 'questionnaire-progress',
	},
	template: `
		<ng-content>
			{{ _progress.label() }}
		</ng-content>
	`,
})
export class CapsQuestionnaireProgress {
	protected readonly _progress = inject(BrnQuestionnaireProgress);

	/** The current step index (1-based within the active collection). */
	public readonly current = this._progress.current;
	/** The total number of enabled steps. */
	public readonly total = this._progress.total;
	/** Whether the current step is the first one. */
	public readonly first = this._progress.first;
	/** Whether the current step is the last one. */
	public readonly last = this._progress.last;
	/** The computed progression label, e.g. "Question 2 of 5". */
	public readonly label = this._progress.label;

	/** Boolean flags marking which segments of the progress bar are filled. */
	public readonly segments = this._progress.segments;

	constructor() {
		classes(
			() => 'caps-questionnaire-progress text-muted-foreground min-h-lh w-fit min-w-[14ch] font-medium tabular-nums',
		);
	}
}
