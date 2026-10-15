import { _IdGenerator } from '@angular/cdk/a11y';
import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	forwardRef,
	inject,
	input,
	linkedSignal,
	numberAttribute,
	output,
	signal,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CapsField } from '@capsule-ng/caps/field';
import { BrnFieldA11yService, BrnFieldControl, provideBrnLabelable } from '@spartan-ng/brain/field';
import { BrnSliderImports } from '@spartan-ng/brain/slider';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSliderThumb } from './caps-slider-thumb';

/** A value or sorted range, with internally owned Brain track, thumbs and ticks. */
@Component({
	selector: 'caps-slider',
	imports: [BrnSliderImports, CapsSliderThumb],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsSlider), multi: true },
		provideBrnLabelable(CapsSlider),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnFieldControl],
	host: {
		'data-slot': 'slider',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': '_disabled() ? "" : null',
		'[attr.data-orientation]': 'orientation()',
		'[attr.data-matches-spartan-invalid]': '_fieldControl.spartanInvalid() ? "true" : null',
		'(focusout)': '_touch($event)',
	},
	template: `
		<div
			brnSlider
			#slider="brnSlider"
			class="caps-slider group"
			[id]="id() + '-root'"
			[value]="value()"
			[min]="min()"
			[max]="max()"
			[step]="step()"
			[disabled]="_disabled()"
			[minStepsBetweenThumbs]="minStepsBetweenThumbs()"
			[maxStepsBetweenThumbs]="maxStepsBetweenThumbs()"
			[preventStepOverThumb]="preventStepOverThumb()"
			[inverted]="inverted()"
			[orientation]="orientation()"
			[showTicks]="showTicks()"
			[maxTicks]="maxTicks()"
			[tickLabelInterval]="tickLabelInterval()"
			[formatTick]="formatTick()"
			[draggableRange]="draggableRange()"
			[draggableRangeOnly]="draggableRangeOnly()"
			(valueChange)="_change($event)"
		>
			<div class="caps-slider-control">
				<div brnSliderTrack class="caps-slider-track"><div brnSliderRange class="caps-slider-range"></div></div>
				@for (i of slider.thumbIndexes(); track i) {
					<button
						type="button"
						capsSliderThumb
						class="caps-slider-thumb"
						[id]="i === 0 ? id() : id() + '-' + i"
						[label]="_thumbLabel(i)"
						[labelledBy]="_thumbLabelledBy(i)"
						[describedBy]="_describedBy()"
						[valueText]="valueText() ? valueText()!(slider.normalizedValue()[i]) : null"
						[invalid]="_fieldControl.invalid()"
					>
						<span class="sr-only">{{ _thumbLabel(i) ?? thumbLabels().at(i) ?? 'Value' }}</span>
					</button>
					@if (thumbLabels()[i]) {
						<span class="sr-only" [id]="id() + '-label-' + i">
							{{ ariaLabel() && !ariaLabelledby() ? ariaLabel() + ' ' : '' }}{{ thumbLabels()[i] }}
						</span>
					}
				}
			</div>
			@if (showTicks()) {
				<div class="caps-slider-ticks" aria-hidden="true">
					<div *brnSliderTick="let tick; let formattedTick = formattedTick" class="caps-slider-tick">
						<span class="caps-slider-tick-mark"></span>
						<span class="caps-slider-tick-label">{{ formattedTick }}</span>
					</div>
				</div>
			}
		</div>
	`,
})
export class CapsSlider implements ControlValueAccessor {
	protected readonly _fieldControl = inject(BrnFieldControl);
	private readonly _field = inject(CapsField, { optional: true });
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	public readonly id = input<string>(defaultSliderId());
	public readonly labelableId = this.id;
	/** One value per thumb, following the public Spartan Slider array contract. */
	public readonly valueInput = input<number[]>([], { alias: 'value' });
	public readonly value = linkedSignal(this.valueInput);
	/** Emits the array of values after a user interaction, as in Brain. */
	public readonly valueChange = output<number[]>();
	public readonly min = input<number, NumberInput>(0, { transform: numberAttribute });
	public readonly max = input<number, NumberInput>(100, { transform: numberAttribute });
	public readonly step = input<number, NumberInput>(1, { transform: numberAttribute });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
	public readonly inverted = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly minStepsBetweenThumbs = input<number, NumberInput>(0, { transform: numberAttribute });
	public readonly maxStepsBetweenThumbs = input<number, NumberInput>(Number.POSITIVE_INFINITY, {
		transform: numberAttribute,
	});
	public readonly preventStepOverThumb = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly draggableRange = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly draggableRangeOnly = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly showTicks = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly maxTicks = input<number, NumberInput>(25, { transform: numberAttribute });
	public readonly tickLabelInterval = input<number, NumberInput>(2, { transform: numberAttribute });
	public readonly formatTick = input<(value: number) => string>((value) => String(value));
	/** Distinguishes range thumbs; combined with the surrounding Field label. */
	public readonly thumbLabels = input<readonly string[]>([]);
	/** Accessible text for units; numerical ARIA values remain available. */
	public readonly valueText = input<((value: number) => string) | null>(null);
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	private readonly _formDisabled = signal(false);
	protected readonly _disabled = computed(() => this.disabled() || this._formDisabled());
	protected readonly _describedBy = computed(
		() =>
			[
				...new Set(`${this.ariaDescribedby() ?? ''} ${this._a11y?.describedBy() ?? ''}`.split(/\s+/).filter(Boolean)),
			].join(' ') || null,
	);
	private _onChange?: (value: number[]) => void;
	private _onTouched?: () => void;
	constructor() {
		classes(() => 'caps-slider-host block w-full');
	}
	protected _thumbLabelledBy(index: number): string | null {
		const field = this.ariaLabelledby() ?? (this.ariaLabel() ? null : this._field?.labelId());
		return [field, this.thumbLabels()[index] ? `${this.id()}-label-${index}` : null].filter(Boolean).join(' ') || null;
	}
	protected _thumbLabel(index: number): string | null {
		if (this._thumbLabelledBy(index)) return null;
		const label = this.ariaLabel();
		return this.value().length > 1 ? `${label ?? 'Value'} ${index + 1} of ${this.value().length}` : label;
	}
	protected _change(values: number[]): void {
		if (this._disabled()) return;
		this.value.set(values);
		this.valueChange.emit(values);
		this._onChange?.(values);
	}
	protected _touch(event: FocusEvent): void {
		if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) this._onTouched?.();
	}
	public writeValue(value: number[] | null): void {
		// Brain ignores non-array form writes, including nullable reset.
		if (!Array.isArray(value)) return;
		this.value.set([...value].sort((a, b) => a - b).map((v) => Math.min(this.max(), Math.max(this.min(), v))));
	}
	public registerOnChange(fn: (value: number[]) => void): void {
		this._onChange = fn;
	}
	public registerOnTouched(fn: () => void): void {
		this._onTouched = fn;
	}
	public setDisabledState(disabled: boolean): void {
		this._formDisabled.set(disabled);
	}
}

/** Reuse server thumb identity and avoid collisions with groups not hydrated yet. */
function defaultSliderId(): string {
	const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
	const generator = inject(_IdGenerator);
	let generated: string;
	do {
		generated = generator.getId('caps-slider-');
	} while (
		element.ownerDocument.getElementById(generated) ||
		element.ownerDocument.getElementById(`${generated}-root`)
	);
	const serverRoot = element.querySelector<HTMLElement>('[data-slot="slider"]');
	return element.getAttribute('id') ?? (serverRoot?.id.endsWith('-root') ? serverRoot.id.slice(0, -5) : generated);
}
