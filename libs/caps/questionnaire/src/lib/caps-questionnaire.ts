import { DestroyRef, Directive, ElementRef, forwardRef, inject, Renderer2 } from '@angular/core';
import { BrnQuestionnaire, provideBrnQuestionnaire } from '@spartan-ng/brain/questionnaire';
import { classes } from '@spartan-ng/helm/utils';

/** Native form flow; validates before application submit listeners, including Signal Forms. */
@Directive({
	selector: 'form[capsQuestionnaire]',
	exportAs: 'capsQuestionnaire',
	providers: [
		provideBrnQuestionnaire(CapsQuestionnaire),
		{ provide: BrnQuestionnaire, useExisting: forwardRef(() => CapsQuestionnaire) },
	],
	host: { 'data-slot': 'questionnaire' },
})
export class CapsQuestionnaire extends BrnQuestionnaire {
	private readonly _validatedSubmissions = new WeakSet<Event>();
	constructor() {
		super();
		classes(() => 'caps-questionnaire flex w-full min-w-0 flex-col');
		const form = inject<ElementRef<HTMLFormElement>>(ElementRef).nativeElement;
		const unlisten = inject(Renderer2).listen(
			form,
			'submit',
			(event: Event) => {
				this._validatedSubmissions.add(event);
				super.onSubmit(event);
				if (event.defaultPrevented) event.stopImmediatePropagation();
			},
			{ capture: true },
		);
		inject(DestroyRef).onDestroy(unlisten);
	}
	protected override onSubmit(event: Event): void {
		// Brain's inherited host listener remains the fallback. Captured events were already validated.
		if (!this._validatedSubmissions.has(event)) super.onSubmit(event);
	}
}
