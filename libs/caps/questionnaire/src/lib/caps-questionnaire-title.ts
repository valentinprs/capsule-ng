import { ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';
/** Projected title; its template is rendered as the item's first native legend. */
@Component({
	selector: 'caps-questionnaire-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { '[style.display]': '"none"', '[attr.id]': 'null' },
	template: `
		<ng-template #content><ng-content /></ng-template>
	`,
})
export class CapsQuestionnaireTitle {
	public readonly id = input<string>();
	public readonly userClass = input('', { alias: 'class' });
	public readonly content = viewChild.required<TemplateRef<unknown>>('content');
}
