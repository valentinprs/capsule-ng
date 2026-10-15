import { NgTemplateOutlet } from '@angular/common';
import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	ElementRef,
	forwardRef,
	inject,
	Injector,
	input,
	viewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnQuestionnaireItem, provideBrnQuestionnaireItem } from '@spartan-ng/brain/questionnaire';
import { hlm } from '@spartan-ng/helm/utils';
import { CapsQuestionnaireTitle } from './caps-questionnaire-title';
/** Brain's value accessor and collection algorithms, with native fieldset/legend owned by Capsule. */
@Component({
	selector: 'caps-questionnaire-item',
	exportAs: 'capsQuestionnaireItem',
	imports: [NgTemplateOutlet],
	providers: [
		provideBrnQuestionnaireItem(CapsQuestionnaireItem),
		{ provide: BrnQuestionnaireItem, useExisting: forwardRef(() => CapsQuestionnaireItem) },
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsQuestionnaireItem), multi: true },
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'questionnaire-item',
		'[attr.aria-describedby]': 'null',
		'[attr.aria-invalid]': 'null',
		'[attr.aria-keyshortcuts]': 'null',
		'[attr.tabindex]': 'null',
		class: 'block min-w-0',
	},
	template: `
		<fieldset
			#fieldset
			[disabled]="disabled()"
			[attr.data-active]="active() ? '' : null"
			[attr.data-status]="status()"
			[attr.aria-describedby]="_describedBy()"
			[attr.aria-invalid]="invalid() ? 'true' : null"
			[attr.aria-keyshortcuts]="_keyShortcuts()"
			tabindex="-1"
			[class]="_classes()"
		>
			@if (_title(); as title) {
				<legend class="caps-questionnaire-title text-pretty" [class]="title.userClass()" [attr.id]="title.id()">
					<ng-container *ngTemplateOutlet="title.content()" />
				</legend>
			}
			<ng-content />
		</fieldset>
	`,
})
export class CapsQuestionnaireItem extends BrnQuestionnaireItem {
	private readonly _injector = inject(Injector);
	private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
	public readonly userClass = input('', { alias: 'class' });
	protected readonly _title = contentChild(CapsQuestionnaireTitle, { descendants: true });
	private readonly _fieldset = viewChild.required<ElementRef<HTMLFieldSetElement>>('fieldset');
	protected readonly _classes = computed(() =>
		hlm('caps-questionnaire-item flex min-w-0 flex-col border-0 p-0 outline-none', this.userClass()),
	);
	override moveAnswerFocus(element: Element, direction: 'next' | 'previous'): boolean {
		return super.moveAnswerFocus(
			element === this._fieldset().nativeElement ? this._host.nativeElement : element,
			direction,
		);
	}
	override focusInvalid(): void {
		afterNextRender(
			() => {
				if (this.active()) super.focusInvalid();
			},
			{ injector: this._injector },
		);
	}
	override focus(): void {
		afterNextRender(
			() => {
				if (!this.active()) return;
				if (this.invalid()) super.focusInvalid();
				else this._fieldset().nativeElement.focus();
			},
			{ injector: this._injector },
		);
	}
}
