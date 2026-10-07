import {
	ChangeDetectionStrategy,
	Component,
	booleanAttribute,
	inject,
	input,
	numberAttribute,
	output,
	viewChild,
} from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import {
	NG_SCROLLBAR_OPTIONS,
	NgScrollbarExt,
	ScrollbarInputOutputs,
	provideScrollbarOptions,
	type ScrollbarAppearance,
	type ScrollbarOrientation,
	type ScrollbarPosition,
	type ScrollbarVisibility,
} from 'ngx-scrollbar';

/** Owns the native viewport, content wrapper and scrollbars; project content directly. */
@Component({
	selector: 'caps-scroll-area',
	exportAs: 'capsScrollArea',
	imports: [NgScrollbarExt],
	providers: [provideScrollbarOptions({ visibility: 'hover' })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'scroll-area',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.tabindex]': 'null',
	},
	template: `
		<ng-scrollbar
			externalViewport=".caps-scroll-area-viewport"
			externalContentWrapper=".caps-scroll-area-content"
			[orientation]="orientation()"
			[visibility]="visibility()"
			[appearance]="appearance()"
			[position]="position()"
			[withButtons]="withButtons()"
			[hoverOffset]="hoverOffset()"
			[disableInteraction]="disableInteraction()"
			[disableSensor]="disableSensor()"
			[sensorThrottleTime]="sensorThrottleTime()"
			[trackScrollDuration]="trackScrollDuration()"
			[trackClass]="trackClass()"
			[thumbClass]="thumbClass()"
			[buttonClass]="buttonClass()"
			(afterInit)="afterInit.emit()"
			(afterUpdate)="afterUpdate.emit()"
		>
			<div
				class="caps-scroll-area-viewport"
				data-slot="scroll-area-viewport"
				role="region"
				[attr.tabindex]="tabIndex()"
				[attr.aria-label]="ariaLabelledBy() ? null : ariaLabel()"
				[attr.aria-labelledby]="ariaLabelledBy()"
				[attr.aria-describedby]="ariaDescribedBy()"
				[style.overflow-x]="orientation() === 'vertical' ? 'hidden' : 'auto'"
				[style.overflow-y]="orientation() === 'horizontal' ? 'hidden' : 'auto'"
			>
				<div
					class="caps-scroll-area-content"
					[style.width]="orientation() === 'vertical' ? '100%' : null"
					data-slot="scroll-area-content"
				>
					<ng-content />
				</div>
			</div>
		</ng-scrollbar>
	`,
})
export class CapsScrollArea extends ScrollbarInputOutputs {
	private readonly _scrollbar = viewChild.required(NgScrollbarExt);
	private readonly _scrollOptions = inject(NG_SCROLLBAR_OPTIONS);
	/** Scroll axis; auto permits both axes. */
	public override readonly orientation = input<ScrollbarOrientation>(this._scrollOptions.orientation ?? 'auto');
	/** Show scrollbars on hover/scroll, when scrollable, or permanently. */
	public override readonly visibility = input<ScrollbarVisibility>(this._scrollOptions.visibility ?? 'hover');
	public override readonly appearance = input<ScrollbarAppearance>(this._scrollOptions.appearance ?? 'native');
	public override readonly position = input<ScrollbarPosition>(this._scrollOptions.position ?? 'native');
	public override readonly withButtons = input<boolean, string | boolean>(this._scrollOptions.withButtons ?? false, {
		transform: booleanAttribute,
	});
	public override readonly disableInteraction = input<boolean, string | boolean>(
		this._scrollOptions.disableInteraction ?? false,
		{ transform: booleanAttribute },
	);
	public override readonly disableSensor = input<boolean, string | boolean>(
		this._scrollOptions.disableSensor ?? false,
		{ transform: booleanAttribute },
	);
	public override readonly hoverOffset = input<boolean, string | boolean>(this._scrollOptions.hoverOffset ?? false, {
		transform: booleanAttribute,
	});
	public override readonly sensorThrottleTime = input<number, string | number>(
		this._scrollOptions.sensorThrottleTime ?? 0,
		{ transform: numberAttribute },
	);
	public override readonly trackScrollDuration = input<number, string | number>(
		this._scrollOptions.trackScrollDuration ?? 50,
		{ transform: numberAttribute },
	);
	public override readonly trackClass = input(this._scrollOptions.trackClass ?? '');
	public override readonly thumbClass = input(this._scrollOptions.thumbClass ?? '');
	public override readonly buttonClass = input(this._scrollOptions.buttonClass ?? '');
	public override readonly afterInit = output<void>();
	public override readonly afterUpdate = output<void>();
	/** Accessible name belongs to the native scroll viewport. */
	public readonly ariaLabel = input('Scrollable content', { alias: 'aria-label' });
	public readonly ariaLabelledBy = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedBy = input<string | null>(null, { alias: 'aria-describedby' });
	public readonly tabIndex = input<number, string | number>(0, { alias: 'tabindex', transform: numberAttribute });
	/** Preserve the owned ngx-scrollbar's public normalized scrolling API. */
	public scrollTo(options: Parameters<NgScrollbarExt['scrollTo']>[0]): Promise<void> {
		return this._scrollbar().scrollTo(options);
	}
	public scrollToElement(
		target: Parameters<NgScrollbarExt['scrollToElement']>[0],
		options?: Parameters<NgScrollbarExt['scrollToElement']>[1],
	): Promise<void> {
		return this._scrollbar().scrollToElement(target, options);
	}
	constructor() {
		super();
		classes(() => 'caps-scroll-area');
	}
}
