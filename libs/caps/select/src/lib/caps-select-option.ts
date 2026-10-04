import {
	AfterContentChecked,
	afterEveryRender,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	signal,
} from '@angular/core';
import { BrnSelectItem, injectBrnSelectBase } from '@spartan-ng/brain/select';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-select-option',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnSelectItem, inputs: ['value', 'disabled', 'id'] }],
	host: { 'data-slot': 'select-option' },
	template: `
		<div class="min-w-0 flex-1"><ng-content /></div>
		<span aria-hidden="true" class="caps-select-check">{{ item.active() ? '✓' : '' }}</span>
	`,
})
export class CapsSelectOption<T> implements AfterContentChecked {
	private readonly _select = injectBrnSelectBase<T>();
	public readonly item = inject<BrnSelectItem<T>>(BrnSelectItem);
	private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
	/** Use an explicit label for rich content; ordinary projected text is inferred. */
	public readonly label = input<string>();
	public readonly text = signal('');
	constructor() {
		classes(
			() =>
				'caps-select-option relative flex w-full cursor-default items-center outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-(--caps-opacity-disabled)',
		);
		this.item.getLabel = () => this._select.itemToString()?.(this.item.value()) ?? this.label() ?? this.text();
		afterEveryRender(() => this._readText());
	}
	ngAfterContentChecked() {
		this._readText();
	}
	private _readText() {
		this.text.set(this._element.nativeElement.firstElementChild?.textContent?.trim() ?? '');
	}
}
