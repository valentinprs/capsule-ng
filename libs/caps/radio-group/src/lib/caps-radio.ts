import { BooleanInput } from '@angular/cdk/coercion';
import { NgTemplateOutlet } from '@angular/common';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	ElementRef,
	inject,
	input,
	viewChild,
} from '@angular/core';
import { CapsFieldLabel } from '@capsule-ng/caps/field';
import { BrnField, BrnFieldA11yService } from '@spartan-ng/brain/field';
import { BrnRadio, BrnRadioGroup } from '@spartan-ng/brain/radio-group';
import { classes } from '@spartan-ng/helm/utils';
import { CapsRadioGroup } from './caps-radio-group';

/** A radio option with its native input, indicator and projected label. */
@Component({
	selector: 'caps-radio',
	imports: [BrnRadio, NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'radio-group-item',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': '_disabled()',
		'[attr.data-checked]': '_checked()',
		'[attr.data-matches-spartan-invalid]': '_group.controlState?.()?.spartanInvalid ? "true" : null',
	},
	template: `
		<brn-radio
			#radio
			class="caps-radio-control relative flex items-center gap-3"
			[id]="id()"
			[value]="value()"
			[disabled]="disabled()"
			[required]="required() || _group.required()"
			[aria-label]="ariaLabel()"
			[aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="_describedBy()"
		>
			<span indicator class="caps-radio-indicator" aria-hidden="true" (click)="_activateIndicator($event)">
				<span class="size-2 rounded-full" [class.bg-primary]="_checked()"></span>
			</span>
			@if (_enclosingLabel) {
				<ng-container [ngTemplateOutlet]="labelContent" />
			} @else {
				<label class="caps-radio-label cursor-pointer empty:hidden" [for]="id()">
					<ng-container [ngTemplateOutlet]="labelContent" />
				</label>
			}
			<ng-template #labelContent><ng-content /></ng-template>
		</brn-radio>
	`,
})
export class CapsRadio<T = unknown> {
	private static _nextId = 0;
	private readonly _radioElement = viewChild.required<BrnRadio<T>, ElementRef<HTMLElement>>('radio', {
		read: ElementRef,
	});
	protected readonly _enclosingLabel = inject(CapsFieldLabel, { optional: true });
	private readonly _field = inject(BrnField, { optional: true });
	private readonly _capsGroup = inject(CapsRadioGroup);
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	private readonly _destroyRef = inject(DestroyRef);
	public readonly labelableId = computed(() => this.id());
	protected readonly _describedBy = computed(() => {
		const ids = [this.ariaDescribedby(), this._a11y?.describedBy()]
			.filter(Boolean)
			.join(' ')
			.split(/\s+/)
			.filter(Boolean);
		return [...new Set(ids)].join(' ') || undefined;
	});
	protected readonly _group = inject(BrnRadioGroup<T>);
	public readonly id = input(`caps-radio-${++CapsRadio._nextId}`);
	public readonly value = input.required<T>();
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly required = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | undefined>(undefined, { alias: 'aria-describedby' });
	protected readonly _checked = computed(() => this._group.value() === this.value());
	protected readonly _disabled = computed(() => this.disabled() || this._group.disabledState());
	/** Let the native input enforce disabled fieldsets, including the first-legend exception. */
	protected _activateIndicator(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();
		const input = this._radioElement().nativeElement.querySelector('input');
		if (!input || input.matches(':disabled')) return;
		input.click();
		input.focus();
	}
	constructor() {
		if (this._field && this._field !== this._capsGroup.field) {
			this._field.registerLabelable(this);
			this._destroyRef.onDestroy(() => this._field?.unregisterLabelable(this));
		}
		classes(() => 'caps-radio block data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50');
	}
}
